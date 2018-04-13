import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import AceEditor from 'react-ace';
import { mapProps } from 'recompose';

import 'brace/mode/javascript';
import 'brace/theme/monokai';

import storeActiveTest, { activeTestProps } from '../store/activeTest';

import {
  saveToStorage,
  getFromStorage,
} from '../utils/storage';

import { Flex, Box } from '../elements/Grid';
import TestResults from '../components/TestResults';
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
      code: initialCode || props.activeTest.defaultCode,
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
      activeTest,
    } = this.props;

    const {
      defaultCode,
    } = activeTest;

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
      activeTest,
    } = this.props;

    if (!activeTest) {
      return null;
    }

    return (
      <Flex marginx="-xsmall">
        <Box width={2 / 3} marginx="xsmall">
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
        <Box width={1 / 3} marginx="xsmall">
          <TestResults code={code} testCases={activeTest.testCases} />
        </Box>
      </Flex>
    );
  }
}

TestPage.propTypes = {
  ...activeTestProps,

  get: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  activeTest: storeActiveTest.selectors.getActiveTest(state),
});

const mappedProps = mapProps(props => ({
  ...props,
  get: getFromStorage,
  save: saveToStorage,
}));

export default compose(
  mappedProps,
  connect(mapStateToProps),
)(TestPage);
