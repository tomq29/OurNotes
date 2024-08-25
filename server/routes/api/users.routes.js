const usersRouter = require('express').Router();
const { User } = require('../../db/models');

usersRouter.put('/:id', async (req, res) => {
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

module.exports = usersRouter;