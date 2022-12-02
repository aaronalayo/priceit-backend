import { Router } from 'express';

export const defaultRoute = Router();

defaultRoute.get('/api', (req, res) => {
  res.send("What's up doc ?!");
});