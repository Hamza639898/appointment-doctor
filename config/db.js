const mysql =require('mysql2');
const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'doctor_appointment_system'
})
connection.connect(err =>{
    if(err) throw err;
    console.log('Database Connected')
});

module.exports = connection;