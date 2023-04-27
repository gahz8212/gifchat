const Sequelize = require("sequelize");
module.exports = class Room extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        title: { type: Sequelize.STRING(20), allowNull: false, unique: true },
        max: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 10 },
        owner: { type: Sequelize.STRING, allowNull: false },
        password: { type: Sequelize.STRING(100), allowNull: true },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.Room.hasMany(db.User);
  }
};
