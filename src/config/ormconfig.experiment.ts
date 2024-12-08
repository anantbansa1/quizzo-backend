import { DataSource, DataSourceOptions } from "typeorm";
import { Document } from "~src/svc/modules/rag-documents/entities";

const config: DataSourceOptions = {
  type: "postgres",
  host: process.env.EXPERIMENT_DB_HOST,
  port: parseInt(process.env.EXPERIMENT_DB_PORT),
  username: process.env.EXPERIMENT_DB_USER,
  password: process.env.EXPERIMENT_DB_PASSWORD,
  database: process.env.EXPERIMENT_DB_NAME,
  ssl: process.env.EXPERIMENT_DB_SSL === "true",
  synchronize: false,
  ...(process.env.EXPERIMENT_DB_SSL === "true" && {
    extra: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  }),
  connectTimeoutMS: 15 * 1000,
  maxQueryExecutionTime: 60 * 1000,
  entities: [Document],
  migrations: ["src/migrations/experiment/*.js"],
  migrationsTableName: "migrations_typeorm",
  migrationsRun: false,
};

const dataSource = new DataSource(config);

export default dataSource;
