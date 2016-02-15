const marshall = require('./marshall');
const clang = require('./clang');
const borf = require('./borf');

function createBots(bots) {
  bots.forEach(bot => bot);
}

module.exports = createBots([marshall, clang, borf]);