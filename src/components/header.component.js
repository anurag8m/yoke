import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import $ from "jquery";
import Popper from "popper.js";
import jwt_decode from 'jwt-decode';

class Header extends Component {

    constructor() {
        super();
        this.state = {
            name: ""
        }
        this._handleClick = this._handleClick.bind(this);
    }

    componentDidMount() {
        const token = localStorage.usertoken;

        const decoded = jwt_decode(token);
        console.log(decoded);
        this.setState({
            name: decoded.name
        })
        this._handleClick();
    }


    _handleClick = () => {
        var treeviewMenu = $('.app-menu');

        // Toggle Sidebar
        $('[data-toggle="sidebar"]').click(function (event) {
            event.preventDefault();
            $('.app').toggleClass('sidenav-toggled');
        });

        // Activate sidebar treeview toggle
        $("[data-toggle='treeview']").click(function (event) {
            event.preventDefault();
            if (!$(this).parent().hasClass('is-expanded')) {
                treeviewMenu.find("[data-toggle='treeview']").parent().removeClass('is-expanded');
            }
            $(this).parent().toggleClass('is-expanded');
        });

        // Set initial active toggle
        $("[data-toggle='treeview.'].is-expanded").parent().toggleClass('is-expanded');

        //Activate bootstrip tooltips
        $("[data-toggle='tooltip']").tooltip();
    }
    logOut(e) {
        e.preventDefault();
        localStorage.removeItem("usertoken");
        this.props.history.push("/");
    }

