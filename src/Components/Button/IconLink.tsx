import React from 'react';
import { Link } from 'react-router-dom';
import IconButton, { IconButtonProps } from '@material-ui/core/IconButton';

interface IconLinkProps extends IconButtonProps {
  href: string;
}

const IconLink = (props: IconLinkProps) => (
  <IconButton color='inherit' component='a' {...props}>
    {props.children}
  </IconButton>
);

export default IconLink;
