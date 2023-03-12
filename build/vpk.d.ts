declare module 'vpk' {
  export default class VPK {
    constructor(path: string);

    load(): void;
    get files(): string[];

    getFile(path: string): Buffer;
  }
}
