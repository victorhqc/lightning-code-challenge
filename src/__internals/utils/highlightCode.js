import hljs from 'highlight.js';
import map from 'lodash/map';

const highlightCode = () => {
  const codeBlocks = document.getElementsByClassName('language-js');
  map(codeBlocks, codeBlock => hljs.highlightBlock(codeBlock));
};

export default highlightCode;
