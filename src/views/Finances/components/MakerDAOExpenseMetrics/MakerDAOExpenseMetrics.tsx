// All comments will be removed in future PRs
import { styled } from '@mui/material';
import React from 'react';
import Card from '@/components/Card/Card';
import FinancesTitle from '@/views/Finances/components/FinancesTitle/FinancesTitle';
import type { LineChartSeriesData } from '@/views/Finances/utils/types';
import MakerDAOChartMetrics from './MakerDAOChartMetrics/MakerDAOChartMetrics';
import MakerDAOExpenseMetricsSkeleton from './MakerDAOExpenseMetricsSkeleton';
// import TitleFilterComponent from './TitleFilterComponent';
import type { CumulativeType } from './useMakerDAOExpenseMetrics';
import type { AnalyticGranularity } from '@ses/core/models/interfaces/analytic';

interface Props {
  title: string;
  handleGranularityChange: (value: AnalyticGranularity) => void;
  selectedGranularity: AnalyticGranularity;
  isCumulative: boolean;
  handleToggleCumulative: () => void;
  cumulativeType: CumulativeType;
  handleChangeCumulativeType: (value: CumulativeType) => void;
  series: LineChartSeriesData[];
  handleToggleSeries: (series: string) => void;
  year: string;
  isLoading: boolean;
}

const MakerDAOExpenseMetricsFinances: React.FC<Props> = ({
  title,
  // handleGranularityChange,
  selectedGranularity,
  isCumulative,
  // handleToggleCumulative,
  cumulativeType,
  // handleChangeCumulativeType,
  series,
  handleToggleSeries,
  year,
  isLoading,
}) => (
  <Container>
    {/* <TitleFilterComponent
      title={title}
      handleChange={handleGranularityChange}
      selectedValue={selectedGranularity}
      isCumulative={isCumulative}
      handleToggleCumulative={handleToggleCumulative}
      cumulativeType={cumulativeType}
      handleChangeCumulativeType={handleChangeCumulativeType}
    /> */}
    <FinancesTitle
      year={year}
      title={title}
      tooltip={
        <TooltipContent>
          <p>
            Explore Sky's financial evolution in detail with this advanced line chart, which offers both cumulative and
            flat perspectives on expenses.
          </p>
          <p>
            Select the 'Absolute Cumulative' mode for a continuous tally from inception, providing a comprehensive
            overview of long-term financial movements.
          </p>
          <p>
            Use the 'Relative Cumulative' mode, which resets at the start of each chosen period, to analyze expenses
            within specific intervals.
          </p>
          <p>
            Effortlessly switch between these views to discern overarching fiscal trends or to pinpoint financial
            developments specific to a quarter or year, aiding in strategic decision-making and performance assessment.
          </p>
        </TooltipContent>
      }
    />
    <div>
      {isLoading ? (
        <MakerDAOExpenseMetricsSkeleton />
      ) : (
        <MakerDAOChartMetrics
          year={year}
          selectedGranularity={selectedGranularity}
          series={series}
          handleToggleSeries={handleToggleSeries}
          isCumulative={isCumulative}
          cumulativeType={cumulativeType}
        />
      )}
    </div>
  </Container>
);

export default MakerDAOExpenseMetricsFinances;

const Container = styled(Card)(({ theme }) => ({
  width: '100%',
  padding: '8px 8px 16px',

  [theme.breakpoints.up('tablet_768')]: {
    padding: 16,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    padding: '16px 24px 24px',
  },
}));

const TooltipContent = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,

  p: {
    margin: 0,
  },
});