import { botToken, chatId, mongoDbUri } from './config'
import * as mongooseService from './services/mongooseService'
import { Telegraf } from 'telegraf'
import registeredChatFilter from './middlewares/registeredChatFilter'
import handleError from './middlewares/handleError'
import statusCommand from './commands/statusCommand'
import payCommand from './commands/payCommand'
import balanceCommand from './commands/balanceCommand'

mongooseService.connect(mongoDbUri)

const bot = new Telegraf(botToken)

bot.use(registeredChatFilter(chatId))

bot.command('status', statusCommand)
bot.command('pay', payCommand)
bot.command('balance', balanceCommand)

bot.catch(handleError)

bot.launch()

process.once('SIGINT', () => bot.stop())
process.once('SIGTERM', () => bot.stop())
