import * as vscode from "vscode";
import { loadData } from "../dataLoader";
import { getEngine } from "../config";
import { getActiveLanguageId } from "../editor";

export function registerHover(context: vscode.ExtensionContext): void
{
    const data = loadData(context);

    const provider: vscode.HoverProvider =
    {
        provideHover(document, position)
        {
            const range = document.getWordRangeAtPosition(position, /[A-Za-z_][A-Za-z0-9_]*/);
            if (!range)
                return;

            const word = document.getText(range);

            const engine = getEngine();
            const lang = getActiveLanguageId();

            const symbol = data.symbols.find(s =>
                s.name === word &&
                s.engines.includes(engine) &&
                s.languages.includes(lang)
            );

            if (!symbol)
                return;

            const md = new vscode.MarkdownString();
            md.isTrusted = true;

            md.appendMarkdown(`### ${symbol.name}\n\n`);

            if (symbol.signature)
            {
                md.appendCodeblock(symbol.signature, "c");
                md.appendMarkdown("\n");
            }

            if (symbol.summary)
                md.appendMarkdown(`${symbol.summary}\n`);

            if (symbol.docUrl)
                md.appendMarkdown(`\n[Open documentation](${symbol.docUrl})\n`);

            return new vscode.Hover(md, range);
        }
    };

    context.subscriptions.push(vscode.languages.registerHoverProvider("acs", provider));
    context.subscriptions.push(vscode.languages.registerHoverProvider("bcs", provider));
    context.subscriptions.push(vscode.languages.registerHoverProvider("decorate", provider));
}
