const express = require("express");
const cors = require('cors'); // Importing CORS middleware
const { connection } = require("./db"); // Importing connection from db.js

const app = express();
const port = 8080;

// Middleware
app.use(express.json());
app.use(cors()); // Using CORS middleware

// Get all flashcards
app.get('/api/flashcards', async (req, res) => {
  try {
    const [rows] = await connection.promise().query('SELECT * FROM flashcard');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new flashcard
app.post('/api/flashcards', async (req, res) => {
  const { Question, Answer } = req.body;
  try {
    const [result] = await connection.promise().query('INSERT INTO flashcard (Question, Answer) VALUES (?, ?)', [Question, Answer]);
    res.status(201).json({ id: result.insertId, Question, Answer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a flashcard
app.delete('/api/flashcards/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await connection.promise().query('DELETE FROM flashcard WHERE id = ?', [id]);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
