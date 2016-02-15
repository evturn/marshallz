const marshall = require('./marshall');
const clang = require('./clang');
const borf = require('./borf');

function createBots(bots) {
  return bots.map(bot => bot);
}

module.exports = createBots([marshall, clang, borf]);