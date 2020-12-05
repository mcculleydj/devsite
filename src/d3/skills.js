import * as d3 from 'd3'

let container
let svg
let focusX
let focusY
let width
let height
let imageWidth_
let imageHeight_
let nodeSelection
let simulation
let data = []
let centroids = {}
let lines

const categories = [
  {
    group: 'web',
    display: 'web',
    hexOffset: {
      x: -90,
      y: -145,
    },
    radialOffset: {
      x: -110,
      y: -155,
    },
  },
  {
    group: 'language',
    display: 'languages',
    hexOffset: {
      x: -85,
      y: -120,
    },
    radialOffset: {
      x: -80,
      y: -120,
    },
  },
  {
    group: 'database',
    display: 'databases',
    hexOffset: {
      x: -85,
      y: -140,
    },
    radialOffset: {
      x: -90,
      y: -120,
    },
  },
  {
    group: 'agile',
    display: 'agile',
    hexOffset: {
      x: -90,
      y: -110,
    },
    radialOffset: {
      x: -90,
      y: -90,
    },
  },
  {
    group: 'ui',
    display: 'user interface',
    hexOffset: {
      x: -60,
      y: -110,
    },
    radialOffset: {
      x: -80,
      y: -110,
    },
  },
  {
    group: 'env',
    display: 'tools',
    hexOffset: {
      x: -60,
      y: -140,
    },
    radialOffset: {
      x: -130,
      y: -140,
    },
  },
  {
    group: 'ops',
    display: 'ops',
    hexOffset: {
      x: -90,
      y: -145,
    },
    radialOffset: {
      x: -90,
      y: -140,
    },
  },
]

export async function fetchSkills() {
  const skills = await d3.json('skills.json')
  return skills.sort((s1, s2) => s1.r - s2.r)
}

// called once to initially render fixtures
export async function initCanvas() {
  container = document.getElementById('svg-container')
  width = container.clientWidth
  height = container.clientHeight

  svg = d3
    .select(container)
    .append('svg')
    .attr('width', width)
    .attr('height', height)

  nodeSelection = svg.selectAll('circle.node')
  lines = svg.append('g')
}

function updateCentroids() {
  const aspectRatio = width / height

  if (aspectRatio < 0.7) {
    const workingHeight = height - 0.85 * imageHeight_
    centroids = {
      web: { x: width / 2, y: workingHeight / 2 },
      database: { x: 0.2 * width, y: 0.35 * workingHeight },
      language: { x: 0.2 * width, y: 0.65 * workingHeight },
      agile: { x: width / 2, y: 0.85 * workingHeight },
      env: { x: 0.8 * width, y: 0.65 * workingHeight },
      ui: { x: 0.8 * width, y: 0.35 * workingHeight },
      ops: { x: width / 2, y: 0.15 * workingHeight },
    }
  } else if (aspectRatio > 1.3) {
    const workingWidth = width - 0.8 * imageWidth_
    const heightOffset = 0.05 * height
    centroids = {
      web: { x: workingWidth / 2, y: height / 2 + heightOffset },
      database: { x: 0.2 * workingWidth, y: 0.35 * height + heightOffset },
      language: { x: 0.2 * workingWidth, y: 0.65 * height + heightOffset },
      agile: { x: workingWidth / 2, y: 0.85 * height + heightOffset },
      env: { x: 0.8 * workingWidth, y: 0.65 * height + heightOffset },
      ui: { x: 0.8 * workingWidth, y: 0.35 * height + heightOffset },
      ops: { x: workingWidth / 2, y: 0.15 * height + heightOffset },
    }
  } else {
    const r1 = 0.75 * Math.min(width, height)
    const r2 = 0.9 * Math.min(width, height)
    const r3 = 1.1 * Math.min(width, height)
    const polarCoords = {
      web: {
        angle: (5 * Math.PI) / 4,
        radius: r1,
      },
      language: {
        angle: (29 * Math.PI) / 24,
        radius: r3,
      },
      database: {
        angle: (31 * Math.PI) / 24,
        radius: r3,
      },
      agile: {
        angle: (25 * Math.PI) / 24,
        radius: r1,
      },
      ui: {
        angle: (35 * Math.PI) / 24,
        radius: r1,
      },
      env: {
        angle: (27 * Math.PI) / 24,
        radius: r2,
      },
      ops: {
        angle: (33 * Math.PI) / 24,
        radius: r2,
      },
    }
    for (const k in polarCoords) {
      const { angle: a, radius: r } = polarCoords[k]
      centroids[k] = {
        x: 0.95 * width + r * Math.cos(a),
        y: height + r * Math.sin(a),
      }
    }
  }
}

