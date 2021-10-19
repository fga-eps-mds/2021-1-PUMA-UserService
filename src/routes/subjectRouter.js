const express = require('express');
const routes = express.Router();
const subjectController = require('../controller/subjectController');

routes.get('/disciplina', async (req, res) => {
    const { body } = req;
    subjectController.getSubjects(body).then((response) => {
        res.status(200).json({ response });
    }).catch((response) => {
        res.status(400).json({ response });
    });
});

module.exports = routes;
