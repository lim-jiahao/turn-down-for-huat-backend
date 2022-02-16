import { Sequelize } from 'sequelize';
import allConfig from '../config/config.js';

import initTicketModel from './ticket.mjs';
import initBetModel from './bet.mjs';
import initUserModel from './user.mjs';

const env = process.env.NODE_ENV || 'development';

const config = allConfig[env];

const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.User = initUserModel(sequelize, Sequelize.DataTypes);
db.Ticket = initTicketModel(sequelize, Sequelize.DataTypes);
db.Bet = initBetModel(sequelize, Sequelize.DataTypes);

db.Ticket.belongsTo(db.User);
db.User.hasMany(db.Ticket);

db.Bet.belongsTo(db.Ticket);
db.Ticket.hasMany(db.Bet);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
