import * as vscode from 'vscode';
import { getEngine } from '../config';
import { loadData } from '../dataLoader';
import { getActiveLanguageId } from '../editor';

export function registerDocsSearch(context: vscode.ExtensionContext): void {
    const data = loadData(context);

    context.subscriptions.push(
        vscode.commands.registerCommand('doomLanguage.searchDocs', async () => {
            const engine = getEngine();
            const lang = getActiveLanguageId();

            const items = data.symbols
                .filter((s) => s.docUrl && s.engines.includes(engine) && s.languages.includes(lang))
                .map((s) => ({
                    label: s.name,
                    description: s.signature ?? '',
                    detail: s.docUrl!,
                    symbol: s,
                }));

            const picked = await vscode.window.showQuickPick(items, {
                title: 'Search Doom documentation',
                matchOnDescription: true,
                matchOnDetail: true,
            });

            if (!picked || !picked.symbol.docUrl) return;

            await vscode.env.openExternal(vscode.Uri.parse(picked.symbol.docUrl));
        }),
    );
}
