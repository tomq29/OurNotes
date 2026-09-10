const eventsRouter = require('express').Router();
const { Event } = require('../../db/models');
const verifyAccessToken = require('../../middleware/verifyAccessToken');
const { isPairMember } = require('../../utils/access');

eventsRouter.use(verifyAccessToken);

async function findAccessibleEvent(id, userID) {
  const event = await Event.findByPk(id);
  if (!event || !(await isPairMember(event.pairID, userID))) return null;
  return event;
}

eventsRouter.get('/pairs/:pairID', async (req, res) => {
  try {
    const { pairID } = req.params;
    if (!(await isPairMember(pairID, res.locals.user.id))) {
      return res.status(403).json({ message: 'Not a member of this pair' });
    }
    const events = await Event.findAll({ where: { pairID } });
    res.status(200).json({ message: 'success', events });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal server error' });
  }
});

eventsRouter.get('/:eventID', async (req, res) => {
  try {
    const event = await findAccessibleEvent(req.params.eventID, res.locals.user.id);
    res.status(200).json({ message: 'success', events: event ? [event] : [] });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal server error' });
  }
});

eventsRouter.put('/:eventID', async (req, res) => {
  try {
    const { title, description, start, end, allDay, eventTypeID } = req.body;
    if (!title || !description || !start || !end || !eventTypeID) {
      return res.status(400).json({ message: 'Invalid input' });
    }
    const event = await findAccessibleEvent(req.params.eventID, res.locals.user.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    await event.update({ title, description, start, end, allDay, eventTypeID });
    res.status(200).json({ message: 'event updated', event });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal server error' });
  }
});

eventsRouter.delete('/:eventID', async (req, res) => {
  try {
    const { eventID } = req.params;
    const event = await findAccessibleEvent(eventID, res.locals.user.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    await event.destroy();
    res.status(200).json({ message: 'event deleted', eventID });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal server error' });
  }
});

eventsRouter.post('/', async (req, res) => {
  try {
    const { title, description, start, end, allDay, pairID, eventTypeID } =
      req.body;
    if (!title || !description || !start || !end || !pairID || !eventTypeID) {
      return res.status(400).json({ message: 'Invalid input' });
    }
    if (!(await isPairMember(pairID, res.locals.user.id))) {
      return res.status(403).json({ message: 'Not a member of this pair' });
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
