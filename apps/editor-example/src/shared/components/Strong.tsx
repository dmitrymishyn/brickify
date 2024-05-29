import { compile } from 'css-select';
import React, { PropsWithChildren } from 'react';

import { extend } from '@/shared/bricks';

const Strong: React.FC<PropsWithChildren> = ({ children }) => (
  <strong>{children}</strong>
);

export default extend(Strong, { is: compile('strong') });
