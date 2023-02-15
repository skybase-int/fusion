import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import DelegateSummary from './delegate-summary';
import type { ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/Delegate/DelegateSummary',
  component: DelegateSummary,
  parameters: {
    layout: 'fullscreen',
    chromatic: {
      viewports: [1440],
      pauseAnimationAtEnd: true,
    },
  },
} as ComponentMeta<typeof DelegateSummary>;

const variantsArgs = [
  {
    code: 'del',
  },
];

export const [[Banner, BannerDarkMode]] = createThemeModeVariants(DelegateSummary, variantsArgs);

Banner.parameters = {
  figma: {
    component: {
      1440: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=14171%3A258356&t=WCAGvNfUJOZmR3GA-4',
        options: {
          componentStyle: {
            width: 1312,
          },
          style: {
            top: -16,
            left: -20,
          },
        },
      },
    },
  },
};
