import PropTypes from 'prop-types';


export const concordShape = PropTypes.arrayOf(
  PropTypes.shape({
    "left": PropTypes.string,
    "node": PropTypes.string,
    "right": PropTypes.string,
    "sentId": PropTypes.string,
    "docId": PropTypes.string,
  }),
);
