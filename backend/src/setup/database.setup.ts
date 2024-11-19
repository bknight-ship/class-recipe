/** @format */

import { RecipeEntity } from "@/entities/recipe.entity";
import { createDatabase } from "typeorm-extension";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { DataSource } from "typeorm";
import "dotenv/config";

export const databaseSetup = async (): Promise<void> => {
  await createDatabase({
    ifNotExist: true,
    options: {
      type: "postgres",
      host: process.env.DB_HOST,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      port: Number(process.env.DB_PORT) || 5432,
      database: process.env.DB_DATABASE,
      synchronize: true,
      entitySkipConstructor: true,
      entities: [RecipeEntity],
      namingStrategy: new SnakeNamingStrategy(),
    },
  });
};

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT) || 5432,
  database: process.env.DB_DATABASE,
  logging: false,
  synchronize: true,
  entities: [RecipeEntity],
  entitySkipConstructor: true,
  namingStrategy: new SnakeNamingStrategy(),
});
