import * as Cfx from 'fivem-js';

RegisterCommand(
  'adder',
  async (source, args) => {
    const playerCoords = Cfx.Game.PlayerPed.Position;
    const vehicle = await Cfx.World.createVehicle(new Cfx.Model('adder'), playerCoords, 4);
    Cfx.Game.PlayerPed.setIntoVehicle(vehicle, Cfx.VehicleSeat.Driver);
  },
  false,
);
