
// v1


// import React, { memo } from 'react';

// function TestUseCallback({ func }): JSX.Element {
//   console.log('TestUseCallback rendered');

//   return (
//     <div>
//       TestUseCallback
//       <button onClick={() => console.log(func(2, 2))}>Log Func</button>
//     </div>
//   );
// }

// export default memo(TestUseCallback);


// v2

import React, { memo } from 'react';

function TestUseCallback({ onButtonClick }): JSX.Element {
  console.log('TestUseCallback rendered');

  return (
    <div>
      TestUseCallback
      <button onClick={onButtonClick}>Click Me</button>
    </div>
  );
}

export default memo(TestUseCallback);
