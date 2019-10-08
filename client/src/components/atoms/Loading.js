import React from 'react';
import PropTypes from "prop-types";
import {loginUser} from "../../redux/actions/userActions";
import {getDocuments} from "../../redux/actions/documentActions";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core";
import ReactLoading from "react-loading";

class Loading extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            done: undefined
        };
    }

    render() {
        let {fetching_documents} = this.props.UI;
        let {classes} = this.props;
        return fetching_documents ? (<ReactLoading className={classes.loading} type={"bars"} color={"white"} />) :
                (this.props.component);
    }
}

Loading.propTypes = {
    UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    UI: state.UI,
});

const mapActionsToProps = {

};

export default connect(mapStateToProps, mapActionsToProps)(Loading);