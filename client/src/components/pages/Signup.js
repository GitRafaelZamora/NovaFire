import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core";
import { connect } from 'react-redux';
import { signup } from '../../redux/actions/userActions'


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

};

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            handle: '',
            email: '',
            confirmEmail: '',
            password: '',
            confirmPassword: ''
        }
    };
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };
    handleSubmit = (e) => {
        // TODO: Validate User Input
        e.preventDefault();
        console.log("Signup.js");
        console.log(this.state);
        this.props.signup(this.state);
    };
    render() {
        const { classes } = this.props;
        return (
            <Grid container >
                <Grid item sm />
                <Grid item sm className={classes.form}>
                    <Typography variant="h3" className={classes.pageTitle}>
                        Signup
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField
                            id="handle"
                            name="handle"
                            type="text"
                            label="User Handle"
                            InputProps={{ className: classes.input }}
                            // helperText={errors.password}
                            // error={errors.password ? true : false}
                            value={this.state.handle}
                            onChange={this.handleChange}
                            fullWidth
                        />
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
                            id="confirmEmail"
                            name="confirmEmail"
                            type="email"
                            label="Confirm Email"
                            InputProps={{ className: classes.input }}
                            // helperText={errors.email}
                            // error={errors.email ? true : false}
                            value={this.state.confirmEmail}
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
                        <TextField
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            label="Confirm Password"
                            InputProps={{ className: classes.input }}
                            // helperText={errors.password}
                            // error={errors.password ? true : false}
                            value={this.state.confirmPassword}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        {/*{errors.general && (*/}
                        {/*    <Typography variant="body2" className={classes.customError}>*/}
                        {/*        {errors.general}*/}
                        {/*    </Typography>*/}
                        {/*)}*/}
                        <Button type={"submit"} color={"primary"} component={Link} to={"/login"}>
                            Submit
                            {/*{ loading &&*/}
                            {/*<CircularProgress size={30} className={classes.progress} />*/}
                            {/*}*/}
                        </Button>
                    </form>
                </Grid>
                <Grid item sm />
            </Grid>
        );
    }
}

const mapStateToProps = (state) => ({

});

const mapActionsToProps = {
    signup
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Signup));