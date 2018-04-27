import React from 'react';
import PropTypes from 'prop-types';
import MUIAvatar from 'material-ui/Avatar';

import titleInitials from '../utils/title-initials';
import getColor from '../utils/color-from';

const Avatar = ({ colorFrom, children, ...rest }) => (
  <MUIAvatar style={{ backgroundColor: getColor(colorFrom) }} {...rest}>
    {titleInitials(children)}
  </MUIAvatar>
);

Avatar.propTypes = {
  colorFrom: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

export default Avatar;
