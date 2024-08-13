import express from 'express';
import db from './db.js';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

// Get all flashcards
app.get('/api/flashcards', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM flashcard');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new flashcard
app.post('/api/flashcards', async (req, res) => {
  const { Question, Answer } = req.body;
  try {
    const [result] = await db.query('INSERT INTO flashcard (Question, Answer) VALUES (?, ?)', [Question, Answer]);
    res.status(201).json({ id: result.insertId, Question, Answer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a flashcard
app.delete('/api/flashcards/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM flashcard WHERE id = ?', [id]);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default app;
