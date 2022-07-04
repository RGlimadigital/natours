const fs = require('fs');

// ==== ARQUIVO JSON ====
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tourTest.json`)
);

// ==== MÉTODOS ====

exports.checkTourBody = (req, res, next) => {
  const { name, price } = req.body;
  if (!name || !price) {
    return res.status(404).json({
      status: 'Fail',
      message: 'Missing name or price',
    });
  }
  console.log(`Name: ${name} , Price: USD${price}`);
  next();
};

exports.confirTourId = (req, res, next, val) => {
  if (val > tours.length - 1) {
    return res.status(404).json({
      status: 'Fail',
      message: 'Invalid Id',
    });
  }
  console.log(`The ID: ${val} is Valid`);
  next();
};

exports.getAllTours = (req, res) => {
  res.status(200).json({
    stauts: 'Sucesso',
    results: tours.length,
    requestedAt: req.requestTime,
    secure: req.secure,
    data: {
      tours,
    },
  });
};

exports.getTour = (req, res) => {
  const id = req.params.id * 1;
  let tour = tours.find((el) => el.id == id);

  res.status(200).json({
    status: 'success',
    tourId: req.params.id,
    data: {
      tour,
    },
  });
};

exports.createTour = (req, res) => {
  //Disponibilizado pelo middleware
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/../dev-data/data/tourTest.json`,

    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

exports.updateTour = (req, res) => {
  const id = req.params.id * 1;
  const { name, duration, maxGroup } = req.body;

  const tour = tours.find((el) => el.id === id);
  tour.name = name;
  tour.duration = duration;
  tour.maxGroup = maxGroup;
  tours[id] = tour;

  fs.writeFile(
    './dev-data/data/toursTest.json',
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        message: 'Id recieved',
        data: {
          patchTour: tours[id],
        },
      });
    }
  );
};

exports.deleteTour = (req, res) => {
  const id = req.params.id * 1;

  const tourDeleted = tours.splice(id, 1);

  console.log(tours);
  fs.writeFile(
    './dev-data/data/toursTest.json',
    JSON.stringify(tours),
    (err) => {
      return res.status(201).json({
        status: 'success',
        message: 'Item deleted',
        data: {
          tourDeleted,
        },
      });
    }
  );
};
