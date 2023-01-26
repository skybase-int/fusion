import * as React from 'react';
import { useThemeContext } from '../../../core/context/ThemeContext';
interface Props {
  width?: number;
  height?: number;
  fill?: string;
  fillDark?: string;
}

const Twitter = ({ width = 20, height = 20, fill = '#C4C4C4', fillDark = '#D1DEE6' }: Props) => {
  const { isLight } = useThemeContext();
  return (
    <svg width={width} height={height} viewBox={'0 0 21 20'} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M17.8591 0.000976562H2.14481C0.961775 0.000976562 0.00195312 0.960798 0.00195312 2.14383V17.8581C0.00195312 19.0412 0.961775 20.001 2.14481 20.001H17.8591C19.0421 20.001 20.002 19.0412 20.002 17.8581V2.14383C20.002 0.960798 19.0421 0.000976562 17.8591 0.000976562ZM15.6761 7.09026C15.685 7.21526 15.685 7.34473 15.685 7.46973C15.685 11.3403 12.7386 15.8001 7.35463 15.8001C5.69392 15.8001 4.15374 15.3179 2.8591 14.4876C3.0957 14.5144 3.32338 14.5233 3.56445 14.5233C4.93499 14.5233 6.19392 14.059 7.19838 13.2733C5.91267 13.2465 4.83231 12.4028 4.46177 11.242C4.91267 11.309 5.31892 11.309 5.7832 11.1885C4.44392 10.9162 3.43945 9.73758 3.43945 8.31348V8.27776C3.82785 8.49651 4.2832 8.63044 4.76088 8.6483C4.35929 8.38117 4.03007 8.01878 3.80261 7.59346C3.57515 7.16814 3.45652 6.69312 3.45731 6.2108C3.45731 5.66616 3.60017 5.16616 3.85463 4.73312C5.2966 6.50991 7.46177 7.67062 9.89035 7.79562C9.47517 5.80901 10.9618 4.19741 12.7475 4.19741C13.5912 4.19741 14.3502 4.55008 14.8859 5.12151C15.5466 4.99651 16.1805 4.75098 16.743 4.41615C16.5243 5.09473 16.0645 5.66616 15.4573 6.02776C16.0466 5.96526 16.618 5.80008 17.1448 5.57241C16.7475 6.15723 16.2475 6.67508 15.6761 7.09026Z"
        fill={isLight ? fill : fillDark}
      />
    </svg>
  );
};

export default Twitter;
