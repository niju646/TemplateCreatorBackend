// routes/user.js
import express from 'express';
import { getUserId } from '../services/UserService.js';

const router = express.Router();

router.get('/user-info', async (req, res) => {
  try {
    const username = req.query.username;
    if (!username) return res.status(400).json({ error: 'Username is required' });

    // Use your userService to fetch ID and email
    const userId = await getUserId(username);
    const userInfo = await pool.query('SELECT email FROM people WHERE id = $1', [userId]);

    return res.json({ email: userInfo.rows[0].email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get user info' });
  }
});

export default router;
