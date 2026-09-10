const usersRouter = require('express').Router();
const { User } = require('../../db/models');
const verifyAccessToken = require('../../middleware/verifyAccessToken');
const { sharesPair } = require('../../utils/access');

const publicAttributes = { exclude: ['password'] };

usersRouter.use(verifyAccessToken);

usersRouter.put('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const { colorID } = req.body;

  if (!id || !colorID) {
    return res.status(400).json({ message: 'Invalid id or color' });
  }
  if (id !== res.locals.user.id) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  try {
    const user = await User.findByPk(id, { attributes: publicAttributes });

    if (user) {
      await user.update({ colorID });
    }

    res.status(200).json({ message: 'user updated', user });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal server error' });
  }
});

usersRouter.get('/:id', async (req, res) => {
  const id = Number(req.params.id);

  if (!id) {
    return res.status(400).json({ message: 'Invalid id' });
  }
  try {
    const user = (await sharesPair(res.locals.user.id, id))
      ? await User.findByPk(id, { attributes: publicAttributes })
      : null;

    if (user) {
      res.status(200).json({ message: 'user found', user });
    } else {
      res.status(404).json({ message: 'user not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal server error' });
  }
});

module.exports = usersRouter;
