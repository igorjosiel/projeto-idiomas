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
      disabled: false,
      selected: false,
    },
    {
      id: 2,
      word: 'Casa',
      disabled: false,
      selected: false,
    },
    {
      id: 3,
      word: 'Homem',
      disabled: false,
      selected: false,
    },
    {
      id: 4,
      word: 'Computador',
      disabled: false,
      selected: false,
    },
    {
      id: 5,
      word: 'Ir',
      disabled: false,
      selected: false,
    },
    {
      id: 6,
      word: 'Branco',
      disabled: false,
      selected: false,
    },
    {
      id: 7,
      word: 'Banco',
      disabled: false,
      selected: false,
    },
    {
      id: 8,
      word: 'Garrafa',
      disabled: false,
      selected: false,
    },
  ]);

  const [wordsEnglish, setWordsEnglish] = useState([
    {
      id: 5,
      word: 'To go',
      disabled: false,
      selected: false,
    },
    {
      id: 4,
      word: 'Computer',
      disabled: false,
      selected: false,
    },
    {
      id: 1,
      word: 'Hello',
      disabled: false,
      selected: false,
    },
    {
      id: 8,
      word: 'Bottle',
      disabled: false,
      selected: false,
    },
    {
      id: 6,
      word: 'white',
      disabled: false,
      selected: false,
    },
    {
      id: 3,
      word: 'Man',
      disabled: false,
      selected: false,
    },
    {
      id: 2,
      word: 'House',
      disabled: false,
      selected: false,
    },
    {
      id: 7,
      word: 'bank',
      disabled: false,
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
      console.log('Teste');
      if (value1 === value2) {
        setAcertos(oldState => oldState + 1);
        setParesFaltam(oldState => oldState - 1);

        setWordsPortuguese(prevWords =>
          prevWords.map(wordP =>
            wordP.id === palavraSelecionada.id ? { ...wordP, disabled: true } : wordP
          )
        );

        setWordsEnglish(prevWords =>
          prevWords.map(wordE =>
            wordE.id === palavraSelecionada.id ? { ...wordE, disabled: true } : wordE
          )
        );
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
              cursor: portuguese.disabled ? 'auto' : 'pointer',
              border: portuguese.disabled ? '' : 'solid 2px blue',
              backgroundColor: portuguese.disabled ? 'green' : portuguese.selected ? 'blue' : '',
              color: portuguese.selected || portuguese.disabled ? '#FFF' : '#000',
              borderRadius: 4,
            }} key={portuguese.id} disabled={portuguese.disabled} onClick={() => handleClick1(portuguese)}>{portuguese.word}</button>
          );
        })}
      </div>
      <div style={{ width: '50%', display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center', alignItems: 'flex-start' }}>
        {wordsEnglish.map(english => {
          return (
            <button style={{
              width: '30%',
              height: '40px',
              cursor: english.disabled ? 'auto' : 'pointer',
              border: english.disabled ? '' : 'solid 2px blue',
              backgroundColor: english.disabled ? 'green' : english.selected ? 'blue' : '',
              color: english.selected || english.disabled ? '#FFF' : '#000',
              borderRadius: 4,
            }} key={english.id} disabled={english.disabled} onClick={() => handleClick2(english)}>{english.word}</button>
          );
        })}
      </div>
    </div>
  );
}

export default App;
