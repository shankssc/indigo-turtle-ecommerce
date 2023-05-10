const SERVER_URL_FINAL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001/api'
    : 'https://drab-pink-dalmatian-gear.cyclic.app/api';

const PRODUCTION_URL = 'https://drab-pink-dalmatian-gear.cyclic.app'
const SERVER_URL = 'http://localhost:3001/api'

export default {
    PRODUCTION_URL,
    SERVER_URL,
    SERVER_URL_FINAL
}
