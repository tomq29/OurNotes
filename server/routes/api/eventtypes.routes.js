const eventTypesRouter = require('express').Router();
const { EventType } = require('../../db/models');
const verifyAccessToken = require('../../middleware/verifyAccessToken');

eventTypesRouter.get('/', verifyAccessToken, async (req, res) => {
  try {
    const eventTypes = await EventType.findAll();
    if (eventTypes.length) {
      res.status(200).json({ message: 'success', eventTypes });
    } else {
      res.status(404).json({ message: 'eventTypes not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal server error' });
  }
});

eventTypesRouter.get('/:id', verifyAccessToken, async (req, res) => {
  try {
    const eventType = await EventType.findOne({
      where: { id: req.params.id },
    });
    if (eventType) {
      res.status(200).json({ message: 'success', eventType });
    } else {
      res.status(404).json({ message: 'even type not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal server error' });
  }
});

module.exports = eventTypesRouter;
