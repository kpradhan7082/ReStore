import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { Product } from "../../app/models/Product";
import axios from 'axios';
import { Divider, Grid, Table, TableCell, TableContainer, TableRow, Typography } from "@mui/material";

export default function ProductDetail() {
    const { id } = useParams<string>();
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState<Product | null>();

    useEffect(() => {
        axios.get(`http://localhost:5005/api/products/${id}`)
            .then(response => setProduct(response.data))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading)
        return <h3>Loading...</h3>

    if (!product)
        return <h3>Product Not Found...</h3>

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
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    )
}
