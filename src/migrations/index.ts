import * as migration_20260307_102210 from './20260307_102210';

export const migrations = [
  {
    up: migration_20260307_102210.up,
    down: migration_20260307_102210.down,
    name: '20260307_102210'
  },
];
