export class MiClienteSDK {
  constructor(public token: string) {}
  obtenerValor() {
    return `Token: ${this.token}`;
  }
}

export async function crearMiClienteSDK(): Promise<MiClienteSDK> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return new MiClienteSDK("TOKEN-1234");
}