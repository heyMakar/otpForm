import React from 'react';

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: null,
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { text } = this.state;
    const { makeSmsRequest } = this.props;
    makeSmsRequest(text);
  }

  handleInput = (e) => {
    const { value } = e.target;
    this.setState({ text: value });
  }

  renderForm() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="phone">Phone number</label>
          <input
          onChange={this.handleInput}
          type="tel"
          className="form-control"
          id="phone"
          placeholder="5(555)555-55-55"
          required/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    );
  }

  render() {
    const { isSmsRequested } = this.props;
    return (
      <>
        {!isSmsRequested && this.renderForm()}
      </>
    );
  }
};
