/**
 * Tiltado is a small vanilla Javascript plugin that tilts the thing that you put into it
 */

type TiltadoOptions = {
  radius?: number
  perspective?: number
}

class Tiltado {
  constructor(
    private element: HTMLElement,
    private options: TiltadoOptions = {
      radius: 40,
      perspective: 1000,
    }
  ) {
    this.element = element
    this.options = options

    this.init()
  }

  private init() {
    this.addTiltableProperties()
    this.addElementEventListeners()
  }

  private addElementEventListeners() {
    this.element.addEventListener('mousemove', this.mouseMove.bind(this))
    this.element.addEventListener('mouseleave', this.mouseLeave.bind(this))
  }

  private mouseMove({ clientX, clientY }) {
    const { axisX, axisY } = this.calculateAxis(clientX, clientY)

    this.element.style.transform = `
      perspective(${this.options.perspective}px)
      scale3d(1, 1, 1)
      rotatey(${-axisX / this.options.radius}deg)
      rotatex(${axisY / this.options.radius}deg)
      `
  }

  private calculateAxis(clientX, clientY) {
    const axisX =
      clientX - (this.element.offsetLeft + this.element.offsetWidth / 2)
    const axisY =
      clientY - (this.element.offsetTop + this.element.offsetHeight / 2)
    return { axisX, axisY }
  }

  private mouseLeave() {
    Object.assign(this.element.style, {
      transform: `scale3d(1, 1, 1)
      rotatey(0deg)
      rotatex(0deg)`,
    })
  }

  private addTiltableProperties() {
    Object.assign(this.element.style, {
      transform: 'perspective(1000px)',
      'transform-style': 'preserve-3d',
    })
  }
}

;(() => {
  const tiltado = document.querySelectorAll('[data-tiltado]')
  tiltado.forEach(
    (tilt) =>
      new Tiltado(tilt as HTMLElement, {
        perspective: 1000,
        radius: 40,
      })
  )
})()

export default Tiltado
