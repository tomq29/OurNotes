const eventTypesRouter = require('express').Router();
const { EventType } = require('../../db/models');

eventTypesRouter.get('/', async (req, res) => {
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

module.exports = eventTypesRouter;
