const { Op } = require('sequelize');
const { Pair } = require('../db/models');

const memberOf = (userID) => ({
  [Op.or]: [{ userOneID: userID }, { userTwoID: userID }],
});

async function isPairMember(pairID, userID) {
  if (!pairID) return false;
  const pair = await Pair.findOne({ where: { id: pairID, ...memberOf(userID) } });
  return Boolean(pair);
}

async function canAccessNote(note, userID) {
  return note.userID === userID || isPairMember(note.pairID, userID);
}

async function sharesPair(userID, otherID) {
  if (userID === otherID) return true;
  const pair = await Pair.findOne({
    where: {
      [Op.or]: [
        { userOneID: userID, userTwoID: otherID },
        { userOneID: otherID, userTwoID: userID },
      ],
    },
  });
  return Boolean(pair);
}

module.exports = { memberOf, isPairMember, canAccessNote, sharesPair };
