import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddBox from '@material-ui/icons/AddBox';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
    card: {
        minWidth: 275,
        minHeight: 275,
    },
    title: {
        fontSize: 14,
    },
    add: {
        margin: '0',
        fontSize: '100px',
        color: 'blue'
    }
});

export default function CreateDocumentCard(props) {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography variant="h5" component="h2">
                    Create New Document
                </Typography>
                <AddBox className={classes.add} />
            </CardContent>
        </Card>
    );
}