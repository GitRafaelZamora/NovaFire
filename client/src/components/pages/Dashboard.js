import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";

// Components
import DocumentCard from "../atoms/DocumentCard";
import CreateDocumentCard from "../atoms/CreateDocumentCard"
import PropTypes from "prop-types";
import {loginUser} from "../../redux/actions/userActions";
import {getDocuments} from "../../redux/actions/documentActions";


const styles = {
    // Insert Styles here.
};

export class Dashboard extends Component {
    state = {
        documents: null,
    };

    componentDidMount() {
        this.props.getDocuments();
    }

    render() {
        const { documents, loading } = this.props.document;
        const classes = this.props.classes;
        // TODO: ADD Collaborators.
        let documentMarkup = !loading ? (
            documents.map(document =>
                <Grid key={document.docID} item xs={3}>
                    <DocumentCard docID={document.docID}
                                  title={document.title}
                                  content={document.content}
                    />
                </Grid>
            )
        ) : (
            <p>Loading...</p>
        );
        return (
            <Grid container spacing={10}>
                <Grid item xs={3}>
                    <CreateDocumentCard/>
                </Grid>
                {documentMarkup}
            </Grid>
        )
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
    document: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    document: state.document,
    UI: state.UI,
});

const mapActionsToProps = {
    loginUser,
    getDocuments,
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Dashboard));
