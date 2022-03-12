const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
 

  productId: {
    type: Number,
    required: true,
      trim: true
      },
  
  productName: {
    type: String,
    required: true,
      trim: true
      },

  amount: {
    type: Number,
    required: true,
      trim: true
      },
  investingTime: {
    type: String,
      }
 
},
{
  timestamps: true,
}
)
const InvestModel = mongoose.model('investors', userSchema);

module.exports = InvestModel;


