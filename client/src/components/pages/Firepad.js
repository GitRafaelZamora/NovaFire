import React, {Component} from 'react';
// import { admin } from '../../util/firebase/admin';


class Firepad extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        window.firebase = admin;
    }


    render() {
        return (
            <div>

            </div>
        );
    }
}

export default Firepad;