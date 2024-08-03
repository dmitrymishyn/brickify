import { type Change } from '../changes';
import { type BrickStore } from '../hooks';

export type ResultsCallback = {
  (name: string): unknown;
  (results: Record<string, unknown>): void;
};

export type RangeCallback = (range?: Range) => Range | null;

export type OnChange = (...changes: Change[]) => void;

export type HandleCommandOptions = {
  originalEvent: KeyboardEvent,
  target: Node;
  descendants: Node[];
  results: ResultsCallback;
  range: RangeCallback;
  cache: BrickStore['get'];
  onChange: (...changes: Change[]) => void;
};

export type HandleCommand = (options: HandleCommandOptions) => void;

export type CommandObject<Name extends string> = {
  name: Name;
  shortcuts?: string[];
  handle?: HandleCommand;
};

export type CommandFn = HandleCommand;

export type Command<Name extends string = string> =
  | CommandObject<Name>
  | CommandFn;
