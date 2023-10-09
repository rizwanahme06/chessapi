const db = require("../models");
const User_profile = db.User_profile;
const Op = db.Sequelize.Op;


// Create and Save a new User_data
exports.create = (req, res) => {
  // Validate request
  if (!req.body.username) {
    res.status(400).send({
      message: "username can not be empty!"
    });
    return;
  }

  // Create a User
  const user_profile = {
    status: req.body.status,
    username: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    country: req.body.country,
    location: req.body.location,
    language: req.body.language,
    email: req.body.email,
    password: req.body.password,
    image: req.file.filename
  };

  // Save User in the database
  User_profile.create(user_profile)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User_data."
      });
    });
};

// Retrieve all User_profile from the database.
exports.findAll =  async (req, res) => {

  const username = req.query.username;
var condition = username ? { username: { [Op.iLike]: `%${username}%` } } : null;

try {
  const data = await User_profile.findAll({ where: condition });

  data.forEach(project => {
    if (project.image) {
      const projectImage = project.image.toString('base64');
      project.image = projectImage;
    }
  });

  res.send(data);
} catch (error) {
  res.status(500).send({
    message: error.message || "Some error occurred."
  });
}

  // const username = req.query.username;
  // var condition = username ? { username: { [Op.iLike]: `%${username}%` } } : null;

  //   User_profile.findAll({ where: condition })
  // try{project => {
  //   data.map(project => {
  //     const projectImage = project.image.toString('base64')
  //     project['image'] = projectImage
  //   });
  //   return data;
  // }}
  // // .then(data => {
  // //   return res.status(200).json({ data: data })
  // // })
  //   .then(data => {
  //     res.send(data);
  //   })
  //   .catch(err => {
  //     res.status(500).send({
  //       message:
  //         err.message || "Some error occurred while retrieving User_profile."
  //     });
  //   });
};

// Find a single User_data with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User_profile.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User_data with id=" + id
      });
    });
};

// Update a User_data by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  User_profile.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User_data was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update User_data with id=${id}. Maybe User_data was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User_data with id=" + id
      });
    });
};

// Delete a User_data with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User_profile.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User_data was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete User_data with id=${id}. Maybe User_data was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User_data with id=" + id
      });
    });
};

// Delete all User_profile from the database.
exports.deleteAll = (req, res) => {
  User_profile.destroy({
    where: {},
    truncate: false
    })
    .then(nums => {
      res.send({ message: `${nums} User_profile were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all User_profile."
      });
    });
};

// find all published User_data
exports.findAllPublished = (req, res) => {
  User_profile.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving User_profile."
      });
    });
};
