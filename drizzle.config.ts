

import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './drizzle/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_xzn7W2OXvPdi@ep-wild-heart-a442p7qd-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require"
  },
});
