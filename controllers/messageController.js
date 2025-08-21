import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../configs/firebase.js";

export const getHistoryMessages = async (req, res) => {
  try {
    const { from, to } = req.query;
    if (!from || !to) {
      return res.status(400).json({ error: "Missing from or to" });
    }
    const conversationId = [from, to].sort().join("_");
    const messagesRef = collection(
      db, "conversations", conversationId, "messages"
    );

    const q = query(messagesRef, orderBy("time", "asc"));
    const snapshot = await getDocs(q);
    const messages = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json(messages);
  } catch (error) {
    console.error("Error fetching message history:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};