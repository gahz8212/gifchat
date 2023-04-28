const Sequelize = require("sequelize");
module.exports = class Chat extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        chat: { type: Sequelize.STRING(100), allowNull: true },
        gif: { type: Sequelize.STRING(100), allowNull: true },
        createdAt: {
          type: "TIMESTAMP",
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        updatedAt: {
          type: "TIMESTAMP",
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  static associate(db) {
    db.Chat.belongsTo(db.User);
  }
};
