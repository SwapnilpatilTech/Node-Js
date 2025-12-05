import fs from "fs";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logsFolderPath = path.join(__dirname, "..", "logs");

if (!fs.existsSync(logsFolderPath)) {
    fs.mkdirSync(logsFolderPath, { recursive: true });
}

const logFilePath = path.join(logsFolderPath, "access.log");
const logStream = fs.createWriteStream(logFilePath, { flags: "a" });

const logger = morgan("combined", { stream: logStream });

export default logger;
