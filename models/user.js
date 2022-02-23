const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  { 

    first_name: {
      type: String,
      required: true,
      trim: true
    },
    last_name: {
      type: String,
      required: true,
      trim: true
    },
    user_email: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (!value.match(/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/)) {
          throw new Error('Email is not valid.');
        }
      }
    },
    user_password: {
      type: String,
      required: true,
      trim: true,
      minlength: 6
    },
    // designations: {
    //   type: String,
    //   required: true,
    //   trim: true
    // },
    phone: {
      type: String,
      trim: true,
      required: true,
      validate: {
        validator: function (v) {
          return /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i.test(v);
        },
        message: '{VALUE} is not a valid 10 digit number!'
      }
      // validate(value) {
      //   if (!value.match(/^[0-9]{10}/)) {
      //     throw new Error('{VALUE} is not a valid 10 digit number!');
      //   }}
     },

     pan: {
      type: String,
      trim: true,
      required: true,
      validate: {
        validator: function (v) {
          return /([A-Z]){5}([0-9]){4}([A-Z]){1}$/.test(v);
        },
        message: '{VALUE} is not a valid PAN number!'
      }
      // validate(value) {
      //   if (!value.match(/^[0-9]{10}/)) {
      //     throw new Error('{VALUE} is not a valid 10 digit number!');
      //   }}
     },

     aadhar: {
      type: String,
      trim: true,
      required: true,
      validate: {
        validator: function (v) {
          return /^[2-9]{1}[0-9]{3}\s{1}[0-9]{4}\s{1}[0-9]{4}$/.test(v);
        },
        message: '{VALUE} is not a valid Aadhar number!'
      }
      // validate(value) {
      //   if (!value.match(/^[0-9]{10}/)) {
      //     throw new Error('{VALUE} is not a valid 10 digit number!');
      //   }}
     },

    genders: {
      type: String,
      trim: true,
      required: true,
    },
    age: {
      type: Number,
      trim: true,
      required: true,
    },
    
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
