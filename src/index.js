import Camera from './Camera'

if (!navigator.camera) {
  console.warn('Not found camera in navigator, using Camera wrapper instead!!')
  new Camera()
}