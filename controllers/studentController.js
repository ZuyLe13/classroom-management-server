import { deleteLessonById, getLessonList, updateLessonDone } from "../services/studentService.js";

export const getMyLessons = async (req, res) => {
  try {
    const myLessons = await getLessonList(req.params.phone);
    res.status(200).json({ message: 'Student lessons fetched successfully', lessons: myLessons });
  } catch (error) {
    console.error('Error fetching student lessons:', error);
    res.status(500).json({ error: 'Failed to fetch student lessons' });
  }
};

export const updateStudentLesson = async (req, res) => {
  try {
    const { phone, lessonId } = req.params;
    const { completed } = req.body;
    const updatedLesson = await updateLessonDone(phone, lessonId, completed);
    res.status(200).json({ message: 'Student lesson updated successfully', lesson: updatedLesson });
  } catch (error) {
    console.error('Error updating student lesson:', error);
    res.status(500).json({ error: 'Failed to update student lesson' });
  }
};

export const deleteLesson = async (req, res) => {
  try {
    const { lessonId } = req.params;
    await deleteLessonById(lessonId);
    res.status(200).json({ message: 'Student lesson deleted successfully' });
  } catch (error) {
    console.error('Error deleting student lesson:', error);
    res.status(500).json({ error: 'Failed to delete student lesson' });
  }
};
