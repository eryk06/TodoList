import express, { Request, Response } from 'express';
import morgan from 'morgan';
import userRoutes from '../routes/user.routes';
import connectToDatabase from './db';

const app = express();

app.use(express.json());

const PORT = 8888;

connectToDatabase();

app.get('/ping', (req: Request, res: Response) => {
  res.send('Pong');
});

app.use(morgan('common'));
app.use('/user', userRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
