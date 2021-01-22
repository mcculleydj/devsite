import * as d3 from 'd3'

// size
const margin = { left: 50, right: 50, top: 30, bottom: 50 }
const width = 800 - margin.left - margin.right
const height = 450 - margin.top - margin.bottom

// scale
const x = d3.scaleLinear().range([0, width])
const y = d3
  .scaleLinear()
  .range([height, 0])
  .domain([0, 125])

// style
const color = divided => (divided ? '#779ecb' : 'coral')
const justiceImagePaths = {
  'Amy Barrett': 'justices/acb.jpg',
  'Ruth Ginsburg': 'justices/rbg.jpg',
  'Thurgood Marshall': 'justices/tm.jpg',
  'Clarence Thomas': 'justices/ct.jpg',
}

// xAxis will be responsive to range changes
let xAxis

export async function readData() {
  const raw = await d3.json('supreme-court.json')
  return raw.map((d, i) => ({
    ...d,
    id: i,
    path: justiceImagePaths[d.nominee],
  }))
}

function responsive(svg) {
  // get container + svg aspect ratio
  const container = d3.select(svg.node().parentNode)
  const width = parseInt(svg.style('width'))
  const height = parseInt(svg.style('height'))
  const aspectRatio = width / height

  // add viewBox and preserveAspectRatio properties,
  // and call resize so that svg resizes on inital page load
  svg
    .attr('viewBox', '0 0 ' + width + ' ' + height)
    .attr('preserveAspectRatio', 'xMinYMid')
    .call(resize)

  // to register multiple listeners for same event type,
  // you need to add namespace, i.e., 'click.foo'
  // necessary if you call invoke this function for multiple svgs
  // api docs: https://github.com/mbostock/d3/wiki/Selections#on
  d3.select(window).on('resize.' + container.attr('id'), resize)

  // get width of container and resize svg to fit it
  function resize() {
    const targetWidth = parseInt(container.style('width'))
    svg.attr('width', targetWidth)
    svg.attr('height', Math.round(targetWidth / aspectRatio))
  }
}

export function drawCanvas() {
  const svg = d3
    .select('#supreme-court-svg-container')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .call(responsive)

  const plot = svg
    .append('g')
    // .attr('width', width)
    // .attr('height', height)
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

  // x-axis
  xAxis = plot
    .append('g')
    .attr('transform', `translate(0, ${height})`)
    .style('font-size', '12px')

  // x-axis label
  plot
    .append('text')
    .attr('text-anchor', 'middle')
    .attr('font-size', '16px')
    .attr('transform', `translate(${width / 2}, ${height + 40})`)
    .attr('stroke', '#999')
    .attr('fill', '#999')
    .text('YEAR')

  // y-axis
  plot
    .append('g')
    .style('font-size', '12px')
    .call(d3.axisLeft(y).tickValues([0, 25, 50, 75, 100, 125]))

  // y-axis label
  plot
    .append('text')
    .attr('text-anchor', 'middle')
    .attr('font-size', '16px')
    .attr('transform', `translate(-35, ${height / 2}) rotate(-90)`)
    .attr('stroke', '#999')
    .attr('fill', '#999')
    .text('DAYS ELAPSED')

  return plot
}

function appendDef(selection) {
  selection
    .append('defs')
    .append('pattern')
    .attr('id', d => `justice-image-${d.id}`)
    .attr('width', 1)
    .attr('height', 1)
    .append('svg:image')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', 50)
    .attr('height', 50)
    .attr('xlink:href', d => d.path)
}

function median(nomineeData) {
  const sorted = nomineeData.sort((d1, d2) => d1.days - d2.days)

  const i = Math.floor(sorted.length / 2)
  if (nomineeData.length % 2 === 0) {
    return (sorted[i].days + sorted[i + 1].days) / 2
  }

  return sorted[i].days
}

export function updatePlot(
  plot,
  nomineeData,
  minimumYear,
  callbacks,
  init = false,
) {
  x.domain([minimumYear - 5, 2025])

  xAxis.transition(d3.transition()).call(d3.axisBottom(x).ticks(10, 'd'))

  const medianY = y(median(nomineeData))

  if (init) {
    plot
      .append('line')
      .attr('x1', x(minimumYear - 5))
      .attr('y1', medianY)
      .attr('x2', x(2025))
      .attr('y2', medianY)
      .attr('stroke', 'gray')
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', '5, 5')
      .attr('class', 'median')

    plot
      .append('text')
      .attr('x', 10)
      .attr('y', medianY - 7)
      .attr('font-size', '12px')
      .attr('class', 'median')
      .style('color', 'gray')
      .text('median')
  } else {
    plot
      .select('line.median')
      .transition(d3.transition().duration(500))
      .attr('y1', medianY)
      .attr('y2', medianY)

    plot
      .select('text.median')
      .transition(d3.transition().duration(500))
      .attr('y', medianY - 7)
  }

  plot
    .selectAll('circle.point')
    .data(nomineeData, d => d.nominee)
    .join(
      enter => {
        appendDef(enter)
        const circles = enter.append('circle')
        circles
          .on('mouseover', function(_, d) {
            callbacks.displayNominee(d)
          })
          .on('mouseleave', function() {
            callbacks.displayNominee(null)
          })
          .attr('cy', d => y(d.days) - 100)
          .attr('opacity', 0)
          .transition(d3.transition().duration(500))
          .attr('opacity', 1)
          .attr('cx', d => x(d.year))
          .attr('cy', d => y(d.days))
          .attr('r', d => (d.path ? 25 : 5))
          .attr('stroke', d => color(d.divided))
          .attr('stroke-width', 1.5)
          .attr('class', 'point')
          .attr('fill', d =>
            d.path
              ? `url(#justice-image-${d.id})`
              : d.result === 'Confirmed'
              ? 'white'
              : 'gray',
          )
        return circles
      },
      update => {
        update
          .transition(d3.transition().duration(500))
          .attr('cx', d => x(d.year))
          .attr('cy', d => y(d.days))
      },
      exit => {
        exit
          .transition(d3.transition().duration(500))
          .attr('opacity', 0)
          .attr('cy', d => y(d.days) - 100)
          .remove()
      },
    )
}
