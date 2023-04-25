import { get } from "env-var";

class EnvironmentVariables {
  PORT!: number;
  DB_URL!: string;
  INSTANCE_INDEX!: string | undefined;
  DB_USERNAME: unknown;
  DB_PASSWORD: unknown;
  DB_PORT: unknown;
  DB_HOST: unknown;
  DB_NAME: unknown;

  constructor() {
    this.init();
  }

  private init(): void {
    this.PORT = get("PORT").default("8080").asIntPositive();
    this.DB_USERNAME = process.env.DB_USERNAME;
    this.DB_PASSWORD = process.env.DB_PASSWORD;
    this.DB_HOST = process.env.DB_HOST;
    this.DB_NAME = process.env.DB_NAME;
  }
}

const environmentVariables = new EnvironmentVariables();
export { environmentVariables };
