import Mind from '../index';
const CircleProgressbar = (window as any).CircleProgressbar.default

/*
 * 解决 TS2451: Cannot redeclare block-scoped variable
 * 如果一个 .ts 文件没有包含 import 或 export，那么它会被视为脚本，该文件中所有的内容都会被视为全局的，其它文件可以直接使用。反之如果使用了 import 或 export，那该文件就会被视为一个 module，里面的内容只有被别的文件 import 了才能使用。
 * 添加import或export，将index.ts变为一个模块。
 */
export {}



CircleProgressbar(document.querySelector('#baseCircle1'), {
  value: 80,
  total: 200
})
CircleProgressbar(document.querySelector('#baseCircle2'), {
  value: 130,
  total: 200,
  strokeWidth: 2,
  strokeLinecap: 'round',
  stroke: '#faad42'
})
const baseCircle3 = CircleProgressbar(document.querySelector('#baseCircle3'), {
  value: 160,
  total: 200,
  strokeWidth: 12,
  strokeLinecap: 'round',
  stroke: '#f82a5e'
})

setInterval(() => {
  baseCircle3.setValue(Math.random() * 200)
}, 2000);


const titleCircle = CircleProgressbar(document.querySelector('#titleCircle'), {
  value: 9.4,
  total: 16,
  strokeLinecap: 'round',
  title: (percentage: number, value: number) => {
    return `${value}GB`
  },
  titleStyle: 'font-weight: 200; font-size: 18px',
  subtitle: 'memory usage',
  subtitleStyle: 'font-weight: 200; fill: #999;'
})

console.log("titleCircle", titleCircle);

const semiCircle = CircleProgressbar(document.querySelector('#semiCircle'), {
  value: 50,
  total: 100,
  semiCircle: 0.8,
  strokeWidth: 10,
  stroke: '#ffb08b',
  strokeLinecap: 'round',
  title: (percentage: number, value: number) => {
    return `${percentage}%`
  },
  titleStyle: 'font-weight: 200; font-size: 18px',
  subtitle: 'cpu usage',
  subtitleStyle: 'font-weight: 200; fill: #999'
})

setInterval(() => {
  semiCircle.setValue(Math.random() * 100)
}, 2000)

console.log("semiCircle", semiCircle);





//
//
// createCircle({
//   value: 200,
//   total: 400,
//   radius: '40%',
//   title: (v: number) => {
//     return v + '%'
//   },
//   subtitle: (v: number) => {
//
//   },
//   strokeWidth: 6,
//   stroke: '#5ea3f8',
//   semiCircle: 1
// })
//
// createCircle({
//   value: 200,
//   total: 400,
//   radius: '40%',
//   title: (v: number) => {
//     return v + '%'
//   },
//   subtitle: (v: number) => {
//
//   },
//   strokeWidth: 6,
//   stroke: '#21ba45',
//   semiCircle: 1
// })
