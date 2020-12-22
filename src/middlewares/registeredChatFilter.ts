import Telegraf from 'telegraf'

export default (...ids: number[]) => {
  return Telegraf.filter(
    (ctx) => ctx.chat !== undefined && ids.includes(ctx.chat.id)
  )
}
