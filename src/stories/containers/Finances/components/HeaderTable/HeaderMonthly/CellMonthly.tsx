import styled from '@emotion/styled';
import { returnShortNameForMetric } from '@ses/containers/Finances/utils/utils';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { usLocalizedNumber } from '@ses/core/utils/humanization';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import type { MetricsWithAmount } from '@ses/containers/Finances/utils/types';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  metrics: MetricsWithAmount[];
  title: string;
  isTotal?: boolean;
  className?: string;
}

export const CellMonthly: React.FC<Props> = ({ metrics, title, isTotal = false, className }) => {
  const { isLight } = useThemeContext();
  return (
    <ContainerCell isLight={isLight} isTotal={isTotal} className={className}>
      <Month isLight={isLight}>{title}</Month>
      {metrics?.map((metric, index) => (
        <Metrics key={index}>
          <Name isLight={isLight}>{returnShortNameForMetric(metric).name}</Name>
          <Amount isLight={isLight}>{usLocalizedNumber(metric.amount)}</Amount>
        </Metrics>
      ))}
    </ContainerCell>
  );
};

export default CellMonthly;

const ContainerCell = styled.div<WithIsLight & { isTotal: boolean }>(({ isLight, isTotal }) => ({
  fontFamily: 'Inter, sans-serif',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  color: isLight ? '#231536' : '#D2D4EF',

  fontWeight: 500,
  backgroundColor: isLight ? (isTotal ? 'rgba(209, 222, 230, 0.50)' : 'transparent') : isTotal ? '#374752' : '#405361',
  ...(isTotal && {
    padding: '16px 0px 16px 0px',
  }),
}));

const Month = styled.div<WithIsLight>(({ isLight }) => ({
  color: isLight ? '#231536' : '#D2D4EF',
  textAlign: 'center',
  fontFamily: 'Inter, sans-serif',
  fontSize: 18,
  fontStyle: 'normal',
  fontWeight: 500,
  lineHeight: 'normal',
  marginBottom: 8,
}));

const Metrics = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: 70.5,
});
const Name = styled.div<WithIsLight>({
  marginBottom: 4,
  fontSize: 11,
  fontWeight: 500,
  textAlign: 'center',
  fontStyle: 'normal',
  lineHeight: 'normal',
  color: '#708390',
  [lightTheme.breakpoints.up('desktop_1024')]: {
    textAlign: 'center',
  },
  [lightTheme.breakpoints.up('desktop_1920')]: {
    marginBottom: 2,
  },
});
const Amount = styled.div<WithIsLight>(({ isLight }) => ({
  color: isLight ? '#231536' : '#D2D4EF',
  fontSize: 12,
  fontWeight: 600,
  textAlign: 'center',
}));