import React, { useState, useContext } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import MyButton from '../Button/MyButton';
import InputBox from '../InputBox/InputBox';
import DropDown from '../DropDown/DropDown';
import Text from '../Text/Text';
import { Context } from '../../context/Store';
import { getData } from '../../context/Service';
import Constants from '../../constants/CommonConstants';

const SelectAndInput = (props) => {
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
                urlName = Constants.DIVIDEND_YIELD_URL + Constants.FORWARD_SLASH + stock + Constants.FORWARD_SLASH + price;
                break;
            case 'PE':
                urlName = Constants.PE_RATIO_URL + Constants.FORWARD_SLASH + stock + Constants.FORWARD_SLASH + price;
                break;
            case 'VWSP':
                urlName = Constants.VWSP_URL + Constants.FORWARD_SLASH + minutes;
                break;
            case 'GBCE':
                urlName = Constants.GBCE_URL;
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
            dispatch({ type: Constants.DISPATCH_SET_ERROR, payload: error });
        });
    };

    const handleFormSubmit = (e) => {
        if (props.id === "VWSP") {
            if (!minutes) {
                setResult(Constants.INVALID_MINUTES);
            } else {
                handleAPI();
            }
        }
        else if (props.id === "GBCE") {
            handleAPI();
        }
        else {
            if (!stock) {
                setResult(Constants.INVALID_STOCK);
            } else if (!price) {
                setResult(Constants.INVALID_PRICE);
            } else {
                handleAPI();
            }
        }
    };

    let stockOption = <p>{Constants.LOADING}</p>

    if (state.error) {
        stockOption = <p>{Constants.SOMETHING_WENT_WRONG}</p>
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
                <DropDown value={stock} handler={handleDropDownChange} stockOptions={stockOption} />
                <InputBox handler={handlePrice} value={price} label="Price" id={props.id} />
            </div>
        );
    }

    const ContentMinutes = () => {
        return (
            <InputBox handler={handleMinutes} value={minutes} label="Minutes" id={props.id} />
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
            <MyButton handler={handleFormSubmit} label="Calculate" />
            <Text text={result} />
        </div>
    );
}

export default SelectAndInput;