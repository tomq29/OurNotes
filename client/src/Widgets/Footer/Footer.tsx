import { Group, rem, Anchor, Text } from '@mantine/core';
import { IconBrandGithub } from '@tabler/icons-react';

import classes from './FooterCentered.module.css';

export function Footer() {
  return (
    <div className={classes.footer}>
      <div className={classes.inner}>
        <Group className={classes.links} gap="xs">
          <Text className={classes.title} >
            Developed by:
          </Text>
          <Text>Igor</Text>
          <Anchor href="https://github.com/IgorPetrov-13" target="_blank">
            <IconBrandGithub
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </Anchor>
          <Text>Tamirlan</Text>
          <Anchor href="https://github.com/tomq29" target="_blank">
            <IconBrandGithub
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </Anchor>
        </Group>
      </div>
    </div>
  );
}
