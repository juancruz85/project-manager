import { MongoMemoryServer } from "mongodb-memory-server";
import { writeFileSync } from "fs";

const mongod = await MongoMemoryServer.create();
const uri = mongod.getUri();
writeFileSync("/Users/juancruz/project-manager/scratch-mongo-uri.txt", uri);
console.log("MONGO_READY", uri);

process.on("SIGTERM", async () => {
  await mongod.stop();
  process.exit(0);
});
