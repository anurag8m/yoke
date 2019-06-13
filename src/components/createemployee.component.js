import React, { Component } from "react";
import FooterPage from "./footer.component.js";
import HeaderPage from "./header.component.js";
import '../dashboard/dashboard.css';
import axios from 'axios';
import LoadingSpinner from './loadingspinner.component.js';
import $ from "jquery";
import Popper from "popper.js";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import jwt_decode from 'jwt-decode';

export default class CreateEmployeePage extends Component {
    constructor() {
        super();

        this.state = {
            show: false,
            loading: false,
            department: [],
            selectedDepartment: "",
            validationError: "",
            companyId: ""
        };

        this.handleShow = () => {
            this.setState({ show: true });
        };

        this.handleHide = () => {
            this.setState({ show: false });
        };
    }

    componentWillMount() {
        const token = localStorage.usertoken;
        const decoded = jwt_decode(token);
        this.setState({
            companyId: decoded.companyId
        })
    }
    componentDidMount() {
        var handle = this.state.companyId;

        var apiUrl = `/viewDept/${handle}`;

        let initialPlanets = [];
        fetch(apiUrl)
            .then(response => {
                return response.json();
            }).then(data => {
                let teamsFromApi = data.departmentsFound.map(team => { return { value: team.companyId, display: team.departmentName } })
                console.log(teamsFromApi);
                this.setState({ department: teamsFromApi });
            }).catch(error => {
                console.log(error);
            });

    }

