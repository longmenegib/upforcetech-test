import mongoose from 'mongoose'
import * as dotenv from 'dotenv'

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://gib:lL2oXxsuPxc45Z7W@test.tx02zbx.mongodb.net/?retryWrites=true&w=majority'

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env'
  )
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose
    })
  }
  cached.conn = await cached.promise
  console.log('connected to mongo')
  return cached.conn
}

export default dbConnect
