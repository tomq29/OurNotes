const pairsRouter = require('express').Router();
const { Op } = require('sequelize');
const { User, Pair } = require('../../db/models');
const verifyAccessToken = require('../../middleware/verifyAccessToken');
const { memberOf } = require('../../utils/access');

pairsRouter.use(verifyAccessToken);

pairsRouter.get('/users/search', async (req, res) => {
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

pairsRouter.post('/createRequest', async (req, res) => {
  try {
    const { id: firstUserID } = res.locals.user;
    const { secondUserLogin } = req.body;

    if (!secondUserLogin) {
      return res.status(400).json({ message: 'Invalid input' });
    }

    const secondUser = await User.findOne({ where: { login: secondUserLogin } });

    if (!secondUser) {
      return res.status(404).json({ message: 'Second user not found' });
    }

    if (secondUser.id === firstUserID) {
      return res.status(400).json({ message: 'Cannot pair with yourself' });
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

pairsRouter.get('/checkPair/:userID', async (req, res) => {
  try {
    const { id: userID } = res.locals.user;

    if (Number(req.params.userID) !== userID) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const pair = await Pair.findOne({ where: memberOf(userID) });

    if (pair) {
      return res.status(200).json({ message: 'you have pair', pair });
    }

    return res.status(200).json({ message: 'No request' });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal server error' });
  }
});

pairsRouter.put('/acceptRequest/:pairID', async (req, res) => {
  try {
    const pair = await Pair.findOne({
      where: { id: req.params.pairID, userTwoID: res.locals.user.id },
    });

    if (!pair) {
      return res.status(404).json({ message: 'Request not found' });
    }

    pair.status = 'active';
    await pair.save();

    res.status(200).json({ message: 'Request accept', status: 'active' });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal server error' });
  }
});

pairsRouter.delete('/rejectRequest/:pairID', async (req, res) => {
  try {
    const status = await Pair.destroy({
      where: { id: req.params.pairID, ...memberOf(res.locals.user.id) },
    });

    if (!status) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.status(200).json({ message: 'Request reject', status });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal server error' });
  }
});

module.exports = pairsRouter;
