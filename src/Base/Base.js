import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import React from 'react'
import { useHistory } from 'react-router-dom'

const Base = ({ title, description, children }) => {
  const history = useHistory();
  return (
    <div className='main-component base-component'>

      <div className='nav-bar'>

        <AppBar position='static'>
          <Toolbar>

            <Button

              color='inherit'

              onClick={() => history.push("/")}
            >Home</Button>

            <Button
              color='inherit'
              onClick={() => history.push("/users/all")}
            >User-List</Button>

            <Button
              color='inherit'
              onClick={() => history.push("/users/add")}
            >Add-User</Button>

          </Toolbar>
        </AppBar>

      </div>

      <header>

        <Typography
          variant="h3"
          className='heading'
        >
          {title}
        </Typography>

      </header>

      <main className='main-segment'>

        <Typography
          variant="h4"
          className='heading'
        >
          {description}
        </Typography>

        <div className='child-component'>
          {children}
        </div>
      </main>

    </div>
  )
}

export default Base