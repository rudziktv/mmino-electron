const { openExternal } = (window as any)["shellAPI"] as ShellAPI;

interface ShellAPI {
    openExternal: (url: string) => void;
}

export { openExternal };
