import type * as vscode from 'vscode';
import { registerCompletion } from './providers/completion';
import { registerDocsSearch } from './providers/docsSearch';
import { registerHover } from './providers/hover';
import { registerUi } from './ui';

export function activate(context: vscode.ExtensionContext): void {
    registerUi(context);

    registerCompletion(context);
    registerHover(context);
    registerDocsSearch(context);
}

export function deactivate(): void {}
