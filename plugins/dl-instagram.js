let axios = require('axios')

let handler = async (conn, text, prefix, command) => {
  try {
    if (!text) return conn.replyWithHTML(`🔖 <b>Ingresa la URL de Instagram</b>`)
    let api = await axios.post('https://api.downloadgram.app/media', `url=${text}`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    let data = api.data
    if (data) {
      let matches = data.match(/"([^"]*\.downloadgram.app[^"]*)"/g)
      if (matches && matches.length > 0) {
        for (let match of matches) {
          let dl_url = match.replace(/^"|"$/g, '').replace(/\\$/, '')
          await conn.replyWithVideo({ url: dl_url })
        }
      } 
    }
  } catch (error) {
 }}
handler.command = ['ig', 'instagram']
handler.limit = 2

module.exports = handler
