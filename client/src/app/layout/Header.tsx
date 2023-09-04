import { AppBar, Badge, Box, Icon, IconButton, Link, List, ListItem, Switch, Toolbar, Typography } from '@mui/material'
import { NavLink } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

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
                        <ListItem sx={navStyles} to={path} component={NavLink}>
                            {title.toUpperCase()}
                        </ListItem>
                    ))}
                </List>
                <Box display='flex' alignItems='center'>
                    <IconButton color='inherit' size='large' edge='end' sx={{ mr: 2 }}>
                        <Badge badgeContent='3' color='secondary'>
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>
                    <List sx={{ display: 'flex' }}>
                        {rightLinks.map(({ title, path }) => (
                            <ListItem sx={navStyles} to={path} component={NavLink}>{title.toUpperCase()}</ListItem>
                        ))}
                    </List>
                </Box>
            </Toolbar>
        </AppBar>
    )
}
