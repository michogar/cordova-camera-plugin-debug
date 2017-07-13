navigator.camera = undefined
const camera = require('../src') // Using require inside methods returns an empty object

describe('Camera instantiation', () => {
  it('Should camera be instantiated if navigator.camera === undefined', () => {
    expect(navigator.camera).not.toBe(undefined)
  })
})