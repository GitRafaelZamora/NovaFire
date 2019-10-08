import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

// Material UI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

// Redux
import { connect } from 'react-redux'
import { loginUser } from "../../redux/actions/userActions";
import { useHistory } from "react-router";
import Lottie from "react-lottie";
import FadeIn from "react-fade-in";
import * as bb8 from '../../assets/bb8';

const styles = {
    form: {
        textAlign: 'center',
        padding: '50px',
        backgroundColor: '#d3d3d3',
        color: 'black'
    },
    pageTitle: {
        margin: '10px auto 10px auto',
        fontSize: 50,
    },
    button: {
        margin: "20px",
        position: 'relative'
    },
    customError: {
        color: 'red',
        fontSize: '0.8rem',
        marginTop: '10px'
    },
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

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errors: {}
        };
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password,
        };
        // Make request to server for credentials.
        this.props.loginUser(user, this.props.history);
    };

    render() {
        const { classes, UI } = this.props;
        let markup = UI.fetching_user ? (
            <Grid container >
                <Grid item sm />
                <Grid item sm className={classes.form}>
                    <FadeIn>
                        <div className={classes.loading}>
                            <h1>fetching user</h1>
                            <Lottie options={options} height={120} width={120} />
                        </div>
                    </FadeIn>
                </Grid>
                <Grid item sm />
            </Grid>
        ) : (
            <Grid container >
                <Grid item sm />
                <Grid item sm className={classes.form}>
                    <Typography variant="h1" className={classes.pageTitle}>
                        Login
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField
                            id="email"
                            name="email"
                            type="email"
                            label="Email"
                            InputProps={{ className: classes.input }}
                            // helperText={errors.email}
                            // error={errors.email ? true : false}
                            value={this.state.email}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <TextField
                            id="password"
                            name="password"
                            type="password"
                            label="Password"
                            InputProps={{ className: classes.input }}
                            // helperText={errors.password}
                            // error={errors.password ? true : false}
                            value={this.state.password}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        {/*{errors.general && (*/}
                        {/*    <Typography variant="body2" className={classes.customError}>*/}
                        {/*        {errors.general}*/}
                        {/*    </Typography>*/}
                        {/*)}*/}
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.button}
                        >
                            Login
                            {/*{ loading &&*/}
                            {/*<CircularProgress size={30} className={classes.progress} />*/}
                            {/*}*/}
                        </Button>
                        <Button color="primary" component={Link} to={"/signup"}>
                            Signup
                            {/*{ loading &&*/}
                            {/*<CircularProgress size={30} className={classes.progress} />*/}
                            {/*}*/}
                        </Button>
                        <br />
                        <small>Don't have an account? Sign up <Link to="/signup">here.</Link></small>
                    </form>
                </Grid>
                <Grid item sm />
            </Grid>
        );
        return (
            <>
                {markup}
            </>
        );
    }
}

Login.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    UI: state.UI,
    user: state.user,
});

const mapActionsToProps = {
  loginUser
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Login));
