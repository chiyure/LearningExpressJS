const model = {};

model.table = "Modules";
model.fields = ["ModuleID", "ModuleCode", "ModuleName", "ModuleLevel", "ModuleYearID", "ModuleLeaderID", "ModuleImageURL"];


model.buildCreateQuery = (req) => {
    
    return `INSERT INTO ${model.table} SET
    ModuleCode=:ModuleCode,
    ModuleName=:ModuleName,
    ModuleLevel=:ModuleLevel,
    ModuleYearID=:ModuleYearID,
    ModuleLeaderID=:ModuleLeaderID,
    ModuleImageURL=:ModuleImageURL
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
    switch (variant) {
        case "primary": 
        where = `WHERE ModuleID=:ID`;
        break;
        case "leader":
        where = `WHERE ModuleLeaderID=:ID`;
        break;
        case "users":
        table = `(${table} INNER JOIN Modulemembers ON ModuleID=ModulememberModuleID)`;
        where = `WHERE ModulememberUserID=:ID`;
        break;
    }

    return `SELECT ${fields} FROM ${table} ${where}`; 
};

model.buildUpdateQuery = (req) => {
    
    return `UPDATE ${model.table} SET
    ModuleCode=:ModuleCode,
    ModuleName=:ModuleName,
    ModuleLevel=:ModuleLevel,
    ModuleYearID=:ModuleYearID,
    ModuleLeaderID=:ModuleLeaderID,
    ModuleImageURL=:ModuleImageURL
    WHERE ModuleID=:ID
    `;
};


model.buildDeleteQuery = (req) => {
    return `DELETE FROM ${model.table} WHERE ModuleID=:ID`;
};


export default model;