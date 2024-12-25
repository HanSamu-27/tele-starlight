let axios = require('axios')

async function CapCutDl(link) {
  try {
    let response = await axios.post('https://vidburner.com/wp-json/aio-dl/video-data/', {
      url: link,
      format: 'mp4'
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://vidburner.com'
      }
    })

    let info = response.data
    let video = info.medias[0]?.url
    return video ? { video } : null
  } catch (error) {
    console.error(error)
    return null
  }
}

let handler = async (conn, text) => {
  if (!text) return conn.replyWithHTML(`🔖 <b>Ingresa la URL de CapCut</b>`)
  let dls = await CapCutDl(text)
  if (dls && dls.video) {
    await conn.replyWithVideo({ url: dls.video })
  } else {
    await conn.replyWithHTML('🔖 No se pudo descargar el video de capcut')
  }
}
handler.command = ['capcutdl']
handler.limit = 2
module.exports = handler
