let axios = require('axios')
let { URL } = require('url')

let handler = async (conn, text, prefix, command) => {
if (!/^https?:\/\//.test(text)) return conn.reply('Ingresa la url')
let url = new URL(text)
try {
let res = await axios.get(url.href, { responseType: 'arraybuffer', maxContentLength: 100 * 1024 * 1024, validateStatus: status => status >= 200 && status < 300 })
let tipo = res.headers['content-type']
if (!tipo) throw new Error('El servidor no devolvió un tipo de contenido.')     
if (tipo.includes('audio')) {
await conn.replyWithAudio({ source: res.data })
} else if (tipo.includes('video')) {
await conn.replyWithVideo({ source: res.data })
} else if (tipo.includes('image')) {
await conn.replyWithPhoto({ source: res.data })
} else if (tipo.includes('application/pdf') || tipo.includes('application/vnd.openxmlformats-officedocument')) {
await conn.replyWithDocument({ source: res.data })
} else {
let teste = res.data.toString('utf-8')
if (teste.length > 7000) {
await conn.telegram.sendDocument(conn.message.from.id, { source: Buffer.from(teste), filename: 'archivo.js' })
} else {
await conn.reply(teste)
}}
} catch (error) {
}}
handler.help = ['fetch', 'get'].map(v => v + ' <url>')
handler.tags = ['internet']
handler.command = ['fetch', 'get']
module.exports = handler
