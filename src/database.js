const mongoose = require('mongoose');

const URI = 'mongodb://localhost/upcinventario';


mongoose.connect(URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
    .then(() => console.log('DB Connected!'))
    .catch(err => {
            console.log(err);   
    });

module.exports = mongoose;