import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ChessgroundBoard from './ChessgroundBoard';

const mockUsePuzzleEngine = jest.fn();
let mockBoardViewProps = null;

jest.mock('./usePuzzleEngine', () => ({
  usePuzzleEngine: (...args) => mockUsePuzzleEngine(...args),
}));

jest.mock('./BoardView', () => {
  const React = require('react');

  return function MockBoardView(props) {
    mockBoardViewProps = props;
    return React.createElement('div', { 'data-testid': 'board-view' });
  };
});

jest.mock('./PromotionPicker', () => {
  const React = require('react');

  return function MockPromotionPicker({ square, onSelect, onCancel }) {
    if (!square) return null;

    return React.createElement(
      'div',
      { 'data-testid': 'promotion-picker', 'data-square': square },
      React.createElement(
        'button',
        { type: 'button', onClick: () => onSelect('q') },
        'Promote to queen',
      ),
      React.createElement(
        'button',
        { type: 'button', onClick: onCancel },
        'Cancel',
      ),
    );
  };
});

describe('ChessgroundBoard promotion flow', () => {
  const mockLoadPosition = jest.fn();
  const mockUserMove = jest.fn();
  const mockIsPromotionMove = jest.fn();

  beforeEach(() => {
    mockBoardViewProps = null;
    jest.clearAllMocks();

    mockUsePuzzleEngine.mockReturnValue({
      status: 'Your move',
      currentFen: '8/8/8/8/8/8/8/8 w - - 0 1',
      dests: new Map(),
      turn: 'white',
      checkColor: false,
      loadPosition: mockLoadPosition,
      userMove: mockUserMove,
      isPromotionMove: mockIsPromotionMove,
    });
  });

  test('non-pawn move to the back rank bypasses the promotion picker', () => {
    render(<ChessgroundBoard fen="7k/R7/8/8/8/8/8/7K w - - 0 1" width={400} />);

    expect(mockLoadPosition).toHaveBeenCalledWith('7k/R7/8/8/8/8/8/7K w - - 0 1');

    mockIsPromotionMove.mockReturnValue(false);

    act(() => {
      mockBoardViewProps.onMove('a7', 'a8');
    });

    expect(mockIsPromotionMove).toHaveBeenCalledWith('a7', 'a8');
    expect(mockUserMove).toHaveBeenCalledWith('a7a8');
    expect(screen.queryByTestId('promotion-picker')).not.toBeInTheDocument();
  });

  test('pawn promotion waits for piece selection and sends a 5-character move', async () => {
    mockIsPromotionMove.mockReturnValue(true);

    render(<ChessgroundBoard fen="8/P7/8/8/8/8/8/k6K w - - 0 1" width={400} />);

    act(() => {
      mockBoardViewProps.onMove('a7', 'a8');
    });

    expect(mockUserMove).not.toHaveBeenCalled();
    expect(screen.getByTestId('promotion-picker')).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'Promote to queen' }));

    expect(mockUserMove).toHaveBeenCalledWith('a7a8q');
    expect(screen.queryByTestId('promotion-picker')).not.toBeInTheDocument();
  });
});
