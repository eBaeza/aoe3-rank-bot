const axios = require("axios");
const JSONbig = require('json-bigint')

const config = {
  headers: {
    'apikey': process.env.API_KEY,
  },
  params: {},
  transformResponse: [data  => data]
};

async function leaderboarSvc(searchValue = '', { modo = '1vs1', field = 'name' }) {
  try {
    const url = `${process.env.SERVICE_URL}${modo}`
    config.params['select'] = `*`
    config.params[`${field}`] = `ilike.%${searchValue}%`
    config.params['order'] = `rank`
    
    const resp = await axios.get(url, config);
    
    if (!resp.data) return null

    const players = JSONbig.parse(resp.data);

    return players;
  } catch (error) {
    console.log(error);
    return null;
  }
}

module.exports = leaderboarSvc;
