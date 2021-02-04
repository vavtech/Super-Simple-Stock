import Button from '@material-ui/core/Button';

const MyButton = (props) => {
    return (
        <Button variant="contained" color="primary" onClick={props.handler} >{props.label}</Button>
    );
}

export default MyButton;