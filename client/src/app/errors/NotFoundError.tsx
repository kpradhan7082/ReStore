import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFoundError() {
  return (
    <Box>
        <Typography variant="h5" gutterBottom>Sorry...The resource you are looking for doesnt exist</Typography>
        <Button component={Link} to="/catalog" >Back to the store</Button> 
    </Box>
  )
}
