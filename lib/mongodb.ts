import mongoose, { Mongoose } from "mongoose";

/**
 * Interface defining the structure of our cached Mongoose connection.
 */
interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

/**
 * Global extension to attach the Mongoose cache to globalThis.
 * This prevents re-connecting to MongoDB when Next.js hot-reloads during development.
 */
declare global {
  // Using var is required for declaring properties on the global object in TypeScript
  var mongooseCache: MongooseCache | undefined;
}

// Retrieve the existing cache from globalThis or initialize a new cache object.
const cached: MongooseCache = globalThis.mongooseCache ?? {
  conn: null,
  promise: null,
};

if (!globalThis.mongooseCache) {
  globalThis.mongooseCache = cached;
}

/**
 * Establishes a connection to MongoDB using Mongoose or returns the cached connection.
 * 
 * @returns {Promise<Mongoose>} The active Mongoose connection instance.
 */
export async function connectToDatabase(): Promise<Mongoose> {
  const MONGODB_URI: string = process.env.MONGODB_URI || "";

  if (!MONGODB_URI) {
    throw new Error(
      "Please define the MONGODB_URI environment variable inside .env"
    );
  }

  // Return the existing connection if it is already established.
  if (cached.conn) {
    return cached.conn;
  }

  // If a connection attempt is not already in progress, start connecting.
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error: unknown) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}
