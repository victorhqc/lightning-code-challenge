import autodux from 'autodux';
import PropTypes from 'prop-types';

const codeResults = autodux({
  slice: 'codeResults',
  initial: {
    updatedAt: Date.now(),
    testResults: {},
  },
});

export default codeResults;

export const updatedAtProps = {
  updatedAt: PropTypes.string,
};
