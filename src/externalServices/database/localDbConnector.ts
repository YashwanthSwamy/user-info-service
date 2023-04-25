import { environmentVariables } from "../../configurations/environmentVariables";

class LocalDbConnector {
  public getUrl() {
    return {
      client: "pg",
      connection: {
        host: environmentVariables.DB_HOST,
        database: environmentVariables.DB_NAME,
        user: environmentVariables.DB_USERNAME,
        password: environmentVariables.DB_PASSWORD,
        ssl: {
          require: true,
          rejectUnauthorized: false
        },
      },
      pool: {
        idleTimeoutMillis: 10 * 1000
      }
    };
  }
}

const localDbConnector = new LocalDbConnector();
export default localDbConnector;
