const {Router} =require('express')
const { createUser,findUser,findUserbyFirebase,deleteUser,setProfilePic } =require("../controller/userController")

const router =Router();

// user
router.route("/users/new").post(createUser);
router.route("/users/delete").delete(deleteUser);// if any user want to delete your account
router.route("/users/:email").get(findUser);
router.route("/users/id/:firebaseUserId").get(findUserbyFirebase);
router.route("/user/setDP").put(setProfilePic)



module.exports= router;