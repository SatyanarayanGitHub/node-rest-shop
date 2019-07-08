const config = {
    "development": {
        "config_id": "development",
        "app_name": "node-shop",
        "app_desc": "node sample application to explore node express and mongosse latest features",
        "database_url": "mongodb+srv://ronak:ronak123@cluster0-02wkr.mongodb.net/node-shop-db?retryWrites=true&w=majority",
        "database": "node-shop-db"
    },

    "testing": {
        "config_id": "testing",
        "database_url": "mongodb://localhost:27017/node-shop-db-test",
        "database": "node-shop-db-test"
    },

    "staging": {
        "config_id": "staging",
        "node_port": 8080,
        "database": "node-shop-db-stag"
    },

    "production": {
        "config_id": "production",
        "node_port": 8080,
        "database": "node-shop-db-prod"
    }
};

module.exports = config;