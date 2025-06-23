interface PluginData {
    [key: string]: string | undefined
}

export function usePluginData() {
    const {
        gearAppName,
        rpcUrl,
        contractAddress,
        contractIdl
    }: PluginData = (window as any).GearPluginSettings;
    
    return {
        gearAppName,
        rpcUrl,
        contractAddress,
        contractIdl
    }
}