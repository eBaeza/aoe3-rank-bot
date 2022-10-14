const axios = require("axios");
const JSONbig = require('json-bigint')

const url = (mode = '1') => `https://deck.aoe3explorer.com/v1/databases/leaderboards/collections/${mode}/documents`

const config = {
  headers: {
    'x-appwrite-project': process.env.APPWRITE_PROJECT,
    'x-appwrite-key': process.env.APPWRITE_KEY
  },
  params: {
    'queries[0]': 'search(name, (""))'
  },
  transformResponse: [data  => data]
};

async function leaderboarSvc(searchValue = '', mode) {
  try {
    config.url = url(mode)
    config.params['queries[0]'] = `search(name, ("${searchValue.trim()}"))`
    const resp = await axios.get(url(mode), config);
    if (!resp.data) return null
    const [stats] = JSONbig.parse(resp.data).documents;
    return stats;
  } catch (error) {
    console.log(error);
    return null;
  }
}

module.exports = leaderboarSvc;
