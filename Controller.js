class Controller {
    constructor(model, database) {
        this.buildCreateQuery = model.buildCreateQuery;
        this.buildReadQuery = model.buildReadQuery;
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

    post = async (req, res) => {
        const sql = this.buildCreateQuery(req);
        try {
            const status = await this.database.query(sql);
            this.get({ params: {id: status[0].insertId }}, res, "primary");
        } catch(error) {
            res.status(500).json({ message: `Failed to execute query: ${error.message}` });
        }
    };
}

export default Controller;