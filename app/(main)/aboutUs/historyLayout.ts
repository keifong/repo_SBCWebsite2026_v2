export type NodePosition = {
  x: number;
  y: number;
};

const START_X = 100;
const START_Y = 100;
const END_OFFSET = 100;
const NODE_SIZE = 20;


export function generateNodePositions(
  historyData: readonly unknown[],
  mapWidth: number
): {
  positions: NodePosition[];
  height: number;
} {
  const nodeCount = historyData.length;

  if (nodeCount === 0) {
    return { positions: [], height: 0 };
  }

  const safeWidth = Math.max(
    mapWidth,
    START_X + END_OFFSET + NODE_SIZE
  );

  const startX = START_X;
  const startY = START_Y;

  const endX = Math.max(
    startX,
    safeWidth - END_OFFSET - NODE_SIZE
  );

  const usableWidth = endX - startX;

  // Wider screens support broader sweeps.
  // Mobile uses shorter sweeps and more vertical room.
  const targetSpacing =
    safeWidth >= 1200 ? 110 :
    safeWidth >= 800 ? 100 :
    safeWidth >= 600 ? 85 : 70;

  const nodesPerSweep = Math.max(
    3,
    Math.min(
      14,
      Math.floor(
        Math.max(1, usableWidth) / targetSpacing
      )
    )
  );

  const sweepCount = Math.max(
    1,
    Math.ceil((nodeCount - 1) / nodesPerSweep)
  );

  const verticalGap =
    safeWidth >= 1200 ? 400 :
    safeWidth >= 800 ? 360 :
    safeWidth >= 600 ? 320 : 280;


  const endY =
    nodeCount === 1
      ? startY
      : startY + sweepCount * verticalGap;

  const height = endY + END_OFFSET + NODE_SIZE;

  // Irregular horizontal targets create a less mechanical path.
  // These are proportions of the usable width.
  
  const horizontalTargets = [
    0.95, 0.18, 0.82, 0.35,
    0.06, 0.91, 0.61, 0.12,
    0.75, 0.98, 0.25, 0.68,
    0.08, 0.45, 0.89, 0.30
  ];


  const anchors: NodePosition[] = [
    { x: startX, y: startY }
  ];

  for (let i = 1; i <= sweepCount; i++) {
    const isLast = i === sweepCount;

    const x = isLast
      ? endX
      : startX +
        usableWidth *
          horizontalTargets[(i - 1) % horizontalTargets.length];

    anchors.push({
      x,
      y: startY + i * verticalGap
    });
  }

  // Use smoothstep interpolation between anchors.
  // This slows horizontal movement near turns instead of
  // producing sharp zigzags at each change of direction.
  const samples: NodePosition[] = [];
  const samplesPerSweep = 100;

  for (let i = 0; i < anchors.length - 1; i++) {
    const a = anchors[i];
    const b = anchors[i + 1];

    for (let j = 0; j < samplesPerSweep; j++) {
      const t = j / samplesPerSweep;
      const smoothT = t * t * (3 - 2 * t);

      samples.push({
        x: a.x + (b.x - a.x) * smoothT,
        y: a.y + (b.y - a.y) * t
      });
    }
  }

  samples.push(anchors[anchors.length - 1]);

  // Measure the total path length.
  const cumulativeLengths: number[] = [0];

  for (let i = 1; i < samples.length; i++) {
    const a = samples[i - 1];
    const b = samples[i];

    cumulativeLengths.push(
      cumulativeLengths[i - 1] +
        Math.hypot(b.x - a.x, b.y - a.y)
    );
  }

  const totalLength =
    cumulativeLengths[cumulativeLengths.length - 1];

  const positions: NodePosition[] = [];

  // Distribute nodes evenly by distance along the path.
  for (let i = 0; i < nodeCount; i++) {
    if (nodeCount === 1) {
      positions.push({ x: startX, y: startY });
      continue;
    }

    const targetLength =
      totalLength * i / (nodeCount - 1);

    let low = 0;
    let high = cumulativeLengths.length - 1;

    while (low < high) {
      const mid = Math.floor((low + high) / 2);

      if (cumulativeLengths[mid] < targetLength) {
        low = mid + 1;
      } else {
        high = mid;
      }
    }

    const upper = low;
    const lower = Math.max(0, upper - 1);

    const lengthA = cumulativeLengths[lower];
    const lengthB = cumulativeLengths[upper];

    const ratio =
      lengthB === lengthA
        ? 0
        : (targetLength - lengthA) /
          (lengthB - lengthA);

    const a = samples[lower];
    const b = samples[upper];

    positions.push({
      x: a.x + (b.x - a.x) * ratio,
      y: a.y + (b.y - a.y) * ratio
    });
  }

  // Guarantee exact endpoints.
  positions[0] = {
    x: startX,
    y: startY
  };

  positions[positions.length - 1] = {
    x: endX,
    y: endY
  };

  return { positions, height };
}