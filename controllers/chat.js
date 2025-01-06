
const Chat = require("../models/chat");
const { ObjectId } = require('mongodb');

const createChat = async (req, res) => {
    console.log("chat " , req.body ,res);
    
    const { participants, messages } = req.body;

    try {
        const newChat = new Chat({
            participants,
            messages
        });

        const savedChat = await newChat.save();

        res.status(201).json({
            success: true,
            message: "Chat created successfully.",
            data: savedChat
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
}


const getAllMessage = async (req, res) => {
    
    try {
        const allChats = await Chat.find();

        // Map each chat to the desired format
        const modifiedData = allChats.map(chat => ({
            participants: chat.participants, // Array of participants (user IDs or usernames)
            messages: chat.messages.map(message => ({
                sender: message.sender, // Sender of the message
                content: message.content, // Content of the message
                timestamp: message.timestamp // Timestamp of the message
            }))
        }));

        res.status(200).json({
            success: true,
            message: "Data retrieved successfully.",
            data: modifiedData
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
}


const deleteChatbyId = async (req, res) => {
    try {
        const chatId = req.params.id;
        const deletedChat = await Chat.findByIdAndDelete(chatId);
        if (!deletedChat) {
            return res.status(404).json({ message: 'User not found' });
        }
        const allChat = await Chat.find();
        res.status(200).json({
            success: true,
            message: "Data retrieved successfully.",
            data: allChat
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
}

// const editById = async (req, res) => {
//     try {
//         const userId = req.params.id;
//         const { name } = req.body;
//         const { number } = req.body;
//         const { city } = req.body;
//         const { companyName } = req.body;
//         const { completed } = req.body;


//         if (!title) {
//             return res.status(400).json({ message: 'Title is required' });
//         }
//         const editUser = await User.findByIdAndUpdate(userId, { name, number, city, companyName, completed }, { new: true });
//         if (!editUser) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         res.json({ message: 'User edited successfully', editUser });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Server Error' });
//     }
// }


module.exports = {
    createChat,
    getAllMessage,
    deleteChatbyId,
    // editById
};
