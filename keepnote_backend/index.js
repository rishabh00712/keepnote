import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import connectDB from './src/db/index.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from "./src/routes/authRoutes.js"; // ✅ Import auth routes
import bodyParser from 'body-parser';
import  router  from './src/routes/routes.js';
import cron from 'node-cron';
import Ably from 'ably';

import { Alarm } from './src/models/Alarm/alarms.models.js';
import { Note } from './src/models/Note/notes.models.js';

connectDB();

const app = express();

app.use(cors({
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
    credentials: true
}));

// mount authRoutes
app.use("/api/auth", authRoutes);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));

app.post("/api/set-alarm", async (req, res) => {
    const { id, time } = req.body;

    if (!id || !time) {
        return res.status(400).json({ error: "Missing required fields: id or time" });
    }

    try {
        await Alarm.create({ noteid: id, time: new Date(time) });
        res.json({ message: "Alarm set successfully!" });
    } catch (error) {
        console.error("Error setting alarm:", error);
        res.status(500).json({ error: "Failed to set alarm.", details: error.message });
    }
});


cron.schedule("* * * * *", async () => {
    const now = new Date();
    const alarms = await Alarm.find({ time: { $lte: now } });

    alarms.forEach((alarm) => {
        console.log(`Triggering alarm for note ${alarm.noteId}`);
        // Push notification function to trigger alarm
        // work to be done
    });
});

app.use(router);

app.listen(process.env.PORT || 5000, () => {
    console.log(`App is listening on port ${process.env.PORT || 5000}`);
});