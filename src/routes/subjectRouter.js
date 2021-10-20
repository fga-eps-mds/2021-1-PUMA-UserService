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

routes.post('/disciplina/cadastro', async (req, res) => {
    subjectController.addSubject(req.body).then((response) => {
        res.status(200).json({ response });
    }).catch((response) => {
        res.status(400).json({ response });
    });
});

routes.get('/disciplina/:subjectId', async (req, res) => {
    subjectController.getSubject(req.params.subjectId).then((response) => {
        res.status(200).json({ response });
    }).catch((response) => {
        res.status(400).json({ response });
    });
});

module.exports = routes;
