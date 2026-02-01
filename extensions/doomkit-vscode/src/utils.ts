import type { Engine } from './data';
import { Engines } from './data';

export function isEngine(value: string): value is Engine {
    return (Engines as readonly string[]).includes(value);
}