    render() {
        const { loading } = this.state;
        return (
            <div className="app sidebar-mini rtl">
                <HeaderPage />
                <div className="app-content">
                    <div className="app-title">
                        <div>
                            <h1><i className="fa fa-dashboard"></i> Add Employee</h1>
                            {/* <p>A free and open source Bootstrap 4 admin template</p> */}
                        </div>
                        <ul className="app-breadcrumb breadcrumb">
                            <li className="breadcrumb-item"><i className="fa fa-home fa-lg"></i></li>
                            <li className="breadcrumb-item"><a href="#">Add Employee</a></li>
                        </ul>
                    </div>

                    {/** ------------start data table----------------- */}
                    <div className="row">
                        <div className="col-md-12">
                            <div className="tile addemployeeTile">

                                <form onSubmit={this.onSubmit}>

                                    <div className="input-class-field employeeAdd">
                                        <div className="row">
                                            <div className="offset-sm-1 col-md-5">
                                                <div className="form-group">
                                                    <label htmlFor="email"><b>Email</b></label>
                                                    <div className="input-group">
                                                        <span className="input-group-addon">
                                                            <span className="glyphicon glyphicon-envelope" />
                                                        </span>
                                                        <input
                                                            type="email"
                                                            className='form-control'
                                                            id="email"
                                                            name="email"
                                                            placeholder="anyone@example.com"
                                                            required="required"
                                                            value={this.state.email}
                                                        />

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-5">
                                                <div className="form-group">
                                                    <label htmlFor="password"><b>Password</b></label>
                                                    <div className="input-group">
                                                        <span className="input-group-addon">
                                                            <span className="glyphicon glyphicon-envelope" />
                                                        </span>
                                                        <input
                                                            type="password"
                                                            className='form-control'
                                                            id="password"
                                                            name="password"
                                                            placeholder="********"
                                                            required="required"
                                                            value={this.state.password}
                                                        />

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="offset-sm-1 col-md-5">
                                                <div className="form-group">
                                                    <label htmlFor="name"><b>Name</b></label>
                                                    <div className="input-group">
                                                        <span className="input-group-addon">
                                                            <span className="glyphicon glyphicon-envelope" />
                                                        </span>
                                                        <input
                                                            type="text"
                                                            className='form-control'
                                                            id="name"
                                                            name="name"
                                                            placeholder=""
                                                            required="required"
                                                            value={this.state.name}
                                                        />

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-5">
                                                <div className="form-group">
                                                    <label htmlFor="phone"><b>Phone</b></label>
                                                    <div className="input-group">
                                                        <span className="input-group-addon">
                                                            <span className="glyphicon glyphicon-envelope" />
                                                        </span>
                                                        <input
                                                            type="text"
                                                            className='form-control'
                                                            id="phone"
                                                            name="phone"
                                                            placeholder=""
                                                            required="required"
                                                            value={this.state.phone}
                                                        />

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="offset-sm-1 col-md-5">
                                                <div className="form-group">
                                                    <label htmlFor="employeeid"><b>Employee ID</b></label>
                                                    <div className="input-group">
                                                        <span className="input-group-addon">
                                                            <span className="glyphicon glyphicon-envelope" />
                                                        </span>
                                                        <input
                                                            type="text"
                                                            className='form-control'
                                                            id="employeeid"
                                                            name="employeeid"
                                                            placeholder=""
                                                            required="required"
                                                            value={this.state.employeeid}
                                                        />

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-5">
                                                <div className="form-group">
                                                    <label htmlFor="dateofjoining"><b>Date of Joining</b></label>
                                                    <div className="input-group">
                                                        <span className="input-group-addon">
                                                            <span className="glyphicon glyphicon-envelope" />
                                                        </span>
                                                        <input
                                                            type="date"
                                                            className='form-control'
                                                            id="dateofjoining"
                                                            name="dateofjoining"
                                                            placeholder=""
                                                            required="required"
                                                            value={this.state.dateofjoining}
                                                        />

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="offset-sm-1 col-md-5">
                                                <div className="form-group">
                                                    <label htmlFor="department"><b>Department</b></label>
                                                    <div className="input-group">
                                                        <span className="input-group-addon">
                                                            <span className="glyphicon glyphicon-envelope" />
                                                        </span>
                                                        <select className="form-control" onChange={(e) => this.setState({ selectedDepartment: e.target.value, validationError: e.target.value === "" ? "You must select your Department" : "" })}>
                                                            <option value="">Please Select Department</option>
                                                            {this.state.department.map((team) => <option key={team.value} value={team.value}>{team.display}</option>)}
                                                        </select>
                                                        <div style={{ color: 'red', marginTop: '5px' }}>
                                                            {this.state.validationError}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-5">
                                                <div className="form-group">
                                                    <label htmlFor="designation"><b>Designation</b></label>
                                                    <div className="input-group">
                                                        <span className="input-group-addon">
                                                            <span className="glyphicon glyphicon-envelope" />
                                                        </span>
                                                        <input
                                                            type="text"
                                                            className='form-control'
                                                            id="designation"
                                                            name="designation"
                                                            placeholder=""
                                                            required="required"
                                                            value={this.state.designation}
                                                        />

                                                    </div>
                                                </div>
                                            </div>
                                        </div><br />
                                        <div className="row">
                                            <div className="offset-sm-1 col-md-5">
                                                <div className="form-group">
                                                    <label htmlFor="fgh">
                                                        Is Active ? <input className="" type="checkbox" style={{ marginLeft: '10px' }} />
                                                    </label>



                                                </div>
                                            </div>
                                            <div className="col-md-5">
                                                <div className="form-group">
                                                    <a variant="primary" onClick={this.handleShow} style={{ cursor: 'pointer', fontWeight: '700', fontSize: '16px' }}><b>Choose Employee Under Him/Her</b></a>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="offset-sm-1 col-md-3">
                                                <div className="form-group">
                                                    <button
                                                        type="submit"
                                                        className="btn btn-primary btn-lg"
                                                        id="btnContactUs"
                                                    >
                                                        {loading ? <LoadingSpinner /> : "Add Employee"}
                                                    </button>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                </form>
                            </div>

                        </div>
                    </div>
                    {/** ------------end data table----------------- */}


                    <Modal
                        show={this.state.show}
                        onHide={this.handleHide}
                        dialogClassName="modal-90w"
                        aria-labelledby="example-custom-modal-styling-title"
                        centered
                        size="lg"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="example-custom-modal-styling-title">
                                Select Employee
            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <table className="table table-hover table-bordered" id="sampleTable">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Employee ID</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Tiger Nixon</td>
                                        <td>24</td>
                                        <td><input className="" type="checkbox" /></td>

                                    </tr>
                                    <tr>
                                        <td>Garrett Winters</td>
                                        <td>63</td>
                                        <td><input className="" type="checkbox" /></td>

                                    </tr>
                                    <tr>
                                        <td>Ashton Cox</td>
                                        <td>66</td>
                                        <td><input className="" type="checkbox" /></td>

                                    </tr>
                                </tbody>
                            </table>
                            <div className="form-group">
                                <button
                                    type="submit"
                                    className="btn btn-primary pull-right"
                                    id="btnContactUs"
                                    onClick={this.handleHide}
                                >
                                    DONE
                                                    </button><br /><br />

                            </div>
                        </Modal.Body>
                    </Modal>
                </div >
            </div>
        );
    }
}