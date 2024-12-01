const express = require('express');
const cors = require('cors');
const authRouter = require('./src/auth/auth.router');
const courseRouter = require('./src/course/course.route');
const rbac = require('./src/auth/auth.middleware');
const app = express();
const connectDB = require('./src/config/db.config');

connectDB();

app.use(express.json());
app.use(cors());
app.use('/api', authRouter );
app.use('/api/courses', courseRouter);
app.listen(3001, () => {
    console.log("Server is running on port 3001");
})

