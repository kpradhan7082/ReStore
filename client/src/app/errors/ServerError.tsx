import { Container, Divider, Paper, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";


export default function ServerError() {
    const { state } = useLocation();
    return (
        <Container component={Paper}>
            {state?.error ? <>
                <Typography gutterBottom variant="h3">{state.error.title}</Typography>
                <Divider />
                <Typography gutterBottom variant="body1">{state.error.detail}</Typography>
            </> :
                <>
                    <Typography gutterBottom variant="h3">{state.error.title} || Internal Server Error</Typography>
                </>}

        </Container>
    )
}
