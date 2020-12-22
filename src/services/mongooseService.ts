import mongoose from 'mongoose'

export const connect = (mongoDbUri: string) =>
  mongoose
    .connect(mongoDbUri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log('connected to mongodb'))
    .catch((error) => console.error(`MongoDB connection error. ${error}`))
