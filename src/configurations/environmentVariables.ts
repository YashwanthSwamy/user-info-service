import { get } from "env-var";

class EnvironmentVariables{
    PORT !: number;
    DB_URL !: string;
    INSTANCE_INDEX !: string | undefined;

    constructor() {
        this.init();
    }

    private init() {
        this.PORT = get("PORT").default("8080").asIntPositive();
        this.INSTANCE_INDEX = get("INSTANCE_INDEX").asString();
        this.DB_URL = get("SQL_DB_URI").default("postgresql://postgres:postgres@postgres:5432/postgres").asString();
    }
}

const environmentVariables = new EnvironmentVariables();
export { environmentVariables };