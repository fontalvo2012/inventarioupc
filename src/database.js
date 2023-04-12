const mongoose = require('mongoose');

const URI = 'mongodb+srv://app:xoK3D9LvHfV9j5aI@cluster0.ptoa9i7.mongodb.net/taller?retryWrites=true&w=majority';


mongoose.connect(URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
    .then(() => console.log('DB Connected!'))
    .catch(err => {
            console.log(err);   
    });

module.exports = mongoose;