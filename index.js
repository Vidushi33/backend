const path = require('path');
const express = require('express');
// const fileUpload = require('express-fileupload');
const bodyParser = require("body-parser");
const paymentRoute = require("./paymentRoute");
const mongoose = require("mongoose");
const userRouter = require('./routers/user');
const dotenv = require("dotenv"); 
require('./db');

const InvestModel = require('./models/invest')
const moment = require('moment')
const RazorPay=require('razorpay')



const app = express();
const PORT = process.env.PORT || 5000;
const mongourl = process.env.mongoURL ; 
const cors = require('cors');
// app.use(cors({
//     origin: 'https://www.bizdateup.com'
// }));

app.use(cors())

// app.use(cors({
//   origin: 'https://application-0-tooww.mongodbstitch.com'
// }));
const  mongoAtlasUri = mongourl ; 
// "mongodb+srv://pranav:1999mistry@cluster0.usll9.mongodb.net/Cluster0?retryWrites=true&w=majority";
mongoose.connect(mongoAtlasUri, {
  useNewUrlParser: true,
  // useCreateIndex: true,
  useUnifiedTopology: true
});

app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(express.json());
app.use(userRouter);

app.get('/', (req, res) => {
  res.send('<h2>Welcome to the backend of Bizdateup</h2>');
});

// app.use((req, res, next) => {
//   res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
// });

app.post("/invest", async(req,res) => {
      console.log(req.body)
      const {productId, productName,amount} = req.body
      const investingTime = moment().format('MMMM Do YYYY, h:mm:ss a')
      
      const newInvestor = await InvestModel.create({productId, productName,amount,investingTime})

      const convenienceFees = 0.02 * Number(req.body.amount)
      const gst = 0.18 * convenienceFees
      const tds = 0.1 * convenienceFees

      const totalAmount = Number(req.body.amount) + convenienceFees + gst - tds
      console.log("total amount :", totalAmount)

      return res.json({
        newInvestor : newInvestor,
        convenienceFees:convenienceFees,
        gst:gst,
        tds:tds,
        totalAmount : totalAmount,
        investingTime : investingTime
      })
})

app.post("/payOnline", async(req,res) => {
      let instance = new RazorPay({
        key_id : process.env.KEY_ID,
        key_secret : process.env.KEY_SECRET
      })
      
      instance.orders.create({amount:parseInt(req.body.totalAmount)*100, currency:"INR"},
            (err,order) => {
              if(!err){
                res.json(order)
              } 
              else{
                res.json(err)
              }
            } 
        )
        // console.log(MyOrder.id)
})

// mongoose
//   .connect("mongodb://localhost:27017/paymentorder", {
//     useFindAndModify: true,
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
//   })
//   .then(() => console.log("DB CONNECTED"))
//   .catch(() => console.log("FAILED TO CONNET WITH DB"));

app.use(bodyParser.json());
// app.use(cors());

app.use("./api", paymentRoute);
// app.use(fileUpload());
// app.post('/upload', (req, res) => {
//   if (req.files === null) {
//     return res.status(400).json({ msg: 'No file uploaded' });
//   }

//   const file = req.files.file;

//   file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
//     if (err) {
//       console.error(err);
//       return res.status(500).send(err);
//     }

//     res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
//   });
// });

app.listen(PORT, () => {
  console.log(`server started on port no ${PORT}`);
});



// const cors = require('cors');
// const corsOptions ={
//     origin:'http://localhost:3000', 
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }
// app.use(cors(corsOptions));
