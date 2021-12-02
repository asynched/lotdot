const fs = require('fs')
const {
  generateEnvDataFromFileLines,
  isNumber,
  isPrimitive,
  isString,
  mergeReducedObject,
  parseEnvFile,
} = require('../../src/util')

describe('src > utils', () => {
  describe('generateEnvDataFromFileLines()', () => {
    it('should return an empty object when lines are empty', () => {
      const value = [].reduce(generateEnvDataFromFileLines, {})

      expect(value).toStrictEqual({})
    })

    it('should return an object with the mock properties', () => {
      const value = ['FOO=bar', 'BAR=baz'].reduce(
        generateEnvDataFromFileLines,
        {}
      )

      expect(value).toStrictEqual({
        FOO: 'bar',
        BAR: 'baz',
      })
    })

    it('should return an object with the primitives from javascript', () => {
      const value = ['FOO=true', 'BAR=false', 'AGE=20', 'NAME="FOO"'].reduce(
        generateEnvDataFromFileLines,
        {}
      )

      expect(value).toStrictEqual({
        FOO: true,
        BAR: false,
        AGE: 20,
        NAME: 'FOO',
      })
    })
  })

  describe('isNumber()', () => {
    it('should return true when the value is a valid number', () => {
      expect(isNumber('20')).toBe(true)
      expect(isNumber('20.0')).toBe(true)
    })

    it('should return false when the value is not a valid number', () => {
      expect(isNumber('foo')).toBe(false)
      expect(isNumber('20.0.0')).toBe(false)
    })

    it('should return false when passed "undefined"', () => {
      expect(isNumber(undefined)).toBe(false)
    })
  })

  describe('isString()', () => {
    it('should return true when the value starts with a double quote', () => {
      expect(isString('"foo"')).toBe(true)
    })

    it('should return true when the value starts with a single quote', () => {
      expect(isString("'foo'")).toBe(true)
    })

    it('should return false when the value does not start with a quote', () => {
      expect(isString('foo')).toBe(false)
    })
  })

  describe('isPrimitive()', () => {
    it('should return true when the value is a primitive', () => {
      expect(isPrimitive('null')).toBe(true)
      expect(isPrimitive('false')).toBe(true)
      expect(isPrimitive('true')).toBe(true)
    })

    it('should return false when the value is not a primitive', () => {
      expect(isPrimitive({ foo: 'bar' })).toBe(false)
      expect(isPrimitive(['foo', 'bar'])).toBe(false)
    })
  })

  describe('mergeReducedObject()', () => {
    it('should return a new object with the merged properties', () => {
      const value = mergeReducedObject({ foo: 'bar' }, { bar: 'baz' })

      expect(value).toStrictEqual({
        foo: 'bar',
        bar: 'baz',
      })
    })

    it('should return a new object with the merged properties', () => {
      const value = mergeReducedObject({ foo: 'bar' }, { bar: 'baz' })

      expect(value).toStrictEqual({
        foo: 'bar',
        bar: 'baz',
      })
    })
  })

  describe('parseEnvFile()', () => {
    it('should parse a ".env" file and return an object', () => {
      jest
        .spyOn(fs, 'readFileSync')
        .mockReturnValue(`FOO=bar\nBAR=baz\nBAZ=foo`)

      const value = parseEnvFile('.env')

      expect(value).toStrictEqual({
        FOO: 'bar',
        BAR: 'baz',
        BAZ: 'foo',
      })
    })
  })
})
