/**
 * Generic exception class to extend with custom errors.
 * Can be used as a stand-alone exception.
 */
export class Exception extends Error {
  constructor(message?: string) {
    super(message);

    // This is needed to dynamically set the error name
    // Otherwise it's always 'Error' for typescript versions < 3.7
    this.name = this.constructor.name;
  }
}
