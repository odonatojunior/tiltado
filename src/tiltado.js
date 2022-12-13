/**
 * Tiltado is a small vanilla Javascript plugin that tilts the thing that you put into it
 */
class Tiltado {
  /**
   * @param {Element} element
   * @param {{
   *  radius: number
   *  perspective: number
   * }} options
   */
  constructor(element, options = { radius: 40, perspective: 1000 }) {
    this.element = element
    this.options = options

    this.#init()
  }

  #init() {
    this.#addTiltableProperties()
    this.#addElementEventListeners()
  }

  #addElementEventListeners() {
    this.element.addEventListener('mousemove', this.#mouseMove.bind(this))
    this.element.addEventListener('mouseleave', this.#mouseLeave.bind(this))
  }

  #mouseMove({ clientX, clientY }) {
    const { axisX, axisY } = this.#calculateAxis(clientX, clientY)

    this.element.style.transform = `
      perspective(${this.options.perspective}px)
      scale3d(1, 1, 1)
      rotatey(${-axisX / this.options.radius}deg)
      rotatex(${axisY / this.options.radius}deg)
      `
  }

  #calculateAxis(clientX, clientY) {
    const axisX =
      clientX - (this.element.offsetLeft + this.element.offsetWidth / 2)
    const axisY =
      clientY - (this.element.offsetTop + this.element.offsetHeight / 2)
    return { axisX, axisY }
  }

  #mouseLeave() {
    Object.assign(this.element.style, {
      transform: `scale3d(1, 1, 1)
      rotatey(0deg)
      rotatex(0deg)`,
    })
  }

  #addTiltableProperties() {
    Object.assign(this.element.style, {
      transform: 'perspective(1000px)',
      'transform-style': 'preserve-3d',
    })
  }
}

/**
 * Not the best way to do it but it works
 */
const tiltado = document.querySelectorAll('[data-tiltado]')
tiltado.forEach(
  (tilt) =>
    new Tiltado(tilt, {
      perspective: 1000,
      radius: 10,
    })
)

export default Tiltado
