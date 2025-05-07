import express from 'express';
import cors from 'cors';
import templateRoutes from './routes/templates.js';
import dotenv from 'dotenv';
import customtemplate from './routes/customtemplate.js';
import notificationRoutes from './routes/notifications.js'
import userRoutes from './routes/people.js';


dotenv.config();

const app = express();

app.use(cors({origin: 'http://localhost:5173'}));
app.use(express.json());

app.use('/api/templates', templateRoutes);
app.use('/api/custom-templates', customtemplate);
app.use('/api', notificationRoutes);
app.use('/api', userRoutes);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});