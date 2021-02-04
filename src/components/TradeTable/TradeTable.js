import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Context } from '../../context/Store';
import Moment from 'react-moment';


const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});


export default function TradeTable() {
    const [state] = useContext(Context);
    const classes = useStyles();

    return (
        <div>
            <h2> *** Tradings ***</h2>
            <TableContainer component={Paper}>
                <Table style={{ backgroundColor: '#7ba4d2' }} className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" style={{ fontWeight: 'bold' }}>Stock Symbol</TableCell>
                            <TableCell align="center" style={{ fontWeight: 'bold' }}>Trade Type</TableCell>
                            <TableCell align="center" style={{ fontWeight: 'bold' }}>Price</TableCell>
                            <TableCell align="center" style={{ fontWeight: 'bold' }}>Quantity</TableCell>
                            <TableCell align="center" style={{ fontWeight: 'bold' }}>Timestamp</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {state.trades.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell align="center" component="th" scope="row">
                                    {row.stockSymbol}
                                </TableCell>
                                <TableCell align="center">{(row.buy) ? "Buy" : "Sell"}</TableCell>
                                <TableCell align="center">{row.price}</TableCell>
                                <TableCell align="center">{row.quantity}</TableCell>
                                <TableCell align="center">
                                    <Moment date={row.dateTime} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}