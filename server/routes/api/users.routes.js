const usersRouter = require('express').Router();
const { User } = require('../../db/models');
const verifyAccessToken = require('../../middleware/verifyAccessToken');

usersRouter.put('/:id', verifyAccessToken, async (req, res) => {
  const { id } = req.params;
  const { colorID } = req.body;

  if (!id || !colorID) {
    return res.status(400).json({ message: 'Invalid id or color' });
  }
  try {
    const user = await User.findOne({
      where: { id },
    });

    if (user) {
      await user.update({ colorID });
    }

    res.status(200).json({ message: 'user updated', user });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal server error' });
  }
});

usersRouter.get('/:id', verifyAccessToken, async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: 'Invalid id' });
  }
  try {
    const user = await User.findOne({
      where: { id },
    });
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
