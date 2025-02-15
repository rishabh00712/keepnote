# KeepNote - Hackathon Project

## 📌 Overview
**KeepNote** is a feature-rich, MERN stack-powered note-taking application designed for efficient organization and management of notes. This project was developed as part of a hackathon, integrating modern web technologies to provide a seamless user experience.

![image](https://github.com/user-attachments/assets/248683ea-8203-419a-ab04-b14e1a1e666c)


## 🚀 Features
- 📝 **Create, Edit, and Delete Notes**
- 🛎️ **Alarm/Reminder Feature** (Push Notifications)
- ☁️ **MongoDB Storage Integration**
- 📱 **Responsive Design for Mobile & Desktop**
- 🌙 **Dark Mode Support**

## 🏗️ Tech Stack
- **Frontend:** React.js, CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Push Notifications:** Web Push API
- **Deployment:** Vercel 

## 📂 Project Structure
```
KeepNote/
│-- client/ (React Frontend)
│-- server/ (Node.js Backend)
│-- database/ (MongoDB Setup)
│-- README.md
│-- package.json
```

## 🔧 Installation & Setup
### Prerequisites
- Node.js & npm installed
- MongoDB setup (local or cloud-based)

### Steps
1. **Clone the repository**
   ```sh
   git clone https://github.com/yourusername/KeepNote.git
   cd KeepNote
   ```
2. **Install dependencies**
   ```sh
   cd client
   npm install
   cd ../server
   npm install
   ```
3. **Set up environment variables**
   - Create a `.env` file in the `server` directory and configure:
     ```
     MONGO_URI=<your_mongodb_connection>
     JWT_SECRET=<your_secret_key>
     ```
4. **Run the development server**
   ```sh
   cd server
   npm start
   ```
   Open a new terminal and run the frontend:
   ```sh
   cd client
   npm start
   ```
5. **Access the app**
   - Visit `http://localhost:3000`

## 📌 Usage
- **Create notes** and categorize them for better organization.
- **Set reminders** to get notified at a specific time.
- **Edit or delete** notes as needed.
- **Use dark mode** for a comfortable viewing experience.

## 🛠️ Future Enhancements
- 📌 **AI-powered note summarization** (using Gemini API)
- 📊 **Analytics for note activity tracking**
- 📤 **Export notes as PDF/Markdown**
- 📡 **Real-time collaboration**

## 🤝 Contributing
We welcome contributions! Feel free to fork the repo, create feature branches, and submit pull requests.

## 📜 License
This project is licensed under the MIT License.

## 📩 Contact


