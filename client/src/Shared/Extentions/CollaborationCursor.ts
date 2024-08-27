// extensions/CollaborationCursor.ts

import { Extension } from '@tiptap/core';
import { DecorationAttrs } from '@tiptap/pm/view';
import { defaultSelectionBuilder, yCursorPlugin } from 'y-prosemirror';

type CollaborationCursorStorage = {
  users: { clientId: number; [key: string]: any }[];
};

export interface CollaborationCursorOptions {
  provider: any; // Adjust this to use your specific provider type
  user: Record<string, any>; // User details, customizable
  render(user: Record<string, any>): HTMLElement;
  selectionRender(user: Record<string, any>): DecorationAttrs;
  onUpdate: (users: { clientId: number; [key: string]: any }[]) => null;
}

const awarenessStatesToArray = (states: Map<number, Record<string, any>>) => {
  return Array.from(states.entries()).map(([key, value]) => {
    return {
      clientId: key,
      ...value.user,
    };
  });
};

const defaultOnUpdate = () => null;

export const CollaborationCursor = Extension.create<
  CollaborationCursorOptions,
  CollaborationCursorStorage
>({
  name: 'collaborationCursor',

  priority: 999,

  addOptions() {
    return {
      provider: null,
      user: {
        name: null,
        color: null,
      },
      render: (user) => {
        const cursor = document.createElement('span');
        cursor.classList.add('collaboration-cursor__caret');
        cursor.style.borderColor = user.color;

        const label = document.createElement('div');
        label.classList.add('collaboration-cursor__label');
        label.style.backgroundColor = user.color;
        label.textContent = user.name;

        cursor.appendChild(label);
        return cursor;
      },
      selectionRender: defaultSelectionBuilder,
      onUpdate: defaultOnUpdate,
    };
  },

  onCreate() {
    if (this.options.onUpdate !== defaultOnUpdate) {
      console.warn(
        '[tiptap warn]: DEPRECATED: The "onUpdate" option is deprecated. Please use `editor.storage.collaborationCursor.users` instead. Read more: https://tiptap.dev/api/extensions/collaboration-cursor'
      );
    }
    if (!this.options.provider) {
      throw new Error(
        'The "provider" option is required for the CollaborationCursor extension'
      );
    }
  },

  addStorage() {
    return {
      users: [],
    };
  },

  addCommands() {
    return {
      updateUser: (attributes) => () => {
        this.options.user = attributes;
        this.options.provider.awareness.setLocalStateField('user', this.options.user);
        return true;
      },
      user: (attributes) => ({ editor }) => {
        console.warn(
          '[tiptap warn]: DEPRECATED: The "user" command is deprecated. Please use "updateUser" instead. Read more: https://tiptap.dev/api/extensions/collaboration-cursor'
        );
        return editor.commands.updateUser(attributes);
      },
    };
  },

  addProseMirrorPlugins() {
    return [
      yCursorPlugin(
        (() => {
          this.options.provider.awareness.setLocalStateField('user', this.options.user);
          this.storage.users = awarenessStatesToArray(this.options.provider.awareness.states);
          this.options.provider.awareness.on('update', () => {
            this.storage.users = awarenessStatesToArray(this.options.provider.awareness.states);
          });
          return this.options.provider.awareness;
        })(),
        {
          cursorBuilder: this.options.render,
          selectionBuilder: this.options.selectionRender,
        }
      ),
    ];
  },
});
