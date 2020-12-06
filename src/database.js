const mongoose = require('mongoose');
require('dotenv').config();
const ATLAS_URI = process.env.ATLAS_URI ;

const conectarDB = async () => {
    await mongoose.connect(ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});
}
conectarDB();

const connection = mongoose.connection;

connection.once('open', ()=> {
    console.log('Database connected');
});


