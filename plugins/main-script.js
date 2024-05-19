import { promises } from 'fs';
import { join } from 'path';
import axios from 'axios'; 

let handler = async function (m, { conn, __dirname }) {
  const githubRepoURL = 'https://instagram.com/__sks_bot__';

  try {
  
    const [, username, repoName] = githubRepoURL.match(/github\.com\/([^/]+)\/([^/]+)/);

    const response = await axios.get(`https://api.github.com/repos/${username}/${repoName}`);

    if (response.status === 200) {
      const repoData = response.data;

      // Format the repository information with emojis
      const formattedInfo = `
╭⭑⭑⭑★✪ *ꪶ٭𝑺𝜥𝑺 𝐵𝜣𝑆𝑆٭ꫂ* ✪★⭑⭑⭑
│ 📂 *BOT Name:* _${repoData.name}_
│ 📝 *Description:* _${repoData.description}_
│ 👤 *Owner:* SY4M
│ ⭐ *Stars:* _${repoData.stargazers_count}_
│ 🍴 *Forks:* _${repoData.forks_count}_
│ 🌐 *URL:* ${repoData.html_url}
╰━━━━━━━━━━━━━━━━━╯
      `.trim();

      // Send the formatted information as a message
      await conn.relayMessage(m.chat,  {
        requestPaymentMessage: {
          currencyCodeIso4217: 'INR',
          amount1000: 99999,
          requestFrom: m.sender,
          noteMessage: {
          extendedTextMessage: {
          text: formattedInfo,
          contextInfo: {
          externalAdReply: {
          showAdAttribution: true
          }}}}}}, {})
    } else {
      // Handle the case where the API request fails
      await conn.reply(m.chat, 'Unable to fetch repository information.', m);
    }
  } catch (error) {
    console.error(error);
    await conn.reply(m.chat, 'An error occurred while fetching repository information.', m);
  }
};

handler.help = ['script'];
handler.tags = ['main'];
handler.command = ['sc', 'repo', 'script'];

export default handler;
