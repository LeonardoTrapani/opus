import React from 'react';
import { Text } from 'react-native';

import { RootStackScreenProps } from '../../types';
import AuthForm, { AuthInputType } from '../components/AuthForm';
import LoginSvg from '../components/svgs/LoginSvg';

import useInput, {
  emailValidCheck,
  passwordInputChecks,
} from '../util/useInput';

export const LoginScreen = ({ navigation }: RootStackScreenProps<'Login'>) => {
  const {
    errorMessage: emailErrorMessage,
    hasError: emailHasError,
    isValid: emailIsValid,
    onChangeText: emailOnChangeText,
    validate: emailValidate,
    value: emailValue,
  } = useInput([
    {
      check: (value) => !!value,
      errorMessage: 'please enter an email',
    },
    {
      check: emailValidCheck,
      errorMessage: 'please enter a valid email',
    },
  ]);

  const {
    errorMessage: passwordErrorMessage,
    hasError: passwordHasError,
    isValid: passwordIsValid,
    onChangeText: passwordOnChangeText,
    validate: passwordValidate,
    value: passwordValue,
  } = useInput(passwordInputChecks);

  const isFormValid = passwordIsValid && emailIsValid;
  const submitLoginHandler = () => {
    if (isFormValid) {
      console.log({ emailValue, passwordValue });
    } else {
      emailValidate();
      passwordValidate();
    }
  };
  const signupInsteadHandler = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.push('Signup');
    }
  };
  const inputs: AuthInputType[] = [
    {
      name: 'email',
      errorMessage: emailErrorMessage,
      hasError: emailHasError,
      keyboardType: 'email-address',
      autoCapitalize: 'none',
      autoComplete: 'email',
      onChangeText: emailOnChangeText,
      validate: emailValidate,
      value: emailValue,
      secureTextEntry: false,
    },
    {
      name: 'password',
      errorMessage: passwordErrorMessage,
      hasError: passwordHasError,
      autoCapitalize: 'none',
      autoComplete: 'password',
      keyboardType: 'default',
      onChangeText: passwordOnChangeText,
      secureTextEntry: true,
      validate: passwordValidate,
      value: passwordValue,
    },
  ];

  return (
    <AuthForm
      insteadHandler={signupInsteadHandler}
      insteadTitle='signup instead'
      title='Login'
      inputs={inputs}
      submitHandler={submitLoginHandler}
      svg={<LoginSvg />}
    />
  );
};

export const Signup: React.FC = () => {
  return <Text>SIGNUP</Text>;
};