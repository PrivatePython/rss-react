import { render, screen } from '@testing-library/react';
import AboutPage from '../../src/pages/AboutPage.tsx';
import { MemoryRouter } from 'react-router-dom';

const technologies = ['TypeScript', 'React', 'TailwindCSS', 'Vitest', 'Vite'];

describe('AboutPage', () => {
  it('renders developer card and technologies', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <AboutPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/About This App/i)).toBeInTheDocument();
    expect(screen.getByText(/Pavel Putyrski/i)).toBeInTheDocument();
    expect(screen.getByText(/frontend developer/i)).toBeInTheDocument();

    technologies.forEach((tech) => {
      expect(screen.getAllByText(tech)[0]).toBeInTheDocument();
    });
  });
});
