class Controller {
    constructor(model, database) {
        this.buildCreateQuery = model.buildCreateQuery;
        this.buildReadQuery = model.buildReadQuery;
        this.buildUpdateQuery = model.buildUpdateQuery;
        this.buildDeleteQuery = model.buildDeleteQuery;
        this.database = database;
    }

    // Method
    get = async (req, res, variant) => {
        const sql = this.buildReadQuery(req, variant);
        const parameters = { ID: parseInt(req.params.id)};
        try {
            const [result] = await this.database.query(sql, parameters);
            if (result.length === 0) res.status(404).json({ message: "No record(s) found" });
            else res.status(200).json(result);
        } catch(error) {
            res.status(500).json({ message: `Failed to execute query: ${error.message}` });
        }
    };

    post = async (req, res) => {
        const sql = this.buildCreateQuery(req);
        const parameters = req.body;
        try {
            const status = await this.database.query(sql, parameters);
            this.get({ params: {id: status[0].insertId }}, res, "primary");
        } catch(error) {
            res.status(500).json({ message: `Failed to execute query: ${error.message}` });
        }
    };

    put = async (req, res) => {
        const sql = this.buildUpdateQuery(req);
        const parameters = { ...req.body, ID: parseInt(req.params.id) };
        try {
            const status = await this.database.query(sql, parameters);
            this.get(req, res, "primary");
        } catch(error) {
            res.status(500).json({ message: `Failed to execute query: ${error.message}` });
        }
    };

    delete = async (req, res) => {
        const sql = this.buildDeleteQuery(req);
        const parameters = { ID: parseInt(req.params.id) };
        try {
            const status = await this.database.query(sql, parameters);
            if(status[0].affectedRows === 0)
                res.status(400).json({message: `Failed to delete record ${req.params.id}`});
            res.status(204);           
        } catch(error) {
            res.status(500).json({ message: `Failed to execute query: ${error.message}` });
        }
    };

}

export default Controller;