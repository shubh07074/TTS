import React, { useState } from 'react';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [voice, setVoice] = useState(null);
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);
  const [darkMode, setDarkMode] = useState(false);

  const synth = window.speechSynthesis;
  const voices = synth.getVoices();

  const speak = () => {
    if (text !== '') {
      const utterThis = new SpeechSynthesisUtterance(text);
      utterThis.voice = voice;
      utterThis.pitch = pitch;
      utterThis.rate = rate;
      synth.speak(utterThis);
    }
  };

  return (
    <div className={`App ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <h1>Text to Speech Converter</h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text here"
      />
      <div>
        <label htmlFor="voices">Choose Voice:</label>
        <select
          id="voices"
          onChange={(e) => setVoice(voices[e.target.value])}
        >
          {voices.map((voice, index) => (
            <option key={index} value={index}>
              {voice.name} ({voice.lang})
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="pitch">Pitch:</label>
        <input
          id="pitch"
          type="range"
          min="0"
          max="2"
          step="0.1"
          value={pitch}
          onChange={(e) => setPitch(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="rate">Rate:</label>
        <input
          id="rate"
          type="range"
          min="0.1"
          max="3"
          step="0.1"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
        />
      </div>
      <button onClick={speak}>Speak</button>
      <button onClick={() => setDarkMode(!darkMode)}>
        Toggle {darkMode ? 'Light' : 'Dark'} Mode
      </button>
    </div>
  );
}

export default App;
