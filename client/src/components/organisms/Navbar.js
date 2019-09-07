import React, { Component } from 'react'

// import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
// MUI Stuff
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
// import Home from '@material-ui/icons/Home';

import { withStyles } from '@material-ui/core';

const styles = theme => ({
  navContainer: {
    backgroundColor: '#282c34',
  }
});


class Navbar extends Component {
  render() {
    const { classes } = this.props
    return (
      <AppBar position="absolute">
        <Toolbar className={classes.navContainer}>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/editor">TextEditor</Button>
          <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
        </Toolbar>
      </AppBar >
    )
  }
}

Navbar.propTypes = {

}

const mapStateToProps = (state) => ({
  
})

export default connect(mapStateToProps)(withStyles(styles)(Navbar));
