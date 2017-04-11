var express = require('express');
var router = express.Router();

const authentication = require('../controllers/authentication');
const passportService = require('../services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false/*, successRedirect: '/', failureRedirect: '/signin'*/ });

router.get('/', /*requireAuth,*/ function(req, res) {
    res.render('index');
  });
/*router.get('/r', function(req, res) {
    res.send("redirected");
  });*/
//место встречи  
router.get('/profile', passport.authenticate('jwt', { session: false }), function(req, res) {
  res.send('profile');
})  
/*                          вход                              */
//показываем форму
router.get('/signin', function(req, res) {
  res.render("signin");
})
//даем токен уже зарегистрированному пользователю
router.post('/signin', passport.authenticate('local', { session: false, successRedirect: '/profile' }), authentication.signin);


/*                       регистрация                         */
//показываем форму
router.get('/signup', function(req, res) {
  res.render("signup");
})
//сохраняем в базу данных, даем токен чтобы сразу редиректунься в кабинет без входа
router.post('/signup', authentication.signup);

module.exports = router;

