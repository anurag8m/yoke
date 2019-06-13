import React, { Component } from "react";
import '../App.css';
import FooterPage from "./footer.component.js";
import { login } from "./UserFunctions";
import LoadingSpinner from './loadingspinner.component.js';
import { Link, withRouter } from "react-router-dom";
// import { authenticationService } from '../_services';

// const emailRegex = RegExp(/^[a-zA-Z0-9_\-\.]+@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)

const formValid = formErrors => {
    let valid = true;
    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false)
    });
    return valid;
}

export default class LoginPage extends Component {
    constructor() {
        super();
        this.state = {
            phone: "",
            password: "",
            loading: false,
            message: '',
            formErrors: {
                phone: "",
                password: ""
            }
        };


        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        if (localStorage.getItem('usertoken')) {
            this.props.history.push("/dashboard");
        }
    }

    onChange(e) {
        const { name, value } = e.target;
        // console.log("name :", name);
        // console.log("value :", value);
        this.setState({ [e.target.name]: e.target.value });
        let formErrors = this.state.formErrors;

        switch (name) {
            // case 'email':
            //     formErrors.email = emailRegex.test(value) ? '' : "Invalid Email Address";
            //     break;
            case 'password':
                formErrors.password = value.length < 6 ? 'Minimum 6 character required' : "";
                break;
            default: break;
        }
        this.setState({ formErrors, [name]: value }, () => console.log(this.state));
    }
    onSubmit(e) {
        if (formValid(this.state.formErrors)) {
            this.setState({
                loading: true,
            })
            e.preventDefault();
            const user = {
                phone: this.state.phone,
                password: this.state.password
            };

            login(user).then((res, err) => {
                if (res) {
                    this.props.history.push("/dashboard");
                }
                else {
                    this.setState({
                        loading: false,
                        message: "Login Error : Phone and Password doesn't matched"
                    })
                }
            });
        }
        else {
            e.preventDefault();
            console.error('FORM ERROR - DISPLAY ERROR MESSAGE');
        }
    }

    render() {
        const { loading, message } = this.state;
        const { formErrors } = this.state;
        return (
            <div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="offset-sm-4 col-md-4 shadow p-3 mb-5 bg-white rounded justify-content-center align-self-center w-100 login-css">
                            {message !== '' &&
                                <div class="alert alert-danger alert-dismissible" role="alert">
                                    {message}
                                </div>
                            }
                            <div className="login-border">
                                <form onSubmit={this.onSubmit}>
                                    <div className="row">

                                        <div className="col-md-12">
                                            <h2 className="text-center yoke-logo">YOKE</h2>
                                            <div className="input-class-field">
                                                <div className="form-group">
                                                    <label htmlFor="email"><b>Phone</b></label>
                                                    <div className="input-group">
                                                        <span className="input-group-addon">
                                                            <span className="glyphicon glyphicon-envelope" />
                                                        </span>
                                                        <input
                                                            type="text"
                                                            className='form-control'
                                                            id="phone"
                                                            name="phone"
                                                            placeholder="anyone@example.com"
                                                            required="required"
                                                            value={this.state.phone}
                                                            onChange={this.onChange}
                                                        />

                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="password"><b>Password</b></label>
                                                    <div className="input-group">
                                                        <span className="input-group-addon">
                                                            <span className="glyphicon glyphicon-envelope" />
                                                        </span>
                                                        <input
                                                            type="password"
                                                            className={formErrors.password.length > 0 ? 'error form-control' : 'form-control'}
                                                            id="password"
                                                            name="password"
                                                            placeholder="********"
                                                            required="required"
                                                            value={this.state.password}
                                                            onChange={this.onChange}
                                                        />
                                                        {formErrors.password.length > 0 && (
                                                            <span className="errorMessage">{formErrors.password}</span>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="form-group form-check">
                                                    <label className="form-check-label">
                                                        <input className="form-check-input" type="checkbox" /> Keep me logged in
                                                    </label>
                                                </div>
                                                <div className="form-group">
                                                    <button
                                                        type="submit"
                                                        className="btn btn-primary btn-block pull-right"
                                                        id="btnContactUs"
                                                    >
                                                        {loading ? <LoadingSpinner /> : "Login"}
                                                    </button><br /><br />
                                                    <p className="forgetpassword"><a href="">Forget my password ?</a></p>
                                                    <p className="signup">Don't have an account? <Link to="/register"> Create Now</Link> </p>
                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}