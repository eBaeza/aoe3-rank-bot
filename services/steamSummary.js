const axios = require("axios");


async function avatarURL(steamID) {
  try {
    const resp = await axios.get('http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/', {
        params: {
            key: process.env.STEAM_KEY,
            steamids: steamID
        }
    });
    if (!resp.data) return null
    const [user] = resp.data.response.players;
    if (!user) return ''
    return user.avatarfull;
  } catch (error) {
    console.log(error);
    return null;
  }
}

module.exports = {
    avatarURL
};
