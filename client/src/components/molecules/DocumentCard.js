import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import Collaborators from "../atoms/Collaborators";

// Material
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import DeleteForever from '@material-ui/icons/DeleteForever'
import Typography from '@material-ui/core/Typography';

// Redux
import { connect } from 'react-redux';
import { getDocument, addCollaborator, deleteDocument } from "../../redux/actions/documentActions";
import TextField from "@material-ui/core/TextField";

const styles = {
    card: {
        minWidth: 275,
        minHeight: 275
    },
    deleteForever: {
        float: 'right',
        cursor: 'pointer'
    },
    title: {
        fontSize: 14,
        cursor: 'pointer'
    },
};

class DocumentCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            handle: ''
        };
    }

    openDocument = (e) => {
        e.preventDefault();
        console.log("Opening document: " + this.props.document.docID);
        this.props.getDocument(this.props.document.docID);
        setTimeout(()=>{this.props.history.push('/editor')}, 750);
    };

    deleteDocument = (e) => {
        e.preventDefault();
        this.props.deleteDocument(this.props.docID);
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    render() {
        const classes = this.props.classes;

        return (
            <>
                <Card className={classes.card}>
                    <CardContent>
                        <DeleteForever className={classes.deleteForever} color={"secondary"} onClick={this.deleteDocument}/>
                        <Typography className={classes.title} color="textSecondary" onClick={this.openDocument}>
                            {this.props.document.docID}
                        </Typography>

                        <Typography variant="h5" component="h2">
                            {this.props.document.title}
                        </Typography>
                        <Typography variant="body2" component="p">
                            {this.props.content}
                        </Typography>
                        <TextField
                            id="handle"
                            name="handle"
                            type="text"
                            label="User Handle"
                            InputProps={{ className: classes.input }}
                            // helperText={errors.password}
                            // error={errors.password ? true : false}
                            value={this.state.handle}
                            onChange={this.handleChange}
                            fullWidth
                        />
                    </CardContent>
                    <CardActions>
                        <Collaborators handle={this.state.handle} docID={this.props.document.docID} users={this.props.document.collaborators}/>
                    </CardActions>
                </Card>
            </>
        );
    }

}

DocumentCard.propTypes = {
    documents: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    documents: state.documents,
});

const mapActionsToProps = {
    getDocument,
    addCollaborator,
    deleteDocument
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(withRouter(DocumentCard)));