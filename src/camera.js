/**
 * Created by michogarcia on 29/12/16.
 */

class Camera {

  constructor() {
    if (!navigator.camera) {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('No Media devices available!!')
      }
    }
  }

  showCamera() {
    return new Promise((resolve, reject) => {
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        this.video = document.createElement('video')
        this.video.setAttribute('id', 'video')
        this.video.setAttribute('width', '640')
        this.video.setAttribute('height', '480')
        this.video.setAttribute('autoplay', true)

        const snap = document.createElement('button')
        snap.setAttribute('id', 'snap')
        snap.appendChild(document.createTextNode('Snap Photo'))

        const canvas = document.createElement('canvas')
        canvas.setAttribute('id', 'canvas')
        canvas.setAttribute('width', '640')
        canvas.setAttribute('height', '480')

        document.body.appendChild(this.video)
        document.body.appendChild(snap)
        document.body.appendChild(canvas)

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
    const snap = document.getElementById('snap')
    const canvas = document.getElementById('canvas')
    document.body.removeChild(this.video)
    document.body.removeChild(snap)
    document.body.removeChild(canvas)
  }

  getPicture(successCallback, errorCallback, options) {
    this.showCamera()
  }
}

export default Camera
