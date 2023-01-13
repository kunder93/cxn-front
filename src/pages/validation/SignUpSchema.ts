import * as yup from 'yup';


const validationUserSchema =  yup.object({
  name: yup.string().required('El nombre es necesario').max(20,'maximo 20 caracteres'),
  first_surname: yup.string().required().max(20,'maximo 20 caracteres'),
  second_surname: yup.string().required().max(20,'maximo 20 caracteres'),
  email: yup.string().email().required().max(30,'maximo 30 caracteres'),
  password: yup.string().required().max(30,'maximo 30 caracteres').min(6,'Debe contener minimo 6 caracteres'),
  gender: yup.string().oneOf(['male', 'female', 'other']).defined(),
  birth_date: yup.date().required('data needed').max(new Date(),'max date allowed is ' + new Date().toString()),
});


type User = yup.InferType<typeof validationUserSchema>;


export default validationUserSchema