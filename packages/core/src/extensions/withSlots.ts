import { type NamedExoticComponent } from 'react';

import { bricksToMap, type NamedComponent } from '../components';

export type Slot = [string, 'inherit' | NamedExoticComponent[]];
export type Slots = Record<Slot[0], Slot[1]>;

export const withSlots = <S extends Slots>(slots: S) => ({
  slots: Object.entries(slots).reduce((acc, [key, bricks]) => ({
    ...acc,
    [key]: bricksToMap(bricks),
  }), {}),
});

type WithSlots = {
  slots: Record<string, 'inherit' | Record<string, NamedComponent>>;
};

export const hasSlots = (Component: unknown): Component is WithSlots =>
  Boolean(
    (typeof Component === 'function' || typeof Component === 'object')
    && Component
    && 'slots' in Component
    && typeof Component.slots === 'object'
    && Component.slots,
  );