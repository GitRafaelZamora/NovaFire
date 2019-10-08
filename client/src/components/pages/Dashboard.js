import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from "prop-types";
import FadeIn from "react-fade-in"
import Lottie from 'react-lottie'
import * as bb8 from '../../assets/bb8';

// MUI
import { withStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";

// Components
import DocumentCard from "../molecules/DocumentCard";
import CreateDocumentCard from "../molecules/CreateDocumentCard"


import {loginUser} from "../../redux/actions/userActions";
import {getDocuments} from "../../redux/actions/documentActions";


const styles = {
    loading: {
        marginTop: 60
    }
};

const options = {
    loop: true,
    autoplay: true,
    animationData: bb8.default,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
    }
};

export class Dashboard extends Component {
    state = {
        documents: null,
    };

    componentDidMount() {
        this.props.getDocuments()
    }

    render() {
        const { documents, loading } = this.props.document;
        const { fetching_documents } = this.props.UI;
        const { classes } = this.props;

        let documentMarkup = !fetching_documents ? (
            documents.map(document =>
                <Grid key={document.docID} item xs={12} sm={6} md={4} lg={3}>
                    <DocumentCard document={document} />
                </Grid>
            )
        ) : (
            <FadeIn>
                <div className={classes.loading}>
                    <h1>fetching documents</h1>
                    <Lottie options={options} height={120} width={120} />
                </div>
            </FadeIn>
        );
        return (
            <Grid container spacing={10}>
                <Grid item xs={12} sm={6} md={4} lg={3}>
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
