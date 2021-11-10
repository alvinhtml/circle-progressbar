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
  strokeLinecap: string
  title: Function,
  titleStyle: string
  subtitle: Function
  subtitleStyle: string
}

type IMPState = Record<string, Record<string, any>>

const red = '#f82a5e'
const green = '#05d69e'
const yellow = '#faad42'
const blue = '#38c3ff'
const gray = '#ccc'
const lightgray = '#f5f6fa'


class Circle {

  option: Option
  
  container: HTMLElement

  circle: SVGCircleElement

  svgNS: string = 'http://www.w3.org/2000/svg'

  circumference: number

  value: number

  total: number

  titleElement: SVGTextElement

  constructor(container: HTMLElement, option: Partial<Option>) {

    this.option = Object.assign({
      value: 0,
      total: 100,
      radius: '40%',
      strokeWidth: 6,
      stroke: blue,
      backgroundStrokeWidth: option.backgroundStrokeWidth || option.strokeWidth || 6,
      backgroundStroke: lightgray,
      semiCircle: 1,
      strokeLinecap: 'round',
      title: (percentage: number, value: number) => percentage + '%',
      titleStyle: '',
      subtitle: (percentage: number, value: number) => percentage + '%',
      subtitleStyle: ''
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
      title,
      titleStyle,
      subtitle,
      subtitleStyle
    } = this.option

    this.container = container
    this.value = value
    this.total = total

    // 创建 SVG
    const svg = this.createSvg(container.clientWidth, container.clientHeight)
    const circumference = this.getCircumference()

    // 创建背景圆环
    const circleBackground = this.createCircle(radius, (backgroundStrokeWidth).toString(), backgroundStroke)
    
    if (semiCircle < 1 && semiCircle > 0) {
      circleBackground.setAttribute('stroke-dasharray', `${Math.floor(semiCircle * circumference)} ${circumference}`)

      // 根据弧长和半径计算角度
      // const angle = Math.atan2(radius, semiCircle * circumference) * 180 / Math.PI * 360

      // console.log(angle);
      

    }

    svg.appendChild(circleBackground)

    // 创建进度条圆环
    const circle = this.createCircle(radius, (strokeWidth).toString(), stroke)
    
    circle.setAttribute('stroke-dasharray', `0 ${circumference}`)

    // 边框末端的形状
    if (option.strokeLinecap) {
      circle.setAttribute('stroke-linecap', strokeLinecap)
    }

    this.circle = circle
    svg.appendChild(circle)


    if (option.title !== null || option.title !== false) {
      const titleText = typeof title === 'function' ? title(parseFloat((value / total).toFixed(2)) * 100, value) : title

      const titleElement = this.createText(titleText)
      titleElement.setAttribute('class', 'svg-title')
      this.titleElement = titleElement

      if (titleStyle) {
        titleElement.setAttribute('style', titleStyle)
      }

      svg.appendChild(titleElement)
    }
    console.log(option.subtitle);
    
    if (option.subtitle !== undefined && option.subtitle !== null) {
      const subtitleText = typeof subtitle === 'function' ? subtitle(parseFloat((value / total).toFixed(2)) * 100, value) : subtitle

      const subtitleElement = this.createText(subtitleText)
      subtitleElement.setAttribute('class', 'svg-subtitle')
      subtitleElement.setAttribute('y', '60%')
      this.titleElement.setAttribute('y', '45%')

      if (subtitleStyle) {
        subtitleElement.setAttribute('style', subtitleStyle)
      }
      svg.appendChild(subtitleElement)
    }

    container.appendChild(svg)

    setTimeout(() => {
      circle.setAttribute('stroke-dasharray', `${Math.floor(value / total * circumference)} ${circumference}`)
    }, 0)
  }

  // 获取圆环周长
  getCircumference() {
    const radius = parseInt(this.option.radius)

    let circumference
    if (/%$/.test(this.option.radius)) {
      circumference = (radius / 100 * 2 * this.container.clientWidth * Math.PI)
    } else {
      circumference = radius * 2 * Math.PI
    }

    this.circumference = circumference

    return circumference
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
    textElement.textContent = text

    return textElement
  }


  setValue(value: number) {
    this.value = value
    this.circle.setAttribute('stroke-dasharray', `${Math.floor(value / this.total * this.circumference)} ${this.circumference}`)

    const title = this.option.title
    const titleText = typeof title === 'function' ? title(parseFloat((value / this.total * 100).toFixed(2)), value) : title
    this.titleElement.textContent = titleText
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
    throw 'Container does not exist'
  }
}
