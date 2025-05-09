import express from 'express';
import { getStaticUserDetails } from '../services/UserService.js';

const router = express.Router();

router.post('/user-details', async (req, res) => {
  try {
    const userDetails = getStaticUserDetails();
    res.status(200).json(userDetails);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to fetch user details' });
  }
});

export default router;