import { configDotenv } from "dotenv";
import path from "path";

configDotenv({
  path: path.join(
    process.cwd(),
    process.env.NODE_ENV?.trim() === "development" ? ".env.local" : ".env.production"
  ),
});
