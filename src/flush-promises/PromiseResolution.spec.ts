describe('PromiseResolution', () => {
  it('fails - because assertions run before second promise resolves', async () => {
    // Arrange
    let a: number
    let b: number
    // Act
    Promise.resolve().then(() => {
      a = 1
    }).then(() => {
      b = 2
    })
    // Assert
    expect(a).toBe(1)
    expect(b).toBe(2)
  })

  describe('flushPromises', () => {
    it('passes - because promises are flushed freeing up the micro task queue', async () => {
      // Arrange
      let a: number
      let b: number
      // Act
      Promise.resolve().then(() => {
        a = 1
      }).then(() => {
        b = 2
      })
      // Assert
      await flushPromises()
      expect(a).toBe(1)
      expect(b).toBe(2)
    })
  })

  describe('drainMicroTasks', () => {
    it('passes - because promises are flushed freeing up the micro task queue', async () => {
      // Arrange
      let a: number
      let b: number
      // Act
      Promise.resolve().then(() => {
        a = 1
      }).then(() => {
        b = 2
      })
      // Assert
      await drainMicroTasks()
      expect(a).toBe(1)
      expect(b).toBe(2)
    })
  })
})

function flushPromises() {
  return new Promise(setImmediate)
}

async function drainMicroTasks() {
  await 0
}
