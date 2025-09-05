// backend/lib/db.js
import { Sequelize } from "sequelize";

const {
  DB_DATABASE,
  DB_USERNAME, 
  DB_PASSWORD,
  DB_HOST = "localhost",
  DB_DIALECT = "mysql",
  DB_PORT = "3396",
  JWT_SECRET,
} = process.env;

function makeSequelize() {
  if (DATABASE_URL) {
    return new Sequelize(DATABASE_URL);
  }
  return new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    dialect: DB_DIALECT,   // "mysql"
    port: DB_PORT,         // optional
    logging: false,
  });
}

// Prevent “Too many connections” during Next.js hot reloads in dev
let sequelize;
if (process.env.NODE_ENV === "development") {
  if (!global._sequelize) global._sequelize = makeSequelize();
  sequelize = global._sequelize;
} else {
  sequelize = makeSequelize();
}

export default sequelize;
