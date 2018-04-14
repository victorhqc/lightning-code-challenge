import React, { Fragment, Component } from 'react';
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

import TestResults from '../components/TestResults';

import Container from '../atoms/Container';

const StyledContainer = Container.extend`
  height: 50vh;
  overflow: auto;
`;

const style = {
  editor: {
    width: '100%',
    height: '50vh',
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
      <Fragment>
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
        <StyledContainer>
          <TestResults code={code} testCases={activeTest.testCases} />
        </StyledContainer>
      </Fragment>
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
