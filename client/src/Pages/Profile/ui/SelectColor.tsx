import { ColorSwatch, Flex, Select } from '@mantine/core';
import { useEffect, useState } from 'react';
import ColorsApi from '../../../Entities/Colors/api/ColorsApi';
import type { UserID } from '../../../Entities/User/type/UserType';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../App/providers/store/store';
import { updateUserColor } from '../../../Entities/User/model/CurrentUserSlice';

function SelectColor(): JSX.Element {
  const currentUser = useAppSelector((store) => store.currentUserStore.user);
  const [colors, setColors] = useState<
    {
      value: string;
      label: string;
    }[]
  >([]);

  const [selectedColorId, setSelectedColorId] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('black');
  const dispatch = useAppDispatch();

  const getColors = () => {
    try {
      ColorsApi.getColors().then((data) => {
        const formattedColors = data.map((color) => ({
          value: String(color.id),
          label: color.color,
        }));

        setColors(formattedColors);
      });
    } catch (error) {
      console.error('Error fetching colors:', error);
    }
  };

  const updateColorInDatabase = async (colorId: string, userId: UserID) => {
    try {
      dispatch(
        updateUserColor({
          id: userId,
          colorID: Number(colorId),
        })
      );
    } catch (error) {
      console.error('Error updating color:', error);
    }
  };

  useEffect(() => {
    getColors();
  }, []);

  const handleColorChange = (value: string) => {
    setSelectedColorId(value);

    const currentColor = colors.find((color) => color.value === value);
    if (currentColor) {
      setSelectedColor(currentColor.label);
    }

    if (currentUser) {
      updateColorInDatabase(selectedColorId, currentUser.id); // Вызываем функцию обновления цвета
    }
  };

  return (
    <div>
      <h2>Выберите цвет</h2>

      <Flex align="center" gap="md">
        <Select
          placeholder="Выберите цвет"
          data={colors}
          size="sm"
          variant="filled"
          style={{ width: '20%' }}
          onChange={handleColorChange} // Обработчик изменения цвета
        />
        <ColorSwatch color={selectedColor} radius="xl" />
      </Flex>
    </div>
  );
}

export default SelectColor;
