/**
 * Created by OS on 3/28/15.
 */
function Exception(message) {
    this.message = message;
    this.stack = (new Error()).stack;
}
Exception.prototype = Object.create(Error.prototype);
Exception.prototype.constructor = Exception;
Exception.prototype.name = "Exception";

module.exports = Exception;