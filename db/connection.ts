
import{ Sequelize } from 'sequelize';

const db = new Sequelize('node','root','toor',{
    host:'localhost',
    dialect:'mysql',

});

export default db;