export class ZohalError extends Error {
  constructor(
    readonly message: string,
    readonly errorCode: string | number,
  ) {
    super(message);
  }
}
