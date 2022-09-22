import React, { CSSProperties } from 'react';
import styled from '@emotion/styled';
import { useThemeContext } from '../../../core/context/ThemeContext';

interface CustomButtonProps {
  label: string | JSX.Element;
  className?: string;
  disabled?: boolean;
  style?: CSSProperties;
  onClick?: () => void;
  widthText?: string;
  styleText?: CSSProperties;
  isHightLight?: boolean;
}

export const CustomButton = ({ isHightLight = false, ...props }: CustomButtonProps) => {
  const isLight = useThemeContext().themeMode === 'light';
  return (
    <Container
      className={props.className}
      isLight={isLight}
      type="button"
      disabled={props.disabled}
      onClick={props.onClick}
      style={props.style}
      isHightLight={isHightLight}
    >
      <Text
        isLight={isLight}
        className={props.disabled ? 'disabled' : ''}
        width={props.widthText}
        style={props.styleText}
      >
        {props.label}
      </Text>
    </Container>
  );
};

const Container = styled.button<{ isLight: boolean; isHightLight: boolean }>(({ isLight, isHightLight }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 'fit-content',
  height: '48px',
  border: isLight
    ? isHightLight
      ? '1px solid #1AAB9B'
      : '1px solid #D4D9E1'
    : isHightLight
    ? '1px solid #787A9B'
    : '1px solid #343442',
  borderRadius: isLight ? '22px' : '22px',
  background: isLight ? 'white' : '#10191F',
  transition: 'all .3s ease',
  transitionProperty: 'border, color',
  padding: '15px 16px',
  boxSizing: 'border-box',
  cursor: 'pointer',
  color: isLight ? '#231536' : '#E2D8EE',
  '&:hover:not(:disabled)': {
    borderColor: '#231536',
  },
  '.disabled': {
    color: isLight ? '#9FAFB9' : '#48495F',
  },
}));

const Text = styled.div<{ width?: string; isLight: boolean }>(({ width = 'fit-content', isLight }) => ({
  fontSize: '14px',
  fontFamily: 'SF Pro Text, sans-serif',
  fontStyle: 'normal',
  fontWeight: 500,
  color: isLight ? '#231536' : '#D2D4EF',
  whiteSpace: 'nowrap',
  width,
}));
