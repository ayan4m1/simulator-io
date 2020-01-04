import BoardIO from 'board-io';

export default class SimulatorIO extends BoardIO {
  constructor(path, callback) {
    super({ quiet: true });

    const { _pins: pins, MODES: modes } = this;
    const allModes = [modes.INPUT, modes.OUTPUT, modes.ANALOG];

    pins.push(
      {
        supportedModes: allModes,
        mode: modes.INPUT,
        value: 0,
        report: 1,
        analogChannel: 0
      },
      {
        supportedModes: allModes,
        mode: modes.INPUT,
        value: 0,
        report: 1,
        analogChannel: 2
      }
    );

    process
      .nextTick(async () => {
        this.emit('connect');
        this.emit('ready');
        callback();
      })
      .bind(this);
  }

  digitalWrite(pin, value) {
    // eslint-disable-next-line
    console.log(`called digitalWrite with pin ${pin} and value ${value}`);
  }
}
