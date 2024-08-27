import { Group, rem, Anchor, Text } from "@mantine/core";
import { IconBrandGithub } from "@tabler/icons-react";

import classes from "./FooterCentered.module.css";

export function Footer() {
  // Get the current year
  const currentYear = new Date().getFullYear();

  return (
    <div className={classes.footer}>
      <div className={classes.inner}>
        <Group className={classes.links} gap="xs">
          <Text className={classes.title}>Разработчики:</Text> {/* "Developed by:" in Russian */}
          <Text>Игорь</Text>
          <Anchor href="https://github.com/IgorPetrov-13" target="_blank">
            <IconBrandGithub
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </Anchor>
          <Text>Тамирлан</Text>
          <Anchor href="https://github.com/tomq29" target="_blank">
            <IconBrandGithub
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </Anchor>
          {/* Add copyright label and current year in Russian */}
          <Text>© {currentYear} Все права защищены</Text> {/* "All rights reserved" in Russian */}
        </Group>
      </div>
    </div>
  );
}
