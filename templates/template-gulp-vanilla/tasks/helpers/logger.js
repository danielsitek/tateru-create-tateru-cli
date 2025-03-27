const log = require('fancy-log');

const TYPE_INFO = 'Info';
const TYPE_ERROR = 'Error';
const TYPE_WARNING = 'Warning';

class Logger {
  constructor(options) {
    this.namespace = options.namespace;
  }

  /**
   * 
   * @param {String} msg 
   * @returns this
   */
  info(msg) {
    this._log(TYPE_INFO, msg);
    return this;
  }

  /**
   * 
   * @param {String} msg 
   * @returns this
   */
  error(msg) {
    this._log(TYPE_ERROR, msg);
    return this;
  }

  /**
   * 
   * @param {String} msg 
   * @returns this
   */
  warning(msg) {
    this._log(TYPE_WARNING, msg);
    return this;
  }

  /**
   * 
   * @param {String} msg 
   * @returns this
   */
  custom(options, msg) {
    this._log(options.type, msg);
    return this;
  }

  /**
   * @private
   * @param {String} type 
   * @param {String} line 
   */
  _logLine(type, line) {
    let logLine = `${type}: ${line}`;
  
    if (this.namespace) {
      logLine = `[${this.namespace}] ${logLine}`;
    }

    log(logLine);
  }

  /**
   * @private
   * @param {String} type 
   * @param {String} msg 
   */
  _log(type, msg) {
    msg.split('\n').forEach((line) => {
      this._logLine(type, line);
    })
  }
}

module.exports = Logger;
