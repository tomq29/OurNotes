const jwtConfig = require('../../config/jwtConfig');
const verifyRefreshToken = require('../../middleware/verifyRefreshToken');
const generateTokens = require('../../utils/generateToken');
const { Pair } = require('../../db/models');
const { Op } = require('sequelize');

const tokenRouter = require('express').Router();

tokenRouter.get('/refresh', verifyRefreshToken, async (req, res) => {
  try {
    const { user } = res.locals;

    const { refreshToken, accessToken } = generateTokens({ user });

    const userPair = await Pair.findOne({
      where: {
        [Op.or]: [{ userOneID: user.id }, { userTwoID: user.id }],
      },
    });

    if (userPair) {
      return res
        .cookie(jwtConfig.refresh.type, refreshToken, {
          httpOnly: true,
          maxAge: jwtConfig.refresh.expiresIn,
        })
        .json({ user, accessToken, userPair });
    }

    res
      .cookie(jwtConfig.refresh.type, refreshToken, {
        httpOnly: true,
        maxAge: jwtConfig.refresh.expiresIn,
      })
      .json({ user, accessToken });
  } catch ({ message }) {
    res.status(500).json({ err: message });
  }
});

module.exports = tokenRouter;
