import { ColorSwatch, Flex, Select } from '@mantine/core';
import { useEffect, useState } from 'react';
import ColorsApi from '../../../Entities/Colors/api/ColorsApi';
import type { UserID } from '../../../Entities/User/type/UserType';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../App/providers/store/store';
import { updateUserColor } from '../../../Entities/User/model/CurrentUserSlice';
import Spinner from '../../../Shared/LoadingSpinner/Spinner';

function SelectColor(): JSX.Element {
  const currentUser = useAppSelector((store) => store.currentUserStore.user);
  const [colors, setColors] = useState<
    {
      value: string;
      label: string;
      title: string;
    }[]
  >([]);
  const [selectedColor, setSelectedColor] = useState<string | null>(null); // Store the color code here
  const [selectedColorValue, setSelectedColorValue] = useState<string | null>(null); // Store the color ID here
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  const getColors = async () => {
    try {
      const data = await ColorsApi.getColors();
      const formattedColors = data.map((color) => ({
        value: String(color.id),
        label: color.color, // Assuming this is the color code, like #FFFFFF
        title: color.title,
      }));

      setColors(formattedColors);

      if (currentUser?.colorID) {
        // Find the user's color by ID
        const userColor = formattedColors.find(
          (color) => color.value === String(currentUser.colorID)
        );
        if (userColor) {
          setSelectedColor(userColor.label); // Set the color code (e.g., #FFFFFF)
          setSelectedColorValue(userColor.value); // Set the color ID (e.g., "9")
        }
      }
    } catch (error) {
      console.error('Error fetching colors:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getColors();
  }, [currentUser?.id]); // Load colors when currentUser changes

  const handleColorChange = (value: string | null): void => {
    if (value) {
      const currentColor = colors.find((color) => color.value === value);
      if (currentColor) {
        setSelectedColor(currentColor.label); // Set the color code
        setSelectedColorValue(currentColor.value); // Set the color ID
        if (currentUser) {
          updateColorInDatabase(value, currentUser.id);
        }
      }
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

  return (
    <div>
      <h2>Выберите цвет текста</h2>
      {loading ? (
        <Spinner />
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
            value={selectedColorValue} // Use color ID for the Select component
            radius="xl"
            searchable
            clearable
          />
          <ColorSwatch color={selectedColor || '#D3D3D3'} radius="xl" /> {/* Use selectedColor for ColorSwatch */}
        </Flex>
      )}
    </div>
  );
}

export default SelectColor;
