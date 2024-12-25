let axios = require('axios')

let handler = async (conn, text, prefix, command) => {
try {
if (!text) return conn.replyWithHTML(`🥢 <b>Ingrese la url de Likee</b>`)
let app = await axios.get(`https://apis-starlights-team.koyeb.app/starlight/like-downloader?url=${text}`, { headers: { 'Content-Type': 'application/json' }})
let title = app.data.caption
let mp4 = app.data.links['no watermark']
await conn.replyWithVideo({ url: mp4, caption: `${title}` }) 
} catch (error) {
}}
handler.command = ['likee', 'likeedl']
handler.limit = 2
module.exports = handler
