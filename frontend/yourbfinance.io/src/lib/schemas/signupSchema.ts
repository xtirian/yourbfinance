import { InferType, object, string } from "yup";


export const signupSchema = object({
  name: string().min(3, 'Digite pelo menos 3 caracteres').required('Digite o nome.'),
  last_name: string().min(3, 'Digite pelo menos 3 caracteres').required('Digite o sobrenome.'),
  email: string().email().required('Digite o e-mail.'),
  password: string().min(8, 'Senha muito curta - deve ter no mínimo 8 caracteres.')
  .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]+$/, 'A senha deve conter pelo menos uma letra maiuscula, uma letra minuscula, um numero e um caractere especial.')
  .required('Digite a senha.')
})

export type LoginType = InferType<typeof signupSchema>