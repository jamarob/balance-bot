import { TelegrafContext } from 'telegraf/typings/context'
import { getBalances } from '../services/paymentServices'

export default async (ctx: TelegrafContext) => {
  const balances = await getBalances()
  if (!balances.size) {
    return ctx.reply('no payments')
  }
  const strings: string[] = []
  balances.forEach((amount, payer) => {
    strings.push(`${payer}: ${amount.toFixed(2)}€`)
  })
  ctx.reply(strings.join(', '))
}
