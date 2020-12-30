import { TelegrafContext } from 'telegraf/typings/context'
import formatAmount from '../services/formatAmountService'
import { getBalances } from '../services/paymentService'

export default async (ctx: TelegrafContext) => {
  const balances = await getBalances()
  ctx.reply(balances)
}
