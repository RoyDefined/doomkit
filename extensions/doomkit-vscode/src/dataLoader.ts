import * as vscode from "vscode";
import * as fs from "fs";
import { DoomSymbol } from "./data";

export interface DoomData
{
    symbols: DoomSymbol[];
}

function readJsonArray<T>(path: string): T[]
{
    const json = fs.readFileSync(path, "utf8");
    return JSON.parse(json) as T[];
}

export function loadData(context: vscode.ExtensionContext): DoomData
{
    return {
        symbols: [
            ...readJsonArray<DoomSymbol>(context.asAbsolutePath("data/acs-functions.json")),
            ...readJsonArray<DoomSymbol>(context.asAbsolutePath("data/acs-snippets.json")),
            ...readJsonArray<DoomSymbol>(context.asAbsolutePath("data/bcs-functions.json")),
            ...readJsonArray<DoomSymbol>(context.asAbsolutePath("data/bcs-snippets.json")),
            ...readJsonArray<DoomSymbol>(context.asAbsolutePath("data/decorate-functions.json")),
            ...readJsonArray<DoomSymbol>(context.asAbsolutePath("data/decorate-snippets.json")),
        ]
    };
}
