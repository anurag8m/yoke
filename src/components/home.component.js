import React, { Component } from 'react';
import '../App.css';
import FooterPage from './footer.component.js';

export default class HomePage extends Component {
    render() {
        return (
            <div>
                <div className="container-fluid bg-1 text-center">
                    <h3 className="margin">Who Am I?</h3>
                    <img src="https://www.w3schools.com/bootstrap/bird.jpg" className="img-responsive img-circle margin" />
                    <h3>I'm an adventurer</h3>
                </div>
                <div className="container-fluid bg-2 text-center">
                    <h3 className="margin">What Am I?</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                    <a href="#" className="btn btn-default btn-lg">
                        <span className="glyphicon glyphicon-search"></span> Search
            </a>
                </div>

                <div className="container-fluid bg-3 text-center">
                    <h3 className="margin">Where To Find Me?</h3><br />
                    <div className="row">
                        <div className="col-sm-4">
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            <img src="https://www.w3schools.com/bootstrap/birds1.jpg" className="img-responsive margin img-new" alt="Image" />
                        </div>
                        <div className="col-sm-4">
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            <img src="https://www.w3schools.com/bootstrap/birds2.jpg" className="img-responsive margin img-new" alt="Image" />
                        </div>
                        <div className="col-sm-4">
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            <img src="https://www.w3schools.com/bootstrap/birds3.jpg" className="img-responsive margin img-new" alt="Image" />
                        </div>
                    </div>
                </div>
                <FooterPage />
            </div>

        );
    }
}


