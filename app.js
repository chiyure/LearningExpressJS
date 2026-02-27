// Imports
import express from "express";
import database from "./database.js";
import Controller from "./Controller.js";
import buildReadModulesQuery from "./models/modules-model.js";
import buildReadUsersQuery from "./models/users-model.js"; 
import buildReadUsertypesQuery from "./models/usertypes-model.js";
import buildReadYearsQuery from "./models/years-model.js";

// Configure Express App
const app = new express();

// Configure Middleware

// Controllers

const modulesController = new Controller(buildReadModulesQuery, database);
const usersController = new Controller(buildReadUsersQuery, database);
const usertypesController = new Controller(buildReadUsertypesQuery, database);
const yearsController = new Controller(buildReadYearsQuery, database);

// Endpoints
app.get("/api/modules", (req, res) => modulesController.get(req, res, null));
app.get("/api/modules/:id", (req, res) => modulesController.get(req, res, "primary"));
app.get("/api/modules/leader/:id", (req, res) => modulesController.get(req, res, "leader"));
app.get("/api/modules/users/:id", (req, res) => modulesController.get(req, res, "users"));

app.get("/api/users", (req, res) => usersController.get(req, res, null));
app.get("/api/users/staff", (req, res) => usersController.get(req, res, "staff"));
app.get("/api/users/:id", (req, res) => usersController.get(req, res, "primary"));
app.get("/api/users/groups/:id", (req, res) => usersController.get(req, res, "groups"));

app.get("/api/usertypes", (req, res) => usertypesController.get(req, res, null));
app.get("/api/usertypes/:id", (req, res) => usertypesController.get(req, res, "primary"));

app.get("/api/years", (req, res) => yearsController.get(req, res, null));
app.get("/api/years/:id", (req, res) => yearsController.get(req, res, "primary"));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));