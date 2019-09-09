import React, { Component } from 'react'

// Material UI
import { makeStyles, withStyles } from '@material-ui/core/styles';

const styles = {

};

export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            noUserFound: false
        }
    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                Hello from home
            </div>
        )
    }
}

export default withStyles(styles)(Home);
