const db = require('../db/db');

const User = db.User;

module.exports = {
  getAllUsers,
  registerUser,
  login,
  isUserExist
};

async function getAllUsers() {
  return await User.find({},{'password':0,'_id':0}).lean().exec();
}

async function isUserExist(email) {
  return await User.findOne({
    email: email
  });
}

async function registerUser(userObj) {
      // validate
      if (await User.findOne({ username: userObj.username })) {
        throw 'Username "' + userObj.username + '" is already taken';
    }

    const user = new User(userObj);

    // save user
   return await user.save();
  
}

async function login(email) {
  return await User.findOne({
    'email': email
  }).lean().exec()
}

