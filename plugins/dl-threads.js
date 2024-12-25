let axios = require('axios')
let handler = async (conn, text) => {
  if (!text) return conn.replyWithHTML(`🔖 <b>Ingresa la url de Threads</b>`)
  let dls = await axios.get(`https://apis-starlights-team.koyeb.app/starlight/threads-DL?url=${text}`)
  if (dls.data && dls.data.images) {
    for (let image of dls.data.images) {
      await conn.replyWithPhoto({ url: image })
    }
  }
  if (dls.data && dls.data.videos) {
    for (let video of dls.data.videos) {
      await conn.replyWithVideo({ url: video })
    }
  }
  if (!dls.data.images && !dls.data.videos) {
    await conn.replyWithHTML('🔖 Error: Intente de nuevo')
  }
}
handler.command = ['threadsdl']
handler.limit = 2
module.exports = handler
