import express from 'express';
import bodyParser from 'body-parser';
import gmailRoutes from './routes/gmailRoutes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.use('/gmail', gmailRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
