import { CURRENT_ENVIRONMENT } from '@ses/config/endpoints';
import AppLayout from '@ses/containers/AppLayout/AppLayout';
import { FeatureFlagsProvider } from '@ses/core/context/FeatureFlagsProvider';
import { withoutSBPadding } from '@ses/core/utils/storybook/decorators';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { featureFlags } from 'feature-flags/feature-flags';
import { SWRConfig, unstable_serialize as unstableSerialize } from 'swr';
import { EcosystemActorBuilder } from '@/core/businessLogic/builders/actors/actorsBuilder';
import { TeamScopeEnum } from '@/core/enums/actorScopeEnum';
import { TeamRole } from '@/core/enums/teamRole';
import type { Team } from '@/core/models/interfaces/team';
import { ResourceType, TeamCategory, TeamStatus } from '@/core/models/interfaces/types';
import { DefaultRoadmap } from '@/views/RoadmapMilestones/staticData';
import { defaultSocials } from '../EcosystemActorsIndex/utils/utils';
import HomeView from './HomeView';
import { ForumCategories } from './components/GovernanceSection/ForumOverview/categories';
import { financesDataMocked } from './staticData';
import type { HomeViewProps } from './HomeView';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof HomeView> = {
  title: 'Fusion/Pages/Home',
  component: HomeView,
  decorators: [withoutSBPadding],
  parameters: {
    chromatic: {
      viewports: [375, 768, 1024, 1280, 1440],
      pauseAnimationAtEnd: true,
    },
    date: new Date('2024-08-10T04:14:00.000Z'),
  },
};

export default meta;

