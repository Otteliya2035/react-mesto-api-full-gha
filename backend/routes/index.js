const router = require('express')();
const express = require('express');
const userRoutes = require('./users');

const signinRoutes = require('./signin');
const signupRoutes = require('./signup');
const cardRoutes = require('./cards');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');

const app = express();

// Роут с краштестом
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.use(signinRoutes);
router.use(signupRoutes);
router.use('/users', auth, userRoutes);
router.use('/cards', auth, cardRoutes);

router.use('*', () => {
  throw new NotFoundError('not found');
});

module.exports = router;
