

// //customTemplateController.js
// import pool from '../db.js';
// import { getUserId } from '../services/UserService.js';

// export const getAllCustomTemplates = async (req, res) => {
//   try {
//     console.log('Fetching all custom templates'); // ADDED: Logging for debugging
//     const result = await pool.query('SELECT * FROM custom_templates ORDER BY createddate DESC');
//     console.log(`Retrieved ${result.rows.length} custom templates`); // ADDED: Logging result
//     res.json(result.rows);
//   } catch (err) {
//     console.error('Error fetching custom templates:', err); // MODIFIED: More specific log
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// export const getCustomTemplateById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     console.log(`Fetching custom template with ID: ${id}`); // ADDED: Logging
//     const result = await pool.query('SELECT * FROM custom_templates WHERE id = $1', [id]);
//     if (result.rows.length === 0) {
//       console.log(`Custom template ID ${id} not found`); // ADDED: Logging
//       return res.status(404).json({ error: 'Custom template not found' });
//     }
//     console.log(`Retrieved custom template: ${JSON.stringify(result.rows[0])}`); // ADDED: Logging
//     res.json(result.rows[0]);
//   } catch (err) {
//     console.error('Error fetching custom template:', err); // MODIFIED: More specific log
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// export const createCustomTemplate = async (req, res) => {
//   try {
//     const { name, description, content, category, isPublic, username = 'defaultuser' } = req.body;
//     console.log('Creating custom template with data:', { name, description, content, category, isPublic, username }); // ADDED: Logging input
//     // ADDED: Validate required fields
//     if (!name || !content) {
//       console.log('Validation failed: name and content are required');
//       return res.status(400).json({ error: 'Name and content are required' });
//     }
//     // ADDED: Validate username
//     if (!username || username === 'defaultuser') {
//       console.log('Warning: Using default username, consider proper authentication');
//     }
//     // Get or create userId
//     const userId = await getUserId(username);
//     if (!userId) {
//       console.log(`User not found for username: ${username}`);
//       return res.status(400).json({ error: 'Invalid user' });
//     }
//     // ADDED: Log placeholders in content
//     const placeholders = (content.match(/\{[^}]+\}/g) || []).join(', ');
//     console.log(`Placeholders in content: ${placeholders || 'none'}`);
//     const result = await pool.query(
//       'INSERT INTO custom_templates (name, description, content, category, isPublic, userId, createddate, updateddate) VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *',
//       [name, description, content, category, isPublic, userId]
//     );
//     console.log(`Created custom template: ${JSON.stringify(result.rows[0])}`); // ADDED: Logging
//     res.status(201).json(result.rows[0]);
//   } catch (err) {
//     console.error('Error creating custom template:', err); // MODIFIED: More specific log
//     // ADDED: Handle specific errors (e.g., unique constraint)
//     if (err.code === '23505') {
//       res.status(400).json({ error: 'Custom template name already exists' });
//     } else {
//       res.status(500).json({ error: err.message || 'Server error' });
//     }
//   }
// };

