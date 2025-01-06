const Chat = require("../models/chat");
const User = require("../models/user");

const getAgregatedData = async (req, res) => {
    try {
        // const allChat = await Chat.find();
        // const allUser = await User.find();
        const pageSize = 10;
        const pageNumber = 1;
        const pipeline = [
            {
                $lookup: {
                    from: 'user',
                    localField: 'number',
                    foreignField: 'number',
                    as: 'userMatches'
                }
            },
            {
                $match: {
                    userMatches: { $ne: [] }
                }
            },
            {
                $skip: (pageNumber - 1) * pageSize
            },
            {
                $limit: pageSize
            }
        ];
        const result = await Chat.collection('chat').aggregate(pipeline).toArray();
        console.log(result);
        // res.status(200).json({
        //     success: true,
        //     message: "Data retrieved successfully.",
        //     data: result
        // });
    }
    catch (error) {
        res.status(500).send(err.message);
    }
}

module.exports = { getAgregatedData }