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

export async function fetchSkills() {
  const skills = await d3.json('skills.json')
  skills.sort((s1, s2) => {
    const name1 = s1.name.toUpperCase()
    const name2 = s2.name.toUpperCase()
    if (name1 < name2) {
      return -1
    }
    if (name1 > name2) {
      return 1
    }
    return 0
  })
  return skills
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
}

function updateCentroids() {
  const aspectRatio = width / height

  if (aspectRatio < 0.7) {
    const workingHeight = height - 0.85 * imageHeight_
    centroids = {
      web: { x: width / 2, y: workingHeight / 2 },
      language: { x: 0.2 * width, y: 0.3 * workingHeight },
      database: { x: 0.2 * width, y: 0.7 * workingHeight },
      agile: { x: width / 2, y: 0.88 * workingHeight },
      ui: { x: 0.8 * width, y: 0.7 * workingHeight },
      env: { x: 0.8 * width, y: 0.3 * workingHeight },
      ops: { x: width / 2, y: 0.12 * workingHeight },
    }
  } else if (aspectRatio > 1.3) {
    const workingWidth = width - 0.8 * imageWidth_
    centroids = {
      web: { x: workingWidth / 2, y: height / 2 },
      language: { x: 0.2 * workingWidth, y: 0.3 * height },
      database: { x: 0.2 * workingWidth, y: 0.7 * height },
      agile: { x: workingWidth / 2, y: 0.88 * height },
      ui: { x: 0.8 * workingWidth, y: 0.7 * height },
      env: { x: 0.8 * workingWidth, y: 0.3 * height },
      ops: { x: workingWidth / 2, y: 0.12 * height },
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
        angle: (27 * Math.PI) / 24,
        radius: r2,
      },
      env: {
        angle: (33 * Math.PI) / 24,
        radius: r2,
      },
      ops: {
        angle: (35 * Math.PI) / 24,
        radius: r1,
      },
    }
    for (const k in polarCoords) {
      const { angle: a, radius: r } = polarCoords[k]
      centroids[k] = {
        x: width + r * Math.cos(a),
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

  updateCentroids()
}

function forceCluster() {
  const strength = 0.003
  let nodes

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
    .force('x', d3.forceX(width / 4).strength(0.0003))
    .force('y', d3.forceY(height / 4).strength(0.0003))
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
  simulation.alpha(2).restart()
}

export function addNode(node) {
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
    .join(enter =>
      enter
        .append('circle')
        .attr('cx', focusX)
        .attr('cy', focusY)
        .attr('r', d => d.r)
        .attr('stroke', 'gray')
        .attr('stroke-width', 2)
        .attr('fill', 'none')
        .attr('class', 'node'),
    )

  simulation.nodes(data)
  play()
}
