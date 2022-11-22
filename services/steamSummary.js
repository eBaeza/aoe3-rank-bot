const axios = require("axios");
const defaultAvatar = 'https://storage.googleapis.com/aoe3-companion.appspot.com/public/flag_random_1x1.png'
const steamDefaultHash = 'fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb'


async function steamSummary(steamID) {
  try {
    const resp = await axios.get('http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/', {
      params: {
        key: process.env.STEAM_KEY,
        steamids: steamID
      }
    });
    if (!resp.data) return null
    const [user] = resp.data.response.players;
    if (!user) return { avatarfull: defaultAvatar }
    if (user.avatarhash === steamDefaultHash) return { ...user, avatarfull: defaultAvatar }
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
}

module.exports = {
  steamSummary
};
