const jwtConfig = require('../../config/jwtConfig');
const verifyRefreshToken = require('../../middleware/verifyRefreshToken');
const generateTokens = require('../../utils/generateToken');

const tokenRouter = require('express').Router();

tokenRouter.get('/refresh', verifyRefreshToken, (req, res) => {
  try {
    const { user } = res.locals;

    const { refreshToken, accessToken } = generateTokens({ user });

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
