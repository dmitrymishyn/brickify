import { FC, forwardRef } from 'react';

import { Spread } from '@/shared/utils';

import { Brick } from '../brick';

export const extend = <InputComponent extends Brick<any>, Parts extends object[]>(
  brick: InputComponent,
  ...parts: Parts
): InputComponent & Spread<Parts> => {
  const config = Object.assign(
    { displayName: brick.displayName || brick.name },
    ...parts,
  );

  const newBrick = typeof brick === 'function'
    ? brick.bind(null)
    // If it's a forwardRef we need to handle render function that isn't described in
    // the types
    : forwardRef((props, ref) => (brick as { render: FC<unknown> }).render(props, ref));

  // We need to exclude render fn from the old ForwardedRef component
  const { render, ...oldBrick } = brick as unknown as { render: FC<unknown> };

  return Object.assign(newBrick, oldBrick, config);
};
