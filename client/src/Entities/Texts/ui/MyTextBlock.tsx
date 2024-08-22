
import { Text } from '../type/TextType';


const getBackgroundColor = (userId: number): string => {
  switch (userId) {
    case 1:
      return '#FFCCCC';
    case 2:
      return '#CCFFCC';
    case 3:
      return '#CCCCFF';
    default:
      return '#FFFFFF';
  }
};

const getName = (userId: number): string => {
  switch (userId) {
    case 1:
      return 'Tom';
    case 2:
      return 'Marie';
    case 3:
      return 'Admin';
    default:
      return '#FFFFFF';
  }
};

function MyTextBlock({ text }: { text: Text }): JSX.Element {
  // const { currentUser } = useContext(AppContext);

  const backgroundColor = getBackgroundColor(text.userID);
  const name = getName(text.userID);

  return (
    <div
      className="m-3 rounded "
      style={{ background: backgroundColor, padding: '0.6%' }}
    >
      <textarea
        defaultValue={text.body}
        style={{
          width: '100%',

          backgroundColor: backgroundColor,
          padding: '10px',
          borderRadius: '8px',
          border: '1px solid #ddd',

          resize: 'none',

          outline: 'none',
        }}
      />

      <div className="text-end">
        <small>Written by: {name}</small>
      </div>
    </div>
  );
}

export default MyTextBlock;
