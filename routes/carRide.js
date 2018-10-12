var express = require('express');
var router = express.Router();
var db = require("../model/db.js")

/**
 * GET car rides listing page.
 * Only 1 car ride listing is to be viewed at a time.
 */
router.get('/', function(req, res, next) {
  const driver = req.query.driver;
  const date = req.query.date;
  const time = req.query.time;
  const origin = req.query.origin;
  const destination = req.query.destination;
  const ride = {driver, date, time, origin, destination}
  res.render('carRide', { ride });
});


/**
 * POST car ride creation.
 *
 * To be called by driver view.
 */
router.post('/create', async function(req, res, next) {
  // TODO pass in user and car here
  const params = [
    req.body.driver_field,
    'SAA0000A',
    req.body.date_field,
    req.body.time_field,
    req.body.origin_field,
    req.body.destination_field,
    db.exposedInstance
  ]

  await db.ride.advertiseCarRide(...params);

  res.redirect(`/driver?user_id_field=${req.body.driver_field}`)
});


module.exports = router
