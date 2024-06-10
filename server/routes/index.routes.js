const router = require('express').Router();
const authRouter = require('./api/auth.routes');
const apiCoffeeShopRouter = require('./api/coffeeShop.routes');
const apiBaristaRouter = require('./api/barista.routes');
const apiFavotitesRouter = require('./api/favorites.routes');
const apiFreeDates = require('./api/freeDates.routes');
const apiMessages = require('./api/messages.routes');
const apiRatingRouter = require('./api/rating.routes');

router.use('/api/auth', authRouter);
router.use('/api/coffeeShop', apiCoffeeShopRouter);
router.use('/api/barista', apiBaristaRouter);
router.use('/api/favorites', apiFavotitesRouter);
router.use('/api/freeDates', apiFreeDates);
router.use('/api/messages', apiMessages);
router.use('/api/rating', apiRatingRouter);

module.exports = router;
