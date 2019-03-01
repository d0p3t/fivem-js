var Cfx = require('fivem-js');

RegisterCommand(
  'adder',
  async (source, args) => {
    const playerCoords = Cfx.Game.PlayerPed.Position;
    const vehicle = await Cfx.World.CreateVehicle(new Cfx.Model('adder'), playerCoords, 4);
    Cfx.Game.PlayerPed.SetIntoVehicle(vehicle, Cfx.VehicleSeat.Driver);
  },
  false,
);
