const mongoose = require('../db/connection');

const UserSchema = new mongoose.Schema({
	displayName: {
        type: String,
        required: true
    },
    googleId: {
        type: String,
        required: true
    },
	purchased: [ String ],
});
//POPULATE MONGOOSE 
const User = mongoose.model('User', UserSchema);

export default User