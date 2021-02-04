import React from 'react';
import ReactDOM from 'react-dom';
import MyModal from '../MyModal';
import Modal from 'react-modal'
import Enzyme, { shallow } from 'enzyme';
import Button from '@material-ui/core/Button';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() })

describe('MyModal', () => {

    it("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<MyModal />, div);
    });

    it('renders successfully', () => {
        const wrapper = shallow(<MyModal />);
        const text = wrapper.find(Modal);
        expect(text).toHaveLength(1);
    });

    it('should show the title', () => {
        const wrapper = shallow(<MyModal title="Test" />);
        const text = wrapper.find('div h2');
        expect(text.text()).toBe('Test');
    });

    it('opens modal when button is clicked', () => {
        const wrapper = shallow(<MyModal />);
        expect(wrapper.find(Modal).prop('isOpen')).toBe(false);

        wrapper.find(Button).simulate('click');
        expect(wrapper.find(Modal).prop('isOpen')).toBe(true);

    });

});


