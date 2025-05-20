import { Request, Response } from 'express';
import { createCloudTask } from '../services/movie-service';


export async function createTask(req : Request, res : Response) : Promise<any> {
  const { email, action, delayInSeconds } = req.body;

  if (!email || !action) {
    return res.status(400).json({ message: 'Email and action are required' });
  }

  try {
    const task = await createCloudTask(email, action, delayInSeconds || 120);
    return res.status(201).json({ message: 'Task created successfully', taskName: task.name });
  } catch (error) {
    console.error('Error creating cloud task:', error);
    return res.status(500).json({ message: 'Failed to create task' });
  }
}