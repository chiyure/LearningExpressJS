const model = {};
model.table = "Years";
model.fields = ["YearID", "YearName"];

model.buildReadQuery = (req, variant) => {
    // Initialisation
    let table = model.table;
    let fields = model.fields;
    
    // Resolve foreign keys
    // Build and return query
    let where = " ";
    const id = parseInt(req.params.id);
    switch (variant) {
        case "primary": 
        where = `WHERE YearID=:ID`;
        break;
    }

    return `SELECT ${fields} FROM ${table} ${where}`; 
};

export default model;