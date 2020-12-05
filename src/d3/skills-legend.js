import * as d3 from 'd3'

let svg
let width
let height
let imageWidth_
let container
let nodeSelection
let textSelection
let originX
let originY
let simulation
let data = []
let cleared = false

export function retrieveData() {
  return [
    {
      text: 'Familiar',
      targetRadius: 25,
    },
    {
      text: 'Comfortable',
      targetRadius: 35,
    },
    {
      text: 'Proficient',
      targetRadius: 45,
    },
  ]
}

export function initCanvas() {
  container = document.getElementById('svg-container')
  width = container.clientWidth
  height = container.clientHeight

  svg = d3
    .select(container)
    .append('svg')
    .attr('width', width)
    .attr('height', height)

  nodeSelection = d3.selectAll('circle.node')
  textSelection = d3.selectAll('text.legend')
}

// during resize events update the svg canvas and visualization
export function updateCanvas(imageWidth, imageHeight) {
  width = container.clientWidth
  const height = container.clientHeight
  svg.attr('width', width).attr('height', height)

  imageWidth_ = imageWidth

  originX = width - 0.65 * imageWidth
  originY = height - 0.75 * imageHeight
}

export function initSimulation(complete) {
  simulation = d3
    .forceSimulation()
    .alphaTarget(0.3) // stay hot
    .velocityDecay(0.2) // low friction
    .force('x', d3.forceX((width - imageWidth_) / 2).strength(0.01))
    .force('y', d3.forceY((_, i) => ((1 + i) * height) / 4).strength(0.008))
    .on('tick', () => {
      nodeSelection
        .attr('cx', (d, i) => {
          if (i === 2 && d.x - (width - imageWidth_) / 2 < 5 && !cleared) {
            cleared = true
            clear()
          } else if (i === 2 && d.x < -250) {
            svg.remove()
            simulation.stop()
            complete()
          }
          return d.x
        })
        .attr('cy', d => d.y)
      textSelection
        .attr('x', d => d.x + d.targetRadius * 1.5)
        .attr('y', d => d.y + 8)
    })
}

function clear() {
  setTimeout(() => {
    simulation.stop()
    simulation.force('x', d3.forceX(-300).strength(0.01))
    play()
  }, 1000)
}

export function pause() {
  simulation.stop()
}

export function play() {
  simulation.restart()
}

export function addNode(node) {
  data = data
    .map(d => ({ ...d }))
    .concat([
      {
        ...node,
        x: originX,
        y: originY,
      },
    ])

  nodeSelection = svg
    .selectAll('circle.node')
    .data(data)
    .join(enter => {
      const selection = enter
        .append('circle')
        .attr('cx', originX)
        .attr('cy', originY)
        .attr('stroke', 'gray')
        .attr('stroke-width', 1)
        .attr('class', 'node')
        .attr('fill', 'white')

      selection
        .transition()
        .duration(750)
        .attrTween('r', d => {
          const i = d3.interpolate(0, d.targetRadius)
          return t => (d.r = i(t))
        })

      return selection
    })

  textSelection = svg
    .selectAll('text.legend')
    .data(data)
    .join(enter =>
      enter
        .append('text')
        .attr('font-size', '32px')
        .attr('fill', 'gray')
        .attr('class', 'legend')
        .text(d => d.text),
    )

  simulation.nodes(data)
  play()
}
