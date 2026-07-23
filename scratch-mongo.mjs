import { MongoMemoryServer } from "mongodb-memory-server";
import { writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const mongod = await MongoMemoryServer.create();
const uri = mongod.getUri();
writeFileSync(join(__dirname, "scratch-mongo-uri.txt"), uri);
console.log("MONGO_READY", uri);

process.on("SIGTERM", async () => {
  await mongod.stop();
  process.exit(0);
});
