import { TelegrafContext } from 'telegraf/typings/context'

export default (ctx: TelegrafContext) => {
  ctx.replyWithHTML('🤖 <i>I am alive and well</i>')
}
