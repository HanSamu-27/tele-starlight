let axios = require('axios')

let handler = async (conn, text, prefix, command) => {
try {
if (!text) return conn.replyWithHTML(`🔖 <b>Ingrese la url de Ifunny</b>`)
let app = await axios.get(`https://apis-starlights-team.koyeb.app/starlight/Ifunny-dl?text=${text}`, { headers: { 'Content-Type': 'application/json' }})
if (app.data.video) {
let mp4 = app.data.video.url
await conn.replyWithVideo({ url: mp4 })
} else if (app.data.image) {
let jpg = app.data.image.url
await conn.replyWithPhoto({ url: jpg })
} else {
return conn.replyWithHTML(`://`)
}} catch (error) {
}}
handler.command = ['ifunny', 'ifunnydl']
handler.limit = 2
module.exports = handler
