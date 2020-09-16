export default class getControlFactory {
  el = null
  constructor(el) {
    this.el = el
  }

  onAdd(map) {
    this.map = map
    this.container = document.createElement('div')
    this.container.className = 'mapboxgl-ctrl'
    this.container.appendChild(this.el)
    return this.container
  }

  onRemove() {
    this.container.parentNode.removeChild(this.container)
    this.map = undefined
  }
}
