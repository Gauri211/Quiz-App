import { openDB } from "idb";

// Initialize IndexedDB
const initDB = async () => {
  const db = await openDB("quizDB", 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("attempts")) {
        db.createObjectStore("attempts", { keyPath: "id", autoIncrement: true });
      }
    },
  });
  return db;
};

// Save Attempt
export const saveAttempt = async (score, totalQuestions) => {
  const db = await initDB();
  await db.add("attempts", {
    date: new Date().toLocaleString(),
    score,
    totalQuestions,
  });
};

// Get Attempt History
export const getAttempts = async () => {
  const db = await initDB();
  return await db.getAll("attempts");
};
