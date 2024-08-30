const colorsRouter = require('express').Router();
const { Color } = require('../../db/models');

colorsRouter.get('/', async (req, res) => {
  try {
    const colors = await Color.findAll();

    res.status(200).json(colors);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal server error' });
  }
});

module.exports = colorsRouter;
