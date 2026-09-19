import { TextDecoder, TextEncoder } from 'node:util';

// react-router v7 needs these at import time; jsdom doesn't provide them.
Object.assign(globalThis, { TextEncoder, TextDecoder });
