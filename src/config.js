const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  lookupData: process.env.LOOKUP_ENDPOINT
};