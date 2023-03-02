import mongoose from "mongoose"
import { config } from "dotenv"

config()

const DATABASE_URI = process.env.DATABASE_URI as string

const initDB = async () => {
  try {
    await mongoose.connect(DATABASE_URI)
  } catch (ex) {
    console.log(ex)
    throw ex
  }
}

export default initDB