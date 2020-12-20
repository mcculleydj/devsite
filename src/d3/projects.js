import * as d3 from 'd3'
import { projects } from '@/common/constants'

// selections
let container
let svg
let width
let height
let hexGroup
let selectedHex

// TODO: handle short screens as well
const widthBreakpoint = 1100

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
  ]

  if (width < widthBreakpoint) {
    centerPoints.push({
      x: centerX + radius * Math.cos(0),
      y: centerY + radius * Math.sin(0),
    })
  } else {
    centerPoints.push({
      x: centerX + radius * Math.cos((2 * Math.PI) / 3),
      y: centerY + radius * Math.sin((2 * Math.PI) / 3),
    })
  }

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

  return centerPoints.map(({ x: cx, y: cy }, i) => ({
    vertices: vertices.map(v => ({ x: cx + v.x, y: cy + v.y })),
    project: projects[i],
  }))
}

function calculateEdgeVertices(radius, sideLength, imageWidth, imageHeight) {
  const originX = width - 0.77 * imageWidth
  const originY = height - 0.65 * imageHeight

  const centerX = 0.5 * width
  const centerY = 0.5 * height
  const k = Math.sqrt(3) / 2

  let center1 = {
    x: centerX + radius * Math.cos(0),
    y: centerY + radius * Math.sin(0),
  }

  if (width < widthBreakpoint) {
    center1 = {
      x: centerX + radius * Math.cos((2 * Math.PI) / 3),
      y: centerY + radius * Math.sin((2 * Math.PI) / 3),
    }
  }

  const center2 = {
    x: centerX + radius * Math.cos(Math.PI / 3),
    y: centerY + radius * Math.sin(Math.PI / 3),
  }

  let pathOne = [
    { x: center1.x - k * sideLength, y: center1.y - 0.5 * sideLength },
    { x: center1.x - k * sideLength, y: center1.y + 0.5 * sideLength },
    { x: originX, y: originY },
  ]
  let pathTwo = [
    { x: center2.x - k * sideLength, y: center2.y - 0.5 * sideLength },
    { x: center2.x, y: center2.y - sideLength },
    { x: originX, y: originY },
  ]
  if (width < widthBreakpoint) {
    pathOne = [
      { x: center1.x, y: center1.y - sideLength },
      { x: center1.x + k * sideLength, y: center1.y - 0.5 * sideLength },
      { x: originX, y: originY },
    ]
    pathTwo = [
      { x: originX, y: originY },
      { x: center2.x - k * sideLength, y: center2.y - 0.5 * sideLength },
      { x: center2.x, y: center2.y - sideLength },
    ]
  }

  return [pathOne, pathTwo]
}

export function updateCanvas(imageWidth, imageHeight, onClick) {
  let sideLength = 120
  let radius = 250
  width = container.clientWidth
  height = container.clientHeight
  svg.attr('width', width).attr('height', height)

  if (width < widthBreakpoint) {
    sideLength = Math.min(width / 7, 120)
    radius = Math.min(250, width / 3)
  }

  const images = hexGroup.selectAll('image').data(projects)

  images.exit().remove()

  images
    .enter()
    .append('defs')
    .append('pattern')
    .attr('id', d => `project-image-${d.title}`)
    .attr('width', 1)
    .attr('height', 1)
    .append('svg:image')
    .attr('xlink:href', d => d.path)
    .merge(images)
    .transition(d3.transition().duration(300))
    .attr('width', 2 * sideLength - 10)
    .attr('height', 2 * sideLength - 10)
    .attr('x', (-25 * sideLength) / 300)

  const edges = hexGroup
    .selectAll('path.edge')
    .data(calculateEdgeVertices(radius, sideLength, imageWidth, imageHeight))

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
    .attr('stroke', 'gray')
    .attr('stroke-width', '1')
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
    .attr('fill', (_, i) => `url(#project-image-${projects[i].title})`)
    .attr('stroke', 'gray')
    .attr('class', 'hex')
    .on('mouseover', function() {
      d3.select(this)
        .style('cursor', 'pointer')
        .attr('stroke-width', 1)
        .transition(d3.transition())
        .attr('stroke-width', 3)
    })
    .on('mouseleave', function(_, d) {
      d3.select(this)
        .style('cursor', 'normal')
        .attr('stroke-width', 3)
        .transition(d3.transition())
        .attr('stroke-width', function() {
          return selectedHex && this.__data__.project.name === d.project.name
            ? 3
            : 1
        })
    })
    .on('click', function(_, d) {
      if (selectedHex) {
        selectedHex.attr('stroke-width', 1).attr('stroke', 'gray')
      }
      selectedHex = d3
        .select(this)
        .attr('stroke-width', 3)
        .attr('stroke', '#1976d2')
      onClick(d.project, sideLength)
    })
    .merge(hexagons)
    .transition(d3.transition().duration(300))
    .attr('points', d => d.vertices.map(v => [v.x, v.y].join(',')).join(' '))

  return sideLength
}
