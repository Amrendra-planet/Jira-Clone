
const dashboard = require("../models/dashboard");
const { ObjectId } = require('mongodb');

const createDashboardEntry = async (req, res) => {
    try {
        const { title, participants, messages } = req.body;

        // Validate required fields
        if (!title || !participants || !messages) {
            return res.status(400).json({ error: "Title, participants, and messages are required." });
        }

        // Create a new dashboard entry
        const newDashboardEntry = new dashboard({
            title,
            participants,
            messages,
        });

        // Save the entry to the database
        const savedDashboardEntry = await newDashboardEntry.save();

        // Send a success response
        res.status(201).json(savedDashboardEntry);
    } catch (error) {
        console.error("Error creating dashboard entry:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};



const getAllFeedDashboard = async (req, res) => {
    try {
        const dashboard1 = await dashboard.find({});
        res.status(200).json(dashboard1);
    } catch (error) {
        res.status(500).json({ message: "An error occurred while fetching dashboard", error: error.message });
    }
};

const searchByTitle = async (req, res) => {
    try {
        const { title } = req.body;

        // Validate title
        if (!title) {
            return res.status(400).json({ error: "Title is required." });
        }

        // Query database for entries matching the title, sorted in ascending order
        const result = await dashboard.find({ title: { $regex: title, $options: 'i' } }).sort({ title: 1 });

        // Send response with matching dashboards
        res.status(200).json(result);
    } catch (error) {
        console.error("Error searching dashboards by title:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

var a = [];
var b = [];
var c = [];
var d = [];

const customLogic = async (req, res) => {
    try {
        const { input } = req.body;

        // Validate title
        console.log(a, b, c, d);
        if ((a.length >= 1) && (b.length >= 1) && (c.length >= 1) && (d.length >= 1)) {
            return res.status(501).json({ error: "All files A ,B ,C ,D have one input. Process is completed." });
        }
        if (input == 0) {
            return res.status(400).json({ error: "Input should be in Between 1 to 25 ." });
        }
        if ((input == null) || (input == '') || (input == undefined)) {
            return res.status(400).json({ error: "Input is required." });
        }
        if ((input >= 1) && (input <= 25)) {
            const newnumber = input * 7;

            if (newnumber > 140) {
                a.push(input);
            } else if ((newnumber > 100) && (newnumber <= 140)) {
                b.push(input)
            } else if ((newnumber > 60) && (newnumber <= 100)) {
                c.push(input)
            } else {
                d.push(input)
            }
            let response = {
                "File A": a,
                "File B": b,
                "File C": c,
                "File D": d
            }
            res.status(200).json({ "data": response });
        } else {
            return res.status(500).json({ error: "Input should be in Between 1 to 25 ." });
        }

    } catch (error) {
        console.error("Error  dashboards by Input:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

// const deleteChatbyId = async (req, res) => {
//     try {
//         const chatId = req.params.id;
//         const deletedChat = await Chat.findByIdAndDelete(chatId);
//         if (!deletedChat) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         const allChat = await Chat.find();
//         res.status(200).json({
//             success: true,
//             message: "Data retrieved successfully.",
//             data: allChat
//         });

//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Server Error' });
//     }
// }

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
    getAllFeedDashboard,
    createDashboardEntry,
    searchByTitle,
    customLogic
};
