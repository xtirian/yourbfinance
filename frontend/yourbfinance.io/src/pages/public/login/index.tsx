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
import { loginSchema } from '../../../lib/schemas/loginSchema';
import { useContext, useEffect, useState } from 'react';
import { IoEyeOutline } from 'react-icons/io5';
import { FaRegEyeSlash } from 'react-icons/fa';
import './login.scss';
import { Link, useNavigate } from 'react-router-dom';
import { UserModel } from '../../../lib/models/userModel';
import { UserContext } from '../../../context/user.context';
import { path } from '../../../lib/utils/PageHandler';

const LoginPagina = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { signin, isLogged } = useContext(UserContext);

  const navigate = useNavigate();

  const handleSubmit = async (data: UserModel) => {
    const response = await signin(data);
    if (response) {
      setTimeout(() => {
        navigate('/auth/dashboard');
      }, 2000);
    }
  };

  useEffect(() => {
    if (!isLogged) {
      navigate('/');
    }
    if (isLogged) {
      navigate(`${path}dashboard`);
    }
  }, [isLogged, navigate]);

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
          validationSchema={loginSchema}
          initialValues={{ email: '', password: '' }}
          onSubmit={(values, actions) => {
            handleSubmit(values);
            actions.setSubmitting(false);
          }}
        >
          {(props) => (
            <Form className="login_form">
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
                Login
              </Button>
            </Form>
          )}
        </Formik>
        <Text mt={'40px'} textAlign={'center'}>
          <Link to="/signup" className="link_loginForm">
            Criar uma conta
          </Link>
        </Text>
      </Flex>
    </Flex>
  );
};

export default LoginPagina;
