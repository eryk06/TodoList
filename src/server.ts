import cors from 'cors';
import express, { Request, Response } from 'express';
import morgan from 'morgan';
import categoryRoutes from '../routes/category.routes';
import taskRoutes from '../routes/task.routes';
import userRoutes from '../routes/user.routes';
import connectToDatabase from './db';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const PORT = 8888;

connectToDatabase();

app.get('/ping', (req: Request, res: Response) => {
  res.send('Pong');
});

app.use(morgan('common'));
app.use('/users', userRoutes);
app.use('/categories', categoryRoutes);
app.use('/tasks', taskRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
