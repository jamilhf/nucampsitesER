const express = require("express");
const partnerRouter = express.Router();
const Partner = require("../models/partner");

partnerRouter
  .route("/")

  .get((req, res, next) => {
    Partner.find()
      .then((partners) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(partners);
      })
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    Partner.create(req.body)
      .then((partner) => {
        console.log("Partner Created ", partner);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(partner);
      })
      .catch((err) => next(err));
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /partners");
  })
  .delete((req, res) => {
    Partner.deleteMany()
      .then((partners) => res.status(200).json(partners))
      .catch((err) => next(err));
  });

partnerRouter
  .route("/:partnerId")

  .get((req, res, next) => {
    Partner.findbyId(req.params.partnerId)
      .then((partnerId) => res.status(200).json(partnerId))
      .catch((err) => next(err));
  })

  .post((req, res) => {
    res.statusCode = 403;
    res.end(
      `POST operation not supported on /partners/${req.params.partnerId}`
    );
  })

  .put((req, res, next) => {
    Partner.findByIdandUpdate(req.params.partnerId, req.body, {
      new: true,
    }).then((partnerId) => res.status(200).json(partnerId));
  })

  .delete((req, res, next) => {
    Partner.findByIdAndDelete(req.params.partnerId)
      .then((partners) => res.status(200).json(partners))
      .catch((err) => next(err));
  });

module.exports = partnerRouter;
