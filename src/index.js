/**
 * Created by michogarcia on 29/12/16.
 */

class Camera {

  static PictureSourceType = {
    PHOTOLIBRARY: 0,
    CAMERA: 1,
    SAVEDPHOTOALBUM: 2
  }

  static DestinationType = {
    DATA_URL: 0,
    FILE_URI: 1,
    NATIVE_URI: 2
  }

  static EncodingType = {
    JPEG: 0,
    PNG: 1
  }

  static getEncodingType(encodingType) {
    const privateEncoding = [
      'image/jpeg',
      'image/png'
    ]
    const encoding = privateEncoding[encodingType]
    if (!encoding) {
      throw new Error('Not encoding allowed')
    }
    return encoding
  }

  constructor() {
    if (!navigator.camera) {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('No Media devices available!!')
      } else {
        navigator.camera = this
      }
    }
  }

  showCamera() {
    return new Promise((resolve, reject) => {
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        if (document.getElementById('video')) {
          this.video = document.getElementById('video')
          this.snap = document.getElementById('snap')
          this.canvas = document.getElementById('canvas')
          resolve()
          return
        }
        this.video = document.createElement('video')
        this.video.setAttribute('id', 'video')
        this.video.setAttribute('width', '640')
        this.video.setAttribute('height', '480')
        this.video.setAttribute('autoplay', true)

        this.snap = document.createElement('button')
        this.snap.setAttribute('id', 'snap')
        this.snap.appendChild(document.createTextNode('Snap Photo'))

        this.canvas = document.createElement('canvas')
        this.canvas.setAttribute('id', 'canvas')
        this.canvas.setAttribute('width', '640')
        this.canvas.setAttribute('height', '480')

        document.body.appendChild(this.video)
        document.body.appendChild(this.snap)
        document.body.appendChild(this.canvas)

        this.video.src = window.URL.createObjectURL(stream)
        this.video.play()
        resolve()
      }).catch((err) => {
        this.removeCamera()
        reject(err)
      })
    })
  }

  removeCamera() {
    this.video.pause()
    document.body.removeChild(this.video)
    document.body.removeChild(this.snap)
    document.body.removeChild(this.canvas)
  }

  getPictureFromCamera({ destinationType = Camera.DestinationType.DATA_URL,
    encodingType = Camera.EncodingType.JPEG, quality = 50 } = {}) {
    return new Promise((resolve, reject) => {
      const context = this.canvas.getContext('2d')
      context.drawImage(this.video, 0, 0, 640, 480)
      const encoding = Camera.getEncodingType(encodingType)
      if (destinationType === Camera.DestinationType.FILE_URI) {
        this.canvas.toBlob((blob) => {
          const URL = window.URL || window.webkitURL
          resolve(URL.createObjectURL(blob))
        }, encoding, quality / 100)
      } else if (destinationType === Camera.DestinationType.DATA_URL) {
        resolve(this.canvas.toDataURL(encoding))
      } else {
        reject(new Error('No image!!'))
      }
    })
  }

  getPicture(successCallback, errorCallback, { sourceType = Camera.PictureSourceType.CAMERA,
    destinationType = Camera.DestinationType.DATA_URL, encodingType = Camera.EncodingType.JPEG,
    quality = 50 } = {}) {
    if (sourceType === Camera.PictureSourceType.CAMERA) {
      this.showCamera().then(() => {
        this.snap.addEventListener('click', () => {
          this.getPictureFromCamera({ destinationType, encodingType, quality }).then((picture) => {
            successCallback(picture)
          }).catch(errorCallback)
        })
      }).catch(errorCallback)
    }
  }
}

export default Camera
