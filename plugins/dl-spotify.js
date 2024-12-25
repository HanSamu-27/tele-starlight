let axios = require('axios')
let handler = async (conn, text) => {
  if (!text) return conn.replyWithHTML(`🔖 <b>Ingresa la url de Spotify</b>`)
  let infoUrl = await SpotifyInfo(text)
  let dl_url = await Spotifydl(text)
  if (infoUrl && infoUrl.length > 0) {
    let track = infoUrl[0]
    let txt = `• 🔖 Nombre: ${track.name}\n`
    txt += `• 🔖 Artista: ${track.artist}\n`
    txt += `• 🔖 Álbum: ${track.album_name}\n`
    txt += `• 🔖 Publicado: ${track.releaseDate}\n`
    txt += `• 🔖 Url: ${text}`
    await conn.replyWithPhoto({ url: track.cover_url }, { caption: txt, parse_mode: 'HTML' })
    await conn.replyWithAudio({ url: dl_url })
  } else {
    await conn.replyWithHTML('🔖 Error: intente de nuevo')
  }
}
handler.command = ['spotifydl']
handler.limit = 2
module.exports = handler

async function SpotifyInfo(url) {
        try {
            let response = await fetch("https://spotydown.com/api/get-metadata", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ url: url})
            })

            if (!response.ok) {
            }

            let data = await response.json()
            return data.apiResponse.data
        } catch {
            return null
        }
    }

    async function Spotifydl(url) {
        try {
            let response = await fetch("https://spotydown.com/api/download-track", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ url: url })
            })

            if (!response.ok) {
            }

            let data = await response.json()
            return data.file_url
        } catch {
            return null
        }
    }

