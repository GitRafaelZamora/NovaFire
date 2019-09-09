import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createDocument } from '../../redux/actions/documentActions';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddBox from '@material-ui/icons/AddBox';
import TextField from "@material-ui/core/TextField";

const styles = {
    card: {
        minWidth: 275,
        minHeight: 275,
        position: 'relative'
    },
    title: {
        fontSize: 14,
    },
    add: {
        margin: '20px',
        right: 0,
        bottom: 0,
        position: 'absolute'
    }
};

class CreateDocumentCard extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };


    createNewDocument = () => {
        console.log(this.props.user.credentials.handle);
        this.props.createDocument(this.state.title, this.state.content, this.props.user.credentials.handle);
    };

    render() {
        const classes = this.props.classes;
       return (
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        Create New Document
                    </Typography>
                    <TextField
                        id="title"
                        name="title"
                        type="text"
                        label="Title"
                        InputProps={{ className: classes.input }}
                        // helperText={errors.email}
                        // error={errors.email ? true : false}
                        value={this.state.title}
                        onChange={this.handleChange}
                        fullWidth
                    />
                    <TextField
                        id="content"
                        name="content"
                        type="text"
                        label="Content"
                        InputProps={{ className: classes.input }}
                        // helperText={errors.email}
                        // error={errors.email ? true : false}
                        value={this.state.content}
                        onChange={this.handleChange}
                        fullWidth
                    />
                    <Button variant={"outlined"} className={classes.add} onClick={this.createNewDocument}>
                        Submit
                    </Button>
                </CardContent>
            </Card>
       );
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
});

const mapActionsToProps = {
    createDocument,
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(withRouter(CreateDocumentCard)));