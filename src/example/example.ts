// import Mind from '../index';
const CircleProgressbar = (window as any).CircleProgressbar.default

/*
 * 解决 TS2451: Cannot redeclare block-scoped variable
 * 如果一个 .ts 文件没有包含 import 或 export，那么它会被视为脚本，该文件中所有的内容都会被视为全局的，其它文件可以直接使用。反之如果使用了 import 或 export，那该文件就会被视为一个 module，里面的内容只有被别的文件 import 了才能使用。
 * 添加import或export，将index.ts变为一个模块。
 */
export {}

const colors = ['#f2711c', '#2185d0', '#21ba45', '#b5cc18', '#00b5ad', '#fbbd08', '#6435c9', '#a333c8', '#e03997', '#a5673f']



function createCircle(option: any) {
  const box = document.createElement('div');
  box.classList.add('circle')

  const container = document.querySelector('#container')

  if (container) {
    container.appendChild(box)

    const circle = CircleProgressbar.create(box, 60, 200, option)

    window.setInterval(() => {
      circle.update(Math.random() * 200)
    }, 5000)
  }
}

createCircle({
  radius: '40%',
  title: (v: number) => {
    return v + '%'
  },
  subtitle: (v: number) => {

  },
  strokeWidth: 6,
  stroke: '#5ea3f8',
  semiCircle: 1
})

createCircle({
  radius: '40%',
  title: (v: number) => {
    return v + '%'
  },
  subtitle: (v: number) => {

  },
  strokeWidth: 6,
  stroke: '#21ba45',
  semiCircle: 1
})

const option = {
  value: 200,
  total: 400
}