// export const updateCustomTemplate = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, description, content, category, isPublic, username = 'defaultuser' } = req.body;
//     console.log(`Updating custom template ID ${id} with data:`, { name, description, content, category, isPublic, username }); // ADDED: Logging input
//     // ADDED: Validate required fields
//     if (!name || !content) {
//       console.log('Validation failed: name and content are required');
//       return res.status(400).json({ error: 'Name and content are required' });
//     }
//     // ADDED: Validate username
//     if (!username || username === 'defaultuser') {
//       console.log('Warning: Using default username, consider proper authentication');
//     }
//     // Get or create userId
//     const userId = await getUserId(username);
//     if (!userId) {
//       console.log(`User not found for username: ${username}`);
//       return res.status(400).json({ error: 'Invalid user' });
//     }
//     // ADDED: Log placeholders in content
//     const placeholders = (content.match(/\{[^}]+\}/g) || []).join(', ');
//     console.log(`Placeholders in content: ${placeholders || 'none'}`);
//     const result = await pool.query(
//       'UPDATE custom_templates SET name = $1, description = $2, content = $3, category = $4, isPublic = $5, userId = $6, updateddate = CURRENT_TIMESTAMP WHERE id = $7 RETURNING *',
//       [name, description, content, category, isPublic, userId, id]
//     );
//     if (result.rows.length === 0) {
//       console.log(`Custom template ID ${id} not found`); // ADDED: Logging
//       return res.status(404).json({ error: 'Custom template not found' });
//     }
//     console.log(`Updated custom template: ${JSON.stringify(result.rows[0])}`); // ADDED: Logging
//     res.json(result.rows[0]);
//   } catch (err) {
//     console.error('Error updating custom template:', err); // MODIFIED: More specific log
//     // ADDED: Handle specific errors
//     if (err.code === '23505') {
//       res.status(400).json({ error: 'Custom template name already exists' });
//     } else {
//       res.status(500).json({ error: err.message || 'Server error' });
//     }
//   }
// };

// export const deleteCustomTemplate = async (req, res) => {
//   try {
//     const { id } = req.params;
//     console.log(`Deleting custom template ID: ${id}`); // ADDED: Logging
//     const result = await pool.query('DELETE FROM custom_templates WHERE id = $1 RETURNING *', [id]);
//     if (result.rows.length === 0) {
//       console.log(`Custom template ID ${id} not found`); // ADDED: Logging
//       return res.status(404).json({ error: 'Custom template not found' });
//     }
//     console.log(`Deleted custom template ID: ${id}`); // ADDED: Logging
//     res.json({ message: 'Custom template deleted' });
//   } catch (err) {
//     console.error('Error deleting custom template:', err); // MODIFIED: More specific log
//     res.status(500).json({ error: 'Server error' });
//   }
  
// };




import pool from '../db.js';
import { getUserId } from '../services/UserService.js';

