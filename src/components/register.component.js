import React, { Component } from "react";
import { register } from "./UserFunctions";
import LoadingSpinner from './loadingspinner.component.js';
import { Link, withRouter } from "react-router-dom";

const emailRegex = RegExp(/^[a-zA-Z0-9_\-\.]+@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)

const formValid = formErrors => {
    let valid = true;
    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false)
    });
    return valid;
}
export default class RegisterPage extends Component {
    constructor() {
        super();
        this.state = {
            your_name: "",
            email: "",
            password: "",
            loading: false, // will be true when ajax request is running

            formErrors: {
                your_name: "",
                email: "",
                password: ""
            }
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        const { name, value } = e.target;
        // console.log("name :", name);
        // console.log("value :", value);
        this.setState({ [e.target.name]: e.target.value });
        let formErrors = this.state.formErrors;

        switch (name) {
            case 'your_name':
                formErrors.your_name = value.length < 3 ? 'Minimum 3 character required' : "";
                break;
            case 'email':
                formErrors.email = emailRegex.test(value) ? '' : "Invalid Email Address";
                break;
            case 'password':
                formErrors.password = value.length < 6 ? 'password must 6-20 character long, contains atleast one capital letter and one number' : "";
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
                your_name: this.state.your_name,
                email: this.state.email,
                password: this.state.password
            };

            register(user).then(res => {
                this.props.history.push("/login");
            });
        }
        else {
            e.preventDefault();
            console.error('FORM ERROR - DISPLAY ERROR MESSAGE');
        }
    }

    render() {
        const { loading } = this.state;
        const { formErrors } = this.state;
        return (
            <div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="offset-sm-4 col-md-4 shadow p-3 mb-5 bg-white rounded justify-content-center align-self-center w-100 register-css">
                            <div className="register-border">
                                <form onSubmit={this.onSubmit}>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <h2 className="text-center yoke-logo">YOKE</h2>
                                            <div className="input-class-field">
                                                <div className="form-group">
                                                    <label htmlFor="email"><b>Your name</b></label>
                                                    <div className="input-group">
                                                        <span className="input-group-addon">
                                                            <span className="glyphicon glyphicon-envelope" />
                                                        </span>
                                                        <input
                                                            type="text"
                                                            className={formErrors.your_name.length > 0 ? 'error form-control' : 'form-control'}
                                                            id="your_name"
                                                            name="your_name"
                                                            placeholder="Fill Your name"
                                                            required="required"
                                                            value={this.state.your_name}
                                                            onChange={this.onChange}
                                                        />
                                                        {formErrors.your_name.length > 0 && (
                                                            <span className="errorMessage">{formErrors.your_name}</span>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="email"><b>Email</b></label>
                                                    <div className="input-group">
                                                        <span className="input-group-addon">
                                                            <span className="glyphicon glyphicon-envelope" />
                                                        </span>
                                                        <input
                                                            type="email"
                                                            className={formErrors.email.length > 0 ? 'error form-control' : 'form-control'}
                                                            id="email"
                                                            name="email"
                                                            placeholder="anyone@example.com"
                                                            required="required"
                                                            value={this.state.email}
                                                            onChange={this.onChange}
                                                        />
                                                        {formErrors.email.length > 0 && (
                                                            <span className="errorMessage">{formErrors.email}</span>
                                                        )}
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

                                                <div className="form-group">
                                                    <button
                                                        type="submit"
                                                        className="btn btn-primary btn-block pull-right"
                                                        id="btnContactUs"
                                                    >
                                                        {loading ? <LoadingSpinner /> : "Register"}
                                                    </button><br /><br /><br />

                                                    <p className="signup text-center">Already have an account? <Link to="/"> Login here</Link> </p>
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