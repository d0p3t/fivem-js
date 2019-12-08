<h1 align="center">fivem-js</h1>

<p align="center">
  <i>:fire: A Javascript/Typescript wrapper for the FiveM natives :video_game:</i>
  <br>
  <br>
  <a href="https://github.com/d0p3t/fivem-js/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat" alt="License: MIT">
  </a>
  <a href="https://www.npmjs.com/package/fivem-js">
    <img src="https://img.shields.io/npm/v/fivem-js?style=flat" alt="npm version">
  </a>
  <a href="https://www.npmjs.com/package/fivem-js">
    <img src="https://img.shields.io/npm/dm/fivem-js?style=flat">
  </a>
  <a href="https://circleci.com/gh/d0p3t/fivem-js">
    <img src="https://img.shields.io/circleci/build/github/d0p3t/fivem-js" alt="Build Status">
  </a>
  <a href="https://github.com/d0p3t/fivem-js/commits/master">
    <img src="https://img.shields.io/github/last-commit/d0p3t/fivem-js.svg?style=flat" alt="Last commit">
  </a>
  <a href="https://discord.d0p3t.nl">
    <img src="https://img.shields.io/discord/330910293934997504?label=Discord" alt="Discord">
  </a>
</p>

<p align="center">
  <a href="https://d0p3t.nl/">Website</a>
  -
  <a href="https://d0p3t.nl/">Documentation</a>
  -
  <a href="https://forum.fivem.net/t/fivem-js-v1-3-2-javascript-typescript-wrapper-now-with-menu-class-nativeui/268640">Forum</a>
  -
  <a href="https://discord.d0p3t.nl">Discord</a>
</p>

Functionality of this wrapper is **based on the FiveM C# wrapper** - [link](https://github.com/citizenfx/fivem/tree/master/code/client/clrcore/External). It's a feature-rich set of helper classes, objects, and functions to help you develop your project faster.

## Features

- One dependency [@citizenfx/client](https://www.npmjs.com/package/@citizenfx/client)
- Abstracts common used FiveM practices
- Entity management through class objects (i.e. `Vehicle` and `Ped` entities)
- UI elements such as `scaleforms` and loading `prompts`
- Audio, Blips, Cameras and more...

In other words, whatever the FiveM C# wrapper can do, this package can as well and more!

## Download & Install

`npm i fivem-js`

https://www.npmjs.com/package/fivem-js


## Simple Usage

See [here](https://github.com/d0p3t/fivem-js/tree/master/examples) for example projects.

### Typescript

```typescript
import * as Cfx from 'fivem-js';

RegisterCommand(
  'adder',
  async (source: number, args: string[]) => {
    const vehicle = await Cfx.World.createVehicle(
      new Cfx.Model('adder'),
      new Cfx.Vector3(1, 2, 3),
      4,
    );
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
    const vehicle = await Cfx.World.createVehicle(
      new Cfx.Model('adder'),
      new Cfx.Vector3(1, 2, 3),
      4,
    );
    Cfx.Game.PlayerPed.setIntoVehicle(vehicle, Cfx.VehicleSeat.Driver);
  },
  false,
);
```

## Community Chat

You can join our public help Discord [here](https://discord.d0p3t.nl)

## Contributing

You are more than welcome to contribute to this project by submitting a pull request and creating issues.

[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/d0p3t/fivem-js/issues)

## License

MIT with customization. See [LICENSE](https://github.com/d0p3t/fivem-js/blob/master/LICENSE)
