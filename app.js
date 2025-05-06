const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const taskRoutes = require("./routes/taskRoutes")

dotenv.config()

const app = express()

app.use(express.json());
app.use(cors({
    origin: 'https://task-manger-frontend-eight.vercel.app/', // Replace with your deployed frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

app.use("/api/task", taskRoutes);

const connectDB = require("./config/db");

connectDB.connect();  

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));