// Imports
import express from "express";

// Configure Express App
const app = new express();

// Configure Middleware

// Controllers
const helloController = (req, res) => res.send("Hello World!");
const addController = (req, res) => {
    const var1 = req.params.var1;
    const var2 = req.params.var2;
    const result = {
        operation: "addition",
        operand1: var1,
        operand2: var2,
        result: parseInt(var1) + parseInt(var2),
        message: "Have a great day!"
    };
    res.json(result);
};

// Endpoints
app.get("/hello", helloController);
app.get("/add/:var1,:var2", addController);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started running on port ${PORT}`));