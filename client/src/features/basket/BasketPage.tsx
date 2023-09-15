import agent from "../../api/agent";
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { Box, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useStoreContext } from "../../app/context/StoreContext";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import BasketSummary from "../basektsummary/BasketSummary";
import { getItemPrice } from "../../app/util/util";

export default function BasketPage() {
  const { basket, setBasket, removeItemFromBasket } = useStoreContext();
  const [status, setStatus] = useState({
    loading: false,
    name: ''
  });

  const removeItemHandler = (productId: number, quantity = 1, name: string) => {
    setStatus({ loading: true, name })
    agent.Basket.removeItem(productId, quantity)
      .then(() => removeItemFromBasket(productId, quantity))
      .catch(error => console.log(error))
      .finally(() => setStatus({ loading: false, name: '' }))
  }

  const addItemHandler = (productId: number, name: string) => {
    setStatus({ loading: true, name })
    agent.Basket.addItem(productId)
      .then(basket => setBasket(basket))
      .catch(error => console.log(error))
      .finally(() => setStatus({ loading: false, name: '' }))

  }

  if (basket == null)
    return <Typography variant="h6">Your basket is empty</Typography>

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell align="left">Name</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="center">Sub Total</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basket.items.map(item => (
              <TableRow
                key={item.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Box display='flex' alignItems='center'>
                    <img src={item.pictureUrl} alt={item.name} height={40} style={{ marginRight: 20 }} />
                    <span>{item.name}</span>
                  </Box>
                </TableCell>
                <TableCell align="center">{getItemPrice(item.price)}</TableCell>
                <TableCell align="center">
                  <LoadingButton
                    loading={status.loading && status.name === 'rem' + item.id}
                    onClick={() => removeItemHandler(item.productId, 1, 'rem' + item.id)}>
                    <RemoveIcon color="error" />
                  </LoadingButton>
                  {item.quantity}
                  <LoadingButton
                    loading={status.loading && status.name === 'add' + item.id}
                    onClick={() => addItemHandler(item.productId, 'add' + item.id)}>
                    <AddIcon color="secondary" />
                  </LoadingButton>
                </TableCell>
                <TableCell align="center">{getItemPrice(item.price * item.quantity)}</TableCell>
                <TableCell align="center">
                  <LoadingButton
                    loading={status.loading && status.name === 'del' + item.id}
                    onClick={() => removeItemHandler(item.productId, item.quantity, 'del' + item.id)}>
                    <DeleteIcon color="error" />
                  </LoadingButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <BasketSummary />
        </Grid>
      </Grid>
    </>

  )
}
