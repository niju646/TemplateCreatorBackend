
// //templateController.js
// import pool from '../db.js';

// export const getAllTemplates = async (req, res) => {
//   try {
//     console.log('Fetching all templates'); // ADDED: Logging
//     const result = await pool.query('SELECT * FROM templates ORDER BY createddate DESC');
//     console.log(`Retrieved ${result.rows.length} templates`); // ADDED: Logging
//     res.json(result.rows);
//   } catch (err) {
//     console.error('Error fetching templates:', err); // MODIFIED: More specific log
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// export const getTemplateById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     console.log(`Fetching template with ID: ${id}`); // ADDED: Logging
//     const result = await pool.query('SELECT * FROM templates WHERE id = $1', [id]);
//     if (result.rows.length === 0) {
//       console.log(`Template ID ${id} not found`); // ADDED: Logging
//       return res.status(404).json({ error: 'Template not found' });
//     }
//     console.log(`Retrieved template: ${JSON.stringify(result.rows[0])}`); // ADDED: Logging
//     res.json(result.rows[0]);
//   } catch (err) {
//     console.error('Error fetching template:', err); // MODIFIED: More specific log
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// export const createTemplate = async (req, res) => {
//   try {
//     const { name, description, content } = req.body;
//     console.log('Creating template with data:', { name, description, content }); // ADDED: Logging
//     // ADDED: Validate required fields
//     if (!name || !content) {
//       console.log('Validation failed: name and content are required');
//       return res.status(400).json({ error: 'Name and content are required' });
//     }
//     // ADDED: Log placeholders in content
//     const placeholders = (content.match(/\{[^}]+\}/g) || []).join(', ');
//     console.log(`Placeholders in content: ${placeholders || 'none'}`);
//     const result = await pool.query(
//       'INSERT INTO templates (name, description, content, createddate, updateddate) VALUES ($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *',
//       [name, description, content]
//     );
//     console.log(`Created template: ${JSON.stringify(result.rows[0])}`); // ADDED: Logging
//     res.status(201).json(result.rows[0]);
//   } catch (err) {
//     console.error('Error creating template:', err); // MODIFIED: More specific log
//     // ADDED: Handle specific errors
//     if (err.code === '23505') {
//       res.status(400).json({ error: 'Template name already exists' });
//     } else {
//       res.status(500).json({ error: 'Server error' });
//     }
//   }
// };

// export const updateTemplate = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, description, content } = req.body;
//     console.log(`Updating template ID ${id} with data:`, { name, description, content }); // ADDED: Logging
//     // ADDED: Validate required fields
//     if (!name || !content) {
//       console.log('Validation failed: name and content are required');
//       return res.status(400).json({ error: 'Name and content are required' });
//     }
//     // ADDED: Log placeholders in content
//     const placeholders = (content.match(/\{[^}]+\}/g) || []).join(', ');
//     console.log(`Placeholders in content: ${placeholders || 'none'}`);
//     const result = await pool.query(
//       'UPDATE templates SET name = $1, description = $2, content = $3, updateddate = CURRENT_TIMESTAMP WHERE id = $4 RETURNING *',
//       [name, description, content, id]
//     );
//     if (result.rows.length === 0) {
//       console.log(`Template ID ${id} not found`); // ADDED: Logging
//       return res.status(404).json({ error: 'Template not found' });
//     }
//     console.log(`Updated template: ${JSON.stringify(result.rows[0])}`); // ADDED: Logging
//     res.json(result.rows[0]);
//   } catch (err) {
//     console.error('Error updating template:', err); // MODIFIED: More specific log
//     // ADDED: Handle specific errors
//     if (err.code === '23505') {
//       res.status(400).json({ error: 'Template name already exists' });
//     } else {
//       res.status(500).json({ error: 'Server error' });
//     }
//   }
// };

