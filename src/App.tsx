import React from 'react';
import './App.css';
import DragAndDropExercise from './components/dragDropExercise/DragDropExercise';

const App: React.FC = () => {
  const sentenceParts = [
    'Percussion instruments are musical instruments that are played by ',
    ', shaking, or scraping them to produce sound. Some examples of percussion instruments include: drums (snare drum, bass drum, tom-toms), cymbals (hi-hat, ride, crash, splash), tambourine, ',
    ' and bongos. These are just a few examples of the many types of ',
    ' instruments that exist, and they can be found in a wide range of musical genres, from classical and orchestral music to rock, pop, and jazz.',
  ];
  const placeholders = ['1', '2', '3'];
  const options = [
    ['bowing', 'plucking', 'striking', 'blowing', 'pressing'],
    ['piano', 'guitar', 'flute', 'shakers', 'trumpet'],
    ['string', 'percussion', 'woodwind', 'brass', 'keyboard'],
  ];
  const correctAnswers = ['striking', 'shakers', 'percussion'];

  return (
    <div className="App">
      <header className="App-header">
        <h1>Drag & Drop Exercise</h1>
      </header>
      <main className="App-main">
        <DragAndDropExercise
          sentenceParts={sentenceParts}
          placeholders={placeholders}
          options={options}
          correctAnswers={correctAnswers}
        />
      </main>
    </div>
  );
};

export default App;
