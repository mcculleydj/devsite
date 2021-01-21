<template>
  <div class="canvas">
    <canvas id="canvas" class="canvas__canvas"></canvas>
  </div>
</template>

<script>
function drawPolygon(ctx, pts, radius) {
  if (radius > 0) {
    pts = getRoundedPoints(pts, radius)
  }

  let pt

  ctx.beginPath()

  for (let i = 0; i < pts.length; i++) {
    pt = pts[i]

    if (i == 0) {
      ctx.moveTo(pt[0], pt[1])
    } else {
      ctx.lineTo(pt[0], pt[1])
    }

    if (radius > 0) {
      ctx.quadraticCurveTo(pt[2], pt[3], pt[4], pt[5])
    }
  }

  ctx.closePath()
}

function getRoundedPoints(pts, radius) {
  const len = pts.length
  const res = new Array(len)

  for (let i2 = 0; i2 < len; i2++) {
    let i1 = i2 - 1
    let i3 = i2 + 1

    if (i1 < 0) {
      i1 = len - 1
    }

    if (i3 == len) {
      i3 = 0
    }

    const p1 = pts[i1]
    const p2 = pts[i2]
    const p3 = pts[i3]
    const prevPt = getRoundedPoint(p1[0], p1[1], p2[0], p2[1], radius, false)
    const nextPt = getRoundedPoint(p2[0], p2[1], p3[0], p3[1], radius, true)
    res[i2] = [prevPt[0], prevPt[1], p2[0], p2[1], nextPt[0], nextPt[1]]
  }

  return res
}

function getRoundedPoint(x1, y1, x2, y2, radius, first) {
  const total = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
  const idx = first ? radius / total : (total - radius) / total
  return [x1 + idx * (x2 - x1), y1 + idx * (y2 - y1)]
}

export default {
  mounted() {
    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')
    ctx.strokeStyle = '#ccc'
    ctx.lineWidth = 5
    const sideLength = 50
    const k = Math.sqrt(3) / 2

    const vertices = [
      [0, -sideLength],
      [k * sideLength, -0.5 * sideLength],
      [k * sideLength, 0.5 * sideLength],
      [0, sideLength],
      [-k * sideLength, 0.5 * sideLength],
      [-k * sideLength, -0.5 * sideLength],
    ]

    const transformedVertices = vertices.map(([x, y]) => [x + 100, y + 100])

    drawPolygon(ctx, transformedVertices, 10)
    ctx.stroke()
  },
}
</script>

<style scoped>
.canvas {
  width: 100%;
  height: 100%;
  position: relative;
}

.canvas__canvas {
  position: absolute;
  top: 100px;
  left: 100px;
}
</style>