export const getAllCustomTemplates = async (req, res) => {
  try {
    console.log('Fetching all custom templates');
    const result = await pool.query('SELECT * FROM custom_templates ORDER BY createddate DESC');
    console.log(`Retrieved ${result.rows.length} custom templates`);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching custom templates:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getCustomTemplateById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Fetching custom template with ID: ${id}`);
    const result = await pool.query('SELECT * FROM custom_templates WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      console.log(`Custom template ID ${id} not found`);
      return res.status(404).json({ error: 'Custom template not found' });
    }
    console.log(`Retrieved custom template: ${JSON.stringify(result.rows[0])}`);
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching custom template:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const createCustomTemplate = async (req, res) => {
  try {
    const { name, description, content, category, isPublic, username = 'defaultuser', image } = req.body;
    console.log('Creating custom template with data:', { name, description, content, category, isPublic, username, image });
    if (!name || !content) {
      console.log('Validation failed: name and content are required');
      return res.status(400).json({ error: 'Name and content are required' });
    }
    if (!username || username === 'defaultuser') {
      console.log('Warning: Using default username, consider proper authentication');
    }
    const userId = await getUserId(username);
    if (!userId) {
      console.log(`User not found for username: ${username}`);
      return res.status(400).json({ error: 'Invalid user' });
    }
    const placeholders = (content.match(/\{[^}]+\}/g) || []).join(', ');
    console.log(`Placeholders in content: ${placeholders || 'none'}`);
    if (image && !image.startsWith('/uploads/')) {
      console.log('Validation failed: Invalid image URL format');
      return res.status(400).json({ error: 'Invalid image URL format' });
    }
    const result = await pool.query(
      'INSERT INTO custom_templates (name, description, content, category, isPublic, userId, image, createddate, updateddate) VALUES ($1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *',
      [name, description, content, category, isPublic, userId, image || null]
    );
    console.log(`Created custom template: ${JSON.stringify(result.rows[0])}`);
    // MODIFIED: Added logging to confirm image storage
    console.log(`Stored image URL in database: ${result.rows[0].image}`);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating custom template:', err);
    if (err.code === '23505') {
      res.status(400).json({ error: 'Custom template name already exists' });
    } else {
      res.status(500).json({ error: err.message || 'Server error' });
    }
  }
};

export const updateCustomTemplate = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, content, category, isPublic, username = 'defaultuser', image } = req.body; // MODIFIED: Added image to destructuring
    console.log(`Updating custom template ID ${id} with data:`, { name, description, content, category, isPublic, username, image }); // MODIFIED: Updated logging to include image
    if (!name || !content) {
      console.log('Validation failed: name and content are required');
      return res.status(400).json({ error: 'Name and content are required' });
    }
    if (!username || username === 'defaultuser') {
      console.log('Warning: Using default username, consider proper authentication');
    }
    const userId = await getUserId(username);
    if (!userId) {
      console.log(`User not found for username: ${username}`);
      return res.status(400).json({ error: 'Invalid user' });
    }
    const placeholders = (content.match(/\{[^}]+\}/g) || []).join(', ');
    console.log(`Placeholders in content: ${placeholders || 'none'}`);
    const result = await pool.query(
      'UPDATE custom_templates SET name = $1, description = $2, content = $3, category = $4, isPublic = $5, userId = $6, image = $7, updateddate = CURRENT_TIMESTAMP WHERE id = $8 RETURNING *', // MODIFIED: Added image to UPDATE
      [name, description, content, category, isPublic, userId, image || null, id] // MODIFIED: Added image to query params, default to null if not provided
    );
    if (result.rows.length === 0) {
      console.log(`Custom template ID ${id} not found`);
      return res.status(404).json({ error: 'Custom template not found' });
    }
    console.log(`Updated custom template: ${JSON.stringify(result.rows[0])}`);
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating custom template:', err);
    if (err.code === '23505') {
      res.status(400).json({ error: 'Custom template name already exists' });
    } else {
      res.status(500).json({ error: err.message || 'Server error' });
    }
  }
};

export const deleteCustomTemplate = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Deleting custom template ID: ${id}`);
    const result = await pool.query('DELETE FROM custom_templates WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      console.log(`Custom template ID ${id} not found`);
      return res.status(404).json({ error: 'Custom template not found' });
    }
    console.log(`Deleted custom template ID: ${id}`);
    res.json({ message: 'Custom template deleted' });
  } catch (err) {
    console.error('Error deleting custom template:', err);
    res.status(500).json({ error: 'Server error' });
  }
};





//yesterday
// import pool from '../db.js';
// import { getUserId } from '../services/UserService.js';

// export const getAllCustomTemplates = async (req, res) => {
//   try {
//     console.log('Fetching all custom templates');
//     const result = await pool.query('SELECT * FROM custom_templates ORDER BY createddate DESC');
//     console.log(`Retrieved ${result.rows.length} custom templates`);
//     res.json(result.rows);
//   } catch (err) {
//     console.error('Error fetching custom templates:', err);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// export const getCustomTemplateById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     console.log(`Fetching custom template with ID: ${id}`);
//     const result = await pool.query('SELECT * FROM custom_templates WHERE id = $1', [id]);
//     if (result.rows.length === 0) {
//       console.log(`Custom template ID ${id} not found`);
//       return res.status(404).json({ error: 'Custom template not found' });
//     }
//     console.log(`Retrieved custom template: ${JSON.stringify(result.rows[0])}`);
//     res.json(result.rows[0]);
//   } catch (err) {
//     console.error('Error fetching custom template:', err);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// export const createCustomTemplate = async (req, res) => {
//   try {
//     const { name, description, content, category, isPublic, image, username = 'defaultuser' } = req.body;
//     console.log('Creating custom template with data:', { name, description, content, category, isPublic, image: image ? 'Image provided' : 'No image', username });
//     // Validate required fields
//     if (!name || !content) {
//       console.log('Validation failed: name and content are required');
//       return res.status(400).json({ error: 'Name and content are required' });
//     }
//     // Validate username
//     if (!username || username === 'defaultuser') {
//       console.log('Warning: Using default username, consider proper authentication');
//     }
//     // Get or create userId
//     const userId = await getUserId(username);
//     if (!userId) {
//       console.log(`User not found for username: ${username}`);
//       return res.status(400).json({ error: 'Invalid user' });
//     }
//     // Log placeholders in content
//     const placeholders = (content.match(/\{[^}]+\}/g) || []).join(', ');
//     console.log(`Placeholders in content: ${placeholders || 'none'}`);
//     const result = await pool.query(
//       'INSERT INTO custom_templates (name, description, content, category, isPublic, userId, image, createddate, updateddate) VALUES ($1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *',
//       [name, description, content, category, isPublic, userId, image || null]
//     );
//     console.log(`Created custom template: ${JSON.stringify(result.rows[0])}`);
//     res.status(201).json(result.rows[0]);
//   } catch (err) {
//     console.error('Error creating custom template:', err);
//     if (err.code === '23505') {
//       res.status(400).json({ error: 'Custom template name already exists' });
//     } else {
//       res.status(500).json({ error: err.message || 'Server error' });
//     }
//   }
// };

