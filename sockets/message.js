import { addDoc, collection } from "firebase/firestore";
import { db } from "../configs/firebase.js";

export default function setupChatSocket(io) {
  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);
    const phone = socket.handshake.auth?.phone;

    if (!phone) {
      console.log("No phone provided, disconnecting socket");
      socket.disconnect();
      return;
    }

    socket.join(phone);
    console.log(`User ${phone} connected with socket ${socket.id}`);

    socket.on("sendMessage", async (message) => {
      console.log("Message received:", message);

      try {
        const conversationId = [message.from, message.to].sort().join("_");

        const messagesRef = collection(
          db, "conversations", conversationId, "messages"
        );

        await addDoc(messagesRef, message);

        io.to(message.to).emit("receiveMessage", message);
        io.to(message.from).emit("receiveMessage", message);

      } catch (err) {
        console.error("Error saving message:", err);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
}