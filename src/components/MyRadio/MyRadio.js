import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

const MyRadio = (props) => {

    return (
        <div>
            <FormLabel component="legend">{props.label}</FormLabel>
            <RadioGroup aria-label={props.typeLabel} name="type" value={props.value} onChange={props.handler}>
                <FormControlLabel value={props.valueBtnOne} control={<Radio />} label={props.labelBtnOne} />
                <FormControlLabel value={props.valueBtnTwo} control={<Radio />} label={props.labelBtnTwo} />
            </RadioGroup>
        </div>

    );

}

export default MyRadio;