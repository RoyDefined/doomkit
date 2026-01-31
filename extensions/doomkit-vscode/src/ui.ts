import * as vscode from "vscode";
import { isEngine } from "./utils";
import { getEngine, setEngine } from "./config";
import { Engines } from "./data";

let _statusItem: vscode.StatusBarItem;

function updateStatus(): void
{
    const engine = getEngine();
    const activeLang = vscode.window.activeTextEditor?.document.languageId;

    const langPart = (activeLang === "acs" || activeLang === "bcs" ||activeLang === "decorate")
        ? ` (${activeLang})`
        : "";

    _statusItem.text = `$(tools) Doom: ${engine}${langPart}`;
    _statusItem.tooltip = "Doom Language: current engine (and active editor language if applicable)";
    _statusItem.command = "doomLanguage.pickEngine";
    _statusItem.show();
}

async function pickEngine(): Promise<void>
{
    const picked = await vscode.window.showQuickPick(
        Engines,
        { title: "Pick Doom engine" });

    if (!picked)
        return;

    if (!isEngine(picked))
        return;

    await setEngine(picked);
    updateStatus();
}

export function registerUi(context: vscode.ExtensionContext): void
{
    _statusItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
    context.subscriptions.push(_statusItem);

    context.subscriptions.push(vscode.commands.registerCommand("doomLanguage.pickEngine", pickEngine));

    context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(e =>
    {
        if (e.affectsConfiguration("doomLanguage.engine"))
            updateStatus();
    }));

    updateStatus();
}