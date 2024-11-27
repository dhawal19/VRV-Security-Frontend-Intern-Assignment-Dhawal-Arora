const express = require('express');
const app = express();
const port = 3000;
const connectDB = require('./config/connectDB');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');

app.use(cors(corsOptions));
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', require('./routes/home'));

// users route handler
app.use('/users', require('./routes/users'));

// roles route handler
app.use('/roles', require('./routes/roles'));

// permissions route handler
app.use('/permissions', require('./routes/permissions'));





app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});