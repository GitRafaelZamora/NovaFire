import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { getDocument } from "../../redux/actions/documentActions";
import CreateDocumentCard from "./CreateDocumentCard";

const useStyles = makeStyles({
    card: {
        minWidth: 275,
        minHeight: 275
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

function DocumentCard(props) {
    const classes = useStyles();

    function openDocument() {
        console.log("Opening document: " + props.docID);
        props.getDocument(props.docID);
    }

    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Created by: Rafael
                </Typography>
                <Typography variant="h5" component="h2">
                    {props.title}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {props.users}
                </Typography>
                <Typography variant="body2" component="p">
                    {props.content}
                </Typography>
            </CardContent>
            <CardActions>
                <Button onClick={openDocument}>Open Document</Button>
            </CardActions>
        </Card>
    );
}

DocumentCard.propTypes = {
    docID: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
    documents: state.documents,
});

const mapActionsToProps = {
  getDocument
};

export default connect(mapStateToProps, mapActionsToProps)(DocumentCard);