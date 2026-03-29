const model = {};

model.table = "Modules";
model.fields = ["ModuleID", "ModuleCode", "ModuleName", "ModuleLevel", "ModuleYearID", "ModuleLeaderID", "ModuleImageURL"];


model.buildCreateQuery = (req) => {
    // Initialisations
    const record = req.body;
    
    return `INSERT INTO ${model.table} SET
    ModuleCode="${record["ModuleCode"]}",
    ModuleName="${record["ModuleName"]}",
    ModuleLevel="${record["ModuleLevel"]}",
    ModuleYearID="${record["ModuleYearID"]}",
    ModuleLeaderID="${record["ModuleLeaderID"]}",
    ModuleImageURL="${record["ModuleImageURL"]}"
    `;
};

model.buildReadQuery = (req, variant) => {
    // Initialisations
    let table = model.table;
    let fields = model.fields;
        
    // Resolve foreign keys
    table = `(${table} LEFT JOIN Years ON ModuleYearID=YearID)`;
    fields = [...fields, "YearName AS ModuleYearName"];
    table = `(${table} LEFT JOIN Users ON ModuleLeaderID=UserID)`;
    fields = [...fields, "CONCAT(UserFirstName, ' ', UserLastname) AS ModuleLeaderName"];
    

    // Build and return query
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
        table = `(${table} INNER JOIN Modulemembers ON ModuleID=ModulememberModuleID)`;
        where = `WHERE ModulememberUserID=${id}`;
        break;
    }

    return `SELECT ${fields} FROM ${table} ${where}`; 
};

export default model;