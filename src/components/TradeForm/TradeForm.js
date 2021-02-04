import React, { useState, useContext } from 'react';
import MyButton from '../Button/MyButton';
import InputBox from '../InputBox/InputBox';
import DropDown from '../DropDown/DropDown';
import Text from '../Text/Text';
import MyRadio from '../MyRadio/MyRadio';
import MenuItem from '@material-ui/core/MenuItem';
import { Context } from '../../context/Store';
import { getData, postData } from '../../context/Service';
import Constants from '../../constants/CommonConstants';


const TradeForm = () => {
    const [state, dispatch] = useContext(Context);

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
            <DropDown value={stock} handler={handleDropDownChange} stockOptions={stockOption} />
            <InputBox handler={handlePrice} value={price} label="price" id="price" />
            <InputBox handler={handleQuantity} value={quantity} label="quantity" id="quantity" />

            <MyRadio
                label="Trade type"
                typeLabel="Trade type"
                value={value}
                handler={handleTypeChange}
                labelBtnOne="Buy"
                valueBtnOne="buy"
                labelBtnTwo="Sell"
                valueBtnTwo="sell"

            />
            <MyButton handler={handleFormSubmit} label="Trade" />
            <Text text={result} />
        </div>
    );
}

export default TradeForm;