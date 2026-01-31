import * as vscode from "vscode";
import { registerUi } from "./ui";
import { registerCompletion } from "./providers/completion";
import { registerHover } from "./providers/hover";
import { registerDocsSearch } from "./providers/docsSearch";

export function activate(context: vscode.ExtensionContext): void
{
    registerUi(context);

    registerCompletion(context);
    registerHover(context);
    registerDocsSearch(context);
}

export function deactivate(): void
{
}
