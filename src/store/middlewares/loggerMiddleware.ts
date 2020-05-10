/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { createLogger } from 'redux-logger';

// @ts-ignore
const isDebuggingInChrome = __DEV__ && Boolean(window.navigator.userAgent);

const loggerMiddleware = createLogger({
  predicate: () => isDebuggingInChrome,
  collapsed: true,
  duration: true,
});

export default loggerMiddleware;
