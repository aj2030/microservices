// get SQL DB parameters using export
const dbConfig = {
    user: "root",
    password: "Welcome1234",
    server: "mysql-db-cluster.cluster-czgg8e8w4s6a.ap-south-1.rds.amazonaws.com",
    database: "test_001",
    port: 3306
};

exports.getSQLDBParameters = () => {
    return dbConfig;
};
