const mongoose = require('mongoose');
const { Schema } = mongoose;
const uniqueValidator = require('mongoose-unique-validator');
const validator = require('validator');
// require bcrypt for hashing passwords
const bcrypt = require('bcrypt');
const saltRounds = 10; //using variable for ease of changing in future
//Create RegExes for validation
const passwordRegEx = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@!#&.\/$]{8,}$/; //confirm 1 uppercase, 1 num, 8 characters, limited symbols
const nameRegEx = /^[\sa-zA-Z.-]{2,}$/; //only letters, dashes, periods and spaces included in name and minimum of 2 characters

const userSchema = new Schema({
    first_name: {
        type: String,
        trim: true,
        validate: {
            validator(value){
                return validator.matches(value, nameRegEx);
            },
            message: "Please enter the first name, ensuring invalid characters (numbers, symbols) are not included."
        },
        required: [true, "Please enter your first name."],
    },
    last_name: {
        type: String,
        trim: true,
        validate: {
            validator(value){
                return validator.matches(value, nameRegEx);
            },
            message: "Please enter the last name, ensuring invalid characters (numbers, symbols) are not included."
        },
        required: [true, "Please enter your last name."],
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        validate: {
            validator(value) {
                return validator.isEmail(value);
            },
            message: "Please enter a valid email address.",
        },
        required:  [true, "A password is required."],
    },
    password: {
        type: String,
        trim: true,
        validate: {
            validator: function(value){
                return validator.matches(value, passwordRegEx);
            },
            message: "Please enter a valid password. Password must be at least 8 characters, include one uppercase letter and one number. Symbols other than @, !, #, &, $ are not allowed."
        },
        required: [true, "A password is required."],
    },
    bikes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Bike',
        }
    ],
},
{
    timestamps: true,
}
);

//Automatically hash the password before it's saved to the database
userSchema.pre('save', function(next){
    console.log('models - user.js --> presave, encrypting password')
    if (!this.isModified('password')) {
        console.log('user.password has not been modified, moving on')
        return next();
    }    
    bcrypt.hash(this.password, saltRounds)
        .then(hashed_password => {
            console.log('hashing user.password')
            this.password = hashed_password;
            next();
        })
        .catch(next);
})

//Validate password
userSchema.statics.validatePassword = function(
    attemptedPassword,
    hashedPassword
) {
    return bcrypt.compare(attemptedPassword, hashedPassword);
};

module.exports = mongoose.model('User', userSchema);