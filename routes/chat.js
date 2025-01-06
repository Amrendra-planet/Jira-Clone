const routerChat = require('express').Router();
const { createChat, getAllMessage, deleteChatbyId, editById } = require("../controllers/chat");
const verifyToken = require("../middleware/JWT");

/**
 * @swagger
 * tags:
 *   name: Chat
 *   description: Chat management APIs
 */

/**
 * @swagger
 * /chat/create:
 *   post:
 *     summary: Create a new chat
 *     tags: [Chat]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 description: Chat message
 *               senderId:
 *                 type: string
 *                 description: ID of the sender
 *               receiverId:
 *                 type: string
 *                 description: ID of the receiver
 *     responses:
 *       201:
 *         description: Chat created successfully
 *       401:
 *         description: Unauthorized
 */
routerChat.post("/create", verifyToken, createChat);

/**
 * @swagger
 * /chat/getAllMessage:
 *   get:
 *     summary: Get all chat messages
 *     tags: [Chat]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of all chat messages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: Message ID
 *                   message:
 *                     type: string
 *                     description: Chat message
 *                   senderId:
 *                     type: string
 *                     description: Sender ID
 *                   receiverId:
 *                     type: string
 *                     description: Receiver ID
 *       401:
 *         description: Unauthorized
 */
routerChat.get("/getAllMessage", verifyToken, getAllMessage);

/**
 * @swagger
 * /chat/delete/{id}:
 *   delete:
 *     summary: Delete a chat by ID
 *     tags: [Chat]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the chat to delete
 *     responses:
 *       200:
 *         description: Chat deleted successfully
 *       404:
 *         description: Chat not found
 *       401:
 *         description: Unauthorized
 */
routerChat.delete("/delete/:id", verifyToken, deleteChatbyId);

// Uncomment this section if edit functionality is added in the future
/**
 * @swagger
 * /chat/edit/{id}:
 *   put:
 *     summary: Edit a chat by ID
 *     tags: [Chat]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the chat to edit
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 description: Updated message
 *     responses:
 *       200:
 *         description: Chat edited successfully
 *       404:
 *         description: Chat not found
 */
module.exports = routerChat;
