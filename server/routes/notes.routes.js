const notesRouter = require('express').Router();
const { Op } = require('sequelize');

/////////////
const { Note, Text } = require('../db/models'); // Change here your Model
/////////////

// verifyAccessToken Использовать перед POST DELETE PUT
const verifyAccessToken = require('../middleware/verifyAccessToken');

/////////////

// AKA CRUD routes.js

notesRouter
  .route('/')

  .get(async (req, res) => {
    try {
      const notes = await Note.findAll({ order: [['id', 'ASC']] });

      res.status(200).json(notes);
    } catch ({ message }) {
      res.status(500).json({ err: message });
    }
  })

  .post(async (req, res) => {
    try {
      const { title, description, userID, folderID } = req.body;

      if (title.trim() === '' || !userID) {
        return res.status(400).json('Empty field exists');
      }

      const data = (
        await Note.create({ title, description, userID, folderID })
      ).get();

      res.json(data);
    } catch ({ message }) {
      res.status(500).json({ err: message });
    }
  });

notesRouter
  .route('/note/:id')

  .put(async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, folderID, userID } = req.body;

      const [updateStatus] = await Note.update(
        { title, description, folderID, userID },
        { where: { id } }
      );

      res.json({ updateStatus, id: Number(id) });
    } catch ({ message }) {
      res.status(500).json({ err: message });
    }
  })

  .delete(async (req, res) => {
    try {
      const { id } = req.params;

      const countDeletedNotes = await Note.destroy({ where: { id } });

      res.json({ countDeletedNotes, id: Number(id) });
    } catch ({ message }) {
      res.status(500).json({ err: message });
    }
  });

notesRouter
  .route('/note/:id')

  .get(async (req, res) => {
    try {
      const { id } = req.params;
      const data = await Note.findOne({
        where: { id },
        include: { model: Text },
        // SORT BY CREATE DATE
      });

      res.json(data);
    } catch ({ message }) {
      res.status(500).json({ err: message });
    }
  });

module.exports = notesRouter;
