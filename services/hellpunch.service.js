const axios = require("axios");
const JSONbig = require('json-bigint')

const url = (mode = '1') => `https://deck.aoe3explorer.com/v1/databases/leaderboards/collections/${mode}/documents`

const config = {
  headers: {
    'x-appwrite-project': process.env.APPWRITE_PROJECT,
    'x-appwrite-key': process.env.APPWRITE_KEY
  },
  params: {},
  transformResponse: [data  => data]
};

async function leaderboarSvc(searchValue = '', { modo = '1', field = 'name', searchPlayer = false }) {
  try {
    config.url = url(modo)
    if (searchPlayer) {
      config.params['queries[0]'] = `search(${field}, "${searchValue.trim()}")`
    } else {
      config.params['queries[0]'] = `search(${field}, ("${searchValue.trim()}"))`
    }
    config.params['queries[1]'] = `orderDesc("elo")`
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
