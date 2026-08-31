import { checkClassicWin } from "./winConditions";

export const getBestMove = (
  board: (string | null)[],
  aiPlayer: string = "O",
  humanPlayer: string = "X"
): number => {
  const emptyIndices = board
    .map((val, idx) => (val === null || val === "" ? idx : null))
    .filter((val): val is number => val !== null);

  if (emptyIndices.length === 9) {
    const corners = [0, 2, 6, 8, 4];
    return corners[Math.floor(Math.random() * corners.length)];
  }

  let bestScore = -Infinity;
  let move: number = emptyIndices[0];

  for (const idx of emptyIndices) {
    const tempBoard = [...board];
    tempBoard[idx] = aiPlayer;
    const score = minimax(tempBoard, 0, false, aiPlayer, humanPlayer, -Infinity, Infinity);
    if (score > bestScore) {
      bestScore = score;
      move = idx;
    }
  }

  return move;
};

const minimax = (
  board: (string | null)[],
  depth: number,
  isMaximizing: boolean,
  aiPlayer: string,
  humanPlayer: string,
  alpha: number,
  beta: number
): number => {
  const result = checkClassicWin(board);
  if (result) {
    if (result.winner === aiPlayer) return 10 - depth;
    if (result.winner === humanPlayer) return depth - 10;
    if (result.winner === "DRAW") return 0;
  }

  const emptyIndices = board
    .map((val, idx) => (val === null || val === "" ? idx : null))
    .filter((val): val is number => val !== null);

  if (emptyIndices.length === 0) return 0;

  if (isMaximizing) {
    let maxEval = -Infinity;
    for (const idx of emptyIndices) {
      board[idx] = aiPlayer;
      const evaluation = minimax(board, depth + 1, false, aiPlayer, humanPlayer, alpha, beta);
      board[idx] = null;
      maxEval = Math.max(maxEval, evaluation);
      alpha = Math.max(alpha, evaluation);
      if (beta <= alpha) break;
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (const idx of emptyIndices) {
      board[idx] = humanPlayer;
      const evaluation = minimax(board, depth + 1, true, aiPlayer, humanPlayer, alpha, beta);
      board[idx] = null;
      minEval = Math.min(minEval, evaluation);
      beta = Math.min(beta, evaluation);
      if (beta <= alpha) break;
    }
    return minEval;
  }
};

export const getRandomMove = (board: (string | null)[]): number | null => {
  const emptyIndices = board
    .map((val, idx) => (val === null || val === "" ? idx : null))
    .filter((val): val is number => val !== null);
  if (emptyIndices.length === 0) return null;
  return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
};
