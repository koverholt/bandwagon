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

const MSG_ERROR_DEFAULT = 'Whoops, something went wrong.';

const PageIndicator = React.createClass({

  render() {
    let { isLoading, isError } = this.props;

    if(isError){
      return (
        <div className="my-page-indicator-error">
          <div><i className="fa fa-frown-o"></i> </div>
          <h1>{MSG_ERROR_DEFAULT}</h1>
        </div>
      )
    }

    if(isLoading){
      return (
        <div className="my-page-indicator sk-spinner sk-spinner-three-bounce">
          <div className="sk-bounce1" />
          <div className="sk-bounce2" />
          <div className="sk-bounce3" />
        </div>
      );
    }

    return <div>{this.props.children}</div>;
  }

});

export {
  PageIndicator
}
