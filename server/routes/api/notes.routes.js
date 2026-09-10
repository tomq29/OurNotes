const notesRouter = require('express').Router();
const { Op } = require('sequelize');
const { Note, Pair } = require('../../db/models');
const verifyAccessToken = require('../../middleware/verifyAccessToken');
const { memberOf, isPairMember, canAccessNote } = require('../../utils/access');

notesRouter.use(verifyAccessToken);

async function findAccessibleNote(id, userID) {
  const note = await Note.findByPk(id);
  if (!note || !(await canAccessNote(note, userID))) return null;
  return note;
}

notesRouter.post('/', async (req, res) => {
  try {
    const { id: userID } = res.locals.user;
    const { title, description, folderID, pairID, content } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).json('Empty field exists');
    }

    if (pairID && !(await isPairMember(pairID, userID))) {
      return res.status(403).json({ err: 'Not a member of this pair' });
    }

    const data = (
      await Note.create({ title, description, userID, folderID, pairID, content })
    ).get();

    res.status(201).json(data);
  } catch ({ message }) {
    res.status(500).json({ err: message });
  }
});

notesRouter.get('/:userID', async (req, res) => {
  try {
    const { id: userID } = res.locals.user;

    if (Number(req.params.userID) !== userID) {
      return res.status(403).json({ err: 'Forbidden' });
    }

    const userPair = await Pair.findOne({ where: memberOf(userID) });
    const where = userPair
      ? { [Op.or]: [{ userID }, { pairID: userPair.id }] }
      : { userID };

    const notes = await Note.findAll({ where, order: [['id', 'DESC']] });

    res.status(200).json(notes);
  } catch ({ message }) {
    res.status(500).json({ err: message });
  }
});

notesRouter
  .route('/note/:id')
  .get(async (req, res) => {
    try {
      const note = await findAccessibleNote(req.params.id, res.locals.user.id);
      if (!note) {
        return res.status(404).json({ error: 'Note not found' });
      }
      res.json(note);
    } catch ({ message }) {
      res.status(500).json({ err: message });
    }
  })
  .put(async (req, res) => {
    try {
      const { id } = req.params;
      const note = await findAccessibleNote(id, res.locals.user.id);
      if (!note) {
        return res.status(404).json({ error: 'Note not found' });
      }

      const { title, description, folderID, content } = req.body;
      const updatedNote = await note.update({ title, description, folderID, content });

      res.json({ updateStatus: 1, id: Number(id), updatedNote });
    } catch ({ message }) {
      res.status(500).json({ err: message });
    }
  })
  .delete(async (req, res) => {
    try {
      const { id } = req.params;
      const note = await findAccessibleNote(id, res.locals.user.id);
      if (!note) {
        return res.status(404).json({ error: 'Note not found' });
      }

      await note.destroy();
      res.json({ id: Number(id) });
    } catch ({ message }) {
      res.status(500).json({ err: message });
    }
  });

module.exports = notesRouter;
