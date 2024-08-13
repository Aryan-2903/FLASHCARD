import React, { useState, useEffect } from 'react';
import Flashcard from './Flashcard';
import styles from './FlashcardList.module.css';

const FlashcardList = () => {
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/flashcards');
      const data = await response.json();
      setCards(data);
    } catch (error) {
      console.error('Error fetching cards:', error);
    }
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
  };

  if (cards.length === 0) {
    return <div className={styles.loading}>Loading flashcards...</div>;
  }

  return (
    <div className={styles.flashcardList}>
      <Flashcard card={cards[currentIndex]} />
      <div className={styles.navigation}>
        <button onClick={handlePrevious} className={styles.button}>Previous</button>
        <button onClick={handleNext} className={styles.button}>Next</button>
      </div>
    </div>
  );
};

export default FlashcardList;
