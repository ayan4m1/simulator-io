import BoardIO from 'board-io';

import logging from './logging';

export class SimulatorIO extends BoardIO {
  constructor(options = {}) {
    super({ quiet: true });

    const { _pins: pins, MODES: modes } = this;
    const pinCount = 40;
    const mappedPins = Array.from(Array(pinCount).keys()).map(i => ({
      supportedModes: [modes.INPUT, modes.OUTPUT, modes.ANALOG],
      mode: modes.INPUT,
      value: 0,
      report: 1,
      analogChannel: i
    }));

    pins.push.apply(pins, mappedPins);

    this.log = logging({
      category: 'sim',
      ...options.logging
    });
    this.emit('connect');
    this.emit('ready');

    this.supportsMode = ::this.supportsMode;
    this.logCall = ::this.logCall;
    this.analogRead = ::this.analogRead;
    this.analogWrite = ::this.analogWrite;
    this.servoWrite = ::this.servoWrite;
    this.pinMode = ::this.pinMode;
    this.digitalWrite = ::this.digitalWrite;
    this.digitalRead = ::this.digitalRead;
    this.queryCapabilities = ::this.queryCapabilities;
    this.queryAnalogMapping = ::this.queryAnalogMapping;
    this.queryPinState = ::this.queryPinState;
    this.sendI2CConfig = ::this.sendI2CConfig;
    this.i2cConfig = ::this.i2cConfig;
    this.sendI2CWriteRequest = ::this.sendI2CWriteRequest;
  }

  supportsMode(pinNumber, mode) {
    const pin = this.pins[pinNumber];

    if (!pin) {
      return false;
    }

    const { supportedModes } = pin;

    return supportedModes.indexOf(mode) !== -1;
  }

  logCall(method, ...args) {
    const argString = args.reduce((previous, current) => {
      if (current.call) {
        return previous;
      }

      return previous ? `${previous}, ${current}` : current;
    });

    this.log.info(`${method} called with arguments: [${argString}]`);
  }

  analogRead(pin, callback) {
    this.logCall('analogRead', pin, callback);

    callback();
  }

  analogWrite(pin, value) {
    this.logCall('analogWrite', pin, value);
  }

  servoWrite(pin, value) {
    this.logCall('servoWrite', pin, value);
  }

  pinMode(pin, mode) {
    if (!this.supportsMode(pin, mode)) {
      this.log.warning(`Pin ${pin} does not support ${mode}!`);
      return;
    }

    this.logCall('pinMode', pin, mode);
  }

  digitalWrite(pin, value) {
    this.logCall('digitalWrite', pin, value);
  }

  digitalRead(pin, callback) {
    this.logCall('digitalRead', pin, callback);

    callback();
  }

  queryCapabilities(callback) {
    this.logCall('queryCapabilities', callback);

    callback();
  }

  queryAnalogMapping(callback) {
    this.logCall('queryAnalogMapping', callback);

    callback();
  }

  queryPinState(pin, callback) {
    this.logCall('queryPinState', pin, callback);

    callback();
  }

  sendI2CConfig() {
    this.logCall('sendI2CConfig');
  }

  i2cConfig(delay) {
    this.logCall('i2cConfig', delay);
  }

  sendI2CWriteRequest() {
    this.logCall('sendI2CWriteRequest');
  }

  // i2cWrite() {}

  // i2cWriteReg(slaveAddress, register, bytes) {}

  // sendI2CReadRequest(slaveAddress, numBytes, callback) {}

  // i2cRead() {}

  // i2cReadOnce() {}

  // serialConfig(opts) {}

  // serialWrite(portId, inBytes) {}

  // serialRead(portId, maxBytesToRead, callback) {}

  // serialStop(portId) {}

  // serialClose(portId) {}

  // serialFlush(portId) {}

  // serialListen(portId) {}

  // setSamplingInterval(interval) {}

  // reportAnalogPin(pin, value) {}

  // reportDigitalPin(pin, value) {}

  // pulseIn(opts, callback) {}

  // stepperConfig(
  //   deviceNum,
  //   type,
  //   stepsPerRev,
  //   dirOrMotor1Pin,
  //   stepOrMotor2Pin,
  //   motor3Pin,
  //   motor4Pin
  // ) {}

  // stepperStep(deviceNum, direction, steps, speed, accel, decel, callback) {}

  // reset() {}

  // sendOneWireConfig(pin, enableParasiticPower) {}

  // sendOneWireSearch(pin, callback) {}

  // sendOneWireAlarmsSearch(pin, callback) {}

  // sendOneWireRead(pin, device, numBytesToRead, callback) {}

  // sendOneWireReset(pin) {}

  // sendOneWireWrite(pin, device, data) {}

  // sendOneWireDelay(pin, delay) {}

  // sendOneWireWriteAndRead(pin, device, data, numBytesToRead, callback) {}
}
