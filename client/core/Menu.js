import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import HomeIcon from '@material-ui/icons/Home'
import Button from '@material-ui/core/Button'
import auth from './../auth/auth-helper'
import {Link, withRouter} from 'react-router-dom'
import { Box } from '@material-ui/core';
import { Grid } from '@material-ui/core';

const isActive = (history, path) => {
  if (history.location.pathname == path)
    return {color: '#ffa726'}
  else
    return {color: '#ffffff'}
}
const Menu = withRouter(({history}) => (
  <AppBar position='static'>
    <Toolbar>
      <Grid container>
        <Grid item md={3}>
        <Typography variant="h6" color="inherit">
          MARCUS SOCIAL MEDIA
        </Typography>
        </Grid>
        <Grid item md={3}>
          <Box
              display="flex"
              direction="column"
              justifyContent="right"
              alignItems="right"
              spacing={2}
            >
              <Link to="/">
                <IconButton aria-label="Home" style={isActive(history, "/")}>
                  <HomeIcon/>
                </IconButton>
              </Link>

            </Box>
        </Grid>

        <Grid item md={6}>
            <Box
             display="flex"
             direction="column"
             justifyContent="right"
             alignItems="right"
            >
{
        !auth.isAuthenticated() && (<span>
          <Link to="/signup">
            <Button style={isActive(history, "/signup")}>Sign up
              </Button>
           </Link>
            

          <Link to="/signin">
            <Button style={isActive(history, "/signin")}>Sign In
             </Button>
          </Link>
        </span>)
      }
      
      {
        auth.isAuthenticated() && (<span>
          <Link to={"/user/" + auth.isAuthenticated().user._id}>
            <Button style={isActive(history, "/user/" + auth.isAuthenticated().user._id)}>My Profile</Button>
          </Link>
          <Button color="inherit" onClick={() => {
              auth.clearJWT(() => history.push('/'))
            }}>Sign out</Button>
        </span>)
      }

          </Box>
        </Grid>
      </Grid>

      

      
      
     
    </Toolbar>
  </AppBar>
))

export default Menu
