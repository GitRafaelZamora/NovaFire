import React, {Component} from 'react';
import PropTypes from 'prop-types';

// Material UI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

// Redux
import { connect } from 'react-redux'
import { loginUser } from "../../redux/actions/userActions";

const styles = {
    form: {
        textAlign: 'center',
        paddingTop: '50px'
    },
    input: {
        color: 'white'
    },
    image: {
        margin: '20px auto 20px auto',
        maxWidth: 100,
    },
    pageTitle: {
        margin: '10px auto 10px auto',
        fontSize: 50,
    },
    textField: {
        margin: '10px auto 10px auto',
        color: '#fff'
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
    progress: {
        position: 'absolute'
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
        const { classes } = this.props;

        return (
            <Grid container className={classes.form}>
                <Grid item sm />
                <Grid item sm>
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
                        <Button type="submit" variant="contained" color="primary" className={classes.button} >
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
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI,
});

const mapActionsToProps = {
  loginUser
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Login));
