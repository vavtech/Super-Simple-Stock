import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));


const InputBox = (props) => {

    const classes = useStyles();

    return (
        <div>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField onChange={props.handler} id={props.id}
                    type="number"
                    label={props.label}
                    value={props.value}
                    variant="outlined" />
            </form>
        </div>
    );
}

export default InputBox;