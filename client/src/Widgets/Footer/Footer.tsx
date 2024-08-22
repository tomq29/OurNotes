import { Group, rem } from '@mantine/core';
import { IconBrandGithub } from '@tabler/icons-react';

import classes from './FooterCentered.module.css';

export function Footer() {
  return (
    <div className={classes.footer}>
      <div className={classes.inner}>
        <Group className={classes.links} gap="xs">
          <IconBrandGithub
            style={{ width: rem(18), height: rem(18) }}
            stroke={1.5}
          />
        </Group>
      </div>
    </div>
  );
}
