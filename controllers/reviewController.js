const fs = require('fs');

const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/reviewsTest.json`)
);

exports.checkBodyReview = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(404).json({
      status: 'Fail',
      message: 'Missing name or price',
    });
  }
  console.log(`Tour name: ${req.body.name} .Price USD${req.body.price} .`);
  next();
};

exports.checkIdReview = (req, res, next, val) => {
  if (val > reviews.length - 1) {
    return res.status(404).json({
      status: 'Fail',
      message: 'Invalid Id',
    });
  }
  console.log(`The review Id is valid: ${val}`);
  next();
};

exports.getAllReviews = (req, res) => {
  res.status(200).json({
    status: 'Sucesso',
    results: reviews.length,
    data: {
      reviews,
    },
  });
};

exports.getReview = (req, res) => {
  const _id = req.params.id * 1;
  const review = reviews.find((el) => el._id === _id);

  res.status(200).json({
    status: 200,
    message: 'The review has been found',
    data: {
      review,
    },
  });
};

exports.createReview = (req, res) => {
  const newRevId = reviews[reviews.length - 1]._id + 1;
  const revData = req.body;
  const newReview = Object.assign({ _id: newRevId }, revData);
  reviews.push(newReview);
  fs.writeFile(
    './dev-data/data/reviewsTest.json',
    JSON.stringify(reviews),
    (err) => {
      res.status(201).json({
        status: 'sucess',
        message: 'New Review was created',
        data: {
          newRevId,
        },
      });
    }
  );
};

exports.updateReview = (req, res) => {
  const id = req.params.id * 1;
  const { review, rating } = req.body;

  exports.updateReview = reviews.find((el) => el._id === id);
  console.log(updateReview);
  updateReview.review = review;
  updateReview.rating = rating;
  reviews[id] = updateReview;
  fs.writeFile(
    './dev-data/data/reviewsTest.json',
    JSON.stringify(reviews),
    (err) => {
      res.status(201).json({
        status: 'success',
        message: 'Id recieved',
        data: {
          patchTour: reviews[id],
        },
      });
    }
  );
};

exports.deleteReview = (req, res) => {
  const id = req.params.id * 1;

  const reviewsDeleted = reviews.splice(id, 1);

  fs.writeFile(
    './dev-data/data/reviewsTest.json',
    JSON.stringify(reviews),
    (err) => {
      return res.status(201).json({
        status: 'success',
        message: 'Item deleted',
        data: {
          reviewsDeleted,
        },
      });
    }
  );
};
