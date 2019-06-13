import React, { Component } from "react";
import FooterPage from "./footer.component.js";
import HeaderPage from "./header.component.js";
import '../dashboard/dashboard.css';
import { myprofile } from "./UserFunctions";
import $ from "jquery";
import Popper from "popper.js";
import jwt_decode from 'jwt-decode';


export default class ProfilePage extends Component {

    constructor() {
        super();
        this.state = {
            name: "",
            usertype: "",
            email: "",
            empid: "",
            userphone: "",
            doj: "",
            department: "",
            designation: "",
            companyName: "",
            ownerName: "",
            ownerPhone: "",
            ownerAddress: "",
            timeInterval: "",
            distanceTravel: "",
        }
    }

    componentDidMount() {
        const token = localStorage.usertoken;

        const decoded = jwt_decode(token);

        this.setState({
            employee_id: decoded.employee_id,
            name: decoded.name,
            usertype: decoded.usertype,
            email: decoded.email,
            empid: decoded.employee_id,
            userphone: decoded.userphone,
            doj: decoded.doj,
            department: decoded.department,
            designation: decoded.designation,
            companyName: decoded.companyName,
            ownerName: decoded.ownerName,
            ownerPhone: decoded.ownerPhone,
            ownerAddress: decoded.ownerAddress,
            timeInterval: decoded.timeInterval,
            distanceTravel: decoded.distanceTravel,
            departmentName: decoded.departmentName
        })

    }
    onChange(e) {
        const { name, value } = e.target;
        this.setState({ [e.target.name]: e.target.value });
    }
    render() {
        return (
            <div className="app sidebar-mini rtl">
                <HeaderPage />
                {/** ------------start right bar----------------- */}
                <div className="app-content">

                    <div class="row user">
                        <div class="col-md-3">
                            <div class="profile">
                                <div class="info"><img class="user-img" src="https://s3.amazonaws.com/uifaces/faces/twitter/jsa/128.jpg" />
                                    <h4>{this.state.name}</h4>
                                    <p>{this.state.designation}</p>
                                </div>

                            </div>
                        </div>

                        <div class="col-md-9">
                            <div className="tile user-setting">
                                <div className="tile-body">
                                    <form>
                                        <div><h3>My Profile</h3></div><br />
                                        <div class="row mb-4">
                                            <div class="col-md-5">
                                                <label>Name</label>
                                                <input class="form-control" type="text" name="name" value={this.state.name} onChange={this.onChange} />
                                            </div>
                                            <div class="col-md-5">
                                                <label>User Type</label>
                                                <input class="form-control" type="text" name="usertype" value={this.state.usertype} readOnly onChange={this.onChange} />
                                            </div>
                                        </div>
                                        <div class="row mb-4">
                                            <div class="col-md-5">
                                                <label>Email</label>
                                                <input class="form-control" type="email" name="email" value={this.state.email} readOnly onChange={this.onChange} />
                                            </div>
                                            <div class="col-md-5">
                                                <label>Employee ID</label>
                                                <input class="form-control" type="text" name="empid" value={this.state.employee_id} readOnly onChange={this.onChange} />
                                            </div>
                                        </div>
                                        <div class="row mb-4">
                                            <div class="col-md-5">
                                                <label>Phone</label>
                                                <input class="form-control" type="text" name="userphone" value={this.state.userphone} onChange={this.onChange} />
                                            </div>
                                            <div class="col-md-5">
                                                <label>Date of joining</label>
                                                <input class="form-control" type="date" name="doj" value={this.state.doj} readOnly onChange={this.onChange} />
                                            </div>
                                        </div>
                                        <div class="row mb-4">
                                            <div class="col-md-5">
                                                <label>Department</label>
                                                <input class="form-control" type="text" name="department" readOnly value={this.state.departmentName} onChange={this.onChange} />
                                            </div>
                                            <div class="col-md-5">
                                                <label>Designation</label>
                                                <input class="form-control" type="text" name="designation" readOnly value={this.state.designation} onChange={this.onChange} />
                                            </div>
                                        </div>

                                        <hr />

                                        <div><h3>Company Detail</h3></div><br />

                                        <div class="row mb-4">
                                            <div class="col-md-5">
                                                <label>Company Name</label>
                                                <input class="form-control" type="text" name="companyName" value={this.state.companyName} readOnly onChange={this.onChange} />
                                            </div>
                                            <div class="col-md-5">
                                                <label>Owner Name</label>
                                                <input class="form-control" type="text" name="ownerName" value={this.state.ownerName} readOnly onChange={this.onChange} />
                                            </div>
                                        </div>
                                        <div class="row mb-4">
                                            <div class="col-md-5">
                                                <label>Owner Phone</label>
                                                <input class="form-control" type="text" name="ownerPhone" readOnly value={this.state.ownerPhone} onChange={this.onChange} />
                                            </div>
                                            <div class="col-md-5">
                                                <label>Owner Address</label>
                                                <input class="form-control" type="text" name="ownerAddress" value={this.state.ownerAddress} readOnly onChange={this.onChange} />
                                            </div>
                                        </div>

                                        <div class="row mb-4">
                                            <div class="col-md-5">
                                                <label>Time Interval</label>
                                                <input class="form-control" type="text" name="timeInterval" value={this.state.timeInterval} readOnly onChange={this.onChange} />
                                            </div>
                                            <div class="col-md-5">
                                                <label>Distance Travel</label>
                                                <input class="form-control" type="text" name="distanceTravel" value={this.state.distanceTravel} readOnly onChange={this.onChange} />
                                            </div>
                                        </div> <br />

                                        <div class="row mb-10">
                                            <div class="col-md-12">
                                                <button class="btn btn-primary" type="button"><i class="fa fa-fw fa-lg fa-check-circle"></i> UPDATE</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
                {/** ------------end right bar----------------- */}
            </div >
        );
    }
}