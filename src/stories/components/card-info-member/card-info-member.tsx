import React from 'react';
import { Avatar, Box, Card, CardContent, CardHeader, Divider, Typography } from '@mui/material';
import styled from '@emotion/styled';
import { CuTableColumnLinks } from '../cu-table-column-links/cu-table-column-links';
import { getTwoInitials } from '../../../core/utils/string.utils';
import { ContributorCommitment } from '../../containers/cu-about/cu-about-contributor';
import { getLinksFromContributor } from '../../../core/business-logic/core-unit-about';
import { DateTime } from 'luxon';
import { getColorJobPosition } from '../../../core/utils/color.utils';
import lightTheme from '../../../../styles/theme/light';
import { useThemeContext } from '../../../core/context/ThemeContext';
import { CustomPopover } from '../custom-popover/custom-popover';

interface Props {
  contributorCommitment: ContributorCommitment;
}

const CardInfoMember = ({ contributorCommitment }: Props) => {
  const isLight = useThemeContext().themeMode === 'light';
  const since = DateTime.now().diff(DateTime.fromISO(contributorCommitment.startDate || ''), 'years').toFormat('y');
  const contributor = contributorCommitment.contributor[0] || [];
  const links = getLinksFromContributor(contributorCommitment);
  const { color } = getColorJobPosition(contributorCommitment.jobTitle);
  return (
    <Box sx={{
      width: '100%',
    }}>
      <Container square isLight={isLight}>

        <CardContent sx={{
          margin: '16px',
          padding: '0px',
        }}>
          <CardHeader
            sx={{
              padding: '0px',
              '& .MuiCardHeader-avatar': {
                marginRight: '0px',
              },
            }}
            avatar={!contributor.facilitatorImage
              ? <Avatar sx={{
                bgcolor: 'black',
                marginRight: '21px',
              }} style={{
                width: '54px',
                height: '54px',
                fontSize: '20px',
                color: 'white',
                border: '3px solid #E7FCFA',

              }}>{getTwoInitials(contributor?.name || 'NM')}</Avatar>
              : <Avatar sx={{
                marginRight: '21px',
              }} style={{
                width: '54px',
                height: '54px',
                border: '3px solid #E7FCFA',
              }} src={contributor.facilitatorImage} />}
            title={<TypographyName isLight={isLight}>{contributor.name}</TypographyName>}
            subheader={
              <>
                {contributor && contributor.email && contributor.email.length >= 40
                  ? <CustomPopover
                    title={contributor.email}
                    id={'mouse-over-popover-goto'}>
                    <TypographyEmail isLight={isLight}
                      style={{

                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        width: '207px',
                      }}>
                      {contributor.email}
                    </TypographyEmail>
                  </CustomPopover>
                  : <TypographyEmail isLight={isLight}
                    style={{
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                    }}>
                    {contributor.email}
                  </TypographyEmail>}

              </>
            }
          />
          <TypographyJobTitle sx={{
            marginTop: '24px',
            marginBottom: '24px',
            marginLeft: '8px',
            color,

          }}>{contributorCommitment.jobTitle}</TypographyJobTitle>

          <CardContentPositionRow>
            <CardContentPositionColumn>
              <TypographyStyled color='#708390' >Since</TypographyStyled>
              <TypographyStyled color={isLight ? '#231536' : '#D2D4EF'}>{`${since} Years`}</TypographyStyled>
            </CardContentPositionColumn>
            <CardContentPositionColumn>
              <TypographyStyled color='#708390' >Commitment</TypographyStyled>
              <TypographyStyled color={isLight ? '#231536' : '#D2D4EF'}>{contributorCommitment.commitment}</TypographyStyled>
            </CardContentPositionColumn>
          </CardContentPositionRow>
        </CardContent>
        <Divider light sx={{
          marginBottom: '11px',
          height: '1px',
          bgcolor: isLight ? '#D4D9E1' : '#405361',
        }} variant='fullWidth' />
        <CardLinksFooter><CuTableColumnLinks links={links} width={10} height={10} spacings={22} fillDark='#9FAFB9' /></CardLinksFooter>
      </Container>
    </Box >
  );
};

const Container = styled(Card)<{ isLight: boolean }>(({ isLight }) => ({
  boxShadow: isLight ? '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)' : '10px 15px 20px 6px rgba(20, 0, 141, 0.1);',
  backgroundColor: isLight ? '#FFFFFF' : '#10191F',
  borderRadius: '6px',
  width: '335px',
  height: '232px',
  [lightTheme.breakpoints.down('table_375')]: {
    width: '100%',
  },
}));

const CardContentPositionRow = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
});

const CardContentPositionColumn = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
});

const CardLinksFooter = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  marginBottom: '8px',
});

const TypographyStyled = styled(Typography)<{ color: string }>((props) => ({
  color: props.color,
  fontFamily: 'SF Pro Text, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '22px'
}));

const TypographyEmail = styled(Typography)<{ isLight: boolean }>(({ isLight }) => ({
  fontWeight: 400,
  fontStyle: 'normal',
  fontSize: '14px',
  fontFamily: 'SF Pro Text, sans-serif',
  color: isLight ? '#231536' : '#D2D4EF',
  lineHeight: '18.2px',
}));

const TypographyJobTitle = styled(Typography)({
  fontSize: '11px',
  fontWeight: 600,
  fontFamily: 'SF Pro Text, sans-serif',
  lineHeight: '22px',
  fontStyle: 'normal',
  height: '22px',
});

const TypographyName = styled(Typography)<{ isLight: boolean }>(({ isLight }) => ({
  fontSize: '20px',
  color: isLight ? '#231536' : '#D2D4EF',
  lineHeight: '24px',
  fontWeight: 500,
  letterSpacing: '0.3px',
  fontFamily: 'SF Pro Text, sans-serif',
}));

export default CardInfoMember;
