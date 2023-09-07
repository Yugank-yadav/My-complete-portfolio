const MyProjectModel = require("../model/MyProjectModel");

const MyProjectController = {
    getMyProjectList: async (req, res) => {
        let result = await MyProjectModel.find();
        res.send({
            status:true,
            result
        });
    }
};

module.exports = MyProjectController;