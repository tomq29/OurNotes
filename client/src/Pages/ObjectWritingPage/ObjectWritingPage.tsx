
//v1



// import { useMemo, useState } from 'react';
// import TestUseMemo from './TestUseMemo';

// function ObjectWritingPage(): JSX.Element {
//   const [number, setNumber] = useState(0);

//   // Simulate an expensive calculation
//   function objSum(a: number, b: number) {
//     console.log('Expensive calculation');
//     const sum = a + b;
//     return { sum };
//   }

//   // Memoize the calculation result
//   const cachedValue = useMemo(() => objSum(1, 1), []);

//   console.log('Parent rendered');

//   return (
//     <div>
//       ObjectWritingPage {number}
//       <br />
//       <button onClick={() => setNumber(number + 1)}> Add One</button>
//       <br />
//       <TestUseMemo value={cachedValue} />
//     </div>
//   );
// }

// export default ObjectWritingPage;



//v2

import { useMemo, useState } from 'react';
import TestUseMemo from './TestUseMemo';

function ObjectWritingPage(): JSX.Element {
  const [number, setNumber] = useState(0);
  const [a, setA] = useState(1);
  const [b, setB] = useState(1);

  // Memoize based on dependencies
  const cachedValue = useMemo(() => objSum(a, b), [a, b]);

  function objSum(a: number, b: number) {
    console.log('objSum function');
    const sum = a + b;
    return { sum };
  }

  console.log('Parent rendered');

  return (
    <div>
      ObjectWritingPage {number}
      <br />
      <button onClick={() => setNumber(number + 1)}> Add One</button>
      <br />
      <button onClick={() => setA(a + 1)}> Increment A</button>
      <button onClick={() => setB(b + 1)}> Increment B</button>
      <br />
      <TestUseMemo value={cachedValue} />
    </div>
  );
}

export default ObjectWritingPage;