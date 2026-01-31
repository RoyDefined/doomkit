import * as vscode from "vscode";
import { LanguageId } from "./data";

export function getActiveLanguageId(): LanguageId
{
    const id = vscode.window.activeTextEditor?.document.languageId;

    if (id === "bcs")
        return "bcs";

    if (id === "decorate")
        return "decorate";

    return "acs";
}
