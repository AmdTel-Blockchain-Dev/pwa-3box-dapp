/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { html } from 'lit-element';
import { PageViewElement } from './page-view-element.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';

class MyView1 extends PageViewElement {

  static get properties() {
    return {
      account: String
    }
  }

  constructor() {
    super();

    this.account='no-account'
  }
  static get styles() {
    return [
      SharedStyles
    ];
  }

  render() {
    return html`
      <section>
        <h2>Static page</h2>
        <p>Your Ethereum Address ${this.account}</p>
        <button>Login Ethereum</button>
        <button>Login 3box</button>
      </section>
    `;
  }

  firstUpdated() {
    if (typeof window.ethereum !== 'undefined' || typeof window.web3 !== 'undefined') {
      //Use Mist/MetaMask's provider
      this.ethProvider = window['ethereum'] || window.web3.currentProvider;
      if (typeof this.ethProvider.selectedAddress !== 'undefined') {
        this.account = this.ethProvider.selectedAddress
      } else {
        this.account = 'You need to log in...'
      };
    } else {
      console.log('No web3! You will need to install MetaMask!')
    }
  }

  _enableEthereum() {
    window.ethereum.enable()
    .then(function (accounts) {
      this.account =  accounts[0];
    })
    .catch(function (reason) {
      console.log(reason)
    })
  }
}

window.customElements.define('my-view1', MyView1);
