const model = {};
model.table = "Usertypes";
model.fields = ["UsertypeID", "UsertypeName"];

model.buildReadQuery = (req, variant) => {
    // Initialisation
    let table = model.table;
    let fields = model.field;
    
    // Resolve foreign keys
    // Build and return query
    let where = " ";
    const id = parseInt(req.params.id);
    switch (variant) {
        case "primary": 
        where = `WHERE UsertypeID=${id}`;
        break;
    }

    return `SELECT ${fields} FROM ${table} ${where}`; 
};

export default model;