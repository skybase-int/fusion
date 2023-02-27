import styled from '@emotion/styled';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import CommentForm from '../comment-form/comment-form';
import AuditorCommentList from '../comment-list';
import NoComments from '../no-comments';
import ParticipantRoles from '../participant-roles';
import useCommentsContainer from './useCommentsContainer';
import type {
  ActivityFeedDto,
  BudgetStatementDto,
  CommentsBudgetStatementDto,
} from '@ses/core/models/dto/core-unit.dto';

export type CommentMode = 'CoreUnits' | 'Delegates';

export type AuditorCommentsContainerProps = {
  comments: (CommentsBudgetStatementDto | ActivityFeedDto)[];
  budgetStatement?: BudgetStatementDto;
  mode?: CommentMode;
};

const AuditorCommentsContainer: React.FC<AuditorCommentsContainerProps> = ({
  budgetStatement,
  comments,
  mode = 'CoreUnits',
}) => {
  const { cuParticipants, auditors, canComment, currentBudgetStatus, coreUnitCode } = useCommentsContainer(
    comments,
    budgetStatement
  );

  return (
    <Container>
      <CommentsContainer>
        {!budgetStatement || (comments.length === 0 && !canComment) ? (
          <NoComments />
        ) : (
          <>
            <AuditorCommentList comments={comments} mode={mode} />
            {canComment && (
              <CommentForm
                currentBudgetStatus={currentBudgetStatus}
                budgetStatementId={budgetStatement?.id?.toString() || ''}
                mode={mode}
              />
            )}
          </>
        )}
      </CommentsContainer>
      <ParticipantsColumn>
        <ParticipantRoles cu={cuParticipants} auditors={auditors} coreUnitCode={coreUnitCode} mode={mode} />
      </ParticipantsColumn>
    </Container>
  );
};

export default AuditorCommentsContainer;

const Container = styled.div({
  display: 'flex',
  flexWrap: 'wrap',
  position: 'relative',
});

const CommentsContainer = styled.div({
  width: '100%',

  [lightTheme.breakpoints.up('table_834')]: {
    width: 'calc(100% - 225px)',
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    width: 'calc(100% - 264px)',
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    width: 'calc(100% - 272px)',
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    width: 'calc(100% - 280px)',
  },
});

const ParticipantsColumn = styled.div({
  [lightTheme.breakpoints.down('table_834')]: {
    borderTop: '1px solid #D4D9E1',
    paddingTop: 32,
    width: '100%',
  },

  [lightTheme.breakpoints.up('table_834')]: {
    width: 201,
    marginLeft: 24,
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    width: 240,
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    marginLeft: 32,
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    marginLeft: 40,
  },
});
