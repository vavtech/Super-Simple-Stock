import React, { useState, useContext } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { Context } from '../context/Store';
import { getData, postData } from '../context/Service';
import Constants from '../constants/CommonConstants';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));


const TradeForm = () => {
    const [state, dispatch] = useContext(Context);
    const classes = useStyles();
    const [value, setValue] = useState('buy');
    const [stock, setStock] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [result, setResult] = useState('');

    const handleTypeChange = (event) => {
        setValue(event.target.value);
    };

    const handleDropDownChange = (event) => {
        setStock(event.target.value);
    };

    const handlePrice = (e) => {
        setPrice(e.target.value);
    }

    const handleQuantity = (e) => {
        setQuantity(e.target.value);
    }

    const handleFormSubmit = (e) => {
        if (!stock) {
            setResult(Constants.INVALID_STOCK);
        }
        else if (!price) {
            setResult(Constants.INVALID_PRICE);
        }
        else if (!quantity) {
            setResult(Constants.INVALID_QUANTITY);
        }
        else {
            const json = JSON.stringify({
                "stockSymbol": stock,
                "price": price,
                "quantity": quantity,
                "buy": (value === "buy"),
                "sell": (value === "sell")
            });

            postData(Constants.TRADE_URL, json, (res) => {
                const result = res.data.message;
                setResult(result);
                if (res.data.message === Constants.TRADE_SUCCESS) {
                    dispatch({ type: Constants.DISPATCH_UPDATE_TRADE, payload: res.data.data });
                }
            }, (error) => {
                console.log(error);
                dispatch({ type: Constants.DISPATCH_SET_ERROR, payload: error });
            });
        }
    };

    const setupStocks = () => {
        getData(Constants.LIST_STOCKS_URL, (res) => {
            const stocks = res.data;
            dispatch({ type: Constants.DISPATCH_FETCH_STOCKS, payload: stocks });
        }, (error) => {
            console.log(error);
            dispatch({ type: Constants.DISPATCH_SET_ERROR, payload: error });
        });
    };

    let stockOption = <p>{Constants.LOADING}</p>

    if (state.error) {
        stockOption = <p>{Constants.SOMETHING_WENT_WRONG}</p>
    }

    if (!state.stocks.length > 0) {
        setupStocks();
    }

    if (!state.error && state.stocks) {
        stockOption = state.stocks.map(item => {
            return (
                <MenuItem key={item.stockSymbol} value={item.stockSymbol}>{item.stockSymbol}</MenuItem>
            );
        });
    }

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Stocks</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    style={{ width: 100 }}
                    value={stock}
                    onChange={handleDropDownChange}
                >
                    {stockOption}
                </Select>
            </FormControl>

            <form className={classes.root} noValidate autoComplete="off">
                <TextField onChange={handlePrice} type="number" id="price" label="Price" value={price} variant="outlined" />
                <TextField onChange={handleQuantity} type="number" id="quantity" label="Quantity" value={quantity} variant="outlined" />
            </form>

            <FormControl component="fieldset">
                <FormLabel component="legend">Trade type</FormLabel>
                <RadioGroup aria-label="Trade type" name="type" value={value} onChange={handleTypeChange}>
                    <FormControlLabel value="buy" control={<Radio />} label="Buy" />
                    <FormControlLabel value="sell" control={<Radio />} label="Sell" />
                </RadioGroup>

                <Button variant="contained" color="primary" onClick={handleFormSubmit} >Trade</Button>
            </FormControl>
            <div>
                <h2>Result: {result}</h2>
            </div>
        </div>
    );
}

export default TradeForm;