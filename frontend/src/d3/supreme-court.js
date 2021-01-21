import * as d3 from 'd3'

// size
const margin = { left: 70, right: 40, top: 110, bottom: 50 }
const width = 800 - margin.left - margin.right
const height = 600 - margin.top - margin.bottom

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

export function drawCanvas() {
  const svg = d3
    .select('#supreme-court-svg-container')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)

  const plot = svg
    .append('g')
    .attr('width', width)
    .attr('height', height)
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

  // legend
  const legend = plot.append('g').attr('transform', 'translate(0, -90)')

  legend
    .append('circle')
    .attr('cx', 0)
    .attr('cy', 0)
    .attr('r', 10)
    .attr('stroke', color(true))
    .attr('fill', 'none')

  legend
    .append('text')
    .attr('font-size', '15px')
    .attr('x', 15)
    .attr('y', 5)
    .style('text-transform', 'capitalize')
    .text('WH and Senate - Different Party')

  legend
    .append('circle')
    .attr('cx', 0)
    .attr('cy', 25)
    .attr('r', 10)
    .attr('stroke', color(false))
    .attr('fill', 'none')

  legend
    .append('text')
    .attr('font-size', '15px')
    .attr('x', 15)
    .attr('y', 30)
    .style('text-transform', 'capitalize')
    .text('WH and Senate - Same Party')

  legend
    .append('circle')
    .attr('cx', 0)
    .attr('cy', 50)
    .attr('r', 10)
    .attr('fill', 'gray')
    .attr('stroke', 'gray')

  legend
    .append('text')
    .attr('font-size', '15px')
    .attr('x', 15)
    .attr('y', 55)
    .style('text-transform', 'capitalize')
    .text('Rejected')

  // x-axis
  xAxis = plot
    .append('g')
    .attr('transform', `translate(0, ${height})`)
    .style('font-size', '12px')

  // x-axis label
  plot
    .append('text')
    .attr('text-anchor', 'middle')
    .attr('font-size', '20px')
    .attr('transform', `translate(${width / 2}, ${height + 50})`)
    .text('Year')

  // y-axis
  plot
    .append('g')
    .style('font-size', '12px')
    .call(d3.axisLeft(y).tickValues([0, 25, 50, 75, 100, 125]))

  // y-axis label
  plot
    .append('text')
    .attr('text-anchor', 'middle')
    .attr('font-size', '20px')
    .attr('transform', `translate(-40, ${height / 2}) rotate(-90)`)
    .text('Days Elapsed')

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
  x.domain([minimumYear - 10, 2030])

  xAxis.transition(d3.transition()).call(d3.axisBottom(x).ticks(10, 'd'))

  const medianY = y(median(nomineeData))

  if (init) {
    plot
      .append('line')
      .attr('x1', x(minimumYear - 10))
      .attr('y1', medianY)
      .attr('x2', x(2030))
      .attr('y2', medianY)
      .attr('stroke', 'gray')
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', '5, 5')
      .attr('class', 'median')
  } else {
    plot
      .select('line.median')
      .transition(d3.transition().duration(500))
      .attr('y1', medianY)
      .attr('y2', medianY)
  }

  plot
    .selectAll('circle.point')
    .data(nomineeData, d => d.nominee)
    .join(
      enter => {
        appendDef(enter)
        const circles = enter.append('circle')
        circles
          .on('click', function(_, d) {
            callbacks.selectNominee(d)
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
