import React, { useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { getData } from '../../context/Service';
import { Context } from '../../context/Store';
import Constants from '../../constants/CommonConstants';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});


export default function StocksTable() {
    const classes = useStyles();
    const [state, dispatch] = useContext(Context);

    useEffect(() => {
        getData(Constants.LIST_STOCKS_URL, (res) => {
            const stocks = res.data;
            dispatch({ type: Constants.DISPATCH_FETCH_STOCKS, payload: stocks });
        }, (error) => {
            console.log(error);
            dispatch({ type: Constants.DISPATCH_SET_ERROR, payload: error });
        });


    }, [dispatch]);

    return (
        <div>
            <h2> *** Given Stocks ***</h2>
            <TableContainer component={Paper}>
                <Table style={{ backgroundColor: '#7ba4d2' }} className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" style={{ fontWeight: 'bold' }} >Stock Symbol</TableCell>
                            <TableCell align="center" style={{ fontWeight: 'bold' }}>Type</TableCell>
                            <TableCell align="center" style={{ fontWeight: 'bold' }}>Last Divident</TableCell>
                            <TableCell align="center" style={{ fontWeight: 'bold' }}>Fixed&nbsp;Divident</TableCell>
                            <TableCell align="center" style={{ fontWeight: 'bold' }}>Par&nbsp;Value</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {state.stocks.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell align="center" component="th" scope="row">
                                    {row.stockSymbol}
                                </TableCell>
                                <TableCell align="center">{row.type}</TableCell>
                                <TableCell align="center">{row.lastDividend}</TableCell>
                                <TableCell align="center">{(row.fixedDividend === 0) ? "" : row.fixedDividend + "%"}</TableCell>
                                <TableCell align="center">{row.parValue}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}