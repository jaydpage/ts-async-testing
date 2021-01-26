export class WebSocketServer {
  callbacks: { [eventName: string]: (payload: any) => void } = {}

  async on(eventName: string, callback: () => void): Promise<void> {
    this.callbacks[eventName] = callback
  }

  async receive(eventName: string, payload: any): Promise<void> {
    setTimeout(() => {
      this.callbacks[eventName](payload)
    }, 100);
  }
}