    render() {


        // const loginRegLink = (
        //     <ul className="navbar-nav">
        //         <li className="nav-item">
        //             <a className="nav-link" href="#">
        //                 <Link to="/login">Login</Link>
        //             </a>
        //         </li>
        //         <li className="nav-item">
        //             <a className="nav-link" href="#">
        //                 <Link to="/register">Register</Link>
        //             </a>
        //         </li>
        //     </ul>
        // );

        // const userLink = (
        //     <ul className="navbar-nav">
        //         <li className="nav-item">
        //             <a className="nav-link" href="#">
        //                 <Link to="/profile">User</Link>
        //             </a>
        //         </li>
        //         <li className="nav-item">
        //             <a href="" onClick={this.logOut.bind(this)} className="nav-link">
        //                 Logout
        //   </a>
        //         </li>
        //     </ul>
        // );
        return (
            <div className="">
                <header className="app-header"><a className="app-header__logo" href="index.html">YOKE</a>
                    <a className="app-sidebar__toggle" href="#" data-toggle="sidebar" aria-label="Hide Sidebar"></a>

                    <ul className="app-nav">

                        <li className="dropdown"><a className="app-nav__item" href="#" data-toggle="dropdown" aria-label="Show notifications"><i className="fa fa-bell-o fa-lg"></i></a>
                            <ul className="app-notification dropdown-menu dropdown-menu-right">
                                <li className="app-notification__title">You have 4 new notifications.</li>
                                <div className="app-notification__content">
                                    <li><a className="app-notification__item" href="javascript:;"><span className="app-notification__icon"><span className="fa-stack fa-lg"><i className="fa fa-circle fa-stack-2x text-primary"></i><i className="fa fa-envelope fa-stack-1x fa-inverse"></i></span></span>
                                        <div>
                                            <p className="app-notification__message">Lisa sent you a mail</p>
                                            <p className="app-notification__meta">2 min ago</p>
                                        </div></a></li>
                                    <li><a className="app-notification__item" href="javascript:;"><span className="app-notification__icon"><span className="fa-stack fa-lg"><i className="fa fa-circle fa-stack-2x text-danger"></i><i className="fa fa-hdd-o fa-stack-1x fa-inverse"></i></span></span>
                                        <div>
                                            <p className="app-notification__message">Mail server not working</p>
                                            <p className="app-notification__meta">5 min ago</p>
                                        </div></a></li>
                                    <li><a className="app-notification__item" href="javascript:;"><span className="app-notification__icon"><span className="fa-stack fa-lg"><i className="fa fa-circle fa-stack-2x text-success"></i><i className="fa fa-money fa-stack-1x fa-inverse"></i></span></span>
                                        <div>
                                            <p className="app-notification__message">Transaction complete</p>
                                            <p className="app-notification__meta">2 days ago</p>
                                        </div></a></li>
                                    <div className="app-notification__content">
                                        <li><a className="app-notification__item" href="javascript:;"><span className="app-notification__icon"><span className="fa-stack fa-lg"><i className="fa fa-circle fa-stack-2x text-primary"></i><i className="fa fa-envelope fa-stack-1x fa-inverse"></i></span></span>
                                            <div>
                                                <p className="app-notification__message">Lisa sent you a mail</p>
                                                <p className="app-notification__meta">2 min ago</p>
                                            </div></a></li>
                                        <li><a className="app-notification__item" href="javascript:;"><span className="app-notification__icon"><span className="fa-stack fa-lg"><i className="fa fa-circle fa-stack-2x text-danger"></i><i className="fa fa-hdd-o fa-stack-1x fa-inverse"></i></span></span>
                                            <div>
                                                <p className="app-notification__message">Mail server not working</p>
                                                <p className="app-notification__meta">5 min ago</p>
                                            </div></a></li>
                                        <li><a className="app-notification__item" href="javascript:;"><span className="app-notification__icon"><span className="fa-stack fa-lg"><i className="fa fa-circle fa-stack-2x text-success"></i><i className="fa fa-money fa-stack-1x fa-inverse"></i></span></span>
                                            <div>
                                                <p className="app-notification__message">Transaction complete</p>
                                                <p className="app-notification__meta">2 days ago</p>
                                            </div></a></li>
                                    </div>
                                </div>
                                <li className="app-notification__footer"><a href="#">See all notifications.</a></li>
                            </ul>
                        </li>
                        <li className="dropdown"><a className="app-nav__item" href="#" data-toggle="dropdown" aria-label="Open Profile Menu"><i className="fa fa-user fa-lg"></i></a>
                            <ul className="dropdown-menu settings-menu dropdown-menu-right">
                                <li><a className="dropdown-item" ><i className="fa fa-cog fa-lg"></i> Settings</a></li>
                                <li><Link to="/myprofile" className="dropdown-item"><i className="fa fa-user fa-lg"></i> Profile</Link></li>
                                <li><a className="dropdown-item" href="" onClick={this.logOut.bind(this)} >
                                    <i className="fa fa-sign-out fa-lg"></i>Logout
          </a></li>
                            </ul>
                        </li>
                    </ul>
                </header>
                {/** -------side bar--------------------------- */}
                <div className="app-sidebar__overlay" data-toggle="sidebar"></div>
                <aside className="app-sidebar">
                    <div className="app-sidebar__user"><img className="app-sidebar__user-avatar" src="https://s3.amazonaws.com/uifaces/faces/twitter/jsa/48.jpg" alt="User Image" />
                        <div>
                            <p className="app-sidebar__user-name">{this.state.name}</p>
                        </div>
                    </div>
                    <ul className="app-menu">
                        <li><Link to="/dashboard" className="app-menu__item"><i className="app-menu__icon fa fa-dashboard"></i><span className="app-menu__label">Create Dashbaord</span></Link></li>
                        <li><Link to="/createemployee" className="app-menu__item"><i className="app-menu__icon fa fa-address-book"></i><span class="app-menu__label"> Create Employee</span></Link></li>
                        <li><Link to="/createemployee" className="app-menu__item"><i className="app-menu__icon fa fa-address-book"></i><span class="app-menu__label"> Create Team</span></Link></li>


                    </ul>
                </aside>
                {/** ------------end side bar----------------- */}

            </div>
        );
    }
}

export default withRouter(Header);