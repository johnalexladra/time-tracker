module.exports = (sequelize, Sequelize) => {
    const Log = sequelize.define("logs", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: Sequelize.INTEGER,
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false
        },
        timeStart: {
            type: Sequelize.DATE
        },
        timeEnd: {
            type: Sequelize.DATE
        }
    });

    return Log;
};
