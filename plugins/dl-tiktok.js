let axios = require('axios')

let handler = async (conn, text, prefix, command) => {
try {
 if (!text) return conn.replyWithHTML(`🍟 <b>Ingrese la url de TikTok</b>`)
let res = await axios.get(`https://apis-starlights-team.koyeb.app/starlight/tiktok?url=${encodeURIComponent(text)}`, { headers: { 'Content-Type': 'application/json' }})
let app = res.data
let title = app.title
let mp4 = app.nowm
await conn.replyWithVideo({ url: mp4, title: title }, { caption: `${title}` })
} catch (error) {
}}
handler.command = ['tiktok', 'tiktokdl']
handler.limit = 2
module.exports = handler
