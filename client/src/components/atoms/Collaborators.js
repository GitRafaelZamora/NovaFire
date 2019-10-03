import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loadCSS } from 'fg-loadcss';
import clsx from 'clsx';
import Identicon from 'react-identicons';

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Avatar from '@material-ui/core/Avatar'
import Icon from '@material-ui/core/Icon';
import { green } from '@material-ui/core/colors';
import Tooltip from '@material-ui/core/Tooltip';

import { addCollaborator } from "../../redux/actions/documentActions";


const styles = {
    horizontal: {
        display: 'flex',
        flexDirection: 'row',
        overflow: 'auto',
        whiteSpace: 'nowrap'
    },
    avatar: {
        width: 80,
        height: 80,
        '&:hover': {
            color: green[800],
            cursor: 'pointer',
        }
    }
};

class Collaborators extends Component {

    inviteFriend = ( ) => {
        this.props.addCollaborator(this.props.handle, this.props.docID);
    };

    render() {
        const classes = this.props.classes;

        loadCSS(
            'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
            document.querySelector('#font-awesome-css'),
        );

        let item = this.props.users.map(person => {
                    return (<ListItem key={person}>
                        <Tooltip title={person} aria-label={person}>
                            <Avatar className={classes.avatar}>
                                <Identicon size={50} string={person} />
                            </Avatar>
                        </Tooltip>

                    </ListItem>)
                });

        return (
                <List className={classes.horizontal}>
                    <ListItem>
                        <Tooltip title={"Add"} aria-label={"add"}>
                            <Avatar className={classes.avatar}>
                                <Icon
                                    className={clsx('fa fa-plus-circle', classes.avatar)}
                                    color={"action"}
                                    style={{ fontSize: 80 }}
                                    onClick={this.inviteFriend}
                                />
                            </Avatar>
                        </Tooltip>
                    </ListItem>
                    {item}
                </List>
        );
    }
}

Collaborators.propTypes = {

};

const mapStateToProps = (state) => ({
    document: state.document,
});

const mapActionsToProps = {
    addCollaborator,
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(withRouter(Collaborators)));