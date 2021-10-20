const express = require('express');
const routes = express.Router();
const subareaController = require('../controller/subareaController');

routes.get('/subareas-conhecimento', async (req, res) => {
    const { body } = req;
    subareaController.getSubareas(body).then((response) => {
        res.status(200).json({ response });
    }).catch((response) => {
        res.status(400).json({ response });
    });
});

module.exports = routes;
