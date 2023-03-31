import styled from '@emotion/styled';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';

interface ContainerProps extends React.PropsWithChildren {
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className }) => (
  <ContainerStyled className={className}>{children}</ContainerStyled>
);

export default Container;

const ContainerStyled = styled.div({
  paddingLeft: 16,
  paddingRight: 16,
  width: '100%',
  maxWidth: '100%',

  [lightTheme.breakpoints.up('table_834')]: {
    paddingLeft: 32,
    paddingRight: 32,
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: 0,
    paddingRight: 0,
    maxWidth: 1130,
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    maxWidth: 1184,
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    maxWidth: 1312,
  },
});