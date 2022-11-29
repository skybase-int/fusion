import styled from '@emotion/styled';
import React, { useCallback } from 'react';
import CloseButton from '../../../components/close-button/close-button';
import { useThemeContext } from '../../../../core/context/ThemeContext';
import { CustomButton } from '../../../components/custom-button/custom-button';
import TextInput from '../../../components/text-input/text-input';
import { ButtonWrapper, Form } from '../login/login';
import { userChangePasswordMvvm } from './change-password.mvvm';
import { useAuthContext } from '../../../../core/context/AuthContext';
import { useIsAdmin } from '../../../../core/hooks/useIsAdmin';
import { UserDTO } from '../../../../core/models/dto/auth.dto';
import AvatarPlaceholder from '../../../components/svg/avatar-placeholder';
import { goBack } from '../../../../core/utils/routing';

export default () => {
  const { isLight } = useThemeContext();
  const { user } = useAuthContext();

  const { form, username, loading, error, isWrongOldPassword, isMobileOrTable } = userChangePasswordMvvm();

  const isAdmin = useIsAdmin(user || ({} as UserDTO));

  const handleGoBack = useCallback(() => {
    goBack(`/auth/${isAdmin ? 'manage#profile' : 'user-profile'}/`);
  }, [isAdmin]);

  return (
    <Wrapper isLight={isLight}>
      <Container isLight={isLight}>
        <CloseButton
          style={{
            position: 'absolute',
            top: 24,
            right: 24,
          }}
          onClick={handleGoBack}
        />
        <AvatarPlaceholder />
        <UserWrapper>
          <UserLabel isLight={isLight}>Username</UserLabel>
          <Spacer />
          <Username isLight={isLight}>{username}</Username>
        </UserWrapper>
        <ChangePassword isLight={isLight}>Change Your Password</ChangePassword>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <InputsWrapper>
            <Label isLight={isLight}>Enter Existing Password</Label>
            <TextInput
              type="password"
              placeholder="Password"
              name="oldPassword"
              value={form.values.oldPassword}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={
                (form.touched.oldPassword && form.errors.oldPassword) ||
                (isWrongOldPassword && 'Wrong old password') ||
                error
              }
              style={{ marginBottom: 32 }}
              disabled={loading}
            />
            <Label isLight={isLight}>Enter New Password</Label>
            <TextInput
              type="password"
              placeholder="New Password"
              name="newPassword"
              value={form.values.newPassword}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.touched.newPassword && form.errors.newPassword}
              style={{ marginBottom: 24 }}
              disabled={loading}
            />
            <TextInput
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={form.values.confirmPassword}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.touched.confirmPassword && form.errors.confirmPassword}
              style={{ marginBottom: 32 }}
              disabled={loading}
            />
          </InputsWrapper>
          <ButtonWrapper>
            <CustomButton
              label="Set New Password"
              onClick={form.submitForm}
              style={{
                width: 174,
                height: 34,
                borderRadius: 22,
                ...(isMobileOrTable ? { borderColor: isLight ? '#25273D' : '#343442' } : {}),
              }}
              type="submit"
              disabled={loading}
            />
          </ButtonWrapper>
        </Form>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  display: 'flex',
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  minHeight: '100vh',

  backgroundColor: isLight ? '#FFFFFF' : '#000000',
  backgroundImage: isLight ? 'url(/assets/img/bg-page.png)' : 'url(/assets/img/login-bg.png)',
  backgroundAttachment: 'fixed',
  backgroundSize: 'cover',
  paddingBottom: 128,
}));

const Container = styled.div<{ isLight?: boolean }>(({ isLight }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '24px',
  marginTop: '104px',
  width: 343,
  background: isLight ? '#FFFFFF' : '#10191F',
  boxShadow: isLight
    ? '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
    : '0px 20px 40px -40px rgba(7, 22, 40, 0.4), 0px 1px 3px rgba(30, 23, 23, 0.25)',

  borderRadius: '6px',
  '@media (min-width: 834px)': {
    padding: '40px 64px',
    width: '484px',
    marginTop: '100px',
  },
}));

export const UserWrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: 16,
  gap: 4,
  marginBottom: 48,
  '@media (min-width: 834px)': {
    flexDirection: 'row',
    gap: 0,
  },
});

export const Spacer = styled.div({
  background: '#D4D9E1',
  height: 1,
  width: 228,
  order: 2,
  '@media (min-width: 834px)': {
    display: 'none',
  },
});

export const UserLabel = styled.p<{ isLight: boolean }>(({ isLight }) => ({
  color: isLight ? '#708390' : '#D2D4EF',
  fontSize: 20,
  lineHeight: '24px',
  fontWeight: 600,
  margin: 0,
  order: 3,
  '@media (min-width: 834px)': {
    margin: '0 8px 0 0',
    ':after': {
      content: '":"',
    },
    order: 1,
  },
}));

export const Username = styled.h1<{ isLight: boolean }>(({ isLight }) => ({
  fontSize: 24,
  lineHeight: '29px',
  color: isLight ? '#231536' : '#D2D4EF',
  textAlign: 'center',
  margin: 0,
  order: 1,
}));

export const ChangePassword = styled.h2<{ isLight: boolean }>(({ isLight }) => ({
  fontSize: 20,
  lineHeight: '24px',
  color: isLight ? '#434358' : '#D2D4EF',
  margin: '0 0 32px 0',
  alignSelf: 'flex-start',
  letterSpacing: 0.4,
  fontWeight: 600,
}));

const Label = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  fontWeight: 400,
  fontSize: 14,
  lineHeight: '22px',
  color: isLight ? '#231536' : '#D2D4EF',
  marginBottom: 16,
}));

const InputsWrapper = styled.div({
  width: '100%',
  marginBottom: 0,
  '@media (min-width: 834px)': {
    marginBottom: 32,
  },
});