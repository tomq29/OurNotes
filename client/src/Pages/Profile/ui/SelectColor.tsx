import { ColorSwatch, Flex, Select, Loader } from '@mantine/core';
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
      title: string;
    }[]
  >([]);
  const [selectedColor, setSelectedColor] = useState<string>('black');
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  const getColors = async () => {
    try {
      const data = await ColorsApi.getColors();
      const formattedColors = data.map((color) => ({
        value: String(color.id),
        label: color.color,
        title: color.title,
      }));

      setColors(formattedColors);
      console.log('colors', formattedColors);
      const currUserColor = formattedColors.filter(
        (color) => color.value === String(currentUser?.colorID)
      );
      setSelectedColor(currUserColor[0].label);
    } catch (error) {
      console.error('Error fetching colors:', error);
    } finally {
      setLoading(false);
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
  }, [currentUser?.id]);

  const handleColorChange = (value: string): void => {
    const currentColor = colors.find((color) => color.value === value);
    if (currentColor) {
      setSelectedColor(currentColor.label);
    }

    if (currentUser) {
      updateColorInDatabase(value, currentUser.id);
    }
  };

  return (
    <div>
      <h2>Выберите цвет текста</h2>
      {loading ? (
        <Loader />
      ) : (
        <Flex align="center" gap="md">
          <Select
            placeholder="Выберите цвет"
            data={colors.map((color) => ({
              value: color.value,
              label: color.title,
            }))}
            size="sm"
            variant="filled"
            style={{ width: '20%' }}
            onChange={handleColorChange}
            value={selectedColor}
            radius="xl"
            searchable
            clearable
          />
          <ColorSwatch color={selectedColor} radius="xl" />
        </Flex>
      )}
    </div>
  );
}

export default SelectColor;
