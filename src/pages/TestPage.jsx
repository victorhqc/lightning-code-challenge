import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import AceEditor from 'react-ace';
import { mapProps } from 'recompose';

import 'brace/mode/javascript';
import 'brace/theme/monokai';

import storeActiveTest, { activeTestProps } from '../store/activeTest';
import codeResults, { clearedAtProps } from '../store/codeResults';

import {
  saveToStorage,
  getFromStorage,
} from '../utils/storage';

import { Flex, Box } from '../elements/Grid';
import TestResults from '../components/TestResults';

const StyledFlex = Flex.extend`
  height: 100%;
`;

const StyledBox = Box.extend`
  height: 100%;
  overflow: auto;
`;

const style = {
  editor: {
    width: '100%',
    height: '100%',
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

  componentWillReceiveProps(nextProps) {
    const {
      clearedAt,
    } = this.props;

    if (clearedAt !== nextProps.clearedAt) {
      this.clearCode();
    }
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
      <StyledFlex>
        <Box width={2 / 3}>
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
        </Box>
        <StyledBox width={1 / 3} >
          <TestResults code={code} testCases={activeTest.testCases} />
        </StyledBox>
      </StyledFlex>
    );
  }
}

TestPage.propTypes = {
  ...activeTestProps,
  ...clearedAtProps,

  get: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  activeTest: storeActiveTest.selectors.getActiveTest(state),
  clearedAt: codeResults.selectors.getClearedAt(state),
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
