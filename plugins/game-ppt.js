let handler = async (conn, text, prefix, command) => {
let user = conn.message.from.id
if (!['✊', '🖐️', '✌️'].includes(text)) return conn.replyWithHTML(`🥢 <b>Ingresa una opcion entre ✊, 🖐️, ✌️</b>`)
let ppt = ['✊', '🖐️', '✌️']
let settings = {
'✊': 'piedra',
'🖐️': 'papel',
'✌️': 'tijera'
}
let bot = ppt[Math.floor(Math.random() * ppt.length)]
if (text === bot) {
conn.replyWithHTML(`<b>Empate, Ambos eligieron ${settings[text]}</b>`)
} else if ((text === '✊' && bot === '✌️') || (text === '🖐️' && bot === '✊') || (text === '✌️' && bot === '🖐️')) {
global.DATABASE.users[user].limit += 10
conn.replyWithHTML(`🥳 G A N A S T E 🥳\n\n<b>🍟: Tú :</b> ${settings[text]}\n<b>🍟: Bot :</b> ${settings[bot]}\n\n<b>Has recibido 10 stars coins.</b>`)
} else {
conn.replyWithHTML(`🙁 P E R D I S T E 🙁\n\n<b>🍟: Tú :</b> ${settings[text]}\n<b>🍟: Bot :</b> ${settings[bot]}\n\n<b>No ganas nada</b>`)
}}
handler.command = ['juego']
module.exports = handler





