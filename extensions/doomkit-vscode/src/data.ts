export const Engines = ["uzdoom", "zandronum"] as const;
export type Engine = (typeof Engines)[number];

export type LanguageId = "acs" | "bcs" | "decorate";

export type SymbolKind = "function" | "snippet";

export interface DoomSymbol
{
    kind: SymbolKind;
    name: string;
    signature?: string;
    summary?: string;
    docUrl?: string;
    insertSnippet?: string;
    engines: Engine[];
    languages: LanguageId[];
}
