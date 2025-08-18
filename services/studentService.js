import { arrayRemove, arrayUnion, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { getLessons } from "./instructorService.js";
import { db } from "../configs/firebase.js";

export const getLessonList = async (phone) => {
  try {
    const lessons = await getLessons();
    const assignedLessons = lessons
      .filter((lesson) => lesson.assignedTos?.includes(phone))
      .map((lesson) => ({
        ...lesson,
        isCompleted: lesson.completed?.includes(phone) ?? false,
      }));

    return assignedLessons;
  } catch (error) {
    console.error("Error fetching lesson list:", error);
    throw new Error("Failed to fetch lesson list");
  }
};

export const updateLessonDone = async (lessonId, phone, completed) => {
  try {
    const lessonRef = doc(db, "lessons", lessonId);
    if (completed) {
      await updateDoc(lessonRef, {
        completed: arrayUnion(phone),
      });
    } else {
      await updateDoc(lessonRef, {
        completed: arrayRemove(phone),
      });
    }
    return { success: true };
  } catch (error) {
    console.error("Error updating lesson:", error);
    throw new Error("Failed to update lesson");
  }
};

export const deleteLessonById = async (lessonId) => {
  try {
    await deleteDoc(doc(db, "lessons", lessonId));
  } catch (error) {
    console.error("Error deleting lesson:", error);
    throw new Error("Failed to delete lesson");
  }
};