const variantsArgs = [
  {
    revenueAndSpendingData: {
      2021: {
        fees: 50000,
        liquidationIncome: 120000,
        psm: 30000,
        daiSpent: 70000,
        mkrVesting: 20000,
        annualProfit: 100000,
      },
      2022: {
        fees: 60000,
        liquidationIncome: 140000,
        psm: 35000,
        daiSpent: 80000,
        mkrVesting: 25000,
        annualProfit: 115000,
      },
      2023: {
        fees: 70000,
        liquidationIncome: 160000,
        psm: 40000,
        daiSpent: 90000,
        mkrVesting: 30000,
        annualProfit: 130000,
      },
      2024: {
        fees: 80000,
        liquidationIncome: 180000,
        psm: 45000,
        daiSpent: 100000,
        mkrVesting: 35000,
        annualProfit: 145000,
      },
    } as HomeViewProps['revenueAndSpendingData'],
    financesData: financesDataMocked,
    governanceProposals: [
      {
        proposalBlurb:
          'Increase GSM Pause Delay, Increase Spark MetaMorpho Vault Maximum Debt Ceiling, Add Native Vaults to Debt Ceiling Breaker, SparkLend Proxy Spell, and TACO Resolutions - April 4, 2024',
        key: 'template-executive-vote-lite-psm-usdc-a-phase-1-setup-spark-proxy-spell-july-25-2024',
        address: '0x8c7F12C7cE07916f631B25ce148e419FeFf19d46',
        date: 'Thu Jul 25 2024 00:00:00 GMT+0000 (Coordinated Universal Time)',
        active: true,
        spellData: {
          datePassed: '2024-07-29T14:29:59.000Z',
          dateExecuted: '2024-07-30T20:30:11.000Z',
          mkrSupport: '117129779559442077335595',
        },
        supporters: 41,
      },
      {
        proposalBlurb:
          'Increase GSM Pause Delay, Increase Spark MetaMorpho Vault Maximum Debt Ceiling, Add Native Vaults to Debt Ceiling Breaker, SparkLend Proxy Spell, and TACO Resolutions - April 4, 2024',
        key: 'template-executive-vote-lite-psm-usdc-a-phase-1-setup-spark-proxy-spell-july-25-2024',
        address: '0x8c7F12C7cE07916f631B25ce148e419FeFf19d46',
        date: 'Thu Jul 25 2024 00:00:00 GMT+0000 (Coordinated Universal Time)',
        active: false,
        spellData: {
          datePassed: '2024-07-29T14:29:59.000Z',
          dateExecuted: '2024-07-30T20:30:11.000Z',
          mkrSupport: '17129779559442077335595',
        },
        supporters: 30,
      },
      {
        proposalBlurb:
          'Increase GSM Pause Delay, Increase Spark MetaMorpho Vault Maximum Debt Ceiling, Add Native Vaults to Debt Ceiling Breaker, SparkLend Proxy Spell, and TACO Resolutions - April 4, 2024',
        key: 'template-executive-vote-lite-psm-usdc-a-phase-1-setup-spark-proxy-spell-july-25-2024',
        address: '0x8c7F12C7cE07916f631B25ce148e419FeFf19d46',
        date: 'Thu Jul 25 2024 00:00:00 GMT+0000 (Coordinated Universal Time)',
        active: false,
        spellData: {
          datePassed: '2024-07-29T14:29:59.000Z',
          dateExecuted: '2024-07-30T20:30:11.000Z',
          mkrSupport: '33129779559442077335595',
        },
        supporters: 28,
      },
    ],
    teams: [
      new EcosystemActorBuilder()
        .withId('23')
        .withCode('PH-001')
        .withShortCode('PH')
        .withName('Powerhouse Inc.')
        .withStatus(TeamStatus.Rejected)
        .withType(ResourceType.EcosystemActor)
        .addCategory(TeamRole.ScopeFacilitator)
        .withImage('https://live.staticflickr.com/65535/52808669587_127cc79684_m.jpg')
        .addCategory('Scope Facilitator')

        .withSocials(defaultSocials)
        .build(),
      new EcosystemActorBuilder()
        .withId('23')
        .withCode('PHX-001')
        .withShortCode('PHX')
        .withName('Phoenix Labs')
        .withStatus(TeamStatus.Accepted)
        .addCategory(TeamCategory.Growth)
        .addCategory(TeamCategory.Finance)
        .withType(ResourceType.CoreUnit)
        .withImage('https://live.staticflickr.com/65535/52808669587_127cc79684_m.jpg')

        .addScope({
          id: '1',
          code: 'SUP',
          name: TeamScopeEnum.SupportScope,
        })
        .withLastActivity({
          created_at: '2023-07-12T09:08:34.123',
          description: '',
          event: '',
          params: {},
          id: '45',
        })

        .withSocials(defaultSocials)
        .build(),

      new EcosystemActorBuilder()
        .addCategory(TeamRole.ActiveEcosystemActor)
        .withId('23')
        .withCode('VPAC-001')
        .withShortCode('VPAC')
        .withName('Viridian Protector Advisory Company')
        .withStatus(TeamStatus.Accepted)
        .withType(ResourceType.EcosystemActor)
        .withImage('https://live.staticflickr.com/65535/52808669587_127cc79684_m.jpg')
        .addCategory('Scope Facilitator')
        .addScope({
          id: '1',
          code: 'GOV',
          name: TeamScopeEnum.GovernanceScope,
        })
        .addScope({
          id: '3',
          code: 'ACC',
          name: TeamScopeEnum.AccessibilityScope,
        })
        .withLastActivity({
          created_at: '2023-07-12T09:08:34.123',
          description: '',
          event: '',
          params: {},
          id: '45',
        })
        .withSocials(defaultSocials)
        .build(),
      new EcosystemActorBuilder()

        .withId('23')
        .withCode('DWZ-001')
        .withShortCode('DWZ')
        .withName('Dewiz')
        .withStatus(TeamStatus.Accepted)
        .withType(ResourceType.CoreUnit)
        .withImage('https://live.staticflickr.com/65535/52808669587_127cc79684_m.jpg')
        .addCategory(TeamCategory.Finance)

        .withLastActivity({
          created_at: '2023-07-12T09:08:34.123',
          description: '',
          event: '',
          params: {},
          id: '45',
        })
        .withSocials(defaultSocials)
        .build(),
      new EcosystemActorBuilder()
        .addCategory(TeamRole.ScopeFacilitator)
        .withId('23')
        .withCode('SSA-001')
        .withName('Sidestream')
        .withStatus(TeamStatus.Accepted)
        .withShortCode('SSA')
        .withType(ResourceType.EcosystemActor)
        .withImage('https://live.staticflickr.com/65535/52808669587_127cc79684_m.jpg')
        .addCategory('Active Ecosystem Actor')
        .addScope({
          id: '1',
          code: 'SUP',
          name: TeamScopeEnum.SupportScope,
        })
        .addScope({
          id: '3',
          code: 'PRO',
          name: TeamScopeEnum.SupportScope,
        })
        .withLastActivity({
          created_at: '2023-07-12T09:08:34.123',
          description: '',
          event: '',
          params: {},
          id: '45',
        })
        .withSocials(defaultSocials)
        .build(),
      new EcosystemActorBuilder()
        .addCategory(TeamRole.ScopeFacilitator)
        .withId('23')
        .withCode('PUL-001')
        .withShortCode('PUL')
        .withName('Pull Up')
        .withStatus(TeamStatus.Accepted)
        .withType(ResourceType.EcosystemActor)
        .withImage('https://live.staticflickr.com/65535/52808669587_127cc79684_m.jpg')
        .addCategory('Scope Facilitators')
        .withSocials(defaultSocials)
        .addScope({
          id: '1',
          code: 'GOV',
          name: TeamScopeEnum.GovernanceScope,
        })
        .withLastActivity({
          created_at: '2023-07-12T09:08:34.123',
          description: '',
          event: '',
          params: {},
          id: '45',
        })

        .build(),
      new EcosystemActorBuilder()
        .addCategory(TeamRole.ScopeFacilitator)
        .withId('23')
        .withCode('BAL-001')
        .withName('BALabs')
        .withStatus(TeamStatus.Accepted)
        .withShortCode('BAL')
        .withType(ResourceType.EcosystemActor)
        .withImage('https://live.staticflickr.com/65535/52808669587_127cc79684_m.jpg')
        .addCategory('Active Ecosystem Actor')
        .addScope({
          id: '1',
          code: 'SUP',
          name: TeamScopeEnum.SupportScope,
        })
        .addScope({
          id: '3',
          code: 'STA',
          name: TeamScopeEnum.StabilityScope,
        })
        .withLastActivity({
          created_at: '2023-07-12T09:08:34.123',
          description: '',
          event: '',
          params: {},
          id: '45',
        })
        .withSocials(defaultSocials)
        .build(),
      new EcosystemActorBuilder()
        .addCategory(TeamRole.ScopeFacilitator)
        .withId('23')
        .withCode('VWZ-001')
        .withName('VoteWizard')
        .withStatus(TeamStatus.Accepted)
        .withShortCode('VWZ')
        .withType(ResourceType.EcosystemActor)
        .withImage('https://live.staticflickr.com/65535/52808669587_127cc79684_m.jpg')
        .addCategory('Advisory Council Member')
        .addScope({
          id: '1',
          code: 'SUP',
          name: TeamScopeEnum.SupportScope,
        })

        .withSocials(defaultSocials)
        .withLastActivity({
          created_at: '2023-07-12T09:08:34.123',
          description: '',
          event: '',
          params: {},
          id: '45',
        })
        .build(),
      new EcosystemActorBuilder()
        .addCategory(TeamRole.ScopeFacilitator)
        .withId('23')
        .withCode('STH-001')
        .withName('Steakhouse')
        .withStatus(TeamStatus.Accepted)
        .withShortCode('STH')
        .withType(ResourceType.EcosystemActor)
        .withImage('https://live.staticflickr.com/65535/52808669587_127cc79684_m.jpg')
        .addCategory('Scope Facilitator')
        .addScope({
          id: '1',
          code: 'SUP',
          name: TeamScopeEnum.SupportScope,
        })
        .addScope({
          id: '3',
          code: 'STA',
          name: TeamScopeEnum.AccessibilityScope,
        })
        .withSocials(defaultSocials)
        .build(),
    ] as Team[],
    roadmaps: [{ ...DefaultRoadmap }],
    fallback: {
      [unstableSerialize(['forum', ForumCategories[0].id.toString()])]: [
        {
          id: 20686,
          title: 'About the General Discussion category',
          slug: 'about-the-general-discussion-category',
          posts_count: 1,
          reply_count: 0,
          created_at: '2023-04-28T14:34:30.799Z',
          tags: [],
          like_count: 7,
          category_id: 89,
        },
        {
          id: 24844,
          title: 'WBTC Changes and Risk Mitigation - 10 August 2024',
          slug: 'wbtc-changes-and-risk-mitigation-10-august-2024',
          posts_count: 7,
          reply_count: 0,
          created_at: '2024-08-10T13:28:50.194Z',
          // eslint-disable-next-line spellcheck/spell-checker
          tags: ['wbtc', 'sparklend', 'wbtc-b', 'wbtc-c', 'wbtc-a'],
          like_count: 10,
          category_id: 89,
        },
        {
          id: 21272,
          // eslint-disable-next-line spellcheck/spell-checker
          title: 'DAO Resolution for the purpose of retaining Perkins Coie LLP as counsel',
          // eslint-disable-next-line spellcheck/spell-checker
          slug: 'dao-resolution-for-the-purpose-of-retaining-perkins-coie-llp-as-counsel',
          posts_count: 32,
          reply_count: 16,
          created_at: '2023-07-01T20:01:55.803Z',
          tags: [],
          like_count: 54,
          category_id: 89,
        },
        {
          id: 24784,
          title: 'First Wave Integrator Program',
          slug: 'first-wave-integrator-program',
          posts_count: 3,
          reply_count: 0,
          created_at: '2024-07-31T12:38:34.796Z',
          tags: [],
          like_count: 6,
          category_id: 89,
        },
        {
          id: 24824,
          title: 'BlockTower Credit - Monthly Report (07/1/24 - 07/31/24)',
          slug: 'blocktower-credit-monthly-report-07-1-24-07-31-24',
          posts_count: 1,
          reply_count: 0,
          created_at: '2024-08-07T17:13:56.593Z',
          // eslint-disable-next-line spellcheck/spell-checker
          tags: ['mips', 'rwa', 'blocktower'],
          like_count: 0,
          category_id: 89,
        },
      ],
    },
  },
];

const [[LightMode, DarkMode]] = createThemeModeVariants(
  (props) => (
    <FeatureFlagsProvider enabledFeatures={featureFlags[CURRENT_ENVIRONMENT]}>
      <AppLayout>
        <SWRConfig value={{ fallback: props.fallback }}>
          <HomeView {...props} />
        </SWRConfig>
      </AppLayout>
    </FeatureFlagsProvider>
  ),
  variantsArgs
);

export { LightMode, DarkMode };
