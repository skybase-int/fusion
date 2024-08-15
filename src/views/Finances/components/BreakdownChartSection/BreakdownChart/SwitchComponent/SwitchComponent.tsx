import { styled, Switch } from '@mui/material';
import React from 'react';
import type { SwitchProps } from '@mui/material';
import type { FC } from 'react';

interface Props {
  isChecked: boolean;
  handleChangeSwitch: () => void;
}

const SwitchComponent: FC<Props> = ({ isChecked, handleChangeSwitch }) => (
  <Container onClick={handleChangeSwitch}>
    <IOSSwitchStyled checked={isChecked} />
  </Container>
);

export default SwitchComponent;

const IOSSwitchStyled = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 21,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 1.5,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(20px)',
      color: '#FCFCFC',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.isLight ? theme.palette.colors.blue[900] : '#65C466',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',

    width: 18,
    height: 18,
  },
  '& .MuiSwitch-track': {
    borderRadius: 24,

    backgroundColor: theme.palette.mode === 'light' ? '#9EA0A1' : 'red',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
  '& .MuiSwitch-input': {},
}));

const Container = styled('div')({
  cursor: 'pointer',
});
