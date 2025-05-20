import { Request, Response } from 'express';
import User from '../models/user.model';

export async function executeTask(req: Request, res: Response): Promise<any> {
  try {
    const { taskId, payload } = req.body;

    if (!taskId || !payload?.email || !payload?.action) {
      return res.status(400).json({ error: 'Invalid payload' });
    }

    const { email, action } = payload;

    // Simulate processing delay (optional)
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (action === 'confirm_purchase') {
      // Check if user already exists
      let user = await User.findOne({ email });

      if (!user) {
        // Create new user if not exists
        user = new User({ email, movies_bought: true });
        await user.save();
        console.log(`✅ Created new user with email: ${email}`);
      } else {
        // Update existing user
        user.movies_bought = true;
        await user.save();
        console.log(`✅ Updated existing user: ${email}`);
      }
    }

    res.status(200).json({ message: 'Task executed successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
