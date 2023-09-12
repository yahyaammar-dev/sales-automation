import { render, fireEvent, screen } from "@testing-library/react";
import {GroupBlock} from '../GroupBlock'

//test block
test('GroupBlock is on screen', () => {
    render(<GroupBlock />);
    expect(GroupBlock.container).toBeInTheDocument();
  });