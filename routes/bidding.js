const express = require('express');
const router = express.Router();
const db = require("../model/db.js");

/**
 * POST Bid creation
 *
 * User bids for the Car Ride
 * The Car Ride entity is identified by the following composite key
 * (driver, date, time, origin, destination)
 * The bid created has the following information to be submitted
 * P_Key (bidder, driver, date, time, origin, destination)
 * others:
 * bidAmount
 * autogenerated information: bidstatus = 'pending'
 */
router.post('/create', async function(req, res, next) {

  const primary_key = {
    bidder : req.body.bidder_field,
    driver : req.body.driver_field,
    date  : req.body.date_field,
    time : req.body.time_field,
    origin : req.body.origin_field,
    destination : req.body.destination_field
  };

  await db.bid.createUserBid(
    primary_key.bidder,
    req.body.bid_amount_field,
    primary_key.driver,
    primary_key.date,
    primary_key.time,
    primary_key.origin,
    primary_key.destination,
    db.exposedInstance
  );

  res.redirect('/rider')
});

module.exports = router;
