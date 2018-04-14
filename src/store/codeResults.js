import autodux from 'autodux';
import PropTypes from 'prop-types';

const codeResults = autodux({
  slice: 'codeResults',
  initial: {
    updatedAt: Date.now(),
    clearedAt: null,
    data: {
      passedTests: 0,
      ratio: 0,
      tests: [],
    },
  },
});

export default codeResults;

export const updatedAtProps = {
  updatedAt: PropTypes.number,
};

export const clearedAtProps = {
  clearedAt: PropTypes.number,
};

export const resultsProps = {
  resultsData: PropTypes.shape({
    passedTests: PropTypes.number.isRequired,
    ratio: PropTypes.number.isRequired,
    tests: PropTypes.arrayOf(PropTypes.shape()),
  }).isRequired,
};
