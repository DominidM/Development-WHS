import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

// Polyfills para TextEncoder/TextDecoder
const g = global as unknown as {
  TextEncoder: typeof TextEncoder;
  TextDecoder: typeof TextDecoder;
};
g.TextEncoder = TextEncoder;
g.TextDecoder = TextDecoder;