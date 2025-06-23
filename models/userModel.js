const db =require('../config/db');
exports.createUser =(user,callback)=>{
    const query='insert into users SET?';
    db.query(query,user,callback);
};

exports.getUserByEmail =(email,callback)=>{
    db.query('select * from users where email =? ',[email],callback);
};