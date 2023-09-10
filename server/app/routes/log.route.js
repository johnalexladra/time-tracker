module.exports = app => {
    const log = require("../controllers/log.controller.js");

    var router = require("express").Router();

    // Create a new log
    router.post("/", log.create);

    // Retrieve all logs
    router.get("/", log.findAll);

    // Retrieve logs by user id
    router.get("/user/:id", log.findAllByUser);

    // Retrieve a single log with id
    router.get("/user/:id", log.findOne);

    // Update a log with id
    router.put("/:id", log.update);

    // Delete a log with id
    router.delete("/:id", log.delete);

    // Delete all logs
    router.delete("/", log.deleteAll);

    app.use('/api/log', router);
};
