import { Telegraf } from 'telegraf'
import { botToken, chatId, mongoDbUri } from './config'
import mongoose from 'mongoose'
import { Payment } from './models/Payment'
import { getBalances } from './services/paymentServices'

mongoose
  .connect(mongoDbUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('connected to mongodb'))
  .catch((error) => console.error(`MongoDB connection error. ${error}`))

const bot = new Telegraf(botToken)

const registeredChatFilter = Telegraf.filter(
  (ctx) => ctx.message?.chat.id === chatId
)
bot.use(registeredChatFilter)

bot.command('pay', (ctx) => {
  const { message } = ctx.update
  if (!message) return

  const { text, from } = message
  if (!(text && from)) return

  const rawAmount = text.replace('/pay', '').replace(',', '.').trim()
  const amount = Number(rawAmount)

  const username = from.first_name

  const payment = new Payment({ by: username, amount, date: new Date() })

  payment
    .save()
    .then(() => ctx.reply(`${username} pays ${amount}€`))
    .catch(() => ctx.reply('Sorry, what?'))
})

bot.command('balance', (ctx) => {
  Payment.find()
    .then(getBalances)
    .then((balances) => {
      const strings: string[] = []
      balances.forEach((amount, payer) => {
        strings.push(`<b>${payer}</b> ${amount.toFixed(2)}€`)
      })
      return strings.join(', ')
    })
    .then(ctx.replyWithHTML)
    .catch(() => ctx.reply('Upsi, daisy'))
})

bot.command('ping', (ctx) => {
  ctx.reply('pong')
})

bot.launch()

process.once('SIGINT', () => bot.stop())
process.once('SIGTERM', () => bot.stop())
