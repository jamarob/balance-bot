import { TelegrafContext } from 'telegraf/typings/context'

export default (error: Error, ctx: TelegrafContext) => {
  ctx.reply('Oops 🤷')
  console.log(error)
}
