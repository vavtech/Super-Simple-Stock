import React from 'react';
import InputBox from '../InputBox';
import Enzyme, { shallow } from 'enzyme';
import TextField from '@material-ui/core/TextField';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() })

describe('InputBox', () => {

    it('should be defined', () => {
        expect(InputBox).toBeDefined();
    });

    it('should render correctly', () => {
        const tree = shallow(
            <InputBox label='text' />
        );
        expect(tree).toMatchSnapshot();
    });

    it('should have a button value', () => {
        const tree = shallow(
            <InputBox label='text' />
        );
        expect(tree.find(TextField).text()).toBe('');
    });

});