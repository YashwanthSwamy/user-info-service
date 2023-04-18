process.env.APP_NAME = "user-info-service";
process.env.DB_URL = "postgresql://postgres:postgres@postgres:5432/postgres";
process.env.PORT = "8080";
process.env.INSTANCE_INDEX = "";

export const mochaGlobalTeardown = async () => {
  delete process.env.APP_NAME;
  delete process.env.DB_URL;
  delete process.env.PORT;
  delete process.env.INSTANCE_INDEX;
};