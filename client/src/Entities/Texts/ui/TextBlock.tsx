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

function TextBlock({ text }: { text: Text }): JSX.Element {
  const backgroundColor = getBackgroundColor(text.userID);
  const name = getName(text.userID);

  return (
    <div
      className="m-3 rounded "
      style={{ background: backgroundColor, padding: '0.6%' }}
    >
      <div style={{ padding: '1%' }}>{text.body}</div>

      <div className="text-end">
        <small>Written by: {name}</small>
      </div>
    </div>
  );
}

export default TextBlock;
