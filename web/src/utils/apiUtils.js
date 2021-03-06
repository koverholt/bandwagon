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
import $ from 'jquery';

let apiUtils = {

  post(data){
    let cfg = {
      url: 'api/complete',
      type: 'POST',
      dataType: 'json',
      data: JSON.stringify(data)
    };

    return $.ajax(cfg);
  },

  init() {
    let cfg = {
      url: 'api/info',
      type: 'GET',
      dataType: 'json'
    }

    return $.ajax(cfg).then(createInfo);
  }
}

function createInfo(json){
  let { endpoints, app={} } = json;

  endpoints = endpoints || [];

  let application = {
    name: app.name || 'Application',
    version: app.version
  };

  endpoints = endpoints.map(item => {
    let { name, description, addresses } = item;
    addresses = addresses || [];
    let urls = addresses.map( addr => addr);
    return {
      name,
      description,
      urls
    }
  });

  return { endpoints, application };
}

export default apiUtils;
