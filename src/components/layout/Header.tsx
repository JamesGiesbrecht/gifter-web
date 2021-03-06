import { MouseEvent, useState } from 'react'
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Theme,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  Link,
} from '@mui/material'
import {
  Menu as MenuIcon,
  Brightness7 as SunIcon,
  Brightness3 as MoonIcon,
  Logout,
} from '@mui/icons-material'
import { makeStyles } from '@mui/styles'
import { Link as RouterLink, useHistory, useLocation } from 'react-router-dom'

import NavigationDrawer from 'components/layout/NavigationDrawer'
import { ROUTES } from 'appConstants'
import { useAuth } from 'context/Auth'
import { useColorScheme } from 'context/Theme'

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    display: 'flex',
    [theme.mixins.drawer.visibleBreakpoint]: {
      zIndex: theme.zIndex.drawer + 1,
    },
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.mixins.drawer.visibleBreakpoint]: {
      display: 'none',
    },
  },
}))

const Header = () => {
  const classes = useStyles()
  const { user, signOut } = useAuth()
  const history = useHistory()
  const { pathname, search } = useLocation()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const { colorScheme, toggleColorScheme } = useColorScheme()

  const isLogin = pathname.startsWith(ROUTES.login.path)
  const isSignUp = pathname.startsWith(ROUTES.register.path)

  const handleAvatarClick = (e: MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget)
  }

  const handleCloseProfileMenu = () => {
    setAnchorEl(null)
  }

  const handleProfileClick = () => {
    history.push(ROUTES.account.path)
    handleCloseProfileMenu()
  }

  const handleExchangesClick = () => {
    history.push(ROUTES.exchanges.path)
    handleCloseProfileMenu()
  }

  const handleWishlistsClick = () => {
    history.push(ROUTES.wishlists.path)
    handleCloseProfileMenu()
  }

  const handleDrawerToggle = () => {
    setIsDrawerOpen((prev) => !prev)
  }

  const handleDrawerClose = () => {
    setIsDrawerOpen(false)
  }

  return (
    <>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
            size="large"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Header
          </Typography>
          <div className={classes.grow} />
          {user ? (
            <>
              <Typography>
                Hello, {user.displayName} {user.email}
              </Typography>
              <IconButton onClick={handleAvatarClick}>
                <Avatar sx={{ width: 32, height: 32 }} src={user.photoURL || ''} />
              </IconButton>
            </>
          ) : (
            <>
              {!isLogin && (
                <Link
                  sx={{ marginRight: 1 }}
                  color="inherit"
                  underline="hover"
                  component={RouterLink}
                  to={ROUTES.login.path + search}
                >
                  Login
                </Link>
              )}
              {!isSignUp && !isLogin && '/'}
              {!isSignUp && (
                <Link
                  sx={{ marginLeft: 1 }}
                  color="inherit"
                  underline="hover"
                  component={RouterLink}
                  to={ROUTES.register.path + search}
                >
                  Sign Up
                </Link>
              )}
            </>
          )}
          <IconButton color="inherit" onClick={toggleColorScheme} size="large">
            {colorScheme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <NavigationDrawer
        DrawerProps={{
          open: isDrawerOpen,
          onClose: handleDrawerClose,
        }}
        onClose={handleDrawerClose}
      />
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseProfileMenu}
        onClick={handleCloseProfileMenu}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleProfileClick}>My Profile</MenuItem>
        <MenuItem onClick={handleExchangesClick}>My Gift Exchanges</MenuItem>
        <MenuItem onClick={handleWishlistsClick}>My Wishlists</MenuItem>
        <Divider />
        <MenuItem onClick={signOut}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  )
}

export default Header
