import React from 'react';
import MUIAvatar from 'material-ui/Avatar';

import titleInitials from '../utils/title-initials';
import getColor from '../utils/color-from';

const Avatar = ({ colorFrom, children, ...rest }) => (
	<MUIAvatar style={{ backgroundColor: getColor(colorFrom) }} {...rest}>
		{titleInitials(children)}
	</MUIAvatar>
);

export default Avatar;
