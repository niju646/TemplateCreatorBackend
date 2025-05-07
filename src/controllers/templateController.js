// //controllers/templateControllers.js
// import pool from '../db.js';

// export const getAllTemplates = async (req, res) => {
//   try {
//     const result = await pool.query('SELECT * FROM templates ORDER BY createddate DESC');
//     res.json(result.rows);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// export const getTemplateById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const result = await pool.query('SELECT * FROM templates WHERE id = $1', [id]);
//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: 'Template not found' });
//     }
//     res.json(result.rows[0]);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// export const createTemplate = async (req, res) => {
//   try {
//     const { name, description, content } = req.body;
//     const result = await pool.query(
//       'INSERT INTO templates (name, description, content, createddate, updateddate) VALUES ($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *',
//       [name, description, content]
//     );
//     res.status(201).json(result.rows[0]);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Server error' });
//   }
// };



// export const updateTemplate = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, description, content } = req.body;
//     const result = await pool.query(
//       'UPDATE templates SET name = $1, description = $2, content = $3, updateddate = CURRENT_TIMESTAMP WHERE id = $4 RETURNING *',
//       [name, description, content, id]
//     );
//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: 'Template not found' });
//     }
//     res.json(result.rows[0]);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Server error' });
//   }
// };



// export const deleteTemplate = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const result = await pool.query('DELETE FROM templates WHERE id = $1 RETURNING *', [id]);
//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: 'Template not found' });
//     }
//     res.json({ message: 'Template deleted' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Server error' });
//   }
// };



import pool from '../db.js';

export const getAllTemplates = async (req, res) => {
  try {
    console.log('Fetching all templates'); // ADDED: Logging
    const result = await pool.query('SELECT * FROM templates ORDER BY createddate DESC');
    console.log(`Retrieved ${result.rows.length} templates`); // ADDED: Logging
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching templates:', err); // MODIFIED: More specific log
    res.status(500).json({ error: 'Server error' });
  }
};

export const getTemplateById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Fetching template with ID: ${id}`); // ADDED: Logging
    const result = await pool.query('SELECT * FROM templates WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      console.log(`Template ID ${id} not found`); // ADDED: Logging
      return res.status(404).json({ error: 'Template not found' });
    }
    console.log(`Retrieved template: ${JSON.stringify(result.rows[0])}`); // ADDED: Logging
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching template:', err); // MODIFIED: More specific log
    res.status(500).json({ error: 'Server error' });
  }
};

export const createTemplate = async (req, res) => {
  try {
    const { name, description, content } = req.body;
    console.log('Creating template with data:', { name, description, content }); // ADDED: Logging
    // ADDED: Validate required fields
    if (!name || !content) {
      console.log('Validation failed: name and content are required');
      return res.status(400).json({ error: 'Name and content are required' });
    }
    // ADDED: Log placeholders in content
    const placeholders = (content.match(/\{[^}]+\}/g) || []).join(', ');
    console.log(`Placeholders in content: ${placeholders || 'none'}`);
    const result = await pool.query(
      'INSERT INTO templates (name, description, content, createddate, updateddate) VALUES ($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *',
      [name, description, content]
    );
    console.log(`Created template: ${JSON.stringify(result.rows[0])}`); // ADDED: Logging
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating template:', err); // MODIFIED: More specific log
    // ADDED: Handle specific errors
    if (err.code === '23505') {
      res.status(400).json({ error: 'Template name already exists' });
    } else {
      res.status(500).json({ error: 'Server error' });
    }
  }
};

export const updateTemplate = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, content } = req.body;
    console.log(`Updating template ID ${id} with data:`, { name, description, content }); // ADDED: Logging
    // ADDED: Validate required fields
    if (!name || !content) {
      console.log('Validation failed: name and content are required');
      return res.status(400).json({ error: 'Name and content are required' });
    }
    // ADDED: Log placeholders in content
    const placeholders = (content.match(/\{[^}]+\}/g) || []).join(', ');
    console.log(`Placeholders in content: ${placeholders || 'none'}`);
    const result = await pool.query(
      'UPDATE templates SET name = $1, description = $2, content = $3, updateddate = CURRENT_TIMESTAMP WHERE id = $4 RETURNING *',
      [name, description, content, id]
    );
    if (result.rows.length === 0) {
      console.log(`Template ID ${id} not found`); // ADDED: Logging
      return res.status(404).json({ error: 'Template not found' });
    }
    console.log(`Updated template: ${JSON.stringify(result.rows[0])}`); // ADDED: Logging
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating template:', err); // MODIFIED: More specific log
    // ADDED: Handle specific errors
    if (err.code === '23505') {
      res.status(400).json({ error: 'Template name already exists' });
    } else {
      res.status(500).json({ error: 'Server error' });
    }
  }
};

export const deleteTemplate = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Deleting template ID: ${id}`); // ADDED: Logging
    const result = await pool.query('DELETE FROM templates WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      console.log(`Template ID ${id} not found`); // ADDED: Logging
      return res.status(404).json({ error: 'Template not found' });
    }
    console.log(`Deleted template ID: ${id}`); // ADDED: Logging
    res.json({ message: 'Template deleted' });
  } catch (err) {
    console.error('Error deleting template:', err); // MODIFIED: More specific log
    res.status(500).json({ error: 'Server error' });
  }
};