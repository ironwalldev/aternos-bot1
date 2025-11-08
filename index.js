const mineflayer = require('mineflayer')

// === CONFIG ===
function createBot() {
  const bot = mineflayer.createBot({
    host: 'NoModsFree.aternos.me', // your server IP
    port: 51271,                   // your port
    username: 'NoModsFree',        // bot username
    version: '1.21.1'              // set your exact version
  })

  // === EVENTS ===

  bot.on('login', () => {
    console.log(`✅ Logged in as ${bot.username}`)
    bot.chat('✅ Bot is online and ready!')
  })

  bot.on('error', (err) => {
    console.log('❌ Error:', err)
  })

  bot.on('end', () => {
    console.log('⚠️ Disconnected! Reconnecting in 30 seconds...')
    setTimeout(createBot, 30000) // reconnect after 30s
  })

  bot.on('whisper', (username, message) => {
    console.log(`📩 ${username} whispered: ${message}`)
    if (message.startsWith('!say ')) {
      const toSay = message.slice(5)
      bot.chat(toSay)
      bot.whisper(username, `✅ Sent to public: ${toSay}`)
    } else {
      bot.whisper(username, '💬 Use !say <message> to send to chat.')
    }
  })

  bot.once('spawn', () => {
    console.log('🟢 Bot spawned successfully!')
    setInterval(() => bot.chat('🟢 Still alive!'), 600000) // 10min keep-alive
  })
}

createBot()
