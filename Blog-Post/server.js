import "dotenv/config";
import { app } from "./index.js";
import { connectDB } from "./src/config/db.js";

const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;

await connectDB(MONGODB_URL);
app.listen(PORT, () => {
    console.log(`Server started on port`);
});