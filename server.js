const express  = require('express');
const cors     = require('cors');
const doctorRt = require('./routes/doctorroutes');

const app = express();

app.use(cors());
app.use(express.json());
app.get('/', (_req, res) => res.send('Doctor API ready ✔️'));
app.use('/api/doctors', doctorRt);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server @ http://localhost:${PORT}`));