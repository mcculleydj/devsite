import * as d3 from 'd3'

let container
let svg

export function init() {
  container = document.getElementById('svg-container')
  svg = d3.select(container).append('svg')
}

const centroids = {
  one: { x: 100, y: 100 },
  two: { x: 100, y: 600 },
}

function forceCluster() {
  const strength = 0.02
  let nodes

  const force = alpha => {
    const l = alpha * strength
    for (const d of nodes) {
      const { x: cx, y: cy } = centroids[d.group]
      d.vx -= (d.x - cx) * l
      d.vy -= (d.y - cy) * l
    }
  }

  force.initialize = _ => {
    nodes = _
  }

  return force
}

export function drawCanvas() {
  const width = container.clientWidth
  const height = container.clientHeight

  svg.attr('width', width).attr('height', height)

  const g = svg.append('g')

  const data = [
    { x: width / 2, y: height / 2, group: 'one' },
    { x: width / 2, y: height / 2, group: 'two' },
  ]

  const circle = g
    .selectAll('circle')
    .data(data)
    .join('circle')
    .attr('cx', d => d.x)
    .attr('cy', d => d.y)
    .attr('r', 25)

  const simulation = d3
    .forceSimulation(data)
    .alphaDecay(0.005)
    .force(
      'center',
      d3
        .forceCenter()
        .y(height / 2 - 100)
        .x(width / 2)
        .strength(0.02),
    )
    .force('cluster', forceCluster())

  simulation.on('tick', () => {
    circle.attr('cx', d => d.x).attr('cy', d => d.y)
  })
}