// during resize events update the svg canvas and visualization
export function updateCanvas(imageWidth, imageHeight) {
  width = container.clientWidth
  height = container.clientHeight
  svg.attr('width', width).attr('height', height)

  focusX = width - 0.65 * imageWidth
  focusY = height - 0.75 * imageHeight

  imageWidth_ = imageWidth
  imageHeight_ = imageHeight

  // remove group headers
  svg
    .selectAll('text.group')
    .attr('fill-opacity', 1)
    .transition(d3.transition().duration(500))
    .attr('fill-opacity', 0)
    .remove()

  // remove lines
  lines
    .attr('fill-opacity', 1)
    .transition(d3.transition().duration(500))
    .attr('fill-opacity', 0)
    .remove()

  // add lines group
  lines = svg.append('g')

  updateCentroids()

  const aspectRatio = width / height
  const offsets = categories.map(c => ({
    x:
      aspectRatio < 0.7 || aspectRatio > 1.3 ? c.hexOffset.x : c.radialOffset.x,
    y:
      aspectRatio < 0.7 || aspectRatio > 1.3 ? c.hexOffset.y : c.radialOffset.y,
  }))

  let lineWidth = 120
  let lineDepth = 30
  if (aspectRatio < 0.7 || aspectRatio > 1.3) {
    lineWidth = 150
    lineDepth = 15
  }

  // add group headers and lines

  categories.forEach((d, i) => {
    svg
      .append('text')
      .attr('font-size', '18px')
      .attr('fill', 'gray')
      .attr('class', 'group')
      .attr('x', centroids[d.group].x + offsets[i].x)
      .attr('y', centroids[d.group].y + offsets[i].y)
      .attr('fill-opacity', 0)
      .transition(
        d3
          .transition()
          .delay(600)
          .duration(500),
      )
      .attr('fill-opacity', 1)
      .text(d.display)

    lines
      .append('line')
      .attr('stroke', 'gray')
      .attr('x1', centroids[d.group].x + offsets[i].x)
      .attr('y1', centroids[d.group].y + offsets[i].y + 2)
      .attr('x2', centroids[d.group].x + offsets[i].x + lineWidth)
      .attr('y2', centroids[d.group].y + offsets[i].y + 2)
      .attr('stroke-opacity', 0)
      .transition(
        d3
          .transition()
          .delay(600)
          .duration(500),
      )
      .attr('stroke-opacity', 1)

    lines
      .append('line')
      .attr('stroke', 'gray')
      .attr('x1', centroids[d.group].x + offsets[i].x)
      .attr('y1', centroids[d.group].y + offsets[i].y + 2)
      .attr('x2', centroids[d.group].x + offsets[i].x - lineDepth)
      .attr('y2', centroids[d.group].y + offsets[i].y + lineDepth)
      .attr('stroke-opacity', 0)
      .transition(
        d3
          .transition()
          .delay(600)
          .duration(500),
      )
      .attr('stroke-opacity', 1)

    if (aspectRatio < 0.7 || aspectRatio > 1.3) {
      lines
        .append('line')
        .attr('stroke', 'gray')
        .attr('x1', centroids[d.group].x + offsets[i].x + lineWidth)
        .attr('y1', centroids[d.group].y + offsets[i].y + 2)
        .attr('x2', centroids[d.group].x + offsets[i].x + lineWidth + lineDepth)
        .attr('y2', centroids[d.group].y + offsets[i].y + lineDepth)
        .attr('stroke-opacity', 0)
        .transition(
          d3
            .transition()
            .delay(600)
            .duration(500),
        )
        .attr('stroke-opacity', 1)
    }
  })
}

function forceCluster() {
  let nodes
  const strength = 0.003

  const force = alpha => {
    const l = alpha * strength
    for (const d of nodes) {
      d.vx -= (d.x - centroids[d.group].x) * l
      d.vy -= (d.y - centroids[d.group].y) * l
    }
  }

  force.initialize = _ => {
    nodes = _
  }

  return force
}

export function initSimulation() {
  simulation = d3
    .forceSimulation()
    .alphaTarget(0.3) // stay hot
    .velocityDecay(0.1) // low friction
    // .force('x', d3.forceX(width / 4).strength(0.0003))
    // .force('y', d3.forceY(height / 4).strength(0.0003))
    .force('cluster', forceCluster())
    .force(
      'collide',
      d3
        .forceCollide()
        .radius(d => d.r + 1)
        .iterations(3),
    )
    .on('tick', () => {
      nodeSelection.attr('cx', d => d.x).attr('cy', d => d.y)
    })
}

export function pause() {
  simulation.stop()
}

export function play() {
  simulation
    .alpha(2)
    .force('cluster', forceCluster())
    .restart()
}

export function addNode(node, onClick) {
  data = data
    .map(d => ({ ...d }))
    .concat([
      {
        ...node,
        x: focusX,
        y: focusY,
      },
    ])

  nodeSelection = svg
    .selectAll('circle.node')
    .data(data)
    .join(selection => {
      appendDef(selection)
      return selection
        .append('circle')
        .attr('cx', focusX)
        .attr('cy', focusY)
        .attr('r', d => d.r)
        .attr('stroke', 'gray')
        .attr('stroke-width', 1)
        .attr('class', 'node')
        .attr('fill', d => (d.path ? `url(#image-${d.title})` : 'white'))
        .on('mouseover', function() {
          d3.select(this)
            .style('cursor', 'pointer')
            .transition(d3.transition())
            .attr('stroke-width', 3)
        })
        .on('mouseleave', function() {
          d3.select(this)
            .style('cursor', 'normal')
            .transition(d3.transition())
            .attr('stroke-width', 1)
        })
        .on('click', (_, d) => onClick(d))
    })

  simulation.nodes(data)
  play()
}

function appendDef(selection) {
  selection
    .append('defs')
    .append('pattern')
    .attr('id', d => `image-${d.title}`)
    .attr('width', 1)
    .attr('height', 1)
    .append('svg:image')
    .attr('x', d => d.r * 0.25)
    .attr('y', d => d.r * 0.25)
    .attr('width', d => d.r * 1.5)
    .attr('height', d => d.r * 1.5)
    .attr('xlink:href', d => d.path)
}
