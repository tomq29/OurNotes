



// import React, { memo } from 'react';

// function TestUseMemo({ value }): JSX.Element {
//   console.log('TestUseMemo rendered with:', value);

//   return <div>Sum: {value.sum}</div>;
// }

// export default memo(TestUseMemo);



//v2


import React, { memo } from 'react';

function TestUseMemo({ value }): JSX.Element {
  console.log('TestUseMemo rendered with:', value);

  return <div>Sum: {value.sum}</div>;
}

export default memo(TestUseMemo);