import type { FeatureFlagsInterface } from './feature-flags.interface';

export const flagsDevelopment: FeatureFlagsInterface = {
  FEATURE_CARD_NAVIGATION: true,
  FEATURE_SITEMAP: process.env.ENABLE_SITEMAP === 'true',
  FEATURE_GLOBAL_ACTIVITIES: true,
  FEATURE_AUTH: true,
  FEATURE_MKR_VESTING: true,
  FEATURE_AUDIT_REPORTS: false,
  FEATURE_FINANCES_OVERVIEW: true,
  FEATURE_RECOGNIZED_DELEGATES_REPORT: true,
  FEATURE_TRANSPARENCY_COMMENTS: true,
  FEATURE_RECOGNIZED_DELEGATES: true,
  FEATURE_ACCOUNTS_SNAPSHOT: true,
  FEATURE_TEMPORARY_ACCOUNTS_SNAPSHOT_PAGE: true,
  FEATURE_ACCOUNT_SNAPSHOT_CURRENCY_PICKER: false,
  FEATURE_ECOSYSTEM_ACTORS: true,
  FEATURE_ECOSYSTEM_ACTORS_ABOUT: true,
  FEATURE_CARD_NAVIGATION_ACTOR_ABOUT_PAGE: true,
  FEATURE_ECOSYSTEM_ACTORS_TRANSPARENCY_REPORTING: true,
  FEATURE_BUDGET_SUMMARY_PAGE: true,
  FEATURE_ENDGAME_NAVIGATION_SECTION: true,
  FEATURE_ENDGAME_BUDGET_STRUCTURE_SECTION: true,
  FEATURE_ENDGAME_BUDGET_TRANSITION_SECTION: true,
  FEATURE_FINANCES_BREAKDOWN_CHART_SECTION: true,
  FEATURE_FINANCES_MAKERDAO_EXPENSE_METRICS_SECTION: true,
  FEATURE_TEAM_PROJECTS: true,
  FEATURE_ECOSYSTEM_FINANCES_DASHBOARD_PAGE: true,
  FEATURE_ROADMAP_MILESTONES: true,
  FEATURE_FINANCES_MAKERDAO_EXPENSE_RESERVE_SECTION: true,
};
