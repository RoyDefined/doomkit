import * as vscode from "vscode";
import { loadData } from "../dataLoader";
import { getEngine } from "../config";
import { getActiveLanguageId } from "../editor";

export function registerCompletion(context: vscode.ExtensionContext): void
{
    const data = loadData(context);

    const provider: vscode.CompletionItemProvider =
    {
        provideCompletionItems()
        {
            const engine = getEngine();
            const lang = getActiveLanguageId();

            const enabled = data.symbols.filter(s =>
                s.engines.includes(engine) &&
                s.languages.includes(lang)
            );

            return enabled.map(s =>
            {
                const kind = s.kind === "function"
                    ? vscode.CompletionItemKind.Function
                    : vscode.CompletionItemKind.Snippet;

                const item = new vscode.CompletionItem(s.name, kind);

                if (s.signature)
                {
                    item.detail = s.signature;
                }

                if (s.summary)
                {
                    item.documentation = new vscode.MarkdownString(s.summary);
                }

                if (s.kind === "function")
                {
                    item.insertText = new vscode.SnippetString(`${s.name}($0)`);
                }
                else if (s.kind === "snippet" && s.insertSnippet)
                {
                    item.insertText = new vscode.SnippetString(s.insertSnippet);
                }

                return item;
            });
        }
    };

    context.subscriptions.push(vscode.languages.registerCompletionItemProvider("acs", provider));
    context.subscriptions.push(vscode.languages.registerCompletionItemProvider("bcs", provider));
    context.subscriptions.push(vscode.languages.registerCompletionItemProvider("decorate", provider));
}
