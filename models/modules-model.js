const buildReadQuery = (req, variant) => {
    // Initialisation
    let table = "Modules";
    let fields = ["ModuleID", "ModuleCode", "ModuleName", "ModuleLevel", "ModuleYearID", "ModuleLeaderID", "ModuleImageURL"];
    
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
        table = `(${table} INNER JOIN Modulemembers ON MOduleID=ModulememberModuleID)`;
        where = `WHERE ModulememberUserID=${id}`;
        break;
    }

    return `SELECT ${fields} FROM ${table} ${where}`; 
};

export default buildReadQuery;