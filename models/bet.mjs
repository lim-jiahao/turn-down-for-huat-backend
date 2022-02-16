export default function initBetModel(sequelize, DataTypes) {
  return sequelize.define('bet', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    digitOne: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    digitTwo: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    digitThree: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    digitFour: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    digitFive: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    digitSix: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    profit: {
      allowNull: false,
      type: DataTypes.DECIMAL(10, 2),
    },
    ticketId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'tickets',
        key: 'id',
      },
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  }, { underscored: true });
}
