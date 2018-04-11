import React, { Component, Fragment } from 'react';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/theme/tomorrow';

import TestResults from './TestResults';

class TestPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      code: `function runTest() {
    // Your code goes here.
}`,
    };

    this.doChange = this.doChange.bind(this);
  }

  doChange(code) {
    this.setState({
      code,
    });
  }

  render() {
    const {
      code,
    } = this.state;

    return (
      <Fragment>
        <TestResults code={code} />
        <AceEditor
          onChange={this.doChange}
          value={code}
          mode="javascript"
          theme="tomorrow"
        />
      </Fragment>
    );
  }
}
export default TestPage;
