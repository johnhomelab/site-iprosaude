import * as migration_20260307_102210 from './20260307_102210';
import * as migration_20260309_151812 from './20260309_151812';
import * as migration_20260310_021050 from './20260310_021050';
import * as migration_20260310_161751 from './20260310_161751';
import * as migration_20260310_164357 from './20260310_164357';

export const migrations = [
  {
    up: migration_20260307_102210.up,
    down: migration_20260307_102210.down,
    name: '20260307_102210',
  },
  {
    up: migration_20260309_151812.up,
    down: migration_20260309_151812.down,
    name: '20260309_151812',
  },
  {
    up: migration_20260310_021050.up,
    down: migration_20260310_021050.down,
    name: '20260310_021050',
  },
  {
    up: migration_20260310_161751.up,
    down: migration_20260310_161751.down,
    name: '20260310_161751',
  },
  {
    up: migration_20260310_164357.up,
    down: migration_20260310_164357.down,
    name: '20260310_164357'
  },
];
