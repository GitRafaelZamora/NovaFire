import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import { getDocument } from "../../redux/actions/documentActions";

const styles = {
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
};

class DocumentCard extends React.Component {
    constructor(props) {
        super(props);
    }

    openDocument = (e) => {
        e.preventDefault();
        console.log("Opening document: " + this.props.docID);
        this.props.getDocument(this.props.docID);
        setTimeout(()=>{this.props.history.push('/editor')}, 750);
    };

    render() {
        const classes = this.props.classes;
        return (
            <>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            {this.props.docID}
                        </Typography>
                        <Typography variant="h5" component="h2">
                            {this.props.title}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                            {this.props.users}
                        </Typography>
                        <Typography variant="body2" component="p">
                            {this.props.content}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button onClick={this.openDocument}>
                            Open Document
                        </Button>
                    </CardActions>
                </Card>
            </>
        );
    }

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

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(withRouter(DocumentCard)));