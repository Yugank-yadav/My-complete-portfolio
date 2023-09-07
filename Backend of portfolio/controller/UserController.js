const UserModel = require("../model/UserModel");

const UserController = {

    UserHome : (req,res) =>{
        res.send({
            status: true,
            message:'Welcome to user home'
        });
    },
    getUserList: async (req, res) =>{
        let result = await UserModel.find();
        res.send({
            status: true,
            list: result,
        });
    },
    saveUserData: async (req, res) => {
        let user = req.body;
        let SaveData = {
            name: user.name,
            email: user.email,
            number: user.number,
            emailSub: user.emailSub,
            desc: user.desc,
        };
        let newUser = new UserModel(SaveData);
        let result = await newUser.save();
        res.send({
            status:true
        });
    }
};

module.exports = UserController;