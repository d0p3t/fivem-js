# fivem-js

[![HitCount](http://hits.dwyl.io/d0p3t/fivem-js.svg)](http://hits.dwyl.io/d0p3t/fivem-js)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/d0p3t/fivem-js/issues)
[![CircleCI](https://circleci.com/gh/d0p3t/fivem-js.svg?style=svg)](https://circleci.com/gh/d0p3t/fivem-js)

[![https://nodei.co/npm/fivem-js.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/fivem-js.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/fivem-js)

_Javascript/Typescript wrapper for the FiveM natives._

Functionality of this wrapper is **based on the FiveM C# wrapper** - [link](https://github.com/citizenfx/fivem/tree/master/code/client/clrcore/External). It's a feature-rich set of helper classes, objects, and functions to help you develop your project faster.

## Features

- One dependency [@citizenfx/client](https://www.npmjs.com/package/@citizenfx/client)
- Abstracts common used FiveM practices
- Entity management through class objects (i.e. `Vehicle` and `Ped` entities)
- UI elements such as `scaleforms` and loading `prompts`
- Audio, Blips, Cameras and more...

In other words, whatever the FiveM C# wrapper can do, this package can as well.

_Note: Not all features are currently available. They will be added as development continues as well as additional language specific features._

## Usage

### Typescript

```typescript
import * as Cfx from 'fivem-js';

RegisterCommand(
  'adder',
  async (source: number, args: string[]) => {
    const vehicle = await Cfx.World.createVehicle(new Cfx.Model('adder'), new Cfx.Vector3(1, 2, 3), 4);
    Cfx.Game.PlayerPed.setIntoVehicle(vehicle, Cfx.VehicleSeat.Driver);
  },
  false,
);
```

You can also individually import classes.

```typescript
import { World } from 'fivem-js/lib/World';
```

### Javascript

```js
/// <reference path="node_modules/fivem-js/lib/index.d.ts"/>
/// <reference path="node_modules/@citizenfx/client/natives_universal.d.ts"/>

const Cfx = require('fivem-js');

RegisterCommand(
  'adder',
  async (source, args) => {
    const vehicle = await Cfx.World.createVehicle(new Cfx.Model('adder'), new Cfx.Vector3(1, 2, 3), 4);
    Cfx.Game.PlayerPed.setIntoVehicle(vehicle, Cfx.VehicleSeat.Driver);
  },
  false,
);
```

### Contributing

You are more than welcome to contribute to this project by submitting a pull request and creating issues.

[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/d0p3t/fivem-js/issues)
