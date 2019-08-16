import React, { Component } from 'react'

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";

// Components
import DocumentCard from "../atoms/DocumentCard";
import AddDocumentCard from "../atoms/AddDocumentCard"

const useStyles = makeStyles(theme => ({
    // Insert Styles here.
}));

export class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            documents: [
                {
                    id: "doc123",
                    users: ["rafa", "david"],
                    challenge: "Add W/O Arithmetic Operators"
                },
                {
                    id: "doc124",
                    users: ["rafa", "david", "vivian"],
                    challenge: "Add W/O Arithmetic Operators"
                },
                {
                    id: "doc125",
                    users: ["rafa"],
                    challenge: "Add W/O Arithmetic Operators"
                },
            ],
        }
    }

    render() {
        return (
            <Grid container spacing={2}>
                <Grid item>
                    <AddDocumentCard />
                </Grid>
                {this.state.documents.map(doc => {
                    return (
                        <Grid item key={doc.id}>
                            <DocumentCard docID={doc.id} users={doc.users} challenge={doc.challenge}/>
                        </Grid>
                        )
                })}
            </Grid>
        )
    }
}

export default withStyles(useStyles)(Dashboard);
