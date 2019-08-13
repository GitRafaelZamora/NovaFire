import React, { Component } from 'react'

// Firebase
import {auth} from "../../../lib/js/firebase/auth";
import {logout} from "../../../lib/js/firebase/logout";

import {Redirect} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    },
    input: {
        display: 'none',
    },
}));

export class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            noUserFound: false
        }
    }

    getUser() {
        auth().then(user => {
            this.setState({user: user})
        })
            .catch(() => {
                this.setState({noUserFound: true})
            })
    }

    handleLogout() {
        logout().then(() => {
            window.location = '/';
        });
    }

    render() {
        const {classes} = this.props;

        // no user logged in
        if (this.state.noUserFound) {
            return (
                <Redirect to={{
                    pathname: '/login',
                    state: {
                        destination: 'dashboard'
                    }
                }}/>
            );
        }

        // user logged in
        if (this.state.user) {
            return (
                <div>
                    Hello from dashboard
                    <Button
                        variant="contained"
                        className={classes.button}
                        color={'secondary'}
                        onClick={this.handleLogout}
                        // href={'/'}
                    >
                        Log Out
                    </Button>
                </div>
            )
        }

        // try to get currently logged in user
        this.getUser();
        return (<div>Loading ...</div>);
    }
}

export default withStyles(useStyles)(Dashboard);
