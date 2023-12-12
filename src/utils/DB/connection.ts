import mongoose, { connect } from "mongoose";
require('dotenv/config');

const DB_CONNECTION = process.env.DB_CONNECTION ?? 'Not Connect';

export const connectMeMongoDB = async () => {
  try {
    mongoose.set('strictQuery', false);
    await connect(DB_CONNECTION);
    console.log('db connected you can start storing data');
  } catch (err) {
    console.log(err);
    throw err;
  }
};
