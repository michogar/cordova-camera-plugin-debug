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

  getPicture(successCallback, errorCallback, options) {

  }
}

export default Camera
