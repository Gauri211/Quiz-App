# 🚀 QuizVerse - Interactive Quiz Platform  

QuizVerse is an **interactive quiz platform** that allows users to test their knowledge, get instant feedback, track their progress, and view attempt history.   

---

## **🌟 Features**  

### **📝 Quiz Features**
✅ **Multiple-choice & Numeric Questions** - Users can select answers or enter numeric values.  
✅ **Instant Feedback** - Correct answers turn green, incorrect turn red.  
✅ **30-Second Timer** - Each question has a countdown timer.   
✅ **Save Numeric Questions** - Users must save an answer before proceeding. 
✅ **Question Navigation Bar** - Displays question numbers with progress indicators for correct,incorrect and unattempted answers, ensuring easy tracking.

### **📊 Results & Analysis**
✅ **Final Score Display** - Total score with correct and incorrect questions.
✅ **Attempt History (IndexedDB)** - Stores past attempts locally for tracking progress.  
✅ **Reattempt Quiz Button** - Users can reattempt the quiz anytime.   

---

## **📌 Instructions to Run the App Locally**
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/Gauri211/Quiz-App.git
cd Quiz-App
```

2️⃣ Install Dependencies
```sh
npm install
```

3️⃣ Start the Development Server
```sh
npm start
```
This will start the app at http://localhost:3000/. 🎉


### 📌 Project Structure
```sh
quizverse/
│── public/
│── src/
│   ├── components/       # React components (Home, Quiz, Results)
│   ├── data/             # Quiz Questions Data
│   ├── utils/            # IndexedDB for attempt history
│   ├── App.js            # Main app component
│   ├── index.js          # Entry point
│── package.json          # Project dependencies
│── README.md             # Project Documentation
```
### 📌 Technologies Used  
✅ **Frontend:** React.js, Pure CSS  
✅ **State Management:** React Hooks (`useState`, `useEffect`, `useRef`)  
✅ **Local Storage:** IndexedDB (via `idb` package)  

### 📌 Live Demo
✅ **Click here to experience the application:** https://quizverseapp.netlify.app/
