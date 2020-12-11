import * as d3 from 'd3'

// selections
let container
let svg
let width
let height
let hexGroup

export function initCanvas() {
  container = document.getElementById('projects-svg-container')
  width = container.clientWidth
  height = container.clientHeight

  svg = d3
    .select(container)
    .append('svg')
    .attr('width', width)
    .attr('height', height)

  hexGroup = svg.append('g')
}

function calculateVertices(sideLength, radius, centerX, centerY) {
  const centerPoints = [
    {
      x: centerX + radius * Math.cos((5 * Math.PI) / 3),
      y: centerY + radius * Math.sin((5 * Math.PI) / 3),
    },
    {
      x: centerX + radius * Math.cos((4 * Math.PI) / 3),
      y: centerY + radius * Math.sin((4 * Math.PI) / 3),
    },
    {
      x: centerX + radius * Math.cos(Math.PI),
      y: centerY + radius * Math.sin(Math.PI),
    },
    {
      x: centerX + radius * Math.cos((2 * Math.PI) / 3),
      y: centerY + radius * Math.sin((2 * Math.PI) / 3),
    },
  ]

  const k = Math.sqrt(3) / 2
  // clockwise starting from top
  const vertices = [
    { x: 0, y: -sideLength },
    { x: k * sideLength, y: -0.5 * sideLength },
    { x: k * sideLength, y: 0.5 * sideLength },
    { x: 0, y: sideLength },
    { x: -k * sideLength, y: 0.5 * sideLength },
    { x: -k * sideLength, y: -0.5 * sideLength },
    { x: 0, y: -sideLength },
  ]

  return centerPoints.map(({ x: cx, y: cy }) =>
    vertices.map(v => ({ x: cx + v.x, y: cy + v.y })),
  )
}

export function updateCanvas(imageWidth, imageHeight) {
  const sideLength = 150
  const radius = 300
  width = container.clientWidth
  height = container.clientHeight
  svg.attr('width', width).attr('height', height)

  const originX = width - 0.77 * imageWidth
  const originY = height - 0.65 * imageHeight

  const centerX = 0.5 * width
  const centerY = 0.5 * height

  const center1 = {
    x: centerX + radius * Math.cos(0),
    y: centerY + radius * Math.sin(0),
  }
  const k = Math.sqrt(3) / 2

  const center2 = {
    x: centerX + radius * Math.cos(Math.PI / 3),
    y: centerY + radius * Math.sin(Math.PI / 3),
  }
  const edgeVertices = [
    [
      { x: center1.x - k * sideLength, y: center1.y - 0.5 * sideLength },
      { x: center1.x - k * sideLength, y: center1.y + 0.5 * sideLength },
      { x: originX, y: originY },
    ],
    [
      { x: center2.x - k * sideLength, y: center2.y - 0.5 * sideLength },
      { x: center2.x, y: center2.y - sideLength },
      { x: originX, y: originY },
    ],
  ]

  const edges = hexGroup.selectAll('path.edge').data(edgeVertices)

  edges
    .exit()
    .transition(d3.transition().duration(300))
    .remove()

  const line = d3
    .line()
    .x(d => d.x)
    .y(d => d.y)

  edges
    .enter()
    .append('path')
    .attr('stroke', '#1976d2')
    .attr('stroke-width', '2')
    .attr('class', 'edge')
    .attr('fill', 'none')
    .merge(edges)
    .transition(d3.transition().duration(300))
    .attr('d', d => line(d))

  const hexagons = hexGroup
    .selectAll('polygon.hex')
    .data(calculateVertices(sideLength, radius, 0.5 * width, 0.5 * height))

  hexagons
    .exit()
    .transition(d3.transition().duration(300))
    .remove()

  hexagons
    .enter()
    .append('polygon')
    .attr('fill', 'none')
    .attr('stroke', 'rgba(0, 0, 0, 0.2')
    .attr('class', 'hex')
    .merge(hexagons)
    .transition(d3.transition().duration(300))
    .attr('points', d => d.map(v => [v.x, v.y].join(',')).join(' '))
}
