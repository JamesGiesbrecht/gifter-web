import { FC } from 'react'
import { ThemeProvider, CssBaseline, StyledEngineProvider } from '@mui/material'
import { LocalizationProvider } from '@mui/lab'
import DateAdapter from '@mui/lab/AdapterDateFns'
import { BrowserRouter, Route, RouteProps, Switch } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'

import { ROUTES } from 'appConstants'
import ProtectedRoute from 'components/auth/ProtectedRoute'
import PublicOnlyRoute from 'components/auth/PublicOnlyRoute'
import PublicRoute from 'components/auth/PublicRoute'
import Layout from 'components/layout/Layout'
import { AuthContextProvider } from 'context/Auth'
import { useColorScheme } from 'context/Theme'
import getTheme from 'styles/theme'
import { AppRoutes } from 'ts/types'

// https://github.com/facebook/react/issues/24304
// Bug with React Types
const NotistackProvider = SnackbarProvider as any

const App: FC = () => {
  const { colorScheme } = useColorScheme()
  const appRoutes = Object.keys(ROUTES).map((routeName) => {
    const route = ROUTES[routeName as keyof AppRoutes]
    const { Component, path, props, publicOnlyRoute, protectedRoute } = route
    let RouteComponent: typeof Route | FC<RouteProps> = PublicRoute
    if (protectedRoute) {
      RouteComponent = ProtectedRoute
    } else if (publicOnlyRoute) {
      RouteComponent = PublicOnlyRoute
    }
    return (
      <RouteComponent key={path} path={path} {...props}>
        <Component />
      </RouteComponent>
    )
  })

  const theme = getTheme(colorScheme)

  return (
    <BrowserRouter>
      {/* TODO v5: remove once migration to emotion is completed */}
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <NotistackProvider>
            <AuthContextProvider>
              <LocalizationProvider dateAdapter={DateAdapter}>
                <CssBaseline />
                <Layout>
                  <Switch>{appRoutes}</Switch>
                </Layout>
              </LocalizationProvider>
            </AuthContextProvider>
          </NotistackProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </BrowserRouter>
  )
}

export default App
