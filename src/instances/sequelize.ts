import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize("mysql://root:root@localhost:3306/gsd-db");

// export const sequelize = new Sequelize('postgres://yevlhjcs:wV3MZAhMz5PmNDf0R_QqzPEqqHUg2499@topsy.db.elephantsql.com:5432/yevlhjcs')

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully......');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }