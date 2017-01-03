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

  const camera = new Camera()
  it('should show dialog with camera', () => {
    camera.showCamera().then((done) => {
      const video = document.getElementById('video')
      expect(video).not.toBeNull()
      expect(video.getAttribute('id')).toBe('video')
      expect(video.getAttribute('width')).toBe('640')

      const snap = document.getElementById('snap')
      expect(snap).not.toBeNull()
      expect(snap.getAttribute('id')).toBe('snap')

      const canvas = document.getElementById('canvas')
      expect(canvas).not.toBeNull()
      expect(canvas.getAttribute('id')).toBe('canvas')
      done()
    }).catch((done) => {
      expect(true).toBeFalsy()
      done()
    })
  })

  it('should remove dialog with camera', () => {
    camera.showCamera().then((done) => {
      camera.removeCamera()

      const video = document.getElementById('video')
      expect(video).toBeNull()

      const snap = document.getElementById('snap')
      expect(snap).toBeNull()

      const canvas = document.getElementById('canvas')
      expect(canvas).toBeNull()
      done()
    })
  })
})
