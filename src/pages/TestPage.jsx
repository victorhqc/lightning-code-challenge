import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AceEditor from 'react-ace';
import { mapProps } from 'recompose';
import { Flex, Box } from 'grid-styled';

import 'brace/mode/javascript';
import 'brace/theme/monokai';

import {
  saveToStorage,
  getFromStorage,
} from '../utils/storage';

import TestResults from '../components/TestResults';
import Container from '../elements/Container';
import Button from '../elements/Button';

const style = {
  editor: {
    width: '100%',
  },
};

class TestPage extends Component {
  constructor(props) {
    super(props);

    const initialCode = props.get(props.path);

    this.state = {
      code: initialCode || props.defaultCode,
    };

    this.doChange = this.doChange.bind(this);
    this.clearCode = this.clearCode.bind(this);
  }

  doChange(code) {
    const {
      save,
      path,
    } = this.props;

    save(path, code);

    this.setState({
      code,
    });
  }

  clearCode() {
    const {
      save,
      path,
      defaultCode,
    } = this.props;

    save(path, '');

    this.setState({
      code: defaultCode,
    });
  }

  render() {
    const {
      code,
    } = this.state;

    const {
      testCases,
    } = this.props;

    return (
      <Container>
        <Flex>
          <Box width={2 / 3} px={2}>
            <AceEditor
              style={style.editor}
              onChange={this.doChange}
              value={code}
              setOptions={{
                spellcheck: false,
              }}
              mode="javascript"
              theme="monokai"
            />
            <br />
            <Button onClick={this.clearCode} color="red">
              🗑 Clear code
            </Button>
          </Box>
          <Box width={1 / 3} px={2}>
            <TestResults code={code} testCases={testCases} />
          </Box>
        </Flex>
      </Container>
    );
  }
}

TestPage.propTypes = {
  defaultCode: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  testCases: PropTypes.func.isRequired,

  get: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
};

const mappedProps = mapProps(props => ({
  ...props,
  get: getFromStorage,
  save: saveToStorage,
}));

export default mappedProps(TestPage);
