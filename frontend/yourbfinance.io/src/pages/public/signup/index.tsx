import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from '@chakra-ui/react';
import { Field, FieldProps, Form, Formik } from 'formik';
import { useContext, useState } from 'react';
import { IoEyeOutline } from 'react-icons/io5';
import { FaRegEyeSlash } from 'react-icons/fa';
import './signup.scss';
import { Link, useNavigate } from 'react-router-dom';
import { signupSchema } from '../../../lib/schemas/signupSchema';
import { UserContext } from '../../../context/user.context';
import { UserModel } from '../../../lib/models/userModel';

const SignupPagina = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { signup } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (data: UserModel) => {
    const response = await signup(data);
    if (response) {
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  };

  return (
    <Flex
      direction={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      h={'100vh'}
    >
      <Flex direction={'column'} w={'100%'} maxW={400}>
        <Image
          src={'/logo.svg'}
          maxW={'90.5%'}
          alt={'logo'}
          mb={'64px'}
          alignSelf={'center'}
        />
        <Formik
          validationSchema={signupSchema}
          initialValues={{ name: '', last_name: '', email: '', password: '' }}
          onSubmit={(values, actions) => {
            handleSubmit(values);
            actions.setSubmitting(false);
          }}
        >
          {(props) => (
            <Form className="signup_form">
              <Field name="name">
                {({ field, form }: FieldProps) => (
                  <FormControl
                    isInvalid={!!(form.errors.name && form.touched.name)}
                  >
                    <FormLabel className="form_Label">Nome</FormLabel>
                    <Input
                      {...field}
                      placeholder="John"
                      className="input_Login"
                      size={'lg'}
                    />
                    <FormErrorMessage>
                      {typeof form.errors.name === 'string' && form.errors.name}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="last_name">
                {({ field, form }: FieldProps) => (
                  <FormControl
                    isInvalid={
                      !!(form.errors.last_name && form.touched.last_name)
                    }
                  >
                    <FormLabel className="form_Label">Sobrenome</FormLabel>
                    <Input
                      {...field}
                      placeholder="Doe"
                      className="input_Login"
                      size={'lg'}
                    />
                    <FormErrorMessage>
                      {typeof form.errors.last_name === 'string'
                        ? form.errors.last_name
                        : ''}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="email">
                {({ field, form }: FieldProps) => (
                  <FormControl
                    isInvalid={!!(form.errors.email && form.touched.email)}
                  >
                    <FormLabel className="form_Label">
                      Endereço de e-mail
                    </FormLabel>
                    <Input
                      {...field}
                      placeholder="johndoe@email.com"
                      className="input_Login"
                      size={'lg'}
                    />
                    <FormErrorMessage>
                      {typeof form.errors.email === 'string' &&
                        form.errors.email}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="password">
                {({ field, form }: FieldProps) => (
                  <FormControl
                    isInvalid={
                      !!(form.errors.password && form.touched.password)
                    }
                  >
                    <FormLabel className="form_Label">Senha</FormLabel>
                    <InputGroup size={'lg'}>
                      <Input
                        {...field}
                        placeholder="********"
                        type={showPassword ? 'string' : 'password'}
                        className="input_Login"
                      />
                      <InputRightElement>
                        {showPassword ? (
                          <FaRegEyeSlash
                            onClick={() => setShowPassword(false)}
                            size={'20px'}
                            color="#999DA3"
                          />
                        ) : (
                          <IoEyeOutline
                            onClick={() => setShowPassword(true)}
                            size={'20px'}
                            color="#999DA3"
                          />
                        )}
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>
                      {typeof form.errors.password === 'string' &&
                        form.errors.password}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button
                mt={4}
                colorScheme="teal"
                isLoading={props.isSubmitting}
                type="submit"
                w={'100%'}
              >
                Fazer Cadastro
              </Button>
            </Form>
          )}
        </Formik>
        <Text mt={'40px'} textAlign={'center'} className="formText">
          ou faça login
        </Text>
        <Text mt={'40px'} textAlign={'center'} className="formText">
          Já possui uma conta?{' '}
          <Link to={'/'} className="link_signupForm">
            Faça login aqui
          </Link>
        </Text>
      </Flex>
    </Flex>
  );
};

export default SignupPagina;
