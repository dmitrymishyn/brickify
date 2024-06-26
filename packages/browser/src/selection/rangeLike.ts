import { flow } from 'fp-ts/lib/function';
import * as O from 'fp-ts/lib/Option';

import { getRange } from './range';

export type RangeLike = Pick<
  Range,
  'startContainer' | 'endContainer' | 'startOffset' | 'endOffset'
>;

export const getRangeLike = flow(
  getRange,
  O.fromNullable,
  O.map(({ startContainer, startOffset, endContainer, endOffset }): RangeLike => ({
    startContainer,
    startOffset,
    endContainer,
    endOffset,
  })),
  O.toNullable,
);

export const fromRangeLike = flow(
  O.fromNullable<RangeLike | null | undefined>,
  O.map((rangeLike: RangeLike) => {
    const range = new Range();
    range.setStart(rangeLike.startContainer, rangeLike.startOffset);
    range.setEnd(rangeLike.endContainer, rangeLike.endOffset);
    return range;
  }),
  O.toNullable,
);

export const toRangeLike = flow(
  O.fromNullable<RangeLike | null | undefined>,
  O.map((rangeLike: RangeLike) => {
    const range = new Range();
    range.setStart(rangeLike.startContainer, rangeLike.startOffset);
    range.setEnd(rangeLike.endContainer, rangeLike.endOffset);
    return range;
  }),
  O.toNullable,
);
