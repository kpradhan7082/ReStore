import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { Product } from "../../app/models/Product";
import axios from 'axios';
import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import agent from "../../api/agent";
import NotFoundError from "../../app/errors/NotFoundError";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { LoadingButton } from "@mui/lab";
import { useStoreContext } from "../../app/context/StoreContext";

export default function ProductDetail() {
    const { id } = useParams<string>();
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [product, setProduct] = useState<Product | null>();
    const [quantity, setQuantity] = useState(0);
    const { basket, setBasket, removeItemFromBasket } = useStoreContext();

    const item = basket?.items.find(m => m.productId == product?.id)

    useEffect(() => {
        if (item) setQuantity(item.quantity);
        id && agent.Catalog.details(parseInt(id))
            .then(product => setProduct(product))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }, [id, item]);

    const handleInputChange = (event: any) => {
        if (event.target.value >= 0)
            setQuantity(parseInt(event.target.value));
    }

    const handleSubmitEvent = () => {
        setSubmitting(true);
        if (!item || item.quantity < quantity) {
            const updateQuantity = item ? quantity - item.quantity : quantity;
            agent.Basket.addItem(product?.id!, updateQuantity)
                .then(basket => setBasket(basket))
                .catch(error => console.log(error))
                .finally(() => setSubmitting(false));
        }
        else
        {
            const updateQuantity = item.quantity - quantity;
            agent.Basket.removeItem(product?.id!, updateQuantity)
                .then(() => removeItemFromBasket(product?.id!, updateQuantity))
                .catch(error => console.log(error))
                .finally(() => setSubmitting(false));
        }
    }

    if (loading)
        return <LoadingComponent message="Loading product..." />

    if (!product)
        return <NotFoundError />

    return (
        <Grid container spacing={6}>
            <Grid item xs={6}>
                <img src={product.pictureUrl} alt={product.name} style={{ width: '100%' }}></img>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="h3">{product.name}</Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="h4" color='secondary.main'>${((product.price) / 100).toFixed(2)}</Typography>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    Name
                                </TableCell>
                                <TableCell>
                                    {product.name}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    Description
                                </TableCell>
                                <TableCell>
                                    {product.description}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    Type
                                </TableCell>
                                <TableCell>
                                    {product.type}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    Brand
                                </TableCell>
                                <TableCell>
                                    {product.brand}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    Quantity in stock
                                </TableCell>
                                <TableCell>
                                    {product.quantityInStock}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            onChange={handleInputChange}
                            variant="outlined"
                            fullWidth
                            type="number"
                            label="Quantity in cart"
                            value={quantity}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <LoadingButton
                            loading={submitting}
                            disabled={item?.quantity == quantity || !item && quantity === 0}
                            onClick={handleSubmitEvent}
                            fullWidth
                            type="button"
                            variant="contained"
                            size="large"
                            sx={{ height: '55px' }}
                            color="primary">
                            {item ? 'UPDATE QUANTITY' : 'ADD TO CART'}
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}
