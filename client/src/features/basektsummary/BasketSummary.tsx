import { TableContainer, Paper, Table, TableBody, TableRow, TableCell, Typography, Button } from "@mui/material";
import { useStoreContext } from "../../app/context/StoreContext";
import { getItemPrice } from "../../app/util/util";
import { Link } from "react-router-dom";

export default function BasketSummary() {
    const { basket } = useStoreContext()
    var subtotal = 0;
    var deliveryFee = 0;
    if (basket)
        subtotal = basket.items.reduce((sub, item) => sub + (item.quantity * item.price), 0);
    if (subtotal < 10000 && subtotal > 0)
        deliveryFee = 1000;

    return (
        <>
            <TableContainer component={Paper} variant={'outlined'}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={2}>Subtotal</TableCell>
                            <TableCell align="right">{getItemPrice(subtotal)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Delivery fee*</TableCell>
                            <TableCell align="right">{getItemPrice(deliveryFee)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Total</TableCell>
                            <TableCell align="right">{getItemPrice(subtotal + deliveryFee)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <span style={{ fontStyle: 'italic' }}>*Orders over $100 qualify for free delivery</span>
                            </TableCell>
                        </TableRow>
                    </TableBody>

                </Table>
                <Button 
                    fullWidth
                    size="large"
                    variant="contained"
                    component={Link}
                    to="/checkout"
                    >Checkout</Button>
            </TableContainer>
        </>
    )
}