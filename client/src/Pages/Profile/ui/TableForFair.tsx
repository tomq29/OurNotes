import { Avatar, Badge, Table, Group, Text } from "@mantine/core";
import { useAppSelector } from "../../../App/providers/store/store";
import type { User } from "../../../Entities/User/type/UserType";
import { useEffect, useState } from "react";
import UsersApi from "../../../Entities/User/api/UsersApi";

function TableForFair(): JSX.Element {
  const currentPair = useAppSelector((store) => store.currentUserStore.pair);
  const [firstUser, setFirstUser] = useState<User>({} as User);
  const [secondUser, setSecondUser] = useState<User>({} as User);
  // const avatar =
  //   'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png';

  const getUsers = () => {
    if (currentPair) {
      UsersApi.getUser(currentPair.userOneID).then((data) => {
        setFirstUser(data.user);
      });
      UsersApi.getUser(currentPair.userTwoID).then((data) => {
        setSecondUser(data.user);
      });
    }
  };

  useEffect(() => {
    getUsers();
  }, [currentPair]);

  return (
    <>
      <h2>Актуальная пара</h2>

      <Table verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Участник-1</Table.Th>
            <Table.Th>Участник-2</Table.Th>
            <Table.Th>Статус</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <Table.Tr>
            <Table.Td>
              <Group gap="sm">
                {firstUser.login && (
                  <Avatar
                    name={firstUser?.login}
                    color="initials"
                    radius={40}
                    size={40}
                  >
                    {firstUser?.login.charAt(0).toUpperCase()}
                  </Avatar>
                )}

                <div>
                  <Text fz="sm" fw={500}>
                    {firstUser.login}
                  </Text>
                  <Text fz="xs" c="dimmed">
                    {firstUser.email}
                  </Text>
                </div>
              </Group>
            </Table.Td>

            <Table.Td>
              <Group gap="sm">
                {secondUser.login && (
                  <Avatar
                    name={secondUser?.login}
                    color="initials"
                    radius={40}
                    size={40}
                  >
                    {secondUser?.login.charAt(0).toUpperCase()}
                  </Avatar>
                )}

                <div>
                  <Text fz="sm" fw={500}>
                    {secondUser.login}
                  </Text>
                  <Text fz="xs" c="dimmed">
                    {secondUser.email}
                  </Text>
                </div>
              </Group>
            </Table.Td>

            <Table.Td>
              {currentPair?.status === "active" ? (
                <Badge color="green">Пара активна</Badge>
              ) : (
                <Badge color="gray" variant="light">
                  Ожидание подтверждения
                </Badge>
              )}
            </Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
    </>
  );
}
export default TableForFair;
