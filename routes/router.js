var express = require('express');
var router = express.Router();

const authentication = require('../controllers/authentication');
const passportService = require('../services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

router.get('/', requireAuth, function(req, res) {
    res.send({ hi: 'there' });
  });
router.post('/signin', requireSignin, authentication.signin);
router.post('/signup', authentication.signup);

module.exports = router;