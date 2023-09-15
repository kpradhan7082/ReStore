import { AppBar, Badge, Box, IconButton, List, ListItem, Switch, Toolbar, Typography } from '@mui/material'
import { NavLink } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { useStoreContext } from '../context/StoreContext';

interface Props {
    darkMode: boolean;
    handleThemeChange: () => void;
}

const midLinks = [
    { title: "catalog", path: "/catalog" },
    { title: "about", path: "/about" },
    { title: "contacts", path: "/contacts" }
]

const rightLinks = [
    { title: "login", path: "/login" },
    { title: "register", path: "/register" },
]

const navStyles = {
    color: 'inherit',
    textDecoration: 'none',
    typography: 'h6',
    '&:hover': { color: 'grey.400' },
    '&.active': { color: 'text.secondary' },
}
export default function Header({ darkMode, handleThemeChange }: Props) {
    const {basket} = useStoreContext();

    const itemCount = basket?.items.reduce((sub,item)=>sub+item.quantity,0);

    return (
        <AppBar sx={{ mb: 4 }} position='static'>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box display='flex' alignItems='center'>
                    <Typography variant='h6' component={NavLink}
                        to="/"
                        sx={navStyles}>RE-STORE
                    </Typography>
                    <Switch
                        checked={darkMode}
                        sx={{ bgcolor: 'transparent' }}
                        onChange={handleThemeChange}
                        aria-label="login switch"
                    />
                </Box>
                <List sx={{ display: 'flex' }}>
                    {midLinks.map(({ title, path }) => (
                        <ListItem key={path} sx={navStyles} to={path} component={NavLink}>
                            {title.toUpperCase()}
                        </ListItem>
                    ))}
                </List>
                <Box display='flex' alignItems='center'>
                    <IconButton component={Link} to="/basket" color='inherit' size='large' edge='end' sx={{ mr: 2 }}>
                        <Badge badgeContent={itemCount} color='secondary'>
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>
                    <List sx={{ display: 'flex' }}>
                        {rightLinks.map(({ title, path }) => (
                            <ListItem key={path} sx={navStyles} to={path} component={NavLink}>{title.toUpperCase()}</ListItem>
                        ))}
                    </List>
                </Box>
            </Toolbar>
        </AppBar>
    )
}
