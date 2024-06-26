import React, { type PropsWithChildren } from 'react';

import {
  extend,
  type PropsWithBrick,
  type PropsWithChange,
  slots,
  useMutation,
} from '../bricks';

type Props = PropsWithChildren & PropsWithBrick & PropsWithChange;

const Container: React.FC<Props> = ({ children, onChange }) => {
  const mutationRef = useMutation<HTMLDivElement>({
    mutate({ remove }) {
      if (remove) {
        return onChange?.({ type: 'remove' });
      }

      return undefined;
    },
  });

  return (
    <div ref={mutationRef} style={{ margin: '0 auto', maxWidth: 600 }}>
      {children}
    </div>
  );
};

Container.displayName = 'Container';

export default extend(
  Container,
  slots({ children: 'inherit' }),
);
