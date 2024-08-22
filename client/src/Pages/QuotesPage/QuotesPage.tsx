// v1


// import { useCallback, useState } from 'react';
// import TestUseCallback from './TestUseCallback';

// function QuotesPage(): JSX.Element {
//   const [number, setNumber] = useState(0);
//   const [multiplier, setMultiplier] = useState(1);

//   // Memoize the function with a dependency on `multiplier`
//   const cachedFunc = useCallback((a: number, b: number) => {
//     console.log('Function executed');
//     const sum = (a + b) * multiplier;
//     return { sum };
//   }, [multiplier]);

//   console.log('Parent rendered');

//   return (
//     <div>
//       QuotesPage {number}
//       <br />
//       <button onClick={() => setNumber(number - 1)}>Minus One</button>
//       <br />
//       <br />
//       <br />
//       <button onClick={() => setMultiplier(multiplier + 1)}>Increase Multiplier</button>
//       <br />
//       <br />
//       <br />

//       <TestUseCallback func={cachedFunc} />
//     </div>
//   );
// }

// export default QuotesPage;



// v2



import { useCallback, useState } from 'react';
import TestUseCallback from './TestUseCallback';

function QuotesPage(): JSX.Element {
  const [number, setNumber] = useState(0);

  const handleButtonClick = useCallback(() => {
    console.log('Button clicked in QuotesPage');
  }, []);

  console.log('Parent rendered');

  return (
    <div>
      QuotesPage {number}
      <br />
      <br />
      <br />
      <button onClick={() => setNumber(number + 1)}>Add One</button>
      <br />
      <br />
      <br />
      <TestUseCallback onButtonClick={handleButtonClick} />
    </div>
  );
}

export default QuotesPage;
