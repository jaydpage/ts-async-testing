import { WebSocketServer } from "./WebsocketServer"

describe('WebSocketServer', () => {
  it('fails - because test exits before callback is called', async () => {
    // Arrange
    const callback = jest.fn()
    const server = new WebSocketServer()
    const payload = { bar: 1 }
    await server.on('foo', callback)
    // Act
    await server.receive('foo', payload)
    // Assert
    expect(callback).toBeCalledWith(payload)
  })

  it('passes - because we wait for callback to be called before assertion', async () => {
    // Arrange
    const callback = jest.fn()
    const server = new WebSocketServer()
    const payload = { bar: 1 }
    const callbackCalled = listenForCall(callback)
    await server.on('foo', callback)
    // Act
    await server.receive('foo', payload)
    // Assert
    await callbackCalled
    expect(callback).toBeCalledWith(payload)
  })

  it('passes - because we wait for done() before exiting test', async done => {
    // Arrange
    const payload = { bar: 1 }
    function callback(value: any) {
      // Assert
      expect(value).toEqual(payload)
      done()
    }
    const server = new WebSocketServer()
    await server.on('foo', callback)
    // Act
    await server.receive('foo', payload)
  })
})

async function listenForCall(callback: jest.Mock) {
  return new Promise<void>(resolve => {
    callback.mockImplementation(() => {
      resolve()
    })
  })
}
