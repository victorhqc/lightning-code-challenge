import React, { Component } from 'react';
import AceEditor from 'react-ace';
import { Flex, Box } from 'grid-styled';

import 'brace/mode/javascript';
import 'brace/theme/tomorrow';

import TestResults from './TestResults';

const style = {
  editor: {
    width: '100%',
  },
};

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
      <Flex>
        <Box width={1 / 2} px={2}>
          <AceEditor
            style={style.editor}
            onChange={this.doChange}
            value={code}
            mode="javascript"
            theme="tomorrow"
          />
        </Box>
        <Box width={1 / 2} px={2}>
          <TestResults code={code} />
        </Box>
      </Flex>
    );
  }
}

export default TestPage;
