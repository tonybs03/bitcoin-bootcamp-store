const mongoose = require('mongoose');

// mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://JKT:mongodb@bitcoin-bootcamp-store.tszgt1n.mongodb.net/bitcoin-bootcamp-store?retryWrites=true&w=majority', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/bootcamp-store', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;
