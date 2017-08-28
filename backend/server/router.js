const router = require('express').Router();

const Authentication = require('./controllers/authentication');
const DentistController = require('./controllers/dentist');
const FavoriteController = require('./controllers/favorite');

const LocationController = require('./controllers/location');

const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

router.get('/', requireAuth, function(req, res) {
	res.send({ message: 'Super secret code is ABC123' });
});

router.post('/login', requireLogin, Authentication.login);
router.post('/register', Authentication.register);

router.get('/dentist', requireAuth, DentistController.getDentist);
router.post('/dentist', requireAuth, DentistController.postDentist);
router.delete('/dentist', requireAuth, DentistController.deleteDentist);

router.get('/favorite', requireAuth, FavoriteController.getFavorite);
router.post('/favorite', requireAuth, FavoriteController.postFavorite);

router.get('/location', requireAuth, LocationController.getLocation);

module.exports = router;