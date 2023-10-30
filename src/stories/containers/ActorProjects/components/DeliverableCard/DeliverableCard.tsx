import styled from '@emotion/styled';
import Avatar from '@mui/material/Avatar';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { DeliverableStatus } from '@ses/core/models/interfaces/projects';
import React from 'react';
import DeliverableStatusChip from '../DeliverableStatusChip/DeliverableStatusChip';
import type { Deliverable } from '@ses/core/models/interfaces/projects';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface DeliverableCardProps {
  deliverable: Deliverable;
}

const DeliverableCard: React.FC<DeliverableCardProps> = ({ deliverable }) => {
  const { isLight } = useThemeContext();

  return (
    <Card isLight={isLight}>
      <HeaderContainer>
        <TitleContainer>
          <Title isLight={isLight}>{deliverable.title}</Title>
          <DeliverableStatusChip status={DeliverableStatus.DELIVERED} />
        </TitleContainer>
        <DeliverableOwnerContainer>
          <OwnerImage isLight={isLight} src={deliverable.owner.imgUrl} />
        </DeliverableOwnerContainer>
      </HeaderContainer>
    </Card>
  );
};

export default DeliverableCard;

const Card = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: 24,
  borderRadius: 6,
  border: `1px solid ${isLight ? '#D1DEE6' : 'red'}`,
  background: isLight ? '#fff' : 'red',
  boxShadow: isLight
    ? '0px 1px 3px 0px rgba(190, 190, 190, 0.25), 0px 5px 10px 0px rgba(219, 227, 237, 0.40)'
    : '0px 1px 3px 0px red, 0px 5px 10px 0px red',
  padding: '7px 7px 15px 7px',
}));

const HeaderContainer = styled.div({
  display: 'flex',
  alignItems: 'flex-start',
  gap: 24,
  alignSelf: 'stretch',
});

const TitleContainer = styled.div({
  maxWidth: 'calc(100% - 51px)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: 15,
  flex: '1 0 0',
});

const Title = styled.div<WithIsLight>(({ isLight }) => ({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  alignSelf: 'stretch',
  color: isLight ? '#25273D' : 'red',
  fontSize: 16,
  fontWeight: 700,
  lineHeight: 'normal',
}));

const DeliverableOwnerContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
});

const OwnerImage = styled(Avatar)<WithIsLight>(({ isLight }) => ({
  width: 28,
  height: 28,
  borderRadius: 20,
  border: `2px solid ${isLight ? '#fff' : 'red'}`,
  boxShadow: isLight ? '2px 4px 7px 0px rgba(26, 171, 155, 0.25)' : '2px 4px 7px 0px red',
}));