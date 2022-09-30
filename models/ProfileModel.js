const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
        boardName: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
        phone: {
            type: String,
            maxlength: 20,
            required: true
        },
        invitedBy: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
        email: {
            type: String,
            required: true,
            unique: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('ProfileModel', ProfileSchema);