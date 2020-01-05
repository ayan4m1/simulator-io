import five from 'johnny-five';
import logging from './logging';
import { SimulatorIO } from './simulator-io';

jest.mock('./logging', () => {
  const log = {
    info: jest.fn(),
    warning: jest.fn()
  };

  return jest.fn(() => log);
});

const log = logging();

describe('SimulatorIO', () => {
  const callback = jest.fn();
  const setupBoard = (ready = () => {}) => {
    return new Promise((resolve, reject) => {
      try {
        const board = new five.Board({
          io: new SimulatorIO(),
          repl: false
        });

        board.on('ready', () => {
          ready();
          resolve(board);
        });
      } catch (error) {
        reject(error);
      }
    });
  };

  afterEach(() => {
    callback.mockReset();
  });

  it('fires ready event', async () => {
    await setupBoard();
  });

  it('logs analogRead', async () => {
    const board = await setupBoard();

    board.analogRead(1, callback);

    expect(log.info).toHaveBeenCalledWith(
      `analogRead called with arguments: [1]`
    );
    expect(callback).toHaveBeenCalled();
  });

  it('logs digitalWrite', async () => {
    const board = await setupBoard();

    board.digitalWrite(1, 2);

    expect(log.info).toHaveBeenCalledWith(
      `digitalWrite called with arguments: [1, 2]`
    );
  });
});
