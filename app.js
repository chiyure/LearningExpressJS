// Imports
import express from "express";
import database from "./database.js";

// Configure Express App
const app = new express();

// Configure Middleware

// Controllers
const modulesController = async (req, res) => {
    const table = "Modules";
    const fields = ["ModuleID", "ModuleCode", "ModuleName", "ModuleLevel", "ModuleYearID", "ModuleLeaderID", "ModuleImageURL"];
    const sql = `SELECT ${fields} FROM ${table}`; 
    try {
        const [result] = await database.query(sql);
        if(result.length === 0) res.status(404).json({message: "No record(s) found"});
        else res.status(200).json(result);
    } catch(error) {
        res.status(500).json({message: `Failed to execute query: ${error.message}`});
    }
};

// Endpoints
app.get("/api/modules", modulesController);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));