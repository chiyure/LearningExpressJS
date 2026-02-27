const buildReadQuery = (req, variant) => {
    // Initialisation
    let table = "Years";
    let fields = ["YearID", "YearName"];
    
    // Resolve foreign keys
    // Build and return query
    let where = " ";
    const id = parseInt(req.params.id);
    switch (variant) {
        case "primary": 
        where = `WHERE YearID=${id}`;
        break;
    }

    return `SELECT ${fields} FROM ${table} ${where}`; 
};

export default buildReadQuery;