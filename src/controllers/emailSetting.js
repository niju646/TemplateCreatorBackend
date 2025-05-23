// controllers/emailSetting.js
import pool from '../db.js';
import { getUserId } from '../services/UserService.js';

// Existing controllers (createEmailSettings, getEmailSettings, updateEmailSettings)...
export const createEmailSettings = async (req, res) => {
    const { from_name, reply_to } = req.body;

    if (!from_name || !reply_to) {
        return res.status(400).json({ error: 'Missing required fields: from_name and reply_to are required' });
    }

    try {
        const username = 'defaultUser'; // Replace with actual username logic
        const user_id = await getUserId(username);

        if (!user_id) {
            return res.status(400).json({ error: 'Failed to retrieve user_id' });
        }

        const result = await pool.query(
            'INSERT INTO email_settings (user_id, from_name, reply_to_email, created_at) VALUES ($1, $2, $3, CURRENT_TIMESTAMP) RETURNING *',
            [user_id, from_name, reply_to]
        );

        res.status(201).json({
            message: 'Email settings saved successfully',
            data: result.rows[0],
        });
    } catch (err) {
        console.error('Error saving email settings:', err);
        if (err.code === '23503') {
            return res.status(400).json({ error: 'Invalid user_id: User does not exist' });
        }
        res.status(500).json({ error: 'Failed to save email settings' });
    }
};

export const getEmailSettings = async (req, res) => {
    try {
        const username = 'defaultUser';
        const user_id = await getUserId(username);

        if (!user_id) {
            return res.status(400).json({ error: 'Failed to retrieve user_id' });
        }

        const result = await pool.query(
            'SELECT * FROM email_settings WHERE user_id = $1 ORDER BY created_at DESC LIMIT 1',
            [user_id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'No email settings found for this user' });
        }

        res.status(200).json({
            message: 'Email settings retrieved successfully',
            data: result.rows[0],
        });
    } catch (err) {
        console.error('Error retrieving email settings:', err);
        res.status(500).json({ error: 'Failed to retrieve email settings' });
    }
};

// New controller to fetch all email settings for a user
export const getAllEmailSettings = async (req, res) => {
    try {
        const username = 'defaultUser'; // Replace with actual username logic
        const user_id = await getUserId(username);

        if (!user_id) {
            return res.status(400).json({ error: 'Failed to retrieve user_id' });
        }

        const result = await pool.query(
            'SELECT * FROM email_settings WHERE user_id = $1 ORDER BY created_at DESC',
            [user_id]
        );

        res.status(200).json({
            message: 'All email settings retrieved successfully',
            data: result.rows,
        });
    } catch (err) {
        console.error('Error retrieving all email settings:', err);
        res.status(500).json({ error: 'Failed to retrieve email settings' });
    }
};

export const updateEmailSettings = async (req, res) => {
    const { id } = req.params;
    const { from_name, reply_to } = req.body;

    if (!from_name || !reply_to) {
        return res.status(400).json({ error: 'Missing required fields: from_name and reply_to are required' });
    }

    try {
        const username = 'defaultUser';
        const user_id = await getUserId(username);

        if (!user_id) {
            return res.status(400).json({ error: 'Failed to retrieve user_id' });
        }

        const checkResult = await pool.query(
            'SELECT * FROM email_settings WHERE id = $1 AND user_id = $2',
            [id, user_id]
        );

        if (checkResult.rows.length === 0) {
            return res.status(404).json({ error: 'Email settings not found or you do not have permission to edit this record' });
        }

        const result = await pool.query(
            'UPDATE email_settings SET from_name = $1, reply_to_email = $2 WHERE id = $3 AND user_id = $4 RETURNING *',
            [from_name, reply_to, id, user_id]
        );

        res.status(200).json({
            message: 'Email settings updated successfully',
            data: result.rows[0],
        });
    } catch (err) {
        console.error('Error updating email settings:', err);
        res.status(500).json({ error: 'Failed to update email settings' });
    }
};