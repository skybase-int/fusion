import * as React from 'react';
import { useThemeContext } from '../../../core/context/ThemeContext';

interface Props {
  width?: number;
  height?: number;
  fill?: string;
  fillDark?: string;
}

const VotingPortal = ({ width = 110, height = 28, fill = '#211634', fillDark = '#D2D4EF', ...props }: Props) => {
  const isLight = useThemeContext().themeMode === 'light';

  return (
    <svg width={width} height={height} viewBox="0 0 110 28" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 0a6 6 0 00-6 6v16a6 6 0 006 6h98a6 6 0 006-6V6a6 6 0 00-6-6H6zm12.64 7.727L14.853 19h-2.844L8.218 7.727h2.641l2.579 8.843h.054l2.578-8.843h2.57zm7.86 7.078c0 2.758-1.617 4.375-4.148 4.375-2.532 0-4.149-1.625-4.149-4.375 0-2.711 1.64-4.36 4.149-4.36 2.507 0 4.148 1.64 4.148 4.36zm-5.984.008c0 1.68.71 2.624 1.836 2.624 1.117 0 1.828-.945 1.828-2.625 0-1.664-.72-2.624-1.828-2.624-1.11 0-1.836.96-1.836 2.624zm7.773-4.188v-1.93h2.281v1.93h1.547v1.719H30.57v4.008c0 .64.313.945.985.945.203 0 .414-.016.554-.04v1.68c-.234.055-.625.094-1.086.094-1.968 0-2.734-.656-2.734-2.289v-4.398h-1.18v-1.719h1.18zm7.477-2.102c0 .657-.532 1.18-1.22 1.18-.687 0-1.218-.523-1.218-1.18 0-.664.531-1.18 1.219-1.18.687 0 1.219.516 1.219 1.18zM39.492 19h-2.281v-8.375h2.203v1.492h.047c.445-1.039 1.328-1.648 2.617-1.648 1.86 0 2.906 1.172 2.906 3.133V19h-2.28v-4.922c0-1.094-.517-1.719-1.54-1.719-1.023 0-1.672.75-1.672 1.836V19zm-3.804 0h-2.282v-8.375h2.282V19zm12.773-4.203c0 1.531.703 2.422 1.836 2.422 1.14 0 1.867-.907 1.867-2.422 0-1.508-.727-2.477-1.867-2.477-1.125 0-1.836.953-1.836 2.477zm5.977 4.086c0 2-1.672 3.273-4.18 3.273-2.203 0-3.696-1.07-3.875-2.562h2.234c.18.578.836.976 1.703.976 1.18 0 1.836-.656 1.836-1.625v-1.468h-.047c-.39.89-1.375 1.5-2.586 1.5-2.046 0-3.398-1.579-3.398-4.196 0-2.656 1.313-4.289 3.438-4.289 1.203 0 2.148.633 2.585 1.594h.04v-1.461h2.25v8.258zm4.859.117V7.727h4.586c2.312 0 3.906 1.539 3.906 3.859 0 2.312-1.648 3.86-4.023 3.86h-2.11V19h-2.36zm3.96-9.406h-1.6v4.008h1.593c1.352 0 2.14-.72 2.14-2.008 0-1.281-.78-2-2.132-2zm13.446 5.21c0 2.758-1.617 4.376-4.148 4.376-2.532 0-4.149-1.625-4.149-4.375 0-2.711 1.64-4.36 4.149-4.36 2.507 0 4.148 1.64 4.148 4.36zm-5.984.008c0 1.68.71 2.626 1.836 2.626 1.117 0 1.828-.946 1.828-2.625 0-1.665-.719-2.626-1.828-2.626-1.11 0-1.836.961-1.836 2.626zM80.164 19h-2.281v-8.375h2.203v1.508h.047c.297-1.063 1.008-1.64 1.992-1.64.266 0 .492.038.648.085v2.008c-.187-.078-.5-.133-.828-.133-1.125 0-1.78.688-1.78 1.867V19zm4.156-8.375v-1.93h2.282v1.93h1.546v1.719h-1.546v4.008c0 .64.312.945.984.945.203 0 .414-.016.555-.04v1.68c-.235.055-.625.094-1.086.094-1.97 0-2.735-.656-2.735-2.289v-4.398h-1.18v-1.719h1.18zm6.946 5.844c0 .625.515 1.015 1.289 1.015.992 0 1.812-.648 1.812-1.554v-.61l-1.765.11c-.852.062-1.336.445-1.336 1.039zm3.093 1.25c-.468.89-1.507 1.414-2.554 1.414-1.594 0-2.805-1.031-2.805-2.54 0-1.523 1.172-2.405 3.258-2.53l2.11-.126v-.554c0-.781-.548-1.235-1.407-1.235-.852 0-1.39.422-1.5 1.04h-2.086c.086-1.626 1.469-2.743 3.688-2.743 2.148 0 3.546 1.11 3.546 2.797V19h-2.203v-1.281h-.047zM100.422 19h-2.281V7.727h2.281V19z"
        fill={isLight ? fill : fillDark}
      />
    </svg>
  );
};

export default VotingPortal;
