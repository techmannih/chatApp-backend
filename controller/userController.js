
const { UserModel }=require("../models/usermodel")


// create new user 
module.exports.createUser = async (req, res) => {
    const {fullname,userId,username,profilePicUrl,email}=req.body
    try {
      const user = await UserModel.create(fullname,userId,username,profilePicUrl,email);
      res.status(200).send(user);
    } catch (err) {
      res.status(203).send({ "status": false });
    }
  };
// if any user want to delete your account
module.exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.userId;

        // Use Mongoose to find and delete the user
        const deletedUser = await UserModel.findByIdAndDelete(userId);
        if (deletedUser) {
            res.status(200).send({ status: true, message: 'User deleted successfully' });
        } else {
            res.status(404).send({ status: false, message: 'User not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ status: false, message: 'Internal Server Error' });
    }
};

// find user in db by the email id
module.exports.findUser= async (req, res) => {
    const email = req.params.email;
    try {
      const user = await UserModel.findOne({ email: email });
      if (user) {
        res.status(200).send({ status: user });
      } else {
        res.status(200).send({ status: "not found" });
      }
    } catch (err) {
      res.status(400).send({ error: "cannot get userdata" });
    }
  };
//   find user by firebaseid
module.exports.findUserbyFirebase= async (req, res) => {
    const firebaseUserId = req.params.firebaseUserId;
    try {
      const user = await UserModel.findOne({ firebaseUserId: firebaseUserId });
      res.status(200).send({ data: user });
    } catch (err) {
      res.status(400).send({ error: "not found" });
    }
  };

//   update user dp

module.exports.setProfilePic = async (req, res) => {
    try {
        const userId = req.params.userId;
        const profilePicUrl = req.body.profilePicUrl;

        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { $set: { profilePicUrl: profilePicUrl } },
            { new: true } // Return the updated user
        );

        // Check if the user was found and updated successfully
        if (updatedUser) {
            res.status(200).send({ status: true, message: 'Profile picture set successfully', user: updatedUser });
        } else {
            res.status(404).send({ status: false, message: 'User not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ status: false, message: 'Internal Server Error' });
    }
};
