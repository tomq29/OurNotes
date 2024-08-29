import { ActionIcon, Text, Tooltip } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useEffect, useState } from "react";
import { IconFriendsOff } from "@tabler/icons-react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../App/providers/store/store";
import { rejectPair } from "../../../Entities/User/model/CurrentUserSlice";

function ModalDeletePair() {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const currentPair = useAppSelector((store) => store.currentUserStore.pair);
  const dispatch = useAppDispatch();

  const noDeletePairHandler = () => {
    setOpenDeleteModal(false);
  };

  const deletePairHandler = async () => {
    if (currentPair?.id) {
      try {
        dispatch(rejectPair(currentPair.id));
      } catch (error) {
        console.error("Error deleting pair:", error);
        // Display error to the user
      }
    }
  };

  const openModal = () => {
    modals.openConfirmModal({
      title: "Вы уверены, что хотите удалить пару?",
      size: "sm",
      radius: "md",
      withCloseButton: false,
      children: (
        <Text size="sm" className="confirm-pair-text" ta={"center"}>
          Удалить пару с пользователем?
          <br />
          <Text>
            Внимание! Все ранее созданные заметки и события будут удалены!{" "}
          </Text>
        </Text>
      ),
      confirmProps: { color: "red" },
      labels: {
        confirm: "Удалить пару",
        cancel: "Оставить пару",
      },
      onCancel: noDeletePairHandler, // Simplified function reference
      onConfirm: deletePairHandler, // Simplified function reference
    });
  };

  return (
    <Tooltip label="Удалить пару">
      <ActionIcon variant="subtle" color="red" onClick={openModal}>
        <IconFriendsOff stroke={1} />
      </ActionIcon>
    </Tooltip>
  );
}

export default ModalDeletePair;
