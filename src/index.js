/**
 * Created by michogarcia on 29/12/16.
 */
import vex from 'vex-js'
import vexDialog from 'vex-dialog'
import '../node_modules/vex-js/dist/css/vex.css'
import '../node_modules/vex-js/dist/css/vex-theme-top.css'

vex.registerPlugin(vexDialog)
vex.defaultOptions.className = 'vex-theme-top'

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
      vex.dialog.open({
        message: '',
        input: [
          '<div class="vex-custom-field-wrapper">',
          '<video id="video" width="400" height="400" autoplay="true"></video>',
          '</div>',
          '<div class="vex-custom-field-wrapper">',
          '<button id="snap">Snap Photo</button>',
          '</div>',
          '<div class="vex-custom-field-wrapper">',
          '<canvas id="canvas" width="400" height="400"></canvas>',
          '</div>'
        ].join(''),
        overlayClosesOnClick: false,
        showCloseButton: false,
        escapeButtonCloses: false
      })

      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        this.video = document.getElementById('video')
        this.snap = document.getElementById('snap')
        this.canvas = document.getElementById('canvas')
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
      context.drawImage(this.video, 0, 0, 400, 400)
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
        this.snap.addEventListener('click', (evt) => {
          evt.preventDefault()
          this.getPictureFromCamera({ destinationType, encodingType, quality }).then((picture) => {
            successCallback(picture)
          }).catch(errorCallback)
        })
      }).catch(errorCallback)
    }
  }
}

export default Camera
