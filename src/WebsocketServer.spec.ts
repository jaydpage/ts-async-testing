import { WebSocketServer } from "./WebsocketServer"

describe('WebSocketServer', () => {
  it('fails because test exits before callback is called', async () => {
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
})
