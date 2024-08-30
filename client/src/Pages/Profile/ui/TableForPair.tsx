import { Avatar, Badge, Table, Group, Text } from '@mantine/core';
import { useAppSelector } from '../../../App/providers/store/store';
import type { User } from '../../../Entities/User/type/UserType';
import { useEffect, useState } from 'react';
import UsersApi from '../../../Entities/User/api/UsersApi';
import { getColorByID } from '../../../utils/getColorByID/getColorByID';
import ModalDeletePair from './ModalDeletePair';

function TableForPair(): JSX.Element {
  const currentPair = useAppSelector((store) => store.currentUserStore.pair);
  const currentUser = useAppSelector((state) => state.currentUserStore.user);

  const [inviter, setInviter] = useState<User>({} as User);
  const [invitee, setInvitee] = useState<User>({} as User);

  const getUsers = () => {
    if (currentPair && currentUser) {
      // Determine who is the inviter (userOne) and invitee (userTwo)
      const isCurrentUserInviter = currentUser.id === currentPair.userOneID;

      if (isCurrentUserInviter) {
        setInviter(currentUser);
        UsersApi.getUser(currentPair.userTwoID).then((data) => {
          setInvitee(data.user);
        });
      } else {
        setInvitee(currentUser);
        UsersApi.getUser(currentPair.userOneID).then((data) => {
          setInviter(data.user);
        });
      }
    }
  };

  useEffect(() => {
    getUsers();
  }, [currentPair, currentUser]);

  return (
    <>
      <h2>Актуальная пара</h2>

      <Table verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Участник-1</Table.Th>
            <Table.Th>Участник-2</Table.Th>
            <Table.Th>Статус</Table.Th>
            <Table.Th>Действия</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <Table.Tr>
            <Table.Td>
              <Group gap="sm">
                {inviter.login && (
                  <Avatar
                    name={inviter.login}
                    color={getColorByID(inviter.colorID)}
                    radius="xl"
                    size={40}
                    variant="filled"
                  >
                    {inviter.login.charAt(0).toUpperCase()}
                  </Avatar>
                )}
                <div>
                  <Text fz="sm" fw={500}>
                    {inviter.login}
                  </Text>
                  <Text fz="xs" c="dimmed">
                    {inviter.email}
                  </Text>
                </div>
              </Group>
            </Table.Td>

            <Table.Td>
              <Group gap="sm">
                {invitee.login && (
                  <Avatar
                    name={invitee.login}
                    color={getColorByID(invitee.colorID)}
                    radius="xl"
                    size={40}
                    variant="filled"
                  >
                    {invitee.login.charAt(0).toUpperCase()}
                  </Avatar>
                )}
                <div>
                  <Text fz="sm" fw={500}>
                    {invitee.login}
                  </Text>
                  <Text fz="xs" c="dimmed">
                    {invitee.email}
                  </Text>
                </div>
              </Group>
            </Table.Td>

            <Table.Td>
              {currentPair?.status === 'active' ? (
                <Badge color="green">Пара активна</Badge>
              ) : (
                <Badge color="gray" variant="light">
                  Ожидание подтверждения
                </Badge>
              )}
            </Table.Td>
            <Table.Td>
              <ModalDeletePair />
            </Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
    </>
  );
}
export default TableForPair;
