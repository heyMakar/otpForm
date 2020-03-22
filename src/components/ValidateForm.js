import React from 'react';

export default class ValidateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: null
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { code } = this.state;
    const { makeCheckRequest } = this.props;
    makeCheckRequest(code);
  }

  handleChange = (e) => {
    const text = e.target.value;
    this.setState({ code: text });
  }

  renderValidationInput() {
    const { isSmsRequested, isSmsWrong, isUserValid } = this.props;
    if (!isSmsRequested) return null;
    if (isUserValid) return null;
    const noValidMsg = <p>Wrong PIN, try again</p>
    const input = (
      <>
      <form onSubmit={this.handleSubmit}>
        <input 
        onChange={this.handleChange}
        type="tel" name="pin" 
        placeholder="1234" 
        required />
        <input type="submit" value="Verify PIN"/>
      </form>
      {isSmsWrong && noValidMsg}
      </>
    )
    return input;
  }

  render() {
    return (
      <>
        {this.renderValidationInput()}
      </>
    );
  }
}