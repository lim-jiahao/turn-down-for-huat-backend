module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.createTable('tickets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      filename: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.createTable('bets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      digit_one: {
        allowNull: false,
        type: Sequelize.STRING(2),
      },
      digit_two: {
        allowNull: false,
        type: Sequelize.STRING(2),
      },
      digit_three: {
        allowNull: false,
        type: Sequelize.STRING(2),
      },
      digit_four: {
        allowNull: false,
        type: Sequelize.STRING(2),
      },
      digit_five: {
        allowNull: false,
        type: Sequelize.STRING(2),
      },
      digit_six: {
        allowNull: false,
        type: Sequelize.STRING(2),
      },
      digit_seven: {
        allowNull: true,
        type: Sequelize.STRING(2),
      },
      digit_eight: {
        allowNull: true,
        type: Sequelize.STRING(2),
      },
      digit_nine: {
        allowNull: true,
        type: Sequelize.STRING(2),
      },
      digit_ten: {
        allowNull: true,
        type: Sequelize.STRING(2),
      },
      digit_eleven: {
        allowNull: true,
        type: Sequelize.STRING(2),
      },
      digit_twelve: {
        allowNull: true,
        type: Sequelize.STRING(2),
      },
      profit: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2),
      },
      cost: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2),
      },
      ticket_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'tickets',
          key: 'id',
        },
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('bets');
    await queryInterface.dropTable('tickets');
    await queryInterface.dropTable('users');
  },
};
