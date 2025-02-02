export class ABIError extends Error {
    constructor(message) {
        super(message);
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, ABIError.prototype);
    }
}
export class ABINotFound extends Error {
    constructor(message) {
        super(message);
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, ABINotFound.prototype);
    }
}
