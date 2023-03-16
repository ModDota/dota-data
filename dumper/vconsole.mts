import * as net from 'net';

export async function connect(port: number): Promise<net.Socket> {
  const MAX_TRIES = 10;
  const RETRY_DELAY = 1000; //ms
  let tries = 0;

  return new Promise((resolve, reject) => {
    const socket = new net.Socket();
    socket.on('connect', () => {
      resolve(socket);
    });
    socket.on('error', (err) => console.log('Socket error: ', err));

    function schedule() {
      setTimeout(() => {
        try {
          socket.connect({ port });
        } catch {
          if (++tries < MAX_TRIES) {
            schedule();
          } else {
            reject('Could not connect after maximum tries');
          }
        }
      }, RETRY_DELAY);
    }
    schedule();
  });
}

const cmndTypeBytes = 'CMND'.split('').map((c) => c.charCodeAt(0));

export async function execute(socket: net.Socket, command: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const version = [0x00, 0xd4, 0x00, 0x00];
    const length = command.length + 12 + 1;
    const byteBuffer = new Uint8Array([
      ...cmndTypeBytes,
      ...version,
      ...encodeUint16(length),
      ...encodeUint16(0),
    ]);

    var headerBuffer = Buffer.from(byteBuffer, 0, 12);
    var commandBuffer = Buffer.from(command + '\0', 'ascii');

    const bufferToSend = Buffer.concat([headerBuffer, commandBuffer], length);

    socket.write(bufferToSend, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

export type MessageCallback = (type: string, channel: number | undefined, message: string) => void;
export function onMessage(socket: net.Socket, cb: MessageCallback): void {
  socket.on('data', (buffer) => {
    decodeChunk(buffer, cb);
  });
}

export async function disconnect(socket: net.Socket): Promise<void> {
  return new Promise((resolve) => {
    socket.on('close', () => {
      resolve();
    });
    socket.destroy();
  });
}

function decodeChunk(data: Buffer, messageCallback: MessageCallback) {
  let chunkOffset = 0;

  while (chunkOffset < data.length) {
    const chunk = data.slice(chunkOffset);

    const header = chunk.slice(0, 12);
    const type = header.toString(undefined, 0, 4);
    const length = (header[8] << 8) + header[9];
    const content = chunk.slice(12, length + 12);

    chunkOffset += length; // Move index to next chunk or end of buffer

    if (type === 'PRNT') {
      const channelId = (content[0] << 24) + (content[1] << 16) + (content[2] << 8) + content[3];
      const msg = content.toString(undefined, 28, length - 12 - 1);
      messageCallback(type, channelId, msg);
    }
  }
}

function encodeUint16(v: number): number[] {
  return [(v >> 8) % 256, v % 256];
}
