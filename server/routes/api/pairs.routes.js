const pairsRouter = require('express').Router();
const { Op } = require('sequelize');
const { User, Pair } = require('../../db/models');
const verifyAccessToken = require('../../middleware/verifyAccessToken');

pairsRouter.get('/users/search', verifyAccessToken, async (req, res) => {
  try {
    const login = req.query.targetLogin;

    const targetUsers = await User.findAll({
      where: {
        login: {
          [Op.like]: `%${login}%`,
        },
      },
      limit: 5,
    });

    const onlyLoginsArr = targetUsers.map((user) => user.login);

    res.status(200).json(onlyLoginsArr);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal server error' });
  }
});

pairsRouter.post('/createRequest', verifyAccessToken, async (req, res) => {
  try {
    const { firstUserID, secondUserLogin } = req.body;

    if (!firstUserID || !secondUserLogin) {
      return res.status(400).json({ message: 'Invalid input' });
    }

    const secondUser = (
      await User.findOne({
        where: { login: secondUserLogin },
      })
    ).get();

    if (!secondUser) {
      return res.status(404).json({ message: 'Second user not found' });
    }

    const pair = (
      await Pair.create({
        userOneID: firstUserID,
        userTwoID: secondUser.id,
        status: 'pending',
      })
    ).get();

    res.status(200).json({ message: 'Pair request created', pair });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal server error' });
  }
});

pairsRouter.get('/checkPair/:userID', verifyAccessToken, async (req, res) => {
  try {
    const { userID } = req.params;

    const pair = await Pair.findOne({
      where: {
        [Op.or]: [{ userTwoID: userID }, { userOneID: userID }],
      },
    });

    if (pair) {
      return res.status(200).json({ message: 'you have pair', pair });
    }

    return res.status(200).json({ message: 'No request' });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal server error' });
  }
});

pairsRouter.put(
  '/acceptRequest/:pairID',
  verifyAccessToken,
  async (req, res) => {
    try {
      const { pairID } = req.params;

      // const [updateStatus] = await Pair.update(
      //   { status: 'active' },
      //   { where: { id: pairID } }
      // );
      const pair = await Pair.findOne({ where: { id: pairID } });
      pair.status = 'active';
      await pair.save();

      res.status(200).json({ message: 'Request accept', status: 'active' });
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message || 'Internal server error' });
    }
  }
);

pairsRouter.delete(
  '/rejectRequest/:pairID',
  verifyAccessToken,
  async (req, res) => {
    try {
      const { pairID } = req.params;
      const status = await Pair.destroy({ where: { id: pairID } });

      res.status(200).json({ message: 'Request reject', status });
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message || 'Internal server error' });
    }
  }
);

module.exports = pairsRouter;
