const buildReadQuery = (req, variant) => {
    // Initialisation
    let table = "Usertypes";
    let fields = ["UsertypeID", "UsertypeName"];
    
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

export default buildReadQuery;