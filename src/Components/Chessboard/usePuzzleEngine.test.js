// Mock useStockfish to avoid Worker creation
import { Chess } from 'chess.js';
import { getLegalMoves } from './usePuzzleEngine';

describe('usePuzzleEngine helpers', () => {
  describe('getLegalMoves', () => {
    test('start position contains e2 -> e4', () => {
      const chess = new Chess();
      const dests = getLegalMoves(chess);

      expect(dests.get('e2')).toContain('e4');
      expect(dests.get('e2')).toContain('e3');
    });

    test('illegal moves are not included', () => {
      const chess = new Chess();
      const dests = getLegalMoves(chess);

      expect(dests.get('e2')).not.toContain('e5');
    });

    test('FEN position generates correct moves', () => {
      const fen = 'Bn2R3/r3nR1K/1pP4p/4N2N/2QPk3/4p3/4p1Pb/8 w - - 0 1';
      const chess = new Chess(fen);

      const dests = getLegalMoves(chess);

      expect(dests.get('e5')).toContain('f3');
      expect(dests.get('g2')).toContain('g3');
    });
    test('print moves from position', () => {
      const fen = '4K3/8/p7/1kP5/3Q4/8/1N6/8 w - - 0 1';
      const chess = new Chess(fen);

      const moves = chess.moves({ verbose: true });

      //   console.log(moves);
    });
  });
});

describe('promotion', () => {
  // First verify what chess.js returns for promotions
  test('moves include all pieces', () => {
    const fen = '8/P7/8/8/8/8/8/k6K w - - 0 1';
    const chess = new Chess(fen);

    const moves = chess.moves({ verbose: true });

    const promotionMoves = moves.filter((m) => m.from === 'a7');

    const promotions = promotionMoves.map((m) => m.promotion);
    expect(promotions).toContain('q');
    expect(promotions).toContain('r');
    expect(promotions).toContain('b');
    expect(promotions).toContain('n');
  });
  test('square appears in legal moves map', () => {
    const fen = '8/P7/8/8/8/8/8/k6K w - - 0 1';
    const chess = new Chess(fen);

    const dests = getLegalMoves(chess);

    expect(dests.get('a7')).toContain('a8');
  });
  test('to knight works', () => {
    const fen = '8/P7/8/8/8/8/8/k6K w - - 0 1';
    const chess = new Chess(fen);

    chess.move({
      from: 'a7',
      to: 'a8',
      promotion: 'n',
    });

    const piece = chess.get('a8');

    expect(piece.type).toBe('n');
  });

  test('uci promotion parsing works', () => {
    const moveUCI = 'a7a8n';

    const from = moveUCI.slice(0, 2);
    const to = moveUCI.slice(2, 4);
    const promotion = moveUCI.slice(4);

    expect(from).toBe('a7');
    expect(to).toBe('a8');
    expect(promotion).toBe('n');
  });

  test('engine accepts underpromotion move', () => {
    const fen = '8/P7/8/8/8/8/8/k6K w - - 0 1';
    const chess = new Chess(fen);

    const move = chess.move({
      from: 'a7',
      to: 'a8',
      promotion: 'n',
    });

    expect(move.promotion).toBe('n');
  });

  test('inspect promotion move object', () => {
    const fen = '8/P7/8/8/8/8/8/k6K w - - 0 1';
    const chess = new Chess(fen);

    const moves = chess.moves({ verbose: true });

    const promotionMoves = moves.filter((m) => m.from === 'a7');

    console.log(promotionMoves);
  });
});
