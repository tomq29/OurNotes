import { ColorID } from "../../Entities/Colors/type/ColorType";


// Utility function to get color value by colorID
export function getColorByID(colorID: ColorID | undefined) {
    const colors = [
      { id: 1, color: '#D3D3D3', title: 'Светло-серый' },
      { id: 2, color: '#FFCCCC', title: 'Светло-красный' },
      { id: 3, color: '#CCFFCC', title: 'Светло-зеленый' },
      { id: 4, color: '#CCCCFF', title: 'Светло-синий' },
      { id: 5, color: '#FFFACD', title: 'Лимонный' },
      { id: 6, color: '#FFD700', title: 'Золотой' },
      { id: 7, color: '#FF69B4', title: 'Ярко-розовый' },
      { id: 8, color: '#FFB6C1', title: 'Светло-розовый' },
      { id: 9, color: '#E6E6FA', title: 'Лаванда' },
      { id: 10, color: '#B0E0E6', title: 'Пудровый синий' },
      { id: 11, color: '#F0E68C', title: 'Хаки' },
      { id: 12, color: '#FFE4B5', title: 'Мокасин' },
      { id: 13, color: '#D8BFD8', title: 'Тис' },
      { id: 14, color: '#C0C0C0', title: 'Серебряный' },
      { id: 15, color: '#87CEEB', title: 'Небесно-голубой' },
      { id: 16, color: '#FFDAB9', title: 'Персиковый' },
      { id: 17, color: '#FAFAD2', title: 'Светло-золотистый' },
      { id: 18, color: '#FFEFD5', title: 'Папайя' },
      { id: 19, color: '#FFE4E1', title: 'Туманный розовый' },
      { id: 20, color: '#F5DEB3', title: 'Пшеница' },
      { id: 21, color: '#FFF5EE', title: 'Ракушка' },
      { id: 22, color: '#F0FFF0', title: 'Медовая роса' },
      { id: 23, color: '#FAEBD7', title: 'Антикварный белый' },
      { id: 24, color: '#FDF5E6', title: 'Старое кружево' },
      { id: 25, color: '#FFFAFA', title: 'Лапушка' },
      { id: 26, color: '#2C7ED6', title: 'Синий' },
    ];
  
    const color = colors.find((c) => c.id === colorID);
    return color ? color.color : '#FFFFFF'; // Return a default color if not found
  }