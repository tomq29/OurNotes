const jwtConfig = require('../../config/jwtConfig');
const bcrypt = require('bcrypt');
const generateTokens = require('../../utils/generateToken');

/////////////
const { User } = require('../../db/models'); // Change here your Model and in your code
/////////////

const authRouter = require('express').Router();

authRouter.post('/reg', async (req, res) => {
  try {
    const { login, email, password, colorID } = req.body;

    if (login.trim() === '' || email.trim() === '' || password.trim() === '') {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const userInDB = await User.findOne({ where: { email } });

    if (userInDB) {
      return res.status(400).json({ message: 'Email is already in use' });
    }

    const user = (
      await User.create({
        login,
        email,
        password: await bcrypt.hash(password, 10),
        colorID,
      })
    ).get();

    delete user.password;

    const { refreshToken, accessToken } = generateTokens({ user });

    res
      .cookie(jwtConfig.refresh.type, refreshToken, {
        httpOnly: true,
        maxAge: jwtConfig.refresh.expiresIn,
      })
      .json({ message: 'you redigstred!', user, accessToken });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal server error' });
  }
});

authRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email.trim() === '' || password.trim() === '') {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const userInDB = await User.findOne({ where: { email } });

    if (!userInDB) {
      return res.status(400).json({ message: 'User not found' });
    }

    const user = userInDB.get();

    const passDB = user.password;
    const isValid = await bcrypt.compare(password, passDB);

    if (!isValid) {
      return res.status(400).json({ message: 'Incorrect password' });
    }

    delete user.password;

    const { refreshToken, accessToken } = generateTokens({ user });

    res
      .cookie(jwtConfig.refresh.type, refreshToken, {
        httpOnly: true,
        maxAge: jwtConfig.refresh.expiresIn,
      })
      .json({ message: 'you loggin', user, accessToken });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal server error' });
  }
});

authRouter.delete('/logout', async (req, res) => {
  try {
    res.clearCookie(jwtConfig.refresh.type).json({
      user: undefined,
      accessToken: '',
      message: 'You have logged out successfully! Bye!',
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal server error' });
  }
});

module.exports = authRouter;
