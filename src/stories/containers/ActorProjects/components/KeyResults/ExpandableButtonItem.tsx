import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import React from 'react';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface ExpandableButtonItemProps {
  expanded: boolean;
  handleToggleExpand: () => void;
}

const ExpandableButtonItem: React.FC<ExpandableButtonItemProps> = ({ expanded, handleToggleExpand }) => {
  const { isLight } = useThemeContext();

  return (
    <Container onClick={handleToggleExpand}>
      <ExpandableItem>
        <Label isLight={isLight}>{expanded ? 'Collapse' : 'Expand'}</Label>
        <Line isLight={isLight} />
        <svg
          style={{ transform: `rotate(${expanded ? 180 : 0}deg)` }}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.69339 10.8631C7.85404 11.0456 8.14598 11.0456 8.30664 10.8631L12.9036 5.63952C13.1255 5.38735 12.9398 5 12.597 5H3.40306C3.06023 5 2.87451 5.38735 3.09643 5.63952L7.69339 10.8631Z"
            fill="#546978"
          />
        </svg>
      </ExpandableItem>
    </Container>
  );
};

export default ExpandableButtonItem;

const Container = styled.li(() => ({
  display: 'flex',
  alignItems: 'center',
  listStyle: 'none',
}));

const ExpandableItem = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  cursor: 'pointer',
  width: '100%',
});

const Label = styled.span<WithIsLight>(({ isLight }) => ({
  color: isLight ? '#231536' : 'red',
  fontSize: 14,
  lineHeight: '18px',
  fontWeight: 500,
}));

const Line = styled.div<WithIsLight>(({ isLight }) => ({
  width: '100%',
  height: 1,
  background: isLight ? '#D4D9E1' : 'red',
  margin: 'auto 0',
}));
