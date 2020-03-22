import React from 'react';
import ValidationService from '../services/phoneValidation';

import PhoneForm from './PhoneForm';
import ValidateForm from './ValidateForm';
import Home from './Home';

const service = new ValidationService();

class App extends React.Component {
  state = {
    isSmsRequested: false,
    isUserValid: false,
    isSmsWrong: false,
    requestId: null,
  }

  makeSmsRequest = async (number) => {
    this.setState({ isSmsRequested: true })
    const res = await service.makeRequest(number)
    this.setState({ requestId: res });
  }

  makeCheckRequest = async (code) => {
    const { requestId } = this.state;
    const res = await service.checkRequest(requestId, code);
    if (res === 0) {
      this.setState({ isUserValid: true, isSmsWrong: false });
    } else this.setState({ isSmsWrong: true });
  }

  render() {
    const { isSmsRequested, isSmsWrong, isUserValid } = this.state;

    return (
      <div className="container">
        <PhoneForm 
        isSmsRequested={isSmsRequested}
        makeSmsRequest={this.makeSmsRequest}/>
        <ValidateForm
        isSmsRequested={isSmsRequested}
        makeCheckRequest={this.makeCheckRequest}
        isSmsWrong={isSmsWrong}
        isUserValid={isUserValid} />
        <Home isUserValid={isUserValid}/>
      </div>
    );
  }
};

export default App;
