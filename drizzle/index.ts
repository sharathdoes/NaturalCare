import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema"; // ✅ import your schema

const client = postgres(process.env.DATABASE_URL!); // adjust to your env

export const db = drizzle(client, { schema }); // ✅ pass schema here
