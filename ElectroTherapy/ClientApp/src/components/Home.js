import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
        <h2>About this project</h2>
          <h4>Notes</h4>
        <ul>
            <li>For prompting user to admin set <i>isAdmin</i> column manually in dB to true</li>
            <li>To add <b>discounts</b>, sign in as an <b>admin user</b> role and it will be available in <b>products page</b></li>
            <li>To <b>order</b> produts, sign in as a <b>customer user</b> role and it will be available in <b>products page</b></li>

        </ul>
          <h4>Assumptions</h4>
          <ul>
              <li>As given by the exercise prompt each order can only consist of one product of any quantity</li>
              <li>Total order price is stored in the database, contrary to calculated, in case of future price change</li>
              <li>If a discount was added to a product with a specific quantity, a flat discount rate will apply for specified quantity or higher</li>
          </ul>

          <h4>Future Imrpovements</h4>
          <ul>
              <li>Hashing and salting passwords in database</li>
              <li>Bi-lingiual support using global resource files in .Net</li>
              <li>Respecting Authentication in backend APIs</li>
          </ul>
      </div>
    );
  }
}
