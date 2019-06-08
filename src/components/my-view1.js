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
      accounts: { type: String },
      account: { type: Object }
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
        <h2>Login and Profile page</h2>
        <p>Your Ethereum Address ${this.account}</p>
        ${this.accounts == 'You need to log in...'?
      html`<button @click="${this._enableEthereum}">Login Ethereum</button>
        `
      :html`<button @click="${this._enable3box}">Login 3box</button>`}
        
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

  async _enableEthereum() {
    try {
      this.accounts = await window.ethereum.enable();      
    } catch (error) {
      console.log(error)
    }
  }
  async _enable3box() {
    try {
      this.account = await window.Box.getProfile(accounts[0])
    } catch (error) {
      console.log(error)
    }
    
  }
}

window.customElements.define('my-view1', MyView1);
