import { ListItem, ListItemAvatar, Avatar, ListItemText, Button, Card, CardActions, CardContent, CardMedia, Typography, CardHeader } from '@mui/material'
import React, { useState } from 'react'
import { Product } from '../../app/models/Product'
import { Link } from 'react-router-dom'
import agent from '../../api/agent'
import { LoadingButton } from '@mui/lab';
import { useStoreContext } from '../../app/context/StoreContext'

interface Props {
    product: Product
}
export default function ProductCard({ product }: Props) {
    const [loading, setLoading] = useState(false);
    const {setBasket} = useStoreContext();

    const addItemToCardHandler = (productId: number) => {
        setLoading(true);
        agent.Basket.addItem(productId)
            .then(basket => setBasket(basket))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }

    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: 'secondary.main' }}>
                        {product.name.charAt(0).toUpperCase()}
                    </Avatar>}
                title={product.name}
                sx={{ fontWeight: 'bold' }}
                titleTypographyProps={{
                    sx: { fontWeight: 'bold', color: 'primary.main' }
                }}
            />
            <CardMedia
                sx={{ height: 140, backgroundSize: 'contain', bgcolor: 'primary.light' }}
                image={product.pictureUrl}
                title={product.name}
            />
            <CardContent>
                <Typography gutterBottom color='secondary' variant="h5" component="h5">
                    ${(product.price / 100).toFixed(2)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    L{product.brand} / {product.type}
                </Typography>
            </CardContent>
            <CardActions>
                <LoadingButton loading={loading} onClick={()=>addItemToCardHandler(product.id)} size="small">Add TO CART</LoadingButton>
                <Button component={Link} to={`/catalog/${product.id}`} size="small">VIEW</Button>
            </CardActions>
        </Card>
    )
}