// export const deleteTemplate = async (req, res) => {
//   try {
//     const { id } = req.params;
//     console.log(`Deleting template ID: ${id}`); // ADDED: Logging
//     const result = await pool.query('DELETE FROM templates WHERE id = $1 RETURNING *', [id]);
//     if (result.rows.length === 0) {
//       console.log(`Template ID ${id} not found`); // ADDED: Logging
//       return res.status(404).json({ error: 'Template not found' });
//     }
//     console.log(`Deleted template ID: ${id}`); // ADDED: Logging
//     res.json({ message: 'Template deleted' });
//   } catch (err) {
//     console.error('Error deleting template:', err); // MODIFIED: More specific log
//     res.status(500).json({ error: 'Server error' });
//   }
// };




import pool from '../db.js';

export const getAllTemplates = async (req, res) => {
  try {
    console.log('Fetching all templates');
    const result = await pool.query('SELECT * FROM templates ORDER BY createddate DESC');
    console.log(`Retrieved ${result.rows.length} templates`);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching templates:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getTemplateById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Fetching template with ID: ${id}`);
    const result = await pool.query('SELECT * FROM templates WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      console.log(`Template ID ${id} not found`);
      return res.status(404).json({ error: 'Template not found' });
    }
    console.log(`Retrieved template: ${JSON.stringify(result.rows[0])}`);
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching template:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const createTemplate = async (req, res) => {
  try {
    const { name, description, content, image } = req.body;
    console.log('Creating template with data:', { name, description, content, image });
    if (!name || !content) {
      console.log('Validation failed: name and content are required');
      return res.status(400).json({ error: 'Name and content are required' });
    }
    const placeholders = (content.match(/\{[^}]+\}/g) || []).join(', ');
    console.log(`Placeholders in content: ${placeholders || 'none'}`);
    if (image && !image.startsWith('/uploads/')) {
      console.log('Validation failed: Invalid image URL format');
      return res.status(400).json({ error: 'Invalid image URL format' });
    }
    const result = await pool.query(
      'INSERT INTO templates (name, description, content, image, createddate, updateddate) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *',
      [name, description, content, image || null]
    );
    console.log(`Created template: ${JSON.stringify(result.rows[0])}`);
    // MODIFIED: Added logging to confirm image storage
    console.log(`Stored image URL in database: ${result.rows[0].image}`);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating template:', err);
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
    const { name, description, content, image } = req.body; // MODIFIED: Added image to destructuring
    console.log(`Updating template ID ${id} with data:`, { name, description, content, image }); // MODIFIED: Updated logging to include image
    if (!name || !content) {
      console.log('Validation failed: name and content are required');
      return res.status(400).json({ error: 'Name and content are required' });
    }
    const placeholders = (content.match(/\{[^}]+\}/g) || []).join(', ');
    console.log(`Placeholders in content: ${placeholders || 'none'}`);
    const result = await pool.query(
      'UPDATE templates SET name = $1, description = $2, content = $3, image = $4, updateddate = CURRENT_TIMESTAMP WHERE id = $5 RETURNING *', // MODIFIED: Added image to UPDATE
      [name, description, content, image || null, id] // MODIFIED: Added image to query params, default to null if not provided
    );
    if (result.rows.length === 0) {
      console.log(`Template ID ${id} not found`);
      return res.status(404).json({ error: 'Template not found' });
    }
    console.log(`Updated template: ${JSON.stringify(result.rows[0])}`);
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating template:', err);
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
    console.log(`Deleting template ID: ${id}`);
    const result = await pool.query('DELETE FROM templates WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      console.log(`Template ID ${id} not found`);
      return res.status(404).json({ error: 'Template not found' });
    }
    console.log(`Deleted template ID: ${id}`);
    res.json({ message: 'Template deleted' });
  } catch (err) {
    console.error('Error deleting template:', err);
    res.status(500).json({ error: 'Server error' });
  }
};





//yesterday
// import pool from '../db.js';

// export const getAllTemplates = async (req, res) => {
//   try {
//     console.log('Fetching all templates');
//     const result = await pool.query('SELECT * FROM templates ORDER BY createddate DESC');
//     console.log(`Retrieved ${result.rows.length} templates`);
//     res.json(result.rows);
//   } catch (err) {
//     console.error('Error fetching templates:', err);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// export const getTemplateById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     console.log(`Fetching template with ID: ${id}`);
//     const result = await pool.query('SELECT * FROM templates WHERE id = $1', [id]);
//     if (result.rows.length === 0) {
//       console.log(`Template ID ${id} not found`);
//       return res.status(404).json({ error: 'Template not found' });
//     }
//     console.log(`Retrieved template: ${JSON.stringify(result.rows[0])}`);
//     res.json(result.rows[0]);
//   } catch (err) {
//     console.error('Error fetching template:', err);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// export const createTemplate = async (req, res) => {
//   try {
//     const { name, description, content, image } = req.body;
//     console.log('Creating template with data:', { name, description, content, image: image ? 'Image provided' : 'No image' });
//     if (!name || !content) {
//       console.log('Validation failed: name and content are required');
//       return res.status(400).json({ error: 'Name and content are required' });
//     }
//     const placeholders = (content.match(/\{[^}]+\}/g) || []).join(', ');
//     console.log(`Placeholders in content: ${placeholders || 'none'}`);
//     const result = await pool.query(
//       'INSERT INTO templates (name, description, content, image, createddate, updateddate) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *',
//       [name, description, content, image || null]
//     );
//     console.log(`Created template: ${JSON.stringify(result.rows[0])}`);
//     res.status(201).json(result.rows[0]);
//   } catch (err) {
//     console.error('Error creating template:', err);
//     if (err.code === '23505') {
//       res.status(400).json({ error: 'Template name already exists' });
//     } else {
//       res.status(500).json({ error: 'Server error' });
//     }
//   }
// };

// export const updateTemplate = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, description, content, image } = req.body;
//     console.log(`Updating template ID ${id} with data:`, { name, description, content, image: image ? 'Image provided' : 'No image' });
//     if (!name || !content) {
//       console.log('Validation failed: name and content are required');
//       return res.status(400).json({ error: 'Name and content are required' });
//     }
//     const placeholders = (content.match(/\{[^}]+\}/g) || []).join(', ');
//     console.log(`Placeholders in content: ${placeholders || 'none'}`);
//     const result = await pool.query(
//       'UPDATE templates SET name = $1, description = $2, content = $3, image = $4, updateddate = CURRENT_TIMESTAMP WHERE id = $5 RETURNING *',
//       [name, description, content, image || null, id]
//     );
//     if (result.rows.length === 0) {
//       console.log(`Template ID ${id} not found`);
//       return res.status(404).json({ error: 'Template not found' });
//     }
//     console.log(`Updated template: ${JSON.stringify(result.rows[0])}`);
//     res.json(result.rows[0]);
//   } catch (err) {
//     console.error('Error updating template:', err);
//     if (err.code === '23505') {
//       res.status(400).json({ error: 'Template name already exists' });
//     } else {
//       res.status(500).json({ error: 'Server error' });
//     }
//   }
// };

// export const deleteTemplate = async (req, res) => {
//   try {
//     const { id } = req.params;
//     console.log(`Deleting template ID: ${id}`);
//     const result = await pool.query('DELETE FROM templates WHERE id = $1 RETURNING *', [id]);
//     if (result.rows.length === 0) {
//       console.log(`Template ID ${id} not found`);
//       return res.status(404).json({ error: 'Template not found' });
//     }
//     console.log(`Deleted template ID: ${id}`);
//     res.json({ message: 'Template deleted' });
//   } catch (err) {
//     console.error('Error deleting template:', err);
//     res.status(500).json({ error: 'Server error' });
//   }
// };