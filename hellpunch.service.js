const axios = require("axios");

const url = (mode = '1') => `https://deck.aoe3explorer.com/v1/databases/leaderboards/collections/${mode}/documents`

const config = {
  method: 'get',
  url: url(),
  headers: {
    'x-appwrite-project': process.env.APPWRITE_PROJECT,
    'x-appwrite-key': process.env.APPWRITE_KEY
  },
  params: {
    'queries[0]': 'search(name, (""))'
  }
};

async function leaderboarSvc(searchValue = '', mode, paramMode) {
  try {
    config.url = url(mode)
    if (paramMode === 'find') {
      config.params['queries[0]'] = `equal(name, ${searchValue})`;
    }
    else if (paramMode === 'search') {
      config.params['queries[0]'] = `search(name, ${searchValue})`;
    }
    else{
      config.params['queries[0]'] = `equal(clan, ${searchValue})`;
    }
    const resp = await axios(config);
    if (!resp.data) return null
    const stats = resp.data.documents;
    return stats;
  } catch (error) {
    console.log(error);
    return null;
  }
}

module.exports = leaderboarSvc;
