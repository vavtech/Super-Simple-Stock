import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

const DropDown = (props) => {

    const classes = useStyles();
    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Stocks</InputLabel>
                <Select
                    data-testid="dropdown"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={props.value}
                    style={{ width: 100 }}
                    onChange={props.handler}
                >
                    {props.stockOptions}
                </Select>
            </FormControl>
        </div>
    );
}

export default DropDown;