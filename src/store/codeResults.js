import autodux from 'autodux';
import PropTypes from 'prop-types';

const codeResults = autodux({
  slice: 'codeResults',
  initial: {
    updatedAt: Date.now(),
    clearedAt: null,
    testResults: {},
  },
});

export default codeResults;

export const updatedAtProps = {
  updatedAt: PropTypes.string,
};

export const clearedAtProps = {
  clearedAt: PropTypes.string,
};
