import { FC } from 'react'
import { Box, Container, Toolbar } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import Header from 'components/layout/Header'

interface Props {
  children: any
}

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
  },
}))

const Layout: FC<Props> = ({ children }) => {
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      <Header />
      <Container className={classes.content}>
        <Toolbar />
        {children}
      </Container>
    </Box>
  )
}

export default Layout
