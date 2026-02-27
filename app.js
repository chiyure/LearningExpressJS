// Imports
import express from "express";
import database from "./database.js";

// Configure Express App
const app = new express();

// Configure Middleware

// Controllers
const modulesController = async (req, res, variant) => {
// Initialisation
    let table = "Modules";
    let fields = ["ModuleID", "ModuleCode", "ModuleName", "ModuleLevel", "ModuleYearID", "ModuleLeaderID", "ModuleImageURL"];
    
    // Resolve foreign keys
    table = `(${table} LEFT JOIN Years ON ModuleYearID=YearID)`;
    fields = [...fields, "YearName AS ModuleYearName"];
    table = `(${table} LEFT JOIN Users ON ModuleLeaderID=UserID)`;
    fields = [...fields, "CONCAT(UserFirstName, ' ', UserLastname) AS ModuleLeaderName"];
    

    // Build and execute query
    let where = " ";
    const id = parseInt(req.params.id);
    switch (variant) {
        case "primary": 
        where = `WHERE ModuleID=${id}`;
        break;
        case "leader":
        where = `WHERE ModuleLeaderID=${id}`;
        break;
        case "users":
        table = `(${table} INNER JOIN Modulemembers ON MOduleID=ModulememberModuleID)`;
        where = `WHERE ModulememberUserID=${id}`;
        break;
    }

    const sql = `SELECT ${fields} FROM ${table} ${where}`; 
    try {
        const [result] = await database.query(sql);
        if(result.length === 0) res.status(404).json({message: "No record(s) found"});
        else res.status(200).json(result);
    } catch(error) {
        res.status(500).json({message: `Failed to execute query: ${error.message}`});
    }
};

const usersController = async (req, res, variant) => {
// Initialisation
    let table = "Users";
    let fields = ["UserID", "UserFirstname", "UserLastname", "UserEmail", "UserRegistered", "UserLevel", "UserYearID", "UserUsertypeID", "UserImageURL",];
    const STAFF = 1; // Primary key for staff type in unibasedb Usertype table

    // Resolve foreign keys
    table = `(${table} LEFT JOIN Usertypes ON UserUsertypeID=UsertypeID)`;
    fields = [...fields, "UsertypeName AS UserUsertypeName"];
    table = `(${table} LEFT JOIN Years ON UserYearID=YearID)`;
    fields = [...fields, "YearName AS UserYearName"];

    // Build and execute query
    let where = " ";
    const id = parseInt(req.params.id);
    switch (variant) {
        case "primary": 
        where = `WHERE UserID=${id}`;
        break;
        case "staff": 
        where = `WHERE UserUsertypeID=${STAFF}`;
        break;
        case "groups": 
        table = `(${table} INNER JOIN Groupmembers ON UserID=GroupmemberUserID)`;
        where = `WHERE GroupmemberGroupID=${id}`;
        break;
    }

    const sql = `SELECT ${fields} FROM ${table} ${where}`; 
    try {
        const [result] = await database.query(sql);
        if(result.length === 0) res.status(404).json({message: "No record(s) found"});
        else res.status(200).json(result);
    } catch(error) {
        res.status(500).json({message: `Failed to execute query: ${error.message}`});
    }
};

const usertypesController = async (req, res, variant) => {
// Initialisation
    let table = "Usertypes";
    let fields = ["UsertypeID", "UsertypeName"];
    
    // Resolve foreign keys
    // Build and execute query
    let where = " ";
    const id = parseInt(req.params.id);
    switch (variant) {
        case "primary": 
        where = `WHERE UsertypeID=${id}`;
        break;
    }

    const sql = `SELECT ${fields} FROM ${table} ${where}`; 
    try {
        const [result] = await database.query(sql);
        if(result.length === 0) res.status(404).json({message: "No record(s) found"});
        else res.status(200).json(result);
    } catch(error) {
        res.status(500).json({message: `Failed to execute query: ${error.message}`});
    }
};

const yearsController = async (req, res, variant) => {
// Initialisation
    let table = "Years";
    let fields = ["YearID", "YearName"];
    
    // Resolve foreign keys
    // Build and execute query
    let where = " ";
    const id = parseInt(req.params.id);
    switch (variant) {
        case "primary": 
        where = `WHERE YearID=${id}`;
        break;
    }

    const sql = `SELECT ${fields} FROM ${table} ${where}`; 
    try {
        const [result] = await database.query(sql);
        if(result.length === 0) res.status(404).json({message: "No record(s) found"});
        else res.status(200).json(result);
    } catch(error) {
        res.status(500).json({message: `Failed to execute query: ${error.message}`});
    }
};

// Endpoints
app.get("/api/modules", (req, res) => modulesController(req, res, null));
app.get("/api/modules/:id", (req, res) => modulesController(req, res, "primary"));
app.get("/api/modules/leader/:id", (req, res) => modulesController(req, res, "leader"));
app.get("/api/modules/users/:id", (req, res) => modulesController(req, res, "users"));

app.get("/api/users", (req, res) => usersController(req, res, null));
app.get("/api/users/staff", (req, res) => usersController(req, res, "staff"));
app.get("/api/users/:id", (req, res) => usersController(req, res, "primary"));
app.get("/api/users/groups/:id", (req, res) => usersController(req, res, "groups"));

app.get("/api/usertypes", (req, res) => usertypesController(req, res, null));
app.get("/api/usertypes/:id", (req, res) => usertypesController(req, res, "primary"));

app.get("/api/years", (req, res) => yearsController(req, res, null));
app.get("/api/years/:id", (req, res) => yearsController(req, res, "primary"));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));