import 'dotenv/config';
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../../generated/prisma/client.ts";

const adapter = new PrismaMariaDb({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "jogos_db",
});

const prisma = new PrismaClient({ adapter });

export default prisma;