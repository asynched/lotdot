const fs = require('fs')

describe('Integration test', () => {
  it('should configure the "process.env" object with the options mocked', () => {
    jest.spyOn(fs, 'readdirSync').mockReturnValue(['.env'])

    jest
      .spyOn(fs, 'readFileSync')
      .mockReturnValue('NODE_ENV=test\nPORT=3000\nLOCAL=true')

    require('../src')

    expect(process.env.NODE_ENV).toBe('test')
    expect(process.env.PORT).toBe(3000)
    expect(process.env.LOCAL).toBe(true)
  })
})
