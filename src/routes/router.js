// eslint-disable-next-line import/no-unresolved
const express = require('express');

const router = express.Router();
const userRoutes = require('./userRouter');
const subjectRoutes = require('./subjectRouter');

router.get('/', (req, res) => {
  res.json({
    Project: 'Puma',
    Service: 'User-Service',
  });
});

module.exports = (app) => {
  app.use('/', [userRoutes]);
  app.use('/', [subjectRoutes]);
};
