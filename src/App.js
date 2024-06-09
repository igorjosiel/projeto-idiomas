import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [button1, setButton1] = useState(false);
  const [button2, setButton2] = useState(false);
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(0);
  const [acertos, setAcertos] = useState(0);
  const [paresFaltam, setParesFaltam] = useState(8);
  const [palavraSelecionada, setPalavraSelecionada] = useState({});
  const [colunaSelecionada, setColunaSelecionada] = useState('');

  const [wordsPortuguese, setWordsPortuguese] = useState([
    {
      id: 1,
      word: 'Olá',
      correct: false,
      wrong: false,
      selected: false,
    },
    {
      id: 2,
      word: 'Casa',
      correct: false,
      wrong: false,
      selected: false,
    },
    {
      id: 3,
      word: 'Homem',
      correct: false,
      wrong: false,
      selected: false,
    },
    {
      id: 4,
      word: 'Computador',
      correct: false,
      wrong: false,
      selected: false,
    },
    {
      id: 5,
      word: 'Ir',
      correct: false,
      wrong: false,
      selected: false,
    },
    {
      id: 6,
      word: 'Branco',
      correct: false,
      wrong: false,
      selected: false,
    },
    {
      id: 7,
      word: 'Banco',
      correct: false,
      wrong: false,
      selected: false,
    },
    {
      id: 8,
      word: 'Garrafa',
      correct: false,
      wrong: false,
      selected: false,
    },
  ]);

  const [wordsEnglish, setWordsEnglish] = useState([
    {
      id: 5,
      word: 'To go',
      correct: false,
      wrong: false,
      selected: false,
    },
    {
      id: 4,
      word: 'Computer',
      correct: false,
      wrong: false,
      selected: false,
    },
    {
      id: 1,
      word: 'Hello',
      correct: false,
      wrong: false,
      selected: false,
    },
    {
      id: 8,
      word: 'Bottle',
      correct: false,
      wrong: false,
      selected: false,
    },
    {
      id: 6,
      word: 'white',
      correct: false,
      wrong: false,
      selected: false,
    },
    {
      id: 3,
      word: 'Man',
      correct: false,
      wrong: false,
      selected: false,
    },
    {
      id: 2,
      word: 'House',
      correct: false,
      wrong: false,
      selected: false,
    },
    {
      id: 7,
      word: 'bank',
      correct: false,
      wrong: false,
      selected: false,
    },
  ]);

  useEffect(() => {
    if (colunaSelecionada === 'portuguese') {
      setWordsPortuguese(prevWords =>
        prevWords.map(wordP =>
          wordP.id === palavraSelecionada.id ? { ...wordP, selected: true } : { ...wordP, selected: false }
        )
      );
    }

    if (colunaSelecionada === 'english') {
      setWordsEnglish(prevWords =>
        prevWords.map(wordE =>
          wordE.id === palavraSelecionada.id ? { ...wordE, selected: true } : { ...wordE, selected: false }
        )
      );
    }

    if (button1 && button2) {
      if (value1 === value2) {
        setAcertos(oldState => oldState + 1);
        setParesFaltam(oldState => oldState - 1);

        setWordsPortuguese(prevWords =>
          prevWords.map(wordP =>
            wordP.id === palavraSelecionada.id ? { ...wordP, correct: true } : wordP
          )
        );

        setWordsEnglish(prevWords =>
          prevWords.map(wordE =>
            wordE.id === palavraSelecionada.id ? { ...wordE, correct: true } : wordE
          )
        );
      } else {
        setWordsPortuguese(prevWords =>
          prevWords.map(wordP =>
            wordP.id === value1 ? { ...wordP, wrong: true } : wordP
          )
        );

        setWordsEnglish(prevWords =>
          prevWords.map(wordE =>
            wordE.id === value2 ? { ...wordE, wrong: true } : wordE
          )
        );

        setTimeout(() => {
          setWordsPortuguese(prevWords =>
            prevWords.map(wordP =>
              wordP.id === value1 ? {
                ...wordP,
                wrong: false,
                selected: false,
              } : wordP
            )
          );
  
          setWordsEnglish(prevWords =>
            prevWords.map(wordE =>
              wordE.id === value2 ? {
                ...wordE,
                wrong: false,
                selected: false,
              } : wordE
            )
          );
        }, 5000);
      }

      setButton1(false);
      setButton2(false);
    }
  }, [button1, button2, value1, value2, palavraSelecionada, colunaSelecionada]);

  useEffect(() => {
    if (paresFaltam === 0) alert('Você finalizou com ' + acertos + 'acertos!');
  }, [paresFaltam, acertos]);

  const handleClick1 = (word) => {
    setColunaSelecionada('portuguese');
    setButton1(true);
    setValue1(word.id);
    setPalavraSelecionada(word);
  }

  const handleClick2 = (word) => {
    setColunaSelecionada('english');
    setButton2(true);
    setValue2(word.id);
    setPalavraSelecionada(word);
  }

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh', gap: '100px' }}>
      <div style={{ width: '50%', display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center', alignItems: 'flex-end' }}>
        {wordsPortuguese.map(portuguese => {
          return (
            <button style={{
              width: '30%',
              height: '40px',
              cursor: portuguese.correct ? 'auto' : 'pointer',
              border: portuguese.correct || portuguese.wrong ? '' : 'solid 2px blue',
              backgroundColor: portuguese.correct ? 'green' : portuguese.wrong ? 'red' : portuguese.selected ? 'blue' : '',
              color: portuguese.selected || portuguese.correct || portuguese.wrong ? '#FFF' : '#000',
              borderRadius: 4,
            }} key={portuguese.id} disabled={portuguese.correct} onClick={() => handleClick1(portuguese)}>{portuguese.word}</button>
          );
        })}
      </div>
      <div style={{ width: '50%', display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center', alignItems: 'flex-start' }}>
        {wordsEnglish.map(english => {
          return (
            <button style={{
              width: '30%',
              height: '40px',
              cursor: english.correct ? 'auto' : 'pointer',
              border: english.correct || english.wrong ? '' : 'solid 2px blue',
              backgroundColor: english.correct ? 'green' : english.wrong ? 'red' : english.selected ? 'blue' : '',
              color: english.selected || english.correct || english.wrong ? '#FFF' : '#000',
              borderRadius: 4,
            }} key={english.id} disabled={english.correct} onClick={() => handleClick2(english)}>{english.word}</button>
          );
        })}
      </div>
    </div>
  );
}

export default App;
