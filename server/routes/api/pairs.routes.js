const pairsRouter = require('express').Router();
const { Op } = require('sequelize');
const { User, Pair } = require('../../db/models');

pairsRouter.get('/users/search', async (req, res) => {
  try {
    const login = req.query.targerLogin;

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

pairsRouter.post('/createRequest', async (req, res) => {
  try {
    const { firstUserID, secondUserLogin } = req.body;

    const secondUser = await User.findOne({
      where: { login: secondUserLogin },
    });

    const pair = (
      await Pair.create({ userOneID: firstUserID, userTwoID: secondUser.id })
    ).get();

    res.status(200).json({ message: 'pair request created', pair });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal server error' });
  }
});

pairsRouter.put('/checkPair/:userID', async (req, res) => {
  try {
    const { userID } = req.params;

    const pair = await Pair.findOne({
      where: { userTwoID: userID, status: 'pending' },
    });

    if (pair) {
      return res.status(200).json({ message: 'you got one request', pair });
    }

    return res.status(200).json({ message: 'No request' });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal server error' });
  }
});

pairsRouter.put('/acceptRequest/:pairID', async (req, res) => {
  try {
    const { pairID } = req.params;

    const [updateStatus] = await Pair.update(
      { status: 'active' },
      { where: { id: pairID } }
    );

    res.status(200).json({ message: 'Request accept', status: 'active' });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal server error' });
  }
});

pairsRouter.delete('/rejectRequest/:pairID', async (req, res) => {
  try {
    const { pairID } = req.params;
    const status = await Pair.destroy({ where: { id: pairID } });

    res.status(200).json({ message: 'Request reject', status });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal server error' });
  }
});

module.exports = pairsRouter;