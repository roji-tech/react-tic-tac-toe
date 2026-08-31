import { WinResult } from "../types/game";

// 1. Classic 3x3 Win Patterns
export const CLASSIC_PATTERNS: number[][] = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

export const checkClassicWin = (board: (string | null)[]): WinResult | null => {
  for (const pattern of CLASSIC_PATTERNS) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a]!, line: pattern };
    }
  }
  if (board.every((cell) => cell !== null && cell !== "")) {
    return { winner: "DRAW", line: [] };
  }
  return null;
};

// 2. 3D 4x4x4 Cube Win Lines Generator (76 lines)
export const generate3DLines = (): number[][] => {
  const lines: number[][] = [];
  const getIdx = (z: number, y: number, x: number) => z * 16 + y * 4 + x;

  // 1. Lines parallel to X axis (16 lines)
  for (let z = 0; z < 4; z++) {
    for (let y = 0; y < 4; y++) {
      lines.push([getIdx(z, y, 0), getIdx(z, y, 1), getIdx(z, y, 2), getIdx(z, y, 3)]);
    }
  }

  // 2. Lines parallel to Y axis (16 lines)
  for (let z = 0; z < 4; z++) {
    for (let x = 0; x < 4; x++) {
      lines.push([getIdx(z, 0, x), getIdx(z, 1, x), getIdx(z, 2, x), getIdx(z, 3, x)]);
    }
  }

  // 3. Lines parallel to Z axis (16 lines)
  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 4; x++) {
      lines.push([getIdx(0, y, x), getIdx(1, y, x), getIdx(2, y, x), getIdx(3, y, x)]);
    }
  }

  // 4. Diagonals in XY planes (constant Z) - 8 lines
  for (let z = 0; z < 4; z++) {
    lines.push([getIdx(z, 0, 0), getIdx(z, 1, 1), getIdx(z, 2, 2), getIdx(z, 3, 3)]);
    lines.push([getIdx(z, 0, 3), getIdx(z, 1, 2), getIdx(z, 2, 1), getIdx(z, 3, 0)]);
  }

  // 5. Diagonals in XZ planes (constant Y) - 8 lines
  for (let y = 0; y < 4; y++) {
    lines.push([getIdx(0, y, 0), getIdx(1, y, 1), getIdx(2, y, 2), getIdx(3, y, 3)]);
    lines.push([getIdx(0, y, 3), getIdx(1, y, 2), getIdx(2, y, 1), getIdx(3, y, 0)]);
  }

  // 6. Diagonals in YZ planes (constant X) - 8 lines
  for (let x = 0; x < 4; x++) {
    lines.push([getIdx(0, 0, x), getIdx(1, 1, x), getIdx(2, 2, x), getIdx(3, 3, x)]);
    lines.push([getIdx(0, 3, x), getIdx(1, 2, x), getIdx(2, 1, x), getIdx(3, 0, x)]);
  }

  // 7. 3D Main Space Diagonals - 4 lines
  lines.push([getIdx(0, 0, 0), getIdx(1, 1, 1), getIdx(2, 2, 2), getIdx(3, 3, 3)]);
  lines.push([getIdx(0, 0, 3), getIdx(1, 1, 2), getIdx(2, 2, 1), getIdx(3, 3, 0)]);
  lines.push([getIdx(0, 3, 0), getIdx(1, 2, 1), getIdx(2, 1, 2), getIdx(3, 0, 3)]);
  lines.push([getIdx(0, 3, 3), getIdx(1, 2, 2), getIdx(2, 1, 1), getIdx(3, 0, 0)]);

  return lines;
};

export const THREE_D_LINES = generate3DLines();

export const check3DWin = (board: (string | null)[]): WinResult | null => {
  for (const line of THREE_D_LINES) {
    const [a, b, c, d] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c] && board[a] === board[d]) {
      return { winner: board[a]!, line };
    }
  }
  if (board.every((cell) => cell !== null && cell !== "")) {
    return { winner: "DRAW", line: [] };
  }
  return null;
};

// 3. Grid Win Checker (for NxN grid requiring winStreak to win)
export const checkGridWin = (board: (string | null)[], size: number, winStreak = 4): WinResult | null => {
  const getVal = (r: number, c: number) => board[r * size + c];

  const directions = [
    [0, 1],  // Horizontal
    [1, 0],  // Vertical
    [1, 1],  // Main Diagonal
    [1, -1]  // Anti Diagonal
  ];

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const player = getVal(r, c);
      if (!player) continue;

      for (const [dr, dc] of directions) {
        const line: number[] = [];
        let match = true;

        for (let k = 0; k < winStreak; k++) {
          const nr = r + dr * k;
          const nc = c + dc * k;
          if (nr < 0 || nr >= size || nc < 0 || nc >= size || getVal(nr, nc) !== player) {
            match = false;
            break;
          }
          line.push(nr * size + nc);
        }

        if (match) {
          return { winner: player, line };
        }
      }
    }
  }

  if (board.every((cell) => cell !== null && cell !== "")) {
    return { winner: "DRAW", line: [] };
  }
  return null;
};
