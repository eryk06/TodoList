import { Response } from 'express';
import { AuthRequest } from '../middleware';
import Task from '../models/task-model';
import { ITask } from '../types';

export const getAllTasks = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user;
    const tasks = await Task.find({ user: userId });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getAllTasksByCategory = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const userId = req.user;
    const { id } = req.params;
    const tasks = await Task.find({
      user: userId,
      categoryId: id,
    });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getAllCompletedTasks = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user;
    const tasks = await Task.find({
      user: userId,
      isCompleted: true,
    });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getTasksForToday = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user;
    const todaysISODate = new Date();
    todaysISODate.setHours(0, 0, 0, 0);
    const tasks = await Task.find({
      user: userId,
      date: todaysISODate.toISOString(),
    });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user;
    const { name, date, categoryId }: ITask = req.body;
    const task = await Task.create({
      name,
      date,
      categoryId,
      user: userId,
    });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const toggleTaskStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { isCompleted } = req.body;
    const { id } = req.params;

    const task = await Task.updateOne({ _id: id }, { isCompleted });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    await Task.deleteOne({
      _id: id,
    });
    res.status(200).json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const editTask = async (req: AuthRequest, res: Response) => {
  try {
    const { _id, categoryId, date, name }: ITask = req.body;
    await Task.updateOne(
      {
        _id,
      },
      {
        $set: {
          name,
          categoryId,
          date,
        },
      },
    );
    res.status(200).json({ message: 'Task updated successfully' });
  } catch (error) {
    res.status(500).json(error);
  }
};
