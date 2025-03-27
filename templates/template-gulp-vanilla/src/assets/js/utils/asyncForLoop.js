/**
 * Create truly async loop over the collection of items.
 * @param {array} collection Array of items.
 * @param {function} cb Callback function.
 */

export const asyncForLoop = async (collection, cb) => {
  const _this = this;
  for (let item of collection) {
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          cb.call(_this, item);
          resolve();
        } catch (e) {
          reject(e);
        }
      }, 0);
    });
  }
};
