// Imports
import express from "express";
import database from "./database.js";
import Controller from "./Controller.js";
import modulesModel from "./models/modules-model.js";
import usersModel from "./models/users-model.js"; 
import usertypesModel from "./models/usertypes-model.js";
import yearsModel from "./models/years-model.js";

// Configure Express App
const app = new express();

// Configure Middleware
app.use(express.json());
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Controllers
const modulesController = new Controller(modulesModel, database);
const usersController = new Controller(usersModel, database);
const usertypesController = new Controller(usertypesModel, database);
const yearsController = new Controller(yearsModel, database);

// Endpoints
app.get("/api/modules", (req, res) => modulesController.get(req, res, null));
app.get("/api/modules/:id", (req, res) => modulesController.get(req, res, "primary"));
app.get("/api/modules/leader/:id", (req, res) => modulesController.get(req, res, "leader"));
app.get("/api/modules/users/:id", (req, res) => modulesController.get(req, res, "users"));

app.post("/api/modules", modulesController.post);
app.put("/api/modules/:id", modulesController.put);
app.delete("/api/modules/:id", modulesController.delete);

app.get("/api/users", (req, res) => usersController.get(req, res, null));
app.get("/api/users/staff", (req, res) => usersController.get(req, res, "staff"));
app.get("/api/users/:id", (req, res) => usersController.get(req, res, "primary"));
app.get("/api/users/groups/:id", (req, res) => usersController.get(req, res, "groups"));

app.post("/api/users", usersController.post);
app.put("/api/users/:id", usersController.put);
app.delete("/api/users/:id", usersController.delete);

app.get("/api/usertypes", (req, res) => usertypesController.get(req, res, null));
app.get("/api/usertypes/:id", (req, res) => usertypesController.get(req, res, "primary"));

app.post("/api/years", usertypesController.post);
app.put("/api/years/:id", usertypesController.put);
app.delete("/api/years/:id", usertypesController.delete);

app.get("/api/years", (req, res) => yearsController.get(req, res, null));
app.get("/api/years/:id", (req, res) => yearsController.get(req, res, "primary"));

app.post("/api/years", yearsController.post);
app.put("/api/years/:id", yearsController.put);
app.delete("/api/years/:id", yearsController.delete);


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));