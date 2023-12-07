import { useEffect, useRef, useState, ChangeEvent } from 'react';

function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  const arrayInputRef = useRef<HTMLInputElement>(null);
  const divsWrapper = useRef<HTMLDivElement>(null);
  const colorSelectRef = useRef<HTMLSelectElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);
  const colorableDiv = useRef<HTMLDivElement>(null);
  const clonedDivsWrapper = useRef<HTMLDivElement>(null);
  const movableDiv = useRef<HTMLDivElement>(null);

  const [numbers, setNumbers] = useState<number[]>([]);
  const [displayedResult, setDisplayedResult] = useState<string>('Jānis Dusmīgs');
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [clickCount, setClickCount] = useState<number>(0);
  const [secondClickCount, secondSetClickCount] = useState<number>(0);
  const [thirdClickCount, thirdSetClickCount] = useState<number>(100);
  const [isFirstRender, setIsFirstRender] = useState<boolean>(true);
  const [inputValue, setInputValue] = useState<string>('Jānis Dusmīgs');
  const [secondInputValue, secondSetInputValue] = useState<string>('Jānis Dusmīgs');

  useEffect(() => {
    console.log('Render');

    return () => {};
  });

  useEffect(() => {
    if (isFirstRender) {
      console.log('First Render');
      setIsFirstRender(false);
    }
  }, [isFirstRender]);

  useEffect(() => {
    inputRef.current?.focus();

    const timeoutId = setTimeout(() => {
      setIsButtonDisabled(false);
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, []);

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const inputValue = Number(arrayInputRef.current?.value);

    if (!isNaN(inputValue)) {
      setNumbers((prevNumbers: number[]) => [...prevNumbers, inputValue]);

      if (arrayInputRef.current) {
        arrayInputRef.current.value = '';
      }
    } else {
      console.error('Please enter a number');
    }
  };

  const handleCountButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setClickCount((prevCount) => prevCount + 1);
  };

  const handleSecondCountButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    secondSetClickCount((prevCount) => prevCount + 1);
    console.log("Changing count")
  };

  const handleThirdCountButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    thirdSetClickCount((prevCount) => prevCount + 1);
  };

  useEffect(() => {
    if (spanRef.current) {
      if (spanRef.current.style.fontSize) {
        spanRef.current.style.fontSize = (parseInt(spanRef.current.style.fontSize) + 1) + 'px';
      } else {
        spanRef.current.style.fontSize = '16px';
      }
    }
  }, [thirdClickCount]);

  const handleAddDivClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (divsWrapper.current) {
      const newDiv = document.createElement('div');
      newDiv.style.backgroundColor = colorSelectRef.current?.value || 'red';
      newDiv.style.width = '30px';
      newDiv.style.height = '30px';
      divsWrapper.current.appendChild(newDiv);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setInputValue(event.target.value);
    console.log("Input Change")
  };

  const handleSecondInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    secondSetInputValue(event.target.value);
  };

  useEffect(() => {
    setDisplayedResult(numbers.length > 0 ? numbers.toString() : 'Jānis Dusmīgs');
    if (!isFirstRender) {
      arrayInputRef.current?.focus();
    }
  }, [numbers]);

  useEffect(() => {
    setInputValue(inputValue.length > 0 ? inputValue : 'Jānis Dusmīgs');
  }, [inputValue]);

  useEffect(() => {
    secondSetInputValue(secondInputValue.length > 0 ? secondInputValue : 'Jānis Dusmīgs');
    document.title = secondInputValue;
  }, [secondInputValue]);
  
  const handleColorButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (colorableDiv.current) {
      colorableDiv.current.style.backgroundColor = 'gold';
    }
  }

  const handleCloneDivButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (clonedDivsWrapper.current) {
      const newDiv = document.createElement('div');
      newDiv.classList.add('simpleDiv')
      clonedDivsWrapper.current.appendChild(newDiv);
    }
  }

  const handlePositionDivButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (movableDiv.current) {
      movableDiv.current.classList.add('child')
    }
  }

  return (
    <>
      <form className='form1'>
        <div className="actionWrapper">
          <input 
            ref={inputRef}
            className="inputRow"
            type="text"
            placeholder='Write something...'
          />
          <div className="inputRow">
            <input
              type='text'
              ref={arrayInputRef}
              placeholder='Write something...'
            />
            <button onClick={(e) => handleButtonClick(e)}>
              Submit
            </button>
          </div>
          <span className="inputRow">
            {displayedResult}
          </span>
        </div>
        <div className="actionWrapper">
          <button disabled={isButtonDisabled} className="inputRow">
            Poga
          </button>
          <button className="inputRow" onClick={(e) => handleCountButtonClick(e)}>
            Count: {clickCount}
          </button>
          <div className="countSquare inputRow">
            {clickCount * 2}
          </div>
        </div>
        <div className="actionWrapper">
          <div className="inputRow">
            <button onClick={(e) => handleAddDivClick(e)}>
              +
            </button>
            <select ref={colorSelectRef} id="colorDropdown">
              <option value="red">Red</option>
              <option value="green">Green</option>
              <option value="blue">Blue</option>
            </select>
          </div>
          <div ref={divsWrapper} className='squaresContainer'></div>
        </div>
      </form>
      <form className='blockWrapper'>
        <button onClick={(e) => handleSecondCountButtonClick(e)}>
          +
        </button>
        <span>
          Count: {secondClickCount}
        </span>
        <input 
          type="text"
          placeholder='Jānis Dusmīgs'
          onChange={handleInputChange}
        />
        <span>
          {inputValue}
        </span>
      </form>
      <form className='blockWrapper'>
        <button onClick={(e) => handleThirdCountButtonClick(e)}>
          +
        </button>
        <span ref={spanRef}>
          Count: {thirdClickCount}
        </span>
        <input 
          type="text"
          placeholder='Jānis Dusmīgs'
          onChange={handleSecondInputChange}
        />
        <span>
          {secondInputValue}
        </span>
      </form>
      <div className='thirdWrapper'>
        <div ref={colorableDiv} className='simpleDiv'></div>
        <button onClick={(e) => handleColorButtonClick(e)}>
          Change Color
        </button>
      </div>
      <div className='thirdWrapper'>
        <div ref={clonedDivsWrapper} className='squaresContainer'>
          <div className='simpleDiv'></div>
        </div>
        <button onClick={(e) => handleCloneDivButtonClick(e)}>
          Clone Div
        </button>
      </div>
      <div className='blockWrapper parent'>
        <div ref={movableDiv} className='simpleDiv'></div>
        <button onClick={(e) => handlePositionDivButtonClick(e)}>
          Send Div to Corner
        </button>
      </div>
    </>
  )
}

export default App
