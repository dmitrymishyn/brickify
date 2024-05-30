import { pipe } from 'fp-ts/lib/function';
import * as I from 'fp-ts/lib/Identity';

import { clearNodes } from './clearNodes';
import { Component } from './models';
import { prepareRange } from './prepareRange';
import { wrapToNode } from './wrapToNode';
import { createRange } from '../selection';
import { getSibling } from '../traverse';

const surroundAscendedUntilPath = (
  startNode: Node,
  container: Node,
  { component, ltr = false }: {
    component: Component;
    ltr?: boolean;
  },
) => {
  let current: Node | null = startNode;

  do {
    const parent: Node | null = current?.parentNode;

    if (!parent || !current) { break; }

    if (parent === container || current === container) {
      return current;
    }

    if ((ltr && parent.firstChild === current) || (!ltr && parent.lastChild === current)) {
      current = parent;
      // eslint-disable-next-line no-continue
      continue;
    }

    const wrapper = component.create();
    wrapToNode(wrapper, current, null, ltr);
    clearNodes(wrapper, component.selector);

    while (current && !getSibling(current, ltr) && current.parentNode !== container) {
      current = current?.parentNode ?? null;
    }

    current = getSibling(current, ltr);
  } while (current);

  return current;
};

export const surround = (
  component: Component,
  inputRange: Range,
) => (inputRange.collapsed ? inputRange : pipe(
  prepareRange(inputRange),
  ({ startContainer, endContainer, commonAncestorContainer }) => pipe(
    I.Do,
    I.bind('start', () => surroundAscendedUntilPath(
      startContainer,
      commonAncestorContainer,
      { component, ltr: true },
    )),
    I.bind('end', () => surroundAscendedUntilPath(
      endContainer,
      commonAncestorContainer,
      { component, ltr: false },
    )),
    ({ start, end }) => {
      if (start?.parentElement) {
        const wrapper = component.create();
        wrapToNode(wrapper, start, end);
        clearNodes(wrapper, component.selector);
      }
      return { startContainer, endContainer };
    },
  ),
  ({ startContainer, endContainer }) => createRange(startContainer, endContainer),
));
