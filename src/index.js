
// //index.js
// import express from 'express';
// import cors from 'cors';
// import templateRoutes from './routes/templates.js';
// import dotenv from 'dotenv';
// import customtemplate from './routes/customtemplate.js';
// import notificationRoutes from './routes/notifications.js'
// import userRoutes from './routes/userRoutes.js';


// dotenv.config();

// const app = express();

// app.use(cors({origin: 'http://localhost:5173'}));
// app.use(express.json());

// app.use('/api/templates', templateRoutes);
// app.use('/api/custom-templates', customtemplate);
// app.use('/api', notificationRoutes);
// app.use('/api', userRoutes);


// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


//index.js
import express from 'express';
import cors from 'cors';
import templateRoutes from './routes/templates.js';
import dotenv from 'dotenv';
import customtemplate from './routes/customtemplate.js';
import notificationRoutes from './routes/notifications.js';
import userRoutes from './routes/userRoutes.js';
import multer from 'multer'; 
import path from 'path'; 
import fs from 'fs';
import emailRoutes from './routes/emailRoutes.js';



dotenv.config();

const app = express();

//  Set up multer for file uploads
const uploadDir = 'public/uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  }
});
const upload = multer({ storage });

//  Serve the public/uploads directory for static file access
app.use('/uploads', express.static('public/uploads'));

app.use(cors({ origin: 'http://localhost:5173' }));

app.use(express.json());

//  Added /api/upload route for image uploads
app.post('/api/upload', upload.single('image'), (req, res) => {
  console.log(req.file)
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }
    const imageUrl = `/uploads/${req.file.filename}`;
    console.log(`Image uploaded: ${imageUrl}`);
    res.json({ url: imageUrl });
  } catch (err) {
    console.error('Error uploading image:', err);
    res.status(500).json({ error: 'Server error during image upload' });
  }
});

app.use('/api/templates', templateRoutes);
app.use('/api/custom-templates', customtemplate);
app.use('/api', notificationRoutes);
app.use('/api', userRoutes);
app.use('/api', emailRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});