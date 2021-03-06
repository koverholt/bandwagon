/*
Copyright 2017 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
import React from 'react';
import UserSection from './sections/user.jsx';
import RemoteAssistanceSection from './sections/remoteAssistance.jsx';
import apiUtils from './../utils/apiUtils';

const Form = React.createClass({

  propTypes: {
    application: React.PropTypes.object.isRequired,
    onSubmitted: React.PropTypes.func.isRequired
  },

  getInitialState() {
    return {
      errorMessage: 'Error',
      isSubmitting: false,
      isSubmittingError: false
    }
  },

  handleSubmitComplete(){
    if(this.props.onSubmitted){
      this.props.onSubmitted();
    }
  },

  handleSubmitError(err){
    let errorMessage = err.responseJSON ? err.responseJSON.message : 'Unknown error';
    this.setState({
      errorMessage,
      isSubmitting: false,
      isSubmittingError: true})
  },

  makeProcessing(){
    this.setState({
      isSubmittingError: false,
      isSubmitting: true
    });
  },

  onSubmit(e){
    e.preventDefault();
    if(this.refs.userSection.isValid()){
      this.makeProcessing();

      let userData = this.refs.userSection.getData();
      let support = this.refs.remoteAssistanceSection.isEnabled();
      let data = {
        ...userData,
        support
      }

      apiUtils.post(data)
        .done(this.handleSubmitComplete)
        .fail(this.handleSubmitError)
    }
  },

  render() {
    let {
      errorMessage,
      isSubmitting,
      isSubmittingError } = this.state;

    let { application } = this.props;

    let $errorMsg = null;
    let $btnContent = <span>Finish</span>;
    let btnClass = `btn btn-primary block my-page-btn-submit ${isSubmitting ? "disabled" : ""}`;

    // show server error
    if(isSubmittingError){
      $errorMsg = <label className="error">{errorMessage}</label>
    }

    // show loading indicator inside the button
    if(isSubmitting){
      $btnContent = <i className="fa fa-cog fa-spin fa-lg" />
    }

    return (
      <div>
        <div className="my-page-header text-center">
          <div className="text-center">
            <h2>Congratulations!</h2>
            <h2 className="m-t-sm">You have successfully installed</h2>
            <h2 className="m-t-sm">
              <span>{application.name}</span> <small>ver.{application.version}</small>
            </h2>
          </div>
        </div>
        <div className="my-page-section">
          <UserSection ref="userSection"/>
        </div>
        <div className="my-page-section">
          <RemoteAssistanceSection ref="remoteAssistanceSection"/>
        </div>
        <div className="my-page-section">
          <div className="text-center">
            <a onClick={this.onSubmit} className={btnClass}>
              {$btnContent}
            </a>
            {$errorMsg}
          </div>
        </div>
      </div>
    );
  }
});

export default Form;
