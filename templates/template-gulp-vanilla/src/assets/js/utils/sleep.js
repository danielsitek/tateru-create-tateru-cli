/**
 * Simple promise wait.
 *
 * @param time [number]
 */

export const sleep = (time) => new Promise(resolve => setTimeout(resolve, time));
