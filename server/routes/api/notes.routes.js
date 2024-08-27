const notesRouter = require('express').Router();
const { Op } = require('sequelize');

/////////////
const { Note, Text, Pair } = require('../../db/models'); // Change here your Model
/////////////

// verifyAccessToken Использовать перед POST DELETE PUT
const verifyAccessToken = require('../../middleware/verifyAccessToken');

/////////////

// AKA CRUD routes.js

notesRouter
  .route('/')

  .get(async (req, res) => {
    try {
      const notes = await Note.findAll({ order: [['id', 'DESC']] });

      res.status(200).json(notes);
    } catch ({ message }) {
      res.status(500).json({ err: message });
    }
  })

  .post(async (req, res) => {
    try {
      const { title, description, userID, folderID, pairID, content } =
        req.body;

      if (title.trim() === '' || !userID) {
        return res.status(400).json('Empty field exists');
      }

      const data = (
        await Note.create({
          title,
          description,
          userID,
          folderID,
          pairID,
          content,
          
        })
      ).get();

      res.status(201).json(data);
    } catch ({ message }) {
      res.status(500).json({ err: message });
    }
  });

notesRouter
  .route('/:userID')

  .get(async (req, res) => {
    try {
      const { userID } = req.params;

      const userPair = await Pair.findOne({
        where: {
          [Op.or]: [{ userOneID: userID }, { userTwoID: userID }],
        },
      });

      let notes;
      if (userPair) {
        notes = await Note.findAll({
          where: {
            [Op.or]: [{ userID }, { pairID: userPair.id }],
          },
          order: [['id', 'DESC']],
        });
      } else {
        notes = await Note.findAll({
          where: { userID },
          order: [['id', 'DESC']],
        });
      }

      res.status(200).json(notes);
    } catch ({ message }) {
      res.status(500).json({ err: message });
    }
  });

notesRouter
  .route('/note/:id')
  .get(async (req, res) => {
    try {
      const note = await Note.findByPk(req.params.id);
      if (note) {
        res.json(note);
      } else {
        res.status(404).json({ error: 'Note not found' });
      }
    } catch ({ message }) {
      res.status(500).json({ err: message });
    }
  })
  .put(async (req, res) => {
    try {
      const { id } = req.params;

      const { title, description, folderID, userID, content } = req.body;

      const [updateStatus] = await Note.update(
        { title, description, folderID, userID, content },
        { where: { id } }
      );

      const updatedNote = await Note.findByPk(id);

      res.json({ updateStatus, id: Number(id), updatedNote });
    } catch ({ message }) {
      res.status(500).json({ err: message });
    }
  })

  .delete(async (req, res) => {
    try {
      const { id } = req.params;
      const note = await Note.findByPk(id);
      if (note) {
        await note.destroy();
        return res.status(204).json({ id: Number(id) });
      } else {
        return res.status(404).json({ error: 'Note not found' });
      }
    } catch ({ message }) {
      res.status(500).json({ err: message });
    }
  });

module.exports = notesRouter;
