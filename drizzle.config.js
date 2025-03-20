import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./configs/schema.js",
 dbCredentials:{
    url:'postgresql://AI-Study-Material-Gen_owner:npg_sVUjpryMm74i@ep-patient-bush-a8r2siky-pooler.eastus2.azure.neon.tech/AI-Study-Material-Gen?sslmode=require'

 }
});
