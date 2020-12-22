import { TelegrafContext } from 'telegraf/typings/context'
import { addPayment } from '../services/paymentServices'

export default async (ctx: TelegrafContext) => {
  if (!(ctx.message?.text && ctx.from)) {
    return ctx.reply('🤷')
  }

  const text = ctx.message.text
  const from = ctx.from

  const amount = Number(text.replace('/pay', '').replace(',', '.').trim())
  const user = from.first_name

  await addPayment(user, amount)
  ctx.reply('👍')
}
