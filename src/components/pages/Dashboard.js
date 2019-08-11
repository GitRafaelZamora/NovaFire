import React, { Component } from 'react'
import {auth} from "../../../lib/js/firebase/auth";
import {Redirect} from 'react-router-dom';

export class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            noUserFound: false
        }
    }

    getUser() {
        auth().then(user => {
            this.setState({user: user})
        })
            .catch(() => {
                this.setState({noUserFound: true})
            })
    }

    render() {
        let page;

        if (this.state.noUserFound) {
            page = <Redirect to={{
                pathname: '/login',
                state: {
                    destination: 'dashboard'
                }
            }}/>;
        }
         else {
            if (!this.state.user) {
                page = <div>Loading ...</div>;
                this.getUser();
            }
            else {
                page = <div>
                    Hello from dashboard
                </div>
            }
        }

        return page;
    }
}

export default Dashboard
