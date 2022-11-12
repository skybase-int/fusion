import styled from '@emotion/styled';
import React from 'react';
import CloseButton from '../../../components/close-button/close-button';
import { useThemeContext } from '../../../../core/context/ThemeContext';
import { CustomButton } from '../../../components/custom-button/custom-button';
import AvatarPlaceholder from '../../../components/svg/avatar-placeholder';
import TextInput from '../../../components/text-input/text-input';
import { ButtonWrapper, Container, Wrapper, Form } from '../login/login';
import { useCreateAccountMvvm } from './create-account.mvvm';

export default () => {
  const { isLight } = useThemeContext();
  const { form, loading, error } = useCreateAccountMvvm();

  return (
    <Wrapper isLight={isLight}>
      <Container isLight={isLight}>
        <CloseButton
          style={{
            position: 'absolute',
            top: 24,
            right: 24,
          }}
        />
        <AvatarPlaceholder />
        <Title>Create New Account</Title>
        <Description>Create a new user account to provide access to the administration area.</Description>
        <Form onSubmit={form.submitForm}>
          <InputsWrapper>
            <Label>Enter Username</Label>
            <TextInput
              type="text"
              placeholder="Username"
              name="username"
              value={form.values.username}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={(form.touched.username && form.errors.username) ?? !!error}
              style={{
                marginBottom: '32px',
              }}
            />
            <Label>Create Password</Label>
            <TextInput
              type="password"
              placeholder="Password"
              name="password"
              value={form.values.password}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={(form.touched.password && form.errors.password) ?? !!error}
              disabled={loading}
              style={{
                marginBottom: '24px',
              }}
            />
            <TextInput
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={form.values.confirmPassword}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={(form.touched.confirmPassword && form.errors.confirmPassword) ?? !!error}
              disabled={loading}
              style={{
                marginBottom: '24px',
              }}
            />
          </InputsWrapper>
          <ButtonWrapper>
            <CustomButton
              label="Create Account"
              style={{
                width: 200,
                height: 40,
                borderRadius: 22,
              }}
            />
          </ButtonWrapper>
          <input type="submit" style={{ display: 'none' }} />
        </Form>
      </Container>
    </Wrapper>
  );
};

const Title = styled.h1({
  margin: '24px 0 16px 0',
  fontWeight: 600,
  lineHeight: '39px',
  color: '#231536',
  fontSize: 24,
  '@media (min-width: 834px)': {
    fontSize: 32,
  },
});

const Description = styled.p({
  margin: '0 0 64px 0',
  fontWeight: 400,
  fontSize: 16,
  lineHeight: '22px',
  textAlign: 'center',
});

const Label = styled.div({
  fontWeight: 400,
  fontSize: 14,
  lineHeight: '22px',
  color: '#231536',
  marginBottom: 16,
});

const InputsWrapper = styled.div({
  width: '100%',
  marginBottom: 0,
  '@media (min-width: 834px)': {
    marginBottom: 32,
  },
});
