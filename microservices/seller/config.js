// get SQL DB parameters using export
const dbConfig = {
    user: "root",
    password: "ajitabh",
    server: "localhost",
    database: "test_001",
    port: 3306
};

exports.getSQLDBParameters = () => {
    return dbConfig;
};
