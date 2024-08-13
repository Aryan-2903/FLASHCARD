import db from '../db.js';
import Cors from 'cors';

// Initialize CORS middleware
const cors = Cors({
  methods: ['GET', 'POST', 'DELETE'],
  origin: '*',
});

export default async function handler(req, res) {
  // Run the CORS middleware
  await cors(req, res);

  if (req.method === 'GET') {
    // Get all flashcards
    try {
      const [rows] = await db.query('SELECT * FROM flashcard');
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else if (req.method === 'POST') {
    // Add a new flashcard
    const { Question, Answer } = req.body;
    try {
      const [result] = await db.query('INSERT INTO flashcard (Question, Answer) VALUES (?, ?)', [Question, Answer]);
      res.status(201).json({ id: result.insertId, Question, Answer });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else if (req.method === 'DELETE') {
    // Delete a flashcard
    const { id } = req.query;
    try {
      await db.query('DELETE FROM flashcard WHERE id = ?', [id]);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
