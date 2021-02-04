import React from 'react';
import { cleanup } from '@testing-library/react';
import MyButton from '../MyButton';
import Enzyme, { shallow } from 'enzyme';
import Button from '@material-ui/core/Button';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() })
afterEach(cleanup);

const mockFn = jest.fn();
describe('MyButton', () => {

    it('should be defined', () => {
        expect(MyButton).toBeDefined();
    });

    it('should render correctly', () => {
        const tree = shallow(
            <MyButton label='button test' />
        );
        expect(tree).toMatchSnapshot();
    });

    it('should have a button value', () => {
        const tree = shallow(
            <MyButton label='button test' />
        );
        expect(tree.find(Button).text()).toBe('button test');
    });

    it('should call mock function when button is clicked', () => {
        const tree = shallow(
            <MyButton label='button test' handler={mockFn} />
        );
        tree.simulate('click');
        expect(mockFn).toHaveBeenCalled();
    });

});