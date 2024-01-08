const express = require("express");
const promotionRouter = express.Router();
const Promotion = require("../models/promotion");

promotionRouter
  .route("/")

  .get((req, res, next) => {
    Promotion.find()
      .then((promotions) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(promotions);
      })
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    Promotion.create(req.body)
      .then((promotion) => {
        console.log("Promotion Created ", promotion);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(promotion);
      })
      .catch((err) => next(err));
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /promotions");
  })
  .delete((req, res) => {
    Promotion.deleteMany()
      .then((promotions) => res.status(200).json(promotions))
      .catch((err) => next(err));
  });

promotionRouter
  .route("/:promotionId")

  .get((req, res, next) => {
    Promotion.findbyId(req.params.promotionId)
      .then((promotionId) => res.status(200).json(promotionId))
      .catch((err) => next(err));
  })

  .post((req, res) => {
    res.statusCode = 403;
    res.end(
      `POST operation not supported on /promotions/${req.params.promotionId}`
    );
  })

  .put((req, res, next) => {
    Promotion.findByIdandUpdate(req.params.promotionId, req.body, {
      new: true,
    }).then((promotionId) => res.status(200).json(promotionId));
  })

  .delete((req, res, next) => {
    Promotion.findByIdAndDelete(req.params.promotionId)
      .then((promotions) => res.status(200).json(promotions))
      .catch((err) => next(err));
  });

module.exports = promotionRouter;
