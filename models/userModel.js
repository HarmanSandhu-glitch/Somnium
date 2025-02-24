import mongoose from "mongoose";
import emailValidator from "email-validator";
// import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validate: {
            validator: function (el) {
                return emailValidator.validate(el);
            },
            message: 'Email is invalid'
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    confirmPassword: {
        type: String,
        required: [true, 'Confirm Password is required'],
        validate: {
            validator: function (el) {
                return el === this.password;
            },
            message: 'Password and Confirm Password are not the same'
        }
    },
    role: {
        type: String,
        enum: ['user', 'admin', "organisor"],
        default: 'user'
    },
    profilePic: {
        type: String,
        default: ''
    },
    resetToken: {
        type: String,
        default: ''
    },
})

userSchema.pre('save', function (next) {
    this.confirmPassword = undefined;
    next();
});
// userSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) return next();
//     this.password = await bcrypt.hash(this.password, 12);
//     next();
// });
// userSchema.methods.checkPassword = async function (password) {
//     return await bcrypt.compare(password, this.password);
// }

userSchema.methods.setResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.resetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    return resetToken;
}

const userModel = mongoose.model('User', userSchema);

export default userModel;