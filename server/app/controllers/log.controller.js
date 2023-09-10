const db = require("../models");
const User = db.users;
const Log = db.logs;
const Op = db.Sequelize.Op;

// Create and Save a new log
exports.create = (req, res) => {
    // Validate request
    if (!req.body.description) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a user
    const log = {
        userId: req.body.userId,
        description: req.body.description,
        timeStart: req.body.timeStart,
        timeEnd: req.body.timeEnd
    };

    // Save user in the database
    Log.create(log)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the user."
            });
        });
};

// Retrieve all logs from the database.
exports.findAll = (req, res) => {
    const userId = req.query.userId;
    var condition = userId ? { userId: userId } : null;

    Log.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving logs."
            });
        });
};

// Retrieve all logs by user id from the database.
exports.findAllByUser = (req, res) => {
    const userId = req.query.userId;
    var condition = userId ? { userId: userId } : null;

    User.findAll({
        attributes: ['id', 'firstName', "lastName"],
        include: [{
            model: Log,
            attributes: ['userId', 'description', 'timeStart', 'timeEnd'],
        }],
        where: condition,
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        });
};

// Find a single log with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Log.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find log with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving log with id=" + id
            });
        });
};

// Update a log by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Log.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Log was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update log with id=${id}. Maybe log was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating log with id=" + id
            });
        });
};

// Delete a log with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Log.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Log was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete log with id=${id}. Maybe log was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete log with id=" + id
            });
        });
};

// Delete all logs from the database.
exports.deleteAll = (req, res) => {
    Log.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} logs were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all logs."
            });
        });
};

