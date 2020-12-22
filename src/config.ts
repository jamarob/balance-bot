import dotenv from 'dotenv'
dotenv.config()

if (process.env.BOT_TOKEN === undefined) {
  throw new Error('Bot token not found. Add BOT_TOKEN to .env')
}

if (process.env.CHAT_ID === undefined) {
  throw new Error('Chat id not found. Add CHAT_ID to .env')
}

if (process.env.MONGODB_URI === undefined) {
  throw new Error('MongoDB uri not found. Add MONGODB_URI to .env')
}
export const botToken = process.env.BOT_TOKEN
export const chatId = Number(process.env.CHAT_ID)
export const mongoDbUri = process.env.MONGODB_URI
