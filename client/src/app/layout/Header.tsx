import { AppBar, Switch, Toolbar, Typography } from '@mui/material'
import React from 'react'

interface Props {
    darkMode: boolean;
    handleThemeChange: () => void;
}
export default function Header({ darkMode, handleThemeChange }: Props) {
    return (
        <AppBar sx={{ mb: 4 }} position='static'>
            <Toolbar>
                <Typography variant='h6'>RE-STORE</Typography>
                <Switch
                    checked={darkMode}
                    sx={{ bgcolor: 'transparent' }}
                    onChange={handleThemeChange}
                    aria-label="login switch"
                />
            </Toolbar>
        </AppBar>
    )
}
