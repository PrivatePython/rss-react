import { render, screen } from '@testing-library/react';
import Loader from '../../src/Components/Loader';

describe('Loader', () => {
  it('should be loader image', () => {
    render(<Loader />);
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
  });
});
