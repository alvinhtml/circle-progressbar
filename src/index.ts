import './scss/style.scss'

interface Option {
  radius: string
  strokeWidth: number
  stroke: string
  backgroundStrokeWidth: number
  backgroundStroke: string
  semiCircle: number
  strokeLinecap: string
}

const red = '#f82a5eff'
const green = '#05d69eff'
const yellow = '#faad42ff'
const blue = '#38c3ffff'
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
      stroke: blue
      backgroundStrokeWidth: 6
      backgroundStroke: gray
      semiCircle: 1,
      strokeLinecap: 'round'
    }, option)

    const {
      value
      total
      radius
      strokeWidth
      stroke
      backgroundStrokeWidth
      backgroundStroke
      semiCircle
      strokeLinecap
    } = this.option

    this.container = container
    this.value = value
    this.total = total

    const svg = this.createSvg(container.clientWidth, container.clientHeight)

    // 创建背影圆环
    const circleBackground = this.createCircle(this.option.radius)
    circleBackground.setAttribute('stroke'
    this.option.backgroundStroke)
    svg.appendChild(circleBackground)

    // 创建圆环
    const circle = this.createCircle(this.option.radius)
    circle.classList.add('svg-circle-progress')
    console.log(container.clientWidth, this.option.radius, Math.PI);

    const perimeter = this.getPerimeter()
    console.log("perimeter", perimeter)
    console.log("this", this);
    console.log(this.value, "this.val / this.total * perimeter", this.value / this.total * perimeter);
    circle.setAttribute('stroke-dasharray', `${Math.floor(this.value / this.total * perimeter)} ${perimeter}`)
    circle.setAttribute('stroke-linecap', this.option.strokeLinecap)

    this.circle = circle
    svg.appendChild(circle)

    container.appendChild(svg)
  }

  getPerimeter() {
    const radius = parseInt(this.option.radius)
    if (/%/.test(this.option.radius)) {
      return (radius / 100 * 2 * this.container.clientWidth * Math.PI)
    } else {
      return radius * 2 * Math.PI
    }
  }

  private setOption(option: Partial<Option>) {
    this.option = {
      radius: option.radius,
      strokeWidth: option.strokeWidth || 6,
      stroke: option.stroke || '#5ea3f8',
      backgroundStrokeWidth: option.backgroundStrokeWidth || 6,
      backgroundStroke: option.backgroundStroke || '#f5f6fa',
      semiCircle:  option.semiCircle || 1,
      strokeLinecap: 'round'
    }
  }

  private createSvg(width: number, height: number): SVGSVGElement {
    const svg = <SVGSVGElement>document.createElementNS(this.svgNS, 'svg')
    svg.setAttribute('version', '1.2')
    svg.setAttribute('width', width + '')
    svg.setAttribute('height', height + '')

    return svg
  }

  private createCircle(radius: string | number): SVGCircleElement {
    const circle = <SVGCircleElement>document.createElementNS(this.svgNS, 'circle')

    circle.setAttribute('fill', 'none')
    circle.setAttribute('stroke-width', this.option.strokeWidth.toString())
    circle.setAttribute('cx', '50%')
    circle.setAttribute('cy', '50%')
    circle.setAttribute('r', radius + '')
    circle.setAttribute('stroke', this.option.stroke)

    return circle
  }

  html() {
    const html = `<svg width="80" height="78">
      <circle cx="50%" cy="50%" r="28%" stroke="#5ea1f8" class="svg-circle-gray"></circle>
      <circle cx="50%" cy="50%" r="28%" stroke="#5ea3f8" stroke-dasharray="0 137" class="svg-circle"></circle>
      <circle cx="50%" cy="50%" r="38%" class="svg-circle-border"></circle>
      <text x="50%" y="53%" class="svg-circle-text">0 %</text>
    </svg>`
  }

  update(value: number) {
    this.value = value
  }

  static create(container: HTMLElement, option: Partial<Option>) {
    const circle = new CircleProgressbar(container, option)
    console.log("circle", circle);
    return circle
  }
}

export default function CircleProgressbar(container: HTMLElement, option: Option) {
  return Circle.create(container, option)
}
