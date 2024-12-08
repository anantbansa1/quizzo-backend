import { DataSource } from "typeorm";
import dataSource from "~src/config/ormconfig.pgap";

const dataSources: { name: string; source: DataSource }[] = [
  { name: "Default DataSource", source: dataSource },
];

export const initializeDataSources = async () => {
  const promises = dataSources.map(({ name, source }) =>
    source.initialize().then(() => console.log(`${name} has been initialized!`)),
  );
  await Promise.all(promises);
};
