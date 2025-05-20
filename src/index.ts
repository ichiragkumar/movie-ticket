import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import routes from './routes/routes';
import { dot } from 'node:test/reporters';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

app.use('/api', routes);

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
