class Logger {
  constructor () {
    this.enabled = false;
  }
  get debug () {
    return !this.enabled ? Function.prototype : console.debug;
  }
  get info () {
    return !this.enabled ? Function.prototype : console.info;
  }
  get log () {
    return !this.enabled ? Function.prototype : console.log;
  }
  get warn () {
    return !this.enabled ? Function.prototype : console.warn;
  }
  get error () {
    return !this.enabled ? Function.prototype : console.error;
  }
}
export default new Logger;
