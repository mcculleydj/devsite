import * as d3 from 'd3'
import { skillProficiencies, skillCategories } from '@/common/constants'

// selections
let container
let svg
let legend
let legendNodes
let legendText
let skillNodes
let categoryLabels

// geography
let originX
let originY
let width
let height
let imageWidth_
let imageHeight_
let centroids = {}

// simulations and data
let legendSimulation
let skillSimulation
let legendData = []
let skillData = []
let legendSimulationComplete = false

export function initCanvas() {
  container = document.getElementById('skills-svg-container')
  width = container.clientWidth
  height = container.clientHeight

  svg = d3
    .select(container)
    .append('svg')
    .attr('width', width)
    .attr('height', height)

  // these selections need to be non-null for simulation tick events
  legendNodes = d3.selectAll('circle.legend-node')
  legendText = d3.selectAll('text.legend-text')
  skillNodes = d3.selectAll('circle.skill-node')

  legend = svg.append('g')
  categoryLabels = svg.append('g')
}

// re-positions each category cluster on the screen based on aspect ratio
function updateCentroids() {
  const aspectRatio = width / height

  if (aspectRatio < 0.9) {
    const workingHeight = height - 0.85 * imageHeight_
    centroids = {
      web: { x: width / 2, y: 0.55 * workingHeight },
      database: { x: 0.2 * width, y: 0.3 * workingHeight },
      language: { x: 0.2 * width, y: 0.7 * workingHeight },
      agile: { x: width / 2, y: 0.9 * workingHeight },
      env: { x: 0.8 * width, y: 0.7 * workingHeight },
      ops: { x: 0.8 * width, y: 0.3 * workingHeight },
      ui: { x: width / 2, y: 0.2 * workingHeight },
    }
  } else if (aspectRatio > 1.3) {
    const workingWidth = width - 0.8 * imageWidth_
    const heightOffset = 0.05 * height
    centroids = {
      web: { x: workingWidth / 2, y: height / 2 + heightOffset },
      database: { x: 0.2 * workingWidth, y: 0.3 * height + heightOffset },
      language: { x: 0.2 * workingWidth, y: 0.7 * height + heightOffset },
      agile: { x: workingWidth / 2, y: 0.85 * height + heightOffset },
      env: { x: 0.8 * workingWidth, y: 0.7 * height + heightOffset },
      ops: { x: 0.8 * workingWidth, y: 0.3 * height + heightOffset },
      ui: { x: workingWidth / 2, y: 0.15 * height + heightOffset },
    }
  } else if (aspectRatio < 1.3 && aspectRatio > 1.1) {
    const r1 = 0.7 * Math.min(width, height)
    const r2 = 0.9 * Math.min(width, height)
    const r3 = 1.05 * Math.min(width, height)
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
      ops: {
        angle: (35 * Math.PI) / 24,
        radius: r1,
      },
      env: {
        angle: (27 * Math.PI) / 24,
        radius: r2,
      },
      ui: {
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
  } else {
    const r1 = 0.7 * Math.min(width, height)
    const r2 = 0.9 * Math.min(width, height)
    const r3 = 1.05 * Math.min(width, height)
    const polarCoords = {
      web: {
        angle: (5 * Math.PI) / 4,
        radius: 0.8 * r1,
      },
      language: {
        angle: (28.5 * Math.PI) / 24,
        radius: 0.9 * r3,
      },
      database: {
        angle: (30.55 * Math.PI) / 24,
        radius: 0.95 * r3,
      },
      agile: {
        angle: (25.5 * Math.PI) / 24,
        radius: 0.6 * r1,
      },
      ops: {
        angle: (35 * Math.PI) / 24,
        radius: r1,
      },
      env: {
        angle: (26 * Math.PI) / 24,
        radius: 0.835 * r2,
      },
      ui: {
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
export function updateCanvas(imageWidth, imageHeight, initSkills) {
  width = container.clientWidth
  height = container.clientHeight
  svg.attr('width', width).attr('height', height)

  originX = width - 0.65 * imageWidth
  originY = height - 0.65 * imageHeight

  imageWidth_ = imageWidth
  imageHeight_ = imageHeight

  // TODO: handle resize events during legend simulation and return
  if (!legendSimulationComplete) return

  // remove category labels
  categoryLabels
    .attr('opacity', 1)
    .transition(d3.transition().duration(500))
    .attr('opacity', 0)
    .remove()

  // re-add category labels
  categoryLabels = svg.append('g')

  // figure out where groups should be placed following the resize event
  updateCentroids()

  const aspectRatio = width / height
  const offsets = skillCategories.map(c => ({
    x:
      aspectRatio < 0.9 || aspectRatio > 1.3 ? c.hexOffset.x : c.radialOffset.x,
    y:
      aspectRatio < 0.9 || aspectRatio > 1.3 ? c.hexOffset.y : c.radialOffset.y,
  }))

  // set line properties based on radial or hexagonal arrangement
  let lineWidth = 120
  let lineDepth = 30
  if (aspectRatio < 0.9 || aspectRatio > 1.3) {
    lineWidth = 150
    lineDepth = 15
  }

  // add category headers and lines
  skillCategories.forEach((d, i) => {
    categoryLabels
      .append('text')
      .attr('x', centroids[d.group].x + offsets[i].x)
      .attr('y', centroids[d.group].y + offsets[i].y)
      .attr('font-size', '18px')
      .attr('fill', 'gray')
      .attr('fill-opacity', 0)
      .transition(
        d3
          .transition()
          .delay(600)
          .duration(500),
      )
      .attr('fill-opacity', 1)
      .text(d.display)

    categoryLabels
      .append('line')
      .attr('x1', centroids[d.group].x + offsets[i].x)
      .attr('y1', centroids[d.group].y + offsets[i].y + 2)
      .attr('x2', centroids[d.group].x + offsets[i].x + lineWidth)
      .attr('y2', centroids[d.group].y + offsets[i].y + 2)
      .attr('stroke', 'gray')
      .attr('stroke-opacity', 0)
      .transition(
        d3
          .transition()
          .delay(600)
          .duration(500),
      )
      .attr('stroke-opacity', 1)

    categoryLabels
      .append('line')
      .attr('x1', centroids[d.group].x + offsets[i].x)
      .attr('y1', centroids[d.group].y + offsets[i].y + 2)
      .attr('x2', centroids[d.group].x + offsets[i].x - lineDepth)
      .attr('y2', centroids[d.group].y + offsets[i].y + lineDepth)
      .attr('stroke', 'gray')
      .attr('stroke-opacity', 0)
      .transition(
        d3
          .transition()
          .delay(600)
          .duration(500),
      )
      .attr('stroke-opacity', 1)

    if (aspectRatio < 0.9 || aspectRatio > 1.3) {
      categoryLabels
        .append('line')
        .attr('x1', centroids[d.group].x + offsets[i].x + lineWidth)
        .attr('y1', centroids[d.group].y + offsets[i].y + 2)
        .attr('x2', centroids[d.group].x + offsets[i].x + lineWidth + lineDepth)
        .attr('y2', centroids[d.group].y + offsets[i].y + lineDepth)
        .attr('stroke', 'gray')
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

  if (!initSkills) {
    legend
      .transition(d3.transition())
      .attr('opacity', 0)
      .remove()
    legend = svg.append('g')
    setLegend()
  }
}

export function initLegendSimulation(complete) {
  legendSimulation = d3
    .forceSimulation()
    .alphaTarget(0.3) // stay hot
    .velocityDecay(0.2) // low friction
    .force('x', d3.forceX((width - imageWidth_) / 2).strength(0.01))
    .force('y', d3.forceY((_, i) => ((1 + i) * height) / 4).strength(0.008))
    .on('tick', () => {
      legendNodes
        .attr('cx', (d, i) => {
          if (
            i === 2 &&
            d.x - (width - imageWidth_) / 2 < 5 &&
            !legendSimulationComplete
          ) {
            legendSimulationComplete = true
            setLegend(complete)
          }
          return d.x
        })
        .attr('cy', d => d.y)

      legendText
        .attr('x', d => d.x + d.targetRadius * 1.5)
        .attr('y', d => d.y + 8)
    })
}

function setLegend(complete) {
  legendSimulation.stop()

  const aspectRatio = width / height
  let xOffset, yOffset

  if (aspectRatio > 1.3) {
    xOffset = width - 0.5 * imageWidth_
    yOffset = 0.45 * (height - imageHeight_)
  } else if (aspectRatio <= 1.3 && aspectRatio > 0.9) {
    xOffset = width - 0.3 * imageWidth_
    yOffset = 0.75 * (height - imageHeight_)
  } else {
    xOffset = 45 + width / 2
    yOffset = 0.85 * height
  }

  legendNodes
    .transition(d3.transition().duration(1000))
    .attr('cx', xOffset)
    .attr('cy', d => d.finalY + yOffset)
    .attr('r', d => d.targetRadius / 3)

  legendText
    .transition(d3.transition().duration(1000))
    .attr('x', xOffset - 120)
    .attr('y', d => d.finalY - 2 + yOffset)
    .attr('font-size', 20)

  skillProficiencies.forEach(d => {
    legend
      .append('line')
      .attr('x1', xOffset - 120)
      .attr('y1', d.finalY + yOffset)
      .attr('x2', xOffset - 120)
      .attr('y2', d.finalY + yOffset)
      .attr('stroke', 'gray')
      .attr('stroke-width', 1)
      .transition(
        d3
          .transition()
          .delay(1100)
          .duration(500),
      )
      .attr('x2', xOffset - d.targetRadius / 3)
      .attr('y2', d.finalY + yOffset)
  })

  setTimeout(complete, 2000)
}

export function addLegendNode(node) {
  legendData = legendData
    .map(d => ({ ...d }))
    .concat([
      {
        ...node,
        x: originX,
        y: originY,
      },
    ])

  legendNodes = svg
    .selectAll('circle.legend-node')
    .data(legendData)
    .join(enter => {
      const selection = enter
        .append('circle')
        .attr('cx', originX)
        .attr('cy', originY)
        .attr('stroke', 'gray')
        .attr('stroke-width', 1)
        .attr('class', 'legend-node')
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

  legendText = svg
    .selectAll('text.legend-text')
    .data(legendData)
    .join(enter =>
      enter
        .append('text')
        .attr('font-size', '32px')
        .attr('fill', 'gray')
        .attr('class', 'legend-text')
        .text(d => d.text),
    )

  legendSimulation.nodes(legendData)
  legendSimulation.alpha(2).restart()
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

export function initSkillSimulation() {
  skillSimulation = d3
    .forceSimulation()
    .alphaTarget(0.3) // stay hot
    .velocityDecay(0.1) // low friction
    .force('cluster', forceCluster())
    .force(
      'collide',
      d3
        .forceCollide()
        .radius(d => d.r + 1)
        .iterations(3),
    )
    .on('tick', () => {
      skillNodes.attr('cx', d => d.x).attr('cy', d => d.y)
    })
}

export function pause(simulation) {
  if (simulation === 'legend' || !skillSimulation) {
    legendSimulation.stop()
  } else {
    skillSimulation.stop()
  }
}

export function play(simulation) {
  if (simulation === 'legend' || !skillSimulation) {
    // TODO: need to reset forces here for update?
    legendSimulation.alpha(2).restart()
  } else {
    skillSimulation
      .alpha(2)
      .force('cluster', forceCluster())
      .restart()
  }
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

export function addSkillNode(node, onClick) {
  skillData = skillData
    .map(d => ({ ...d }))
    .concat([
      {
        ...node,
        x: originX,
        y: originY,
      },
    ])

  skillNodes = svg
    .selectAll('circle.skill-node')
    .data(skillData)
    .join(selection => {
      appendDef(selection)
      return selection
        .append('circle')
        .attr('cx', originX)
        .attr('cy', originY)
        .attr('r', d => d.r)
        .attr('stroke', 'gray')
        .attr('stroke-width', 1)
        .attr('class', 'skill-node')
        .attr('fill', d => (d.path ? `url(#image-${d.title})` : 'white'))
        .on('mouseover', function() {
          d3.select(this)
            .style('cursor', 'pointer')
            .transition(d3.transition())
            .attr('stroke-width', 3)
            .attr('stroke', '#1976d2')
        })
        .on('mouseleave', function() {
          d3.select(this)
            .style('cursor', 'normal')
            .transition(d3.transition())
            .attr('stroke-width', 1)
            .attr('stroke', 'gray')
        })
        .on('click', (_, d) => onClick(d))
    })

  skillSimulation.nodes(skillData)
  play('skills')
}
