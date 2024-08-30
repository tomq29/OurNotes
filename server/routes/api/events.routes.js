const eventsRouter = require('express').Router();
const { Event } = require('../../db/models');
const verifyAccessToken = require('../../middleware/verifyAccessToken');

eventsRouter.get('/pairs/:pairID', async (req, res) => {
  try {
    const { pairID } = req.params;
    const events = await Event.findAll({ where: { pairID } });
    if (!events) {
      return res.status(404).json({ message: 'events not found' });
    }
    res.status(200).json({ message: 'success', events });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal server error' });
  }
});
eventsRouter.get('/:eventID', async (req, res) => {
  try {
    const { eventID } = req.params;
    const events = await Event.findAll({
      where: { id: eventID },
    });

    res.status(200).json({ message: 'success', events });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal server error' });
  }
});

eventsRouter.put('/:eventID', verifyAccessToken, async (req, res) => {
  try {
    const { eventID } = req.params;
    const { title, description, start, end, allDay, eventTypeID } = req.body;
    if (!title || !description || !start || !end || !eventTypeID) {
      return res.status(400).json({ message: 'Invalid input' });
    }
    const event = await Event.findOne({
      where: { id: eventID },
    });
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    await event.update({ title, description, start, end, allDay, eventTypeID });
    res.status(200).json({ message: 'event updated', event });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal server error' });
  }
});

eventsRouter.delete('/:eventID', verifyAccessToken, async (req, res) => {
  try {
    const { eventID } = req.params;
    const event = await Event.findOne({
      where: { id: eventID },
    });
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    await event.destroy();
    res.status(200).json({ message: 'event deleted', eventID: eventID });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal server error' });
  }
});

eventsRouter.post('/', verifyAccessToken, async (req, res) => {
  try {
    const { title, description, start, end, allDay, pairID, eventTypeID } =
      req.body;
    if (!title || !description || !start || !end || !pairID || !eventTypeID) {
      return res.status(400).json({ message: 'Invalid input' });
    }
    const event = await Event.create({
      title,
      description,
      start,
      end,
      allDay,
      pairID,
      eventTypeID,
    });
    res.status(200).json({ message: 'success', event });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal server error' });
  }
});

module.exports = eventsRouter;
