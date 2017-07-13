/**
 * Created by michogarcia on 29/12/16.
 */
import Camera from '../src/Camera'

describe('Camera', () => {
  beforeEach(() => {
    new Camera()
  })

  it('should not instantiate without media', () => {
    let camera
    navigator.camera = undefined
    camera = new Camera()
    expect(navigator.camera).toBeDefined()

    camera = undefined
    try {
      camera = new Camera()
    } catch (error) {
      expect(error).not.toBeDefined()
    }
    expect(camera).toBeDefined()
  })

  it('should save blob as file after its creation', (done) => {
    const encoding = 'image/jpeg'
    const blob = new Blob([], { type: encoding })

    navigator.camera.saveFile(blob, encoding).then((uri) => {
      window.resolveLocalFileSystemURL = window.resolveLocalFileSystemURL || window.webkitResolveLocalFileSystemURL
      window.resolveLocalFileSystemURL(uri, (fileEntry) => {
        const savedURL = fileEntry.toURL()
        expect(uri).toEqual(savedURL)
        fileEntry.remove(() => {
          console.info('Dummy file removed!!')
        }, fail)
        done()
      }, fail)
    }).catch(fail)
  })

  it('should show dialog with camera', (done) => {
    navigator.camera.showCamera().then(() => {
      const video = document.getElementById('video')
      expect(video).not.toBeNull()
      expect(video.getAttribute('id')).toBe('video')
      expect(video.getAttribute('width')).toBe('400')

      const snap = document.getElementById('snap')
      expect(snap).not.toBeNull()
      expect(snap.getAttribute('id')).toBe('snap')

      const canvas = document.getElementById('canvas')
      expect(canvas).not.toBeNull()
      expect(canvas.getAttribute('id')).toBe('canvas')
      done()
    }).catch(() => {
      expect(true).toBeFalsy()
      done()
    })
  })

  it('should get encoding in mimetype way', () => {
    expect(Camera.getEncodingType(Camera.EncodingType.JPEG)).toBe('image/jpeg')
    expect(Camera.getEncodingType(Camera.EncodingType.PNG)).toBe('image/png')
    let encoding = null
    try {
      const NO_ENCODING_TYPE = 3
      encoding = Camera.getEncodingType(NO_ENCODING_TYPE)
    } catch (err) {
      expect(err.message).toBe('Not encoding allowed')
      expect(encoding).toBeNull()
    }
  })

  it('should get a picture from camera', () => {
    const canvas = document.getElementById('canvas')
    spyOn(canvas, 'toBlob')
    spyOn(canvas, 'toDataURL')
    navigator.camera.getPictureFromCamera({
      sourceType: Camera.PictureSourceType.CAMERA,
      destinationType: Camera.DestinationType.FILE_URI,
      quality: 50
    })
    expect(canvas.toBlob).toHaveBeenCalled()

    navigator.camera.getPictureFromCamera({
      sourceType: Camera.PictureSourceType.CAMERA,
      destinationType: Camera.DestinationType.DATA_URL,
      quality: 50
    })
    expect(canvas.toDataURL).toHaveBeenCalled()
  })

  it('should remove dialog with camera', (done) => {
    navigator.camera.removeCamera()

    const video = document.getElementById('video')
    expect(video).toBeNull()
    const snap = document.getElementById('snap')
    expect(snap).toBeNull()
    const canvas = document.getElementById('canvas')
    expect(canvas).toBeNull()
    done()
  })
})
