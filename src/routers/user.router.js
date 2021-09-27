const { Router } = require('express');
const { addUser, getTodos, signin } = require('../controllers/user.controller');
const passport = require('passport');

const router = Router();

router.post('/signin', passport.authenticate('local', { session: false }), signin);
router.post('/', addUser);
router.get('/:id', getTodos);

module.exports = router;