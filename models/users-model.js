const model = {};
model.table = "Users";
model.fields = ["UserID", "UserFirstname", "UserLastname", "UserEmail", "UserRegistered", "UserLevel", "UserYearID", "UserUsertypeID", "UserImageURL",];

model.buildCreateQuery = (req) => {
    
    return `INSERT INTO ${model.table} SET
    UserFirstname=:UserFirstname,
    UserLastname=:UserLastname,
    UserEmail=:UserEmail,
    UserRegistered=:UserRegistered,
    UserLevel=:UserLevel,
    UserYearID=:UserYearID,
    UserUsertypeID=:UserUsertypeID,
    UserImageURL=:UserImageURL
    `;
};

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
        where = `WHERE UserID=:ID`;
        break;
        case "staff": 
        where = `WHERE UserUsertypeID=${STAFF}`;
        break;
        case "groups": 
        table = `(${table} INNER JOIN Groupmembers ON UserID=GroupmemberUserID)`;
        where = `WHERE GroupmemberGroupID=:ID`;
        break;
    }

    return `SELECT ${fields} FROM ${table} ${where}`; 
};

model.buildUpdateQuery = (req) => {
    
    return `UPDATE ${model.table} SET
    UserFirstname=:UserFirstname,
    UserLastname=:UserLastname,
    UserEmail=:UserEmail,
    UserRegistered=:UserRegistered,
    UserLevel=:UserLevel,
    UserYearID=:UserYearID,
    UserUsertypeID=:UserUsertypeID,
    UserImageURL=:UserImageURL
    WHERE UserID=:ID
    `;
};

export default model;