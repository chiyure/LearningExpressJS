const model = {};
model.table = "Users";
model.fields = ["UserID", "UserFirstname", "UserLastname", "UserEmail", "UserRegistered", "UserLevel", "UserYearID", "UserUsertypeID", "UserImageURL",];

model.buildReadQuery = (req, variant) => {
    // Initialisation
    let table = model.table;
    let fields = model.fields;
    const STAFF = 1; // Primary key for staff type in unibasedb Usertype table

    // Resolve foreign keys
    table = `(${table} LEFT JOIN Usertypes ON UserUsertypeID=UsertypeID)`;
    fields = [...fields, "UsertypeName AS UserUsertypeName"];
    table = `(${table} LEFT JOIN Years ON UserYearID=YearID)`;
    fields = [...fields, "YearName AS UserYearName"];

    // Build and return query
    let where = " ";
    const id = parseInt(req.params.id);
    switch (variant) {
        case "primary": 
        where = `WHERE UserID=${id}`;
        break;
        case "staff": 
        where = `WHERE UserUsertypeID=${STAFF}`;
        break;
        case "groups": 
        table = `(${table} INNER JOIN Groupmembers ON UserID=GroupmemberUserID)`;
        where = `WHERE GroupmemberGroupID=${id}`;
        break;
    }

    return `SELECT ${fields} FROM ${table} ${where}`; 
};

export default model;