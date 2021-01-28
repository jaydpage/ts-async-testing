export class WebSocketServer {
  callbacks: { [eventName: string]: (payload: any) => void } = {}

  async on(eventName: string, callback: (payload: any) => void): Promise<void> {
    this.callbacks[eventName] = callback
  }

  async receive(eventName: string, payload: any): Promise<void> {
    setTimeout(() => {
      this.callbacks[eventName](payload)
    }, 100);
  }
}
