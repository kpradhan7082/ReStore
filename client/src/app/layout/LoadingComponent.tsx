import { Backdrop, Box, CircularProgress, Typography } from '@mui/material'

interface Props {
    message? : string;
}

export default function LoadingComponent({message = "Loading..."} : Props) {
    return (
        <Backdrop open={true} >
            <Box display='flex' justifyContent='center' alignItems='center' height='100vh'>
                <CircularProgress size={100} color='secondary' />
                <Typography sx={{ justifyContent: 'center', display: 'flex', alignItems: 'center', position: 'fixed', top: '60%' }} variant='h4'>{message}</Typography>
            </Box>
        </Backdrop>
    )
}
