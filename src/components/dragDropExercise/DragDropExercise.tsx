import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDrag, useDrop } from 'react-dnd';

type Item = {
  id: string;
  content: string;
};

type DragItem = {
  id: string;
  type: string;
};

const DraggableItem: React.FC<Item> = ({ id, content }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'item',
    item: { id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className="DraggableItem"
      style={{
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      {content}
    </div>
  );
};

const DroppableGap: React.FC<{ id: string; content: string; onDrop: (id: string) => void }> = ({ id, content, onDrop }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'item',
    drop: (item: DragItem) => onDrop(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`DroppableGap${isOver ? ' isOver' : ''}`}
    >
      {content}
    </div>
  );
};

interface DragAndDropExerciseProps {
    sentenceParts: string[];
    placeholders: string[];
    options: string[][];
    correctAnswers: string[];
  }
  
  const DragAndDropExercise: React.FC<DragAndDropExerciseProps> = ({ sentenceParts, placeholders, options, correctAnswers }) => {
    const [items, setItems] = useState<Item[]>(options.flatMap((group, groupIndex) => group.map((option, index) => ({ id: `${groupIndex}-${index}`, content: option }))));
    const [answers, setAnswers] = useState<(Item | null)[]>(Array(placeholders.length).fill(null));
    const [answerStatus, setAnswerStatus] = useState<string | null>(null);
  
    const handleDrop = (gapIndex: number, id: string) => {
      const droppedItem = items.find((item) => item.id === id);
      if (droppedItem) {
        setAnswers((answers) => answers.map((answer, index) => index === gapIndex ? droppedItem : answer));
        setItems((items) => items.filter((item) => item.id !== id));
      }
    };
  
    const checkAnswer = () => {
      const isCorrect = answers.every((answer, index) => answer && answer.content === correctAnswers[index]);
      const isUnanswered = answers.every((answer) => !answer);
      setAnswerStatus(isUnanswered ? 'unanswered' : isCorrect ? 'correct' : 'incorrect');
    };
  
    // Filter out the selected answers from the list of items
    const filteredItems = items.filter(item => !answers.some(answer => answer && answer.id === item.id));
  
    // Group the filtered items by their groupIndex
    const groupedFilteredItems = filteredItems.reduce((groups, item) => {
      const groupIndex = parseInt(item.id.split('-')[0], 10);
      if (!groups[groupIndex]) {
        groups[groupIndex] = [];
      }
      groups[groupIndex].push(item);
      return groups;
    }, [] as Item[][]);
  
    return (
      <DndProvider backend={HTML5Backend}>
        <div className="draggable-items-container">
        {groupedFilteredItems.map((group, groupIndex) => (
        <div key={groupIndex} style={{ marginBottom: '10px' }}>
            <span>{groupIndex +1 + '.'}</span>
          {group.map((item) => (
            <DraggableItem key={item.id} {...item} />
          ))}
        </div>
        ))}
        </div>
        <div style={{ marginTop: '10px', marginBottom: '10px', lineHeight: '32px'}}>
          {sentenceParts.map((part, index) => (
            <React.Fragment key={index}>
              {part}
              {index < placeholders.length && (
                <DroppableGap id={answers[index]?.id || 'placeholder'} content={answers[index]?.content || ''} onDrop={(id) => handleDrop(index, id)} />
              )}
            </React.Fragment>
          ))}
        </div>
        <div>
        {answerStatus && (
            <p className={`result ${answerStatus}`}>
              {answerStatus === 'correct' && 'Correct!'}
              {answerStatus === 'incorrect' && 'Incorrect, please try again.'}
              {answerStatus === 'unanswered' && 'Please choose an answer.'}
            </p>
          )}
          <button onClick={checkAnswer} className="button">Check Answer</button>
        </div>
      </DndProvider>

  );
};

export default DragAndDropExercise;
