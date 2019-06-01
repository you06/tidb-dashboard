export const colors = [
  '#2f7ed8',
  '#0d233a',
  '#8bbc21',
  '#910000',
  '#1aadce',
  '#492970',
  '#f28f43',
  '#77a1e5',
  '#c42525',
  '#a6c96a'
]

const gradients = colors.map(color => {
  const r = parseInt(color.slice(1, 3), 16)
  const g = parseInt(color.slice(3, 5), 16)
  const b = parseInt(color.slice(5, 7), 16)
  return [
    [0, `rgba(${r}, ${g}, ${b}, 0.6)`],
    [0.5, `rgba(${r}, ${g}, ${b}, 0.3)`],
    [1, `rgba(${r}, ${g}, ${b}, 0)`]
  ]
})
// const gradients = [
//   [
//     [0, 'rgba(0, 231, 255, 0.9)'],
//     [0.5, 'rgba(0, 231, 255, 0.25)'],
//     [1, 'rgba(0, 231, 255, 0)']
//   ],
//   [
//     [0, 'rgba(255, 0, 0, 0.5)'],
//     [0.5, 'rgba(255, 0, 0, 0.25)'],
//     [1, 'rgba(255, 0, 0, 0)']
//   ],
//   [
//     [0, 'rgba(0, 231, 255, 0.9)'],
//     [0.5, 'rgba(0, 231, 255, 0.25)'],
//     [1, 'rgba(0, 231, 255, 0)']
//   ],
//   [
//     [0, 'rgba(255, 0, 0, 0.5)'],
//     [0.5, 'rgba(255, 0, 0, 0.25)'],
//     [1, 'rgba(255, 0, 0, 0)']
//   ]
// ]

export const getGradient = (canvas, id) => {
  const gradient = canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)

  for (const gradientColor of gradients[id]) {
    gradient.addColorStop(...gradientColor)
  }
  return gradient
}
