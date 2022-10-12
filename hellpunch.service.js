const axios = require("axios");

const url = (mode = '1') => `https://deck.aoe3explorer.com/v1/databases/630dcc555bf18d391d5a/collections/${mode}/documents`

const config = {
  method: 'get',
  url: url(),
  headers: {
    'x-appwrite-project': process.env.APPWRITE_PROJECT,
    'x-appwrite-key': process.env.APPWRITE_KEY
  },
  params: {
    'queries[0]': 'search("name", "")'
  }
};

async function leaderboarSvc(searchValue = '', mode) {
  try {
    config.url = url(mode)
    config.params['queries[0]'] = `search('name', '${searchValue.trim()}')`
    const resp = await axios(config);
    if (!resp.data) return null
    const [stats] = resp.data.documents;
    return stats;
  } catch (error) {
    console.log(error);
    return null;
  }
}

module.exports = leaderboarSvc;
