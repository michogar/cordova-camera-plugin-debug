/**
 * Created by michogarcia on 29/12/16.
 */

import Camera from '../src/camera'

describe('Camera', () => {
  it('should not instantiate without media', () => {
    let camera
    navigator.camera = {}
    camera = new Camera()
    expect(camera).toBeDefined()

    camera = undefined
    try {
      camera = new Camera()
    } catch (error) {
      expect(error).not.toBeDefined()
    }
    expect(camera).toBeDefined()
  })
})
