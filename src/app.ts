import express from 'express';
import bodyParser from 'body-parser';
import gmailRoutes from './routes/gmailRoutes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({ "ping": 'pong' });
});

app.use('/gmail', gmailRoutes);

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});
