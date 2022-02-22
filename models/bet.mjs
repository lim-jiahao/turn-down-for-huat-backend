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
      type: DataTypes.STRING(2),
    },
    digitTwo: {
      allowNull: false,
      type: DataTypes.STRING(2),
    },
    digitThree: {
      allowNull: false,
      type: DataTypes.STRING(2),
    },
    digitFour: {
      allowNull: false,
      type: DataTypes.STRING(2),
    },
    digitFive: {
      allowNull: false,
      type: DataTypes.STRING(2),
    },
    digitSix: {
      allowNull: false,
      type: DataTypes.STRING(2),
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
