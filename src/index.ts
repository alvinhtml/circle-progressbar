import './scss/style.scss'

interface Option {
  value: number
  total: number
  radius: string
  strokeWidth: number
  stroke: string
  backgroundStrokeWidth: number
  backgroundStroke: string
  semiCircle: number
  strokeLinecap: string,
  title: Function,
  subtitle: Function
}

const red = '#f82a5e'
const green = '#05d69e'
const yellow = '#faad42'
const blue = '#38c3ff'
const gray = '#f5f6fa'


class Circle {

  option: Option

  container: HTMLElement

  circle: SVGCircleElement

  svgNS: string = 'http://www.w3.org/2000/svg'

  value: number

  total: number

  constructor(container: HTMLElement, option: Partial<Option>) {

    this.option = Object.assign({
      value: 0,
      total: 100,
      radius: '40%',
      strokeWidth: 6,
      stroke: blue,
      backgroundStrokeWidth: option.backgroundStrokeWidth || option.strokeWidth || 6,
      backgroundStroke: gray,
      semiCircle: 1,
      strokeLinecap: 'round',
      title: (percentage: number, value: number) => percentage + '%',
      subtitle: '',
    }, option)

    const {
      value,
      total,
      radius,
      strokeWidth,
      stroke,
      backgroundStrokeWidth,
      backgroundStroke,
      semiCircle,
      strokeLinecap,
      title
    } = this.option

    this.container = container
    this.value = value
    this.total = total

    // 创建 SVG
    const svg = this.createSvg(container.clientWidth, container.clientHeight)

    // 创建背景圆环
    const circleBackground = this.createCircle(radius, (backgroundStrokeWidth).toString(), backgroundStroke)
    svg.appendChild(circleBackground)

    // 创建进度条圆环
    const circle = this.createCircle(radius, (strokeWidth).toString(), stroke)
    const circumference = this.getCircumference()
    circle.setAttribute('stroke-dasharray', `0 ${circumference}`)

    // 边框末端的形状
    if (option.strokeLinecap) {
      circle.setAttribute('stroke-linecap', strokeLinecap)
    }

    this.circle = circle
    svg.appendChild(circle)

    if (option.title !== null || option.title !== false) {
      const titleText = typeof title === 'function' ? title(parseFloat((value / total).toFixed(2)) * 100, value) : title

      const text = this.createText(titleText)
      svg.appendChild(text)
    }

    container.appendChild(svg)

    setTimeout(() => {
      circle.setAttribute('stroke-dasharray', `${Math.floor(value / total * circumference)} ${circumference}`)
    }, 0);
  }

  getCircumference() {
    const radius = parseInt(this.option.radius)
    if (/%$/.test(this.option.radius)) {
      return (radius / 100 * 2 * this.container.clientWidth * Math.PI)
    } else {
      return radius * 2 * Math.PI
    }
  }

  private createSvg(width: number, height: number): SVGSVGElement {
    const svg = <SVGSVGElement>document.createElementNS(this.svgNS, 'svg')
    svg.setAttribute('version', '1.2')
    svg.setAttribute('width', width + '')
    svg.setAttribute('height', height + '')

    return svg
  }

  private createCircle(radius: string, strokeWidth: string, stroke: string): SVGCircleElement {
    const circle = <SVGCircleElement>document.createElementNS(this.svgNS, 'circle')
    circle.classList.add('svg-circle-progress')
    circle.setAttribute('cx', '50%')
    circle.setAttribute('cy', '50%')
    circle.setAttribute('fill', 'none')
    circle.setAttribute('r', radius + '')
    circle.setAttribute('stroke', stroke)
    circle.setAttribute('stroke-width', strokeWidth)

    return circle
  }

  private createText(text: string): SVGTextElement {
    const textElement = <SVGTextElement>document.createElementNS(this.svgNS, 'text')
    textElement.setAttribute('x', '50%')
    textElement.setAttribute('y', '50%')
    textElement.setAttribute('class', 'svg-text')
    textElement.textContent = text

    return textElement
  }


  update(value: number) {
    this.value = value
  }

  static create(container: HTMLElement, option: Partial<Option>): Circle {
    const circle = new Circle(container, option)
    return circle
  }
}

export default function CircleProgressbar(container: HTMLElement, option: Partial<Option>) {

  if (container) {
    return Circle.create(container, option)
  } else {
    throw 'Container does not exist';

  }
}
