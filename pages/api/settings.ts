// pages/api/settings.ts

import { NextApiRequest, NextApiResponse } from 'next';

let monthlyGoal = 500; // Default monthly goal

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Respond with the current monthly goal
    res.status(200).json({ goal: monthlyGoal });
  } else if (req.method === 'POST') {
    // Update the monthly goal
    const { goal } = req.body;
    if (typeof goal === 'number') {
      monthlyGoal = goal;
      res.status(200).json({ goal: monthlyGoal });
    } else {
      res.status(400).json({ error: 'Invalid goal' });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
