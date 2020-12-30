import { TelegrafContext } from 'telegraf/typings/context'
import { addPayment } from '../services/paymentService'

export default async (ctx: TelegrafContext) => {
  if (!(ctx.message?.text && ctx.from)) {
    return ctx.reply('🤷')
  }

  const text = ctx.message.text
  const from = ctx.from

  const amount = Number(text.replace('/pay', '').replace(',', '.').trim())
  const user = from.first_name

  const balances = await addPayment(user, amount)
  ctx.reply('👍\n'+balances)
}
