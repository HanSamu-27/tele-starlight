const axios = require('axios')

let handler = async (conn, text, prefix, command) => {
  if (!text) return conn.replyWithHTML(`🥢 <b>Ingrese la url de YouTube</b>`)
  try {
    let result = await youtubedl(text)
    let { title, creator, thumbnail, duration, audio } = result
    let txt = `︶ִ︶ |𝆤 ★ </b>Youtube 𖹭 Music</b> ★ 𝆥| ‌︶ִ︶\n\n<b>꒰꒰ 🎋ᩙᩞ N𝗈𝗆𝖻𝗋𝖾 ꢁ</b> ${title}\n<b>꒰꒰ 🎋ᩙᩞ D𝗎𝗋𝖺𝖼𝗂𝗈𝗇 ꢁ</b> ${duration}\n<b>꒰꒰ 🎋ᩙᩞ U𝗋𝗅 ꢁ</b> ${text}`
    await conn.replyWithPhoto({ url: thumbnail }, { caption: txt, parse_mode: 'HTML' })
    await conn.replyWithAudio({ url: audio, filename: `${title}.mp3` })
  } catch (error) {
  }
}
handler.command = ['ytmp3', 'yta']
handler.limit = 2
module.exports = handler

async function youtubedl(url) {
  try {
    var server = await fetch(`https://cdn58.savetube.me/info?url=${url}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    })
    var dls = await server.json()
    var { thumbnail, durationLabel, title, titleSlug, url, key } = dls.data
    var server2 = await fetch(`https://cdn53.savetube.me/download/audio/128/${key}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    })
    var sph = await server2.json()
    var audio = sph.data.downloadUrl
    return {
      creator: "@Samush$_",
      title,
      title_slug: titleSlug,
      thumbnail,
      duration: durationLabel,
      link: url,
      audio
    }
  } catch (error) {
    return "://"
  }
}
