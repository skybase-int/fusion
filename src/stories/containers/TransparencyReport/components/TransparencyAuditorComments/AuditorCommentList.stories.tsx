import { CommentBuilder } from '@ses/core/businessLogic/builders/commentBuilder';
import { UserBuilder } from '@ses/core/businessLogic/builders/userBuilder';
import { BudgetStatus, ResourceType } from '@ses/core/models/interfaces/types';
import { withTeamContext } from '@ses/core/utils/storybook/decorators';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import AuditorCommentList from './AuditorCommentList';
import type { ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/AuditorComments/AuditorCommentList',
  component: AuditorCommentList,
  decorators: [withTeamContext],
} as ComponentMeta<typeof AuditorCommentList>;

const args = [
  {
    comments: [
      new CommentBuilder().withAuthor(new UserBuilder().addCoreUnitFacilitatorRole().build()).build(),
      new CommentBuilder()
        .withStatus(BudgetStatus.Review)
        .withAuthor(new UserBuilder().withUsername('story1').addCoreUnitFacilitatorRole().build())
        .build(),
      new CommentBuilder()
        .withStatus(BudgetStatus.Final)
        .withAuthor(new UserBuilder().withUsername('story2').addCoreUnitAuditorRole().build())
        .build(),
    ],
    resource: ResourceType.CoreUnit,
  },
];

export const [[WithComments, WithCommentsDarkMode]] = createThemeModeVariants(AuditorCommentList, args);
