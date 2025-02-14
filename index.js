const express = require('express');
const cors = require('cors');
const authRouter = require('./src/router/auth.router');
const courseRouter = require('./src/router/course.route');
const assignmentrouter = require("./src/router/assignment.route");
const app = express();
const rateLimit = require('express-rate-limit');

const connectDB = require('./src/config/db.config');
connectDB();

const limiter = rateLimit({
    windowMs : 15 * 60 * 1000,
    max: 5
});
app.use(limiter)
app.use(express.json());
app.use(cors());
app.use('/api', authRouter );
app.use('/api/courses', courseRouter);
app.use('/api/assignment', assignmentrouter);
app.listen(3001, () => {
    console.log("Server is running on port 3001");
})

