export function sendMessageToWorker(worker: Worker, message: any): Promise<any> {
    return new Promise((resolve, reject) => {
        const handleMessage = (event: MessageEvent<any>) => {
            // Opcional: puedes filtrar por tipo si quieres (ejemplo: si esperas type === 'checkInstanceResponse')
            // if (event.data.type !== expectedResponseType) return;

            worker.removeEventListener('message', handleMessage);
            resolve(event.data);
        };

        const handleError = (error: any) => {
            worker.removeEventListener('error', handleError);
            reject(error);
        };

        worker.addEventListener('message', handleMessage);
        worker.addEventListener('error', handleError);

        // Enviar el mensaje
        worker.postMessage(message);
    });
}
