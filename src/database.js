const mongoose = require('mongoose');
const {servidor} = require('./keys.js')
const URI = 'mongodb+srv://app:xoK3D9LvHfV9j5aI@cluster0.ptoa9i7.mongodb.net/taller?retryWrites=true&w=majority';


mongoose.connect(servidor.URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
    .then(() => console.log('DB Connected!'))
    .catch(err => {
            console.log(err);   
    });

module.exports = mongoose;