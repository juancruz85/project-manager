import { MongoClient } from "mongodb";

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let clientPromise: Promise<MongoClient> | undefined;

function createClientPromise(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error(
      "MONGODB_URI is not set. Add your MongoDB connection string to .env.local.",
    );
  }

  const client = new MongoClient(uri, {});
  return client.connect();
}

/**
 * Lazily creates (and in development, HMR-caches) the MongoClient connection.
 * Deferred so importing this module doesn't require MONGODB_URI to be set
 * until a request actually needs the database.
 */
export default function getMongoClientPromise(): Promise<MongoClient> {
  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      global._mongoClientPromise = createClientPromise().catch((error) => {
        global._mongoClientPromise = undefined;
        throw error;
      });
    }
    return global._mongoClientPromise;
  }

  if (!clientPromise) {
    clientPromise = createClientPromise().catch((error) => {
      clientPromise = undefined;
      throw error;
    });
  }
  return clientPromise;
}
