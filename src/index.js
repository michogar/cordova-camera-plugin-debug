import Camera from './Camera'

if (!navigator.camera) {
  console.info('No camera found as Cordova plugin. Using browser camera instead.')
  try {
    new Camera() // eslint-disable-line no-new
  } catch (error) {
    console.error('No camera found in browser either. navigator.camera will be undefined!')
  }
}