// export const updateCustomTemplate = async (req, res) => {
//   try {
//     const { id } = req.params;
 
//     const { name, description, content, category, isPublic, image, username = 'defaultuser' } = req.body;
//     console.log(`Updating custom template ID ${id} with data:`, { name, description, content, category, isPublic, image: image ? 'Image provided' : 'No image', username });
//     // Validate required fields
//     if (!name || !content) {
//       console.log('Validation failed: name and content are required');
//       return res.status(400).json({ error: 'Name and content are required' });
//     }
//     // Validate username
//     if (!username || username === 'defaultuser') {
//       console.log('Warning: Using default username, consider proper authentication');
//     }
//     // Get or create userId
//     const userId = await getUserId(username);
//     if (!userId) {
//       console.log(`User not found for username: ${username}`);
//       return res.status(400).json({ error: 'Invalid user' });
//     }
//     // Log placeholders in content
//     const placeholders = (content.match(/\{[^}]+\}/g) || []).join(', ');
//     console.log(`Placeholders in content: ${placeholders || 'none'}`);
//     const result = await pool.query(
//       'UPDATE custom_templates SET name = $1, description = $2, content = $3, category = $4, isPublic = $5, userId = $6, image = $7, updateddate = CURRENT_TIMESTAMP WHERE id = $8 RETURNING *',
//       [name, description, content, category, isPublic, userId, image || null, id]
//     );
//     if (result.rows.length === 0) {
//       console.log(`Custom template ID ${id} not found`);
//       return res.status(404).json({ error: 'Custom template not found' });
//     }
//     console.log(`Updated custom template: ${JSON.stringify(result.rows[0])}`);
//     res.json(result.rows[0]);
//   } catch (err) {
//     console.error('Error updating custom template:', err);
//     if (err.code === '23505') {
//       res.status(400).json({ error: 'Custom template name already exists' });
//     } else {
//       res.status(500).json({ error: err.message || 'Server error' });
//     }
//   }
// };

// export const deleteCustomTemplate = async (req, res) => {
//   try {
//     const { id } = req.params;
//     console.log(`Deleting custom template ID: ${id}`);
//     const result = await pool.query('DELETE FROM custom_templates WHERE id = $1 RETURNING *', [id]);
//     if (result.rows.length === 0) {
//       console.log(`Custom template ID ${id} not found`);
//       return res.status(404).json({ error: 'Custom template not found' });
//     }
//     console.log(`Deleted custom template ID: ${id}`);
//     res.json({ message: 'Custom template deleted' });
//   } catch (err) {
//     console.error('Error deleting custom template:', err);
//     res.status(500).json({ error: 'Server error' });
//   }
// };