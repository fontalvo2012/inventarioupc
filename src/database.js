const mongoose = require('mongoose');

const URI = 'mongodb+srv://equipoinventario2023:oIjFnBwzvcGjs31u@cluster0.xyxbc14.mongodb.net/taller?retryWrites=true&w=majority';


mongoose.connect(URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
    .then(() => console.log('DB Connected!'))
    .catch(err => {
            console.log(err);   
    });

module.exports = mongoose;