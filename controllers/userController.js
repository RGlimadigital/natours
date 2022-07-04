const fs = require('fs');

// ==== ARQUIVO JSON ====
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/userTest.json`)
);

// ==== MÉTODOS ====
exports.checkUserBody = (req, res, next) => {
  if (!req.body.name || !req.body.email) {
    return res.status(404).json({
      status: 'Fail',
      message: 'Missing name or email',
    });
  }
  console.log(`New  user: ${req.body.name} , email: ${req.body.email}.`);
  next();
};

exports.checkUserId = (req, res, next, val) => {
  if (val > users.length - 1) {
    return res.status(404).json({
      status: 'Fail',
      message: 'Invalid Id',
    });
  }
  console.log(`Valid user Id: ${val}`);
  next();
};

exports.getAllUsers = (req, res) => {
  res.status(200).json({
    status: 'Sucesso',
    results: users.length,
    requestedAt: req.requestTime,
    data: {
      users,
    },
  });
};

exports.getUser = (req, res) => {
  const _id = req.params.id * 1;
  const user = users.find((el) => el._id === _id);

  res.status(200).json({
    status: 'success',
    message: 'The user has been found',
    data: {
      user,
    },
  });
};

exports.createUser = (req, res) => {
  const newUserId = users[users.length - 1]._id + 1;
  const userData = req.body;
  const newUser = Object.assign({ _id: newUserId }, userData);
  users.push(newUser);
  fs.writeFile(
    './dev-data/data/userTest.json',
    JSON.stringify(users),
    (err) => {
      res.status(201).json({
        status: 'success',
        message: 'New User was created...',
        data: {
          newUser,
        },
      });
    }
  );
};

exports.updateUser = (req, res) => {
  const id = req.params.id * 1;
  const { name, email, password } = req.body;
  if (id > users.length) {
    return res.status(404).json({
      status: 'Fail',
      message: 'Invalid Id',
    });
  }
  const user = users.find((el) => el._id === id);
  user.name = name;
  user.email = email;
  user.password = password;
  users[id] = user;
  fs.writeFile(
    './dev-data/data/userTest.json',
    JSON.stringify(users),
    (err) => {
      res.status(201).json({
        status: 'success',
        message: 'Id recieved',
        data: {
          patchTour: users[id],
        },
      });
    }
  );
};

exports.deleteUser = (req, res) => {
  const id = req.params.id * 1;

  const userDeleted = users.splice(id, 1);

  console.log(users);
  fs.writeFile(
    './dev-data/data/userTest.json',
    JSON.stringify(users),
    (err) => {
      return res.status(201).json({
        status: 'success',
        message: 'Item deleted',
        data: {
          userDeleted,
        },
      });
    }
  );
};
