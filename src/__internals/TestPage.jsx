import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AceEditor from 'react-ace';
import { mapProps } from 'recompose';
import { Flex, Box } from 'grid-styled';

import 'brace/mode/javascript';
import 'brace/theme/tomorrow';

import {
  saveToStorage,
  getFromStorage,
} from './utils/storage';

import TestResults from './TestResults';
import Button from './elements/Button';

const style = {
  editor: {
    width: '100%',
  },
};

const INITIAL_CODE = `// Do not edit anything outside this scope.
function test() {
    // Your code goes here. Feel free to add as many functions as you see fit.
    function parseElements() {
}

return parseElements;
}`;

class TestPage extends Component {
  constructor(props) {
    super(props);

    const initialCode = props.get('initialCode');

    this.state = {
      code: initialCode || INITIAL_CODE,
    };

    this.doChange = this.doChange.bind(this);
    this.clearCode = this.clearCode.bind(this);
  }

  doChange(code) {
    const {
      save,
    } = this.props;

    save('initialCode', code);

    this.setState({
      code,
    });
  }

  clearCode() {
    const {
      save,
    } = this.props;

    save('initialCode', '');

    this.setState({
      code: INITIAL_CODE,
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
          <br />
          <Button onClick={this.clearCode}>
            🗑 Clear code
          </Button>
        </Box>
        <Box width={1 / 2} px={2}>
          <TestResults code={code} />
        </Box>
      </Flex>
    );
  }
}

TestPage.propTypes = {
  get: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
};

const mappedProps = mapProps(props => ({
  ...props,
  get: getFromStorage,
  save: saveToStorage,
}));

export default mappedProps(TestPage);
