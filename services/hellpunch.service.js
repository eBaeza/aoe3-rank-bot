const axios = require("axios");
const JSONbig = require('json-bigint')

const url = (mode = '1vs1') => `https://decks.aoe3explorer.com/v1/${mode}`

const config = {
  headers: {
    'apikey': process.env.API_KEY,
  },
  params: {},
  transformResponse: [data  => data]
};

async function leaderboarSvc(searchValue = '', { modo = '1vs1', field = 'name', searchPlayer = false }) {
  try {
    config.url = url(modo)
    config.params['select'] = `*`
    if (searchPlayer) {
      config.params[`search(${field}`] = `ilike.%${searchValue}%")`
    } else {
      config.params[`search(${field}`] = `ilike.%${searchValue}%"))`
    }
    config.params['order'] = `rank`
    const resp = await axios.get(url(modo), config);
    if (!resp.data) return null
    const players = JSONbig.parse(resp.data).documents;
    return players;
  } catch (error) {
    console.log(error);
    return null;
  }
}

module.exports = leaderboarSvc;
