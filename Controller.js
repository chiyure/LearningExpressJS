class Controller {
    constructor(buildReadQuery, database) {
        this.buildReadQuery = buildReadQuery;
        this.database = database;
    }

    // Method
    get = async (req, res, variant) => {
        const sql = this.buildReadQuery(req, variant);
        try {
            const [result] = await this.database.query(sql);
            if (result.length === 0) res.status(404).json({ message: "No record(s) found" });
            else res.status(200).json(result);
        } catch(error) {
            res.status(500).json({ message: `Failed to execute query: ${error.message}` });
        }
    };
}

export default Controller;