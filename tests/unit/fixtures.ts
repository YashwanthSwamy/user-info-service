process.env.APP_NAME = "transactionandreservationsystem";
process.env.MQ_HOST = "TestHOST";
process.env.MQ_PORT = "5000";
process.env.MQ_USERNAME = "TESTUSERNAME";
process.env.MQ_PASSWORD = "TESTPASSWORD";

process.env.DB_USERNAME = "postgres";
process.env.DB_PASSWORD = "postgres";
process.env.DB_PORT = "5432";
process.env.DB_HOST = "postgres";
process.env.DB_NAME = "postgres";


export const mochaGlobalTeardown = async () => {
  delete process.env.MQ_HOST;
  delete process.env.MQ_PORT;
  delete process.env.MQ_USERNNAME;
  delete process.env.MQ_PASSWORD;
  delete process.env.DB_USERNAME;
  delete process.env.DB_PASSWORD;
  delete process.env.DB_PORT;
  delete process.env.DB_HOST;
  delete process.env.DB_NAME;
  delete process.env.APP_NAME;
};