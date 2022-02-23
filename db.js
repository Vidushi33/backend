const mongoose = require('mongoose');
const  mongoAtlasUri = "mongodb+srv://pranav:1999mistry@cluster0.usll9.mongodb.net/Cluster0?retryWrites=true&w=majority";
mongoose.connect(mongoAtlasUri, {
  useNewUrlParser: true,
  // useCreateIndex: true,
  useUnifiedTopology: true
});
