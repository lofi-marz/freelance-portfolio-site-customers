import { render } from '@testing-library/react';
import Home from '@/pages/old';

it('renders homepage unchanged', () => {
    const { container } = render(<Home />);
    expect(container).toMatchSnapshot();
});
