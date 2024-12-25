//11/20/24 <3 
//Por favor deja créditos si vas a usar este bot o coger cualquier comando
//By @Samush$_ && Sunnny❤️

const { Telegraf, Markup } = require('telegraf')
const yts = require('yt-search')
const fs = require('fs')
const chalk = require('chalk')
const path = require('path')
const axios = require('axios')
const ytdl = require('ytdl-core')
const stream = require('stream')
const os = require('os')
const { promisify } = require('util')
const moment = require('moment')
moment.locale('es')

const bot = new Telegraf('') 

global.DATABASE_FILE = 'database.json'
global.OWNER_NUMBER = '' 

global.loadDatabase = async function loadDatabase() {
if (!fs.existsSync(global.DATABASE_FILE)) {
fs.writeFileSync(global.DATABASE_FILE, JSON.stringify({
users: {}
}))
}
let data = fs.readFileSync(global.DATABASE_FILE, 'utf8')
global.DATABASE = JSON.parse(data)
for (let user in global.DATABASE.users) {
if (!global.DATABASE.users[user].limit) {
if (user !== global.OWNER_NUMBER.toString()) {
global.DATABASE.users[user].limit = 30
} else {
global.DATABASE.users[user].limit = Infinity
}}}
}

global.saveDatabase = async function saveDatabase() {
fs.writeFileSync(global.DATABASE_FILE, JSON.stringify(global.DATABASE, null, 2))
}
loadDatabase()


const users = {}

//Menu Persistente 
bot.telegram.setMyCommands([
{ command: 'ytmp3', description: 'descargar audios de youtube con link' },
{ command: 'tiktok', description: 'descargas videos de Tiktok con link' },
{ command: 'likee', description: 'descargas videos de Likee con link' },
{ command: 'spotifydl', description: 'descargas canciones de spotify con link' },
{ command: 'capcutdl', description: 'descargas videos de capcut con link' },
{ command: 'threadsdl', description: 'descargas videos de threads con link' },
{ command: 'instagram', description: 'descargas videos de Instagram con link' },
{ command: 'ifunny', description: 'descargas memes de ifunny con link' },
])

bot.start((conn) => { 
if (conn.from && conn.from.first_name) {
let keyboard = {
inline_keyboard: [
[{ text: 'Creador', url: 'https://wa.me/51910108980' }, { text: 'Canal', url: 'https://whatsapp.com/channel/0029VaBfsIwGk1FyaqFcK91S' }]
]
}
conn.replyWithAnimation({ url: 'https://telegra.ph/file/7bbfee9dacd0365e2e697.mp4' }, { caption: `ㅤㅤ       ⦙  ⃜ ꯭֟͝   ⃛⦙ ♡ ⦙  ⃜ ꯭֟͝   ⃛⦙ 🎀 ⦙  ⃜ ꯭֟͝   ⃛⦙ ♡ ⦙  ⃜ ꯭֟͝   ⃛⦙

      ⢫ • . • ⡝  WᥱꙆᥴoຕᥱ 🎀⃨ᩙStᥲɾꙆɩɠht Bot ৴৴
                       ✿᪶ᛌ    ᕼᥱꙆꙆo   ᷼  ᷼    ⪧̮
                   ꒰᷼🎀᳕͡꒱ ${conn.from.first_name}  ৲🥢৴

                    S͜u͜n͜n͜y͜✎S͜a͜m͜u͜s͜h͜`,
reply_markup: keyboard
})
} else {
}
})

const plugins = fs.readdirSync('./plugins')
bot.on('text', async (conn) => {
try {
let body = conn.message.text || conn.message.caption || ''
let isCmd = /^[°•π÷×¶∆£¢€¥®™�✓_=|~!?#/$%^&.+-,\\\©^]/.test(body)
let prefix = isCmd ? body[0] : ''
let cmd = isCmd ? body.slice(1).trim().split(' ')[0].toLowerCase() : ''
let text = isCmd ? body.slice(1).trim().split(' ').slice(1).join(' ') : body.trim()
let user = conn.from.id.toString()
if (!global.DATABASE.users[user]) {
global.DATABASE.users[user] = { limit: user === global.OWNER_NUMBER ? Infinity : 30, message: [] }
}
let message = { text: body, fecha: moment().format('LLLL'), id: conn.chat.id, isCommand: isCmd, command: cmd }
global.DATABASE.users[user].message.push(message)
saveToDatabase()
let isGroup = conn.chat.type.includes('group')
let groupName = isGroup ? conn.chat.title : 'Privado'
console.log(chalk.black(chalk.bgGreen('[ MENSAJE ]')), chalk.black(chalk.bgWhite(moment().format('LLLL'))), chalk.black(chalk.bgGreen(body)) + '\n' + chalk.blue('=> De'), chalk.white(conn.from.first_name) + '\n' + chalk.blue('=> En'), chalk.white(isGroup ? groupName : 'Privado') + '\n' + chalk.blue('=> ID') + chalk.white('', conn.chat.id))
plugins.forEach(filename => {
if (filename.endsWith('.js')) {
let handler = require(`./plugins/${filename}`)
if (Array.isArray(handler.command) && handler.command.includes(cmd)) {
try {
handler(conn, text, prefix, cmd)
if (handler.limit && text.length > 0) {
if (global.DATABASE.users[user].limit >= handler.limit) {
if (user !== global.OWNER_NUMBER) {
global.DATABASE.users[user].limit -= handler.limit
conn.replyWithHTML(`<b>Se usaron ${handler.limit} stars coins 🪙</b>`)
saveToDatabase()
}} else {
conn.replyWithHTML(`<b>🪙 No tienes suficientes stars coins</b>`)
}}} catch (error) {
conn.replyWithHTML(`🚩 Error no se ejecuto: ${cmd}`)
}}}})
} catch (error) {
}})
function saveToDatabase() {
fs.writeFileSync('database.json', JSON.stringify(global.DATABASE, null, 2))
}
bot.catch((err, conn) => {
console.error(`Error en : ${conn.updateType}`, err)
})

function streamPipeline(readable, writable) {
return new Promise((resolve, reject) => {
readable.on('error', (err) => reject(err))
writable.on('error', (err) => reject(err))
writable.on('finish', () => resolve())
readable.pipe(writable)
})
}

bot.telegram.getMe().then((getme) => {
console.log(chalk.red(`\n\n[ • S T A R L I G H T - B O T • ]`))
console.log(chalk.red(`< ============================ >`))
console.log(chalk.red(`[•]`), chalk.white(`Usuario : ${getme.username}`))
console.log(chalk.red(`[•]`), chalk.white(`ID: ${getme.id}`))
console.log(chalk.red(`[•]`), chalk.white(`Creador : https://t.me/Samu_666`))
console.log(chalk.red(`[•]`), chalk.white(`Link : https://t.me/${getme.username}`))
console.log(chalk.red(`< ============================= >\n`))
})
 
plugins.forEach(filename => {
if (filename.endsWith('.js')) {
let plugs = path.basename(filename)
setTimeout(() => {
console.log(chalk.green(`${plugs}`))
}, 500)
}
})
bot.launch()








