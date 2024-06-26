import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const TAX_RATE = 0.07;

function ccyFormat(num) {
    return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
    return qty * unit;
}

function createRow(desc, qty, unit) {
    const price = priceRow(qty, unit);
    return { desc, qty, unit, price };
}

function subtotal(items) {
    return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const rows = [
    createRow('Paperclips (Box)', 100, 1.15),
    createRow('Paper (Case)', 10, 45.99),
    createRow('Waste Basket', 2, 17.99),
];

const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;

export default function OrderCheckout() {
    const [rows, setRows] = useState([]);
    const [invoiceSubtotal, setInvoiceSubtotal] = useState(0);
    const [invoiceTaxes, setInvoiceTaxes] = useState(0);
    const [invoiceTotal, setInvoiceTotal] = useState(0);

    // const userIDCookie = Cookies.get('userID')
    // const userIDCookie = 19
    

    useEffect(() => {
        async function fetchData() {
            try {
                const userIDCookie = Cookies.get('userID')
                console.log("cookie: " + userIDCookie);
                const response = await axios.post('http://localhost:3000/api/order/shopping-cart', 
                    { withCredentials: true }, 
                    { userID: userIDCookie });

                const data = response.data.carts;
                console.log(data);

                if (!Array.isArray(data)) {
                    throw new Error('Returned data is not an array');
                }

                const fetchedRows = data.map(product =>
                    createRow(product.name, product.quantity, product.price)
                );
                console.log(fetchedRows);
                setRows(fetchedRows);
                const subtotalValue = subtotal(fetchedRows);
                const taxesValue = TAX_RATE * subtotalValue;
                const totalValue = subtotalValue + taxesValue;
                setInvoiceSubtotal(subtotalValue);
                setInvoiceTaxes(taxesValue);
                setInvoiceTotal(totalValue);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);

    return (
        <Box sx={{ height: '70vh', width: "80%", ml: "10%", mt: "4vh" }}>
            <TableContainer component={Paper} sx={{}}>
                <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" colSpan={3}>
                                Details
                            </TableCell>
                            <TableCell align="right">Price</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Desc</TableCell>
                            <TableCell align="right">Qty.</TableCell>
                            <TableCell align="right">Unit</TableCell>
                            <TableCell align="right">Sum</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.desc}>
                                <TableCell>{row.desc}</TableCell>
                                <TableCell align="right">{row.qty}</TableCell>
                                <TableCell align="right">{row.unit}</TableCell>
                                <TableCell align="right">{ccyFormat(row.price)}</TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell rowSpan={3} />
                            <TableCell colSpan={2}>Subtotal</TableCell>
                            <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Tax</TableCell>
                            <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
                            <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Total</TableCell>
                            <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>

    );
}
