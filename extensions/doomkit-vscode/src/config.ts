import * as vscode from 'vscode';
import type { Engine } from './data';

const _section = 'doomLanguage';

export function getEngine(): Engine {
    return vscode.workspace.getConfiguration(_section).get<Engine>('engine', 'uzdoom');
}

export async function setEngine(engine: Engine): Promise<void> {
    await vscode.workspace
        .getConfiguration(_section)
        .update('engine', engine, vscode.ConfigurationTarget.Global);
}
