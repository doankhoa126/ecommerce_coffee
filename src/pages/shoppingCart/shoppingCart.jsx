import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router';
import { fetchShoppingCart } from '../../api_services/shopping_cart';

const TAX_RATE = 0.05;

export default function ShoppingCart() {
    const [items, setItems] = React.useState([]);
    const [deleteConfirmation, setDeleteConfirmation] = React.useState({ open: false, index: -1 });
    const navigate = useNavigate(); // Initialize useHistory

    // Update taxes and total based on checked items
    const invoiceTaxes = TAX_RATE * subtotal(items);
    const invoiceTotal = invoiceTaxes + subtotal(items);

    React.useEffect(() => {
        const loadShoppingCart = async () => {
            try {
                const response = await fetchShoppingCart(); // Assume fetchShoppingCart fetches data from API
                if (response.message === 'Cart found') {
                    setItems(response.carts.map(cart => ({
                        desc: cart.name,
                        qty: cart.quantity,
                        unit: cart.price / cart.quantity, // Assuming unit price calculation
                        price: cart.price,
                        isChecked: false
                    })));
                }
            } catch (error) {
                console.error('Error loading shopping cart:', error);
                // Handle error loading shopping cart data
            }
        };

        loadShoppingCart();
    }, []);

    function priceRow(qty, unit) {
        return qty * unit;
    }

    function subtotal(items) {
        return items.filter(item => item.isChecked).reduce((sum, item) => sum + item.price, 0);
    }

    const handleCheckboxChange = (index) => (event) => {
        const newItems = [...items];
        newItems[index].isChecked = event.target.checked;
        setItems(newItems);
    };

    const handleQuantityChange = (index) => (event) => {
        const newItems = [...items];
        const newQty = Number(event.target.value);
        newItems[index].qty = newQty >= 0 ? newQty : 0; // Ensure qty doesn't go below 0
        newItems[index].price = priceRow(newItems[index].qty, newItems[index].unit); // Update price
        setItems(newItems);
    };

    const handleDeleteClick = (index) => {
        setDeleteConfirmation({ open: true, index });
    };

    const handleDeleteConfirm = () => {
        const newItems = [...items];
        newItems.splice(deleteConfirmation.index, 1);
        setItems(newItems);
        setDeleteConfirmation({ open: false, index: -1 });
    };

    const handleDeleteCancel = () => {
        setDeleteConfirmation({ open: false, index: -1 });
    };

    const handlePlaceOrder = () => {
        navigate('/order-checkout');
    };

    return (
        <Box sx={{ height: 'auto', width: "80%", ml: "10%", mt: "4vh", mb: "8px" }}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" colSpan={4} sx={{ fontSize: '1.2rem' }}>
                                Product Details Order
                            </TableCell>
                            <TableCell align="center" colSpan={1} sx={{ fontSize: '1.2rem' }}>
                                Price
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell sx={{ fontSize: '1.2rem' }}>Name</TableCell>
                            <TableCell align="right" sx={{ fontSize: '1.2rem' }}>Quantity</TableCell>
                            <TableCell align="right" sx={{ fontSize: '1.2rem' }}>Actions</TableCell>
                            <TableCell align="right" sx={{ fontSize: '1.2rem' }}>Sum</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map((row, index) => (
                            <TableRow key={row.desc}>
                                <TableCell>
                                    <Checkbox
                                        checked={row.isChecked}
                                        onChange={handleCheckboxChange(index)}
                                    />
                                </TableCell>
                                <TableCell sx={{ fontSize: '1.2rem' }}>{row.desc}</TableCell>
                                <TableCell align="right">
                                    <TextField
                                        label="Quantity"
                                        type="number"
                                        value={row.qty}
                                        onChange={handleQuantityChange(index)}
                                        InputLabelProps={{ shrink: true }}
                                        variant="outlined"
                                        size="medium"
                                        sx={{ width: '30%', fontSize: '1.2rem' }}
                                        inputProps={{ min: 0 }} // Ensure minimum value is 0
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton onClick={() => handleDeleteClick(index)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell align="right" sx={{ fontSize: '1.2rem' }}>{(row.price)}</TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell rowSpan={3} />
                            <TableCell colSpan={3} sx={{ fontSize: '1.2rem' }}>Subtotal</TableCell>
                            <TableCell align="right" sx={{ fontSize: '1.2rem' }}>{(subtotal(items))}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2} sx={{ fontSize: '1.2rem' }}>Tax ({`${(TAX_RATE * 100).toFixed(0)} %`})</TableCell>
                            <TableCell align="right" sx={{ fontSize: '1.2rem' }}>{(invoiceTaxes)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2} sx={{ fontSize: '1.2rem' }}>Total</TableCell>
                            <TableCell align="right" sx={{ fontSize: '1.2rem' }}>{(invoiceTotal)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={5} align="right">
                                <Button variant="contained" sx={{ backgroundColor: '#006F45', height: "8vh" }} onClick={handlePlaceOrder}>
                                    Place Order
                                </Button>

                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={deleteConfirmation.open} onClose={handleDeleteCancel}>
                <DialogTitle>Delete Confirmation</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete this item?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteCancel}>Cancel</Button>
                    <Button onClick={handleDeleteConfirm} color="error">Delete</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
