import * as d3 from 'd3'

function centroid(nodes) {
  let x = 0
  let y = 0
  let z = 0
  for (const d of nodes) {
    let k = d.r ** 2
    x += d.x * k
    y += d.y * k
    z += k
  }
  return { x: x / z, y: y / z }
}

export async function readData() {
  return await d3.json('skills.json')
}

export default class ClusteredBubble {
  constructor(selector, { width, height }) {
    this.svg = d3
      .select(selector)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
    this.width = width
    this.height = height
  }

  update(data) {
    const pack = d3
      .pack()
      .size([this.width, this.height])
      .padding(1)

    const nodes = pack(d3.hierarchy(data).sum(d => d.value)).leaves()

    // should be a variable
    const color = d3.scaleOrdinal(d3.range(10), d3.schemeCategory10)

    // may not want to do this on update
    const g = this.svg.append('g')

    const node = g
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('stroke', d => color(d.data.group))
      .attr('stroke-width', 2)
      .attr('fill', 'none')

    node
      .transition()
      .delay(Math.random() * 500)
      .duration(750)
      .attrTween('r', d => {
        const i = d3.interpolate(0, d.r)
        return t => (d.r = i(t))
      })

    const image = g
      .selectAll('image')
      .data(nodes)
      .join('image')
      .attr('xlink:href', 'http://localhost:8080/vue.png')
      .attr('x', d => d.x)
      .attr('y', d => d.y)
      .attr('height', 20)
      .attr('width', 20)
      .attr('transform', 'translate(-10, -10)')

    const simulation = d3
      .forceSimulation(nodes)
      .force('x', d3.forceX(this.width / 2).strength(0.01))
      .force('y', d3.forceY(this.height / 2).strength(0.01))
      .force('cluster', this.forceCluster())
      .force('collide', this.forceCollide())

    simulation.on('tick', () => {
      node.attr('cx', d => d.x).attr('cy', d => d.y)
      image.attr('x', d => d.x).attr('y', d => d.y)
    })

    // if (invalidation) {
    //   invalidation.then(() => simulation.stop())
    // }
  }

  forceCluster() {
    const strength = 0.2
    let nodes

    const force = alpha => {
      const centroids = d3.rollup(nodes, centroid, d => d.data.group)
      const l = alpha * strength
      for (const d of nodes) {
        const { x: cx, y: cy } = centroids.get(d.data.group)
        d.vx -= (d.x - cx) * l
        d.vy -= (d.y - cy) * l
      }
    }

    force.initialize = _ => {
      nodes = _
    }

    return force
  }

  forceCollide() {
    // fixed for greater rigidity
    const alpha = 0.4
    // separation between same-color nodes
    const padding1 = 2
    // separation between different-color nodes
    const padding2 = 6

    let nodes
    let maxRadius

    const force = () => {
      const quadtree = d3.quadtree(
        nodes,
        d => d.x,
        d => d.y,
      )

      for (const d of nodes) {
        const r = d.r + maxRadius
        const nx1 = d.x - r,
          ny1 = d.y - r
        const nx2 = d.x + r,
          ny2 = d.y + r
        quadtree.visit((q, x1, y1, x2, y2) => {
          if (!q.length)
            do {
              if (q.data !== d) {
                const r =
                  d.r +
                  q.data.r +
                  (d.data.group === q.data.data.group ? padding1 : padding2)
                let x = d.x - q.data.x,
                  y = d.y - q.data.y,
                  l = Math.hypot(x, y)
                if (l < r) {
                  l = ((l - r) / l) * alpha
                  ;(d.x -= x *= l), (d.y -= y *= l)
                  ;(q.data.x += x), (q.data.y += y)
                }
              }
            } while ((q = q.next))
          return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1
        })
      }
    }

    force.initialize = _ =>
      (maxRadius = d3.max((nodes = _), d => d.r) + Math.max(padding1, padding2))

    return force
  }
}
