const folderRouter = require('express').Router();
const { Folder, Note } = require('../db/models'); // Change here your Model

folderRouter
  .route('/')

  .get(async (req, res) => {
    try {
      const data = await Folder.findAll({
        include: { model: Note },
      });

      res.json(data);
    } catch ({ message }) {
      res.status(500).json({ err: message });
    }
  })

  .post(async (req, res) => {
    try {
      const { name, purpose, userID } = req.body;

      if (name.trim() === '' || purpose.trim() === '') {
       return res.status(400).json('Empty field exists');
      }
      const data = await Folder.create({ name, purpose, userID });

      res.json(data);
    } catch ({ message }) {
      res.status(500).json({ err: message });
    }
  });

folderRouter
  .route('/:id')
  .get(async (req, res) => {
    try {
      const { id } = req.params;

      const data = await Folder.findAll({
        where: { id },
        include: { model: Note },
      });

      res.json(data);
    } catch ({ message }) {
      res.status(500).json({ err: message });
    }
  })

  .put(async (req, res) => {
    try {
      const { id } = req.params;
      const { name, purpose, userID } = req.body;

      const data = await Folder.update(
        { name, purpose, userID },
        { where: { id } }
      );

      res.json(data);
    } catch ({ message }) {
      res.status(500).json({ err: message });
    }
  })

  .delete(async (req, res) => {
    try {
      const { id } = req.params;

      const countDeletedNotes = await Folder.destroy({ where: { id } });

      res.json({ countDeletedNotes });
    } catch ({ message }) {
      res.status(500).json({ err: message });
    }
  });

module.exports = folderRouter;
