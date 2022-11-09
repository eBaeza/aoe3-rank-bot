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
      config.params[`${field}`] = `ilike.%${searchValue}%`
    } else {
      config.params[`${field}`] = `ilike.%${searchValue}%`
    }
    config.params['order'] = `rank`
    const resp = await axios.get(url(modo), config);
    if (!resp) return null
/*TODO THE RESONPONSE NOW IS A LIST   
Searching for doribalam yields this result
[
  {
    "rank": 478,
    "elo": 1421,
    "name": "DoriBalam",
    "clan": "MUNDO",
    "region": 3,
    "steamId": 2533274882505213,
    "gameId": 5718291,
    "internalNum": 1324567,
    "wins": 649,
    "losses": 663,
    "drops": 4,
    "streak": 4,
    "lastOnline": "1668015539"
  }
]

*/
    //const players = JSONbig.parse(resp.data).documents;

    return resp;
  } catch (error) {
    console.log(error);
    return null;
  }
}

module.exports = leaderboarSvc;
