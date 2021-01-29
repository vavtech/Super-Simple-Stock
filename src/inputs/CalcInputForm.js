import React, { useState, useContext } from 'react';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { Context } from '../context/Store';
import { getData } from '../context/Service';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));


const SelectAndInput = (props) => {
    const classes = useStyles();
    const [stock, setStock] = useState('');
    const [price, setPrice] = useState('');
    const [minutes, setMinutes] = useState('15');
    const [result, setResult] = useState('');
    const [state, dispatch] = useContext(Context);

    const handleDropDownChange = (event) => {
        setStock(event.target.value);
    };

    const handlePrice = (e) => {
        setPrice(e.target.value);
    }

    const handleMinutes = (e) => {
        setMinutes(e.target.value);
    }

    const handleAPI = () => {
        let urlName;
        switch (props.id) {
            case 'DY':
                urlName = 'http://localhost:8080/calculateDividendYield/' + stock + '/' + price;
                break;
            case 'PE':
                urlName = 'http://localhost:8080/calculatePERatio/' + stock + '/' + price;
                break;
            case 'VWSP':
                urlName = 'http://localhost:8080/calculateVWSP/' + minutes;
                break;
            case 'GBCE':
                urlName = 'http://localhost:8080/calculateGBCEShareIndex';
                break;
            default:
                urlName = '';
                break;
        }

        getData(urlName, (res) => {
            const result = res.data;
            setResult(result);
        }, (error) => {
            console.log(error);
            dispatch({ type: 'SET_ERROR', payload: error });
        });
    };

    const handleFormSubmit = (e) => {
        if (props.id === "VWSP") {
            if (!minutes) {
                setResult("Please enter minutes !!");
            } else {
                handleAPI();
            }
        }
        else if (props.id === "GBCE") {
            handleAPI();
        }
        else {
            if (!stock) {
                setResult("Please select a stock symbol !!");
            } else if (!price) {
                setResult("Please enter price !!");
            } else {
                handleAPI();
            }
        }
    };

    let stockOption = <p>Loading...</p>

    if (state.error) {
        stockOption = <p>Something went wrong !!</p>
    }

    if (!state.error && state.stocks) {
        stockOption = state.stocks.map(item => {
            return (
                <MenuItem key={item.stockSymbol} value={item.stockSymbol}>{item.stockSymbol}</MenuItem>
            );
        });
    }

    const ContentAll = () => {
        return (
            <div>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Stocks</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={stock}
                        style={{ width: 100 }}
                        onChange={handleDropDownChange}
                    >
                        {stockOption}
                    </Select>
                </FormControl>

                <form className={classes.root} noValidate autoComplete="off">
                    <TextField onChange={handlePrice} type="number" label="Price" value={price} variant="outlined" />
                </form>
            </div>
        );
    }

    const ContentMinutes = () => {
        return (
            <div>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField onChange={handleMinutes} id={props.id} type="number" label="Minutes" value={minutes} variant="outlined" />
                </form>
            </div>
        );
    }

    let content = <ContentAll />;
    if (props.id === "VWSP") {
        content = <ContentMinutes />;
    } else if (props.id === "GBCE") {
        content = <p> </p>;
    }
    return (
        <div>
            {content}
            <Button variant="contained" color="primary" onClick={handleFormSubmit} >Calculate</Button>
            <div>
                <h2>Result: {result}</h2>
            </div>
        </div>
    );
}

export default SelectAndInput;