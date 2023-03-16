import * as Yup from 'yup';


export const SignUpValidationSchema =  Yup.object({
  name: Yup.string().required('El nombre es necesario').max(20,'maximo 20 caracteres'),
  first_surname: Yup.string().required().max(20,'maximo 20 caracteres'),
  second_surname: Yup.string().required().max(20,'maximo 20 caracteres'),
  email: Yup.string().email().required().max(30,'maximo 30 caracteres'),
  password: Yup.string().required().max(30,'maximo 30 caracteres').min(6,'Debe contener minimo 6 caracteres'),
  gender: Yup.string().oneOf(['male', 'female', 'other']).defined(),
  birth_date: Yup.date().required('data needed').max(new Date(),'max date allowed is ' + new Date().toString()),
});


//type User = yup.InferType<typeof validationUserSchema>;


export const LogInValidationSchema = Yup.object().shape({
  email: Yup.string().required('Se necesita un email!')
      .email('Email no válido')
      .min(6, 'Demasiado corto, minimo 6 caracteres!')
      .max(20, 'Demasiado largo, maximo 20 caracteres!'),
      

  password: Yup.string().required('Se necesita una contraseña!')
      .min(6, 'Demasiado corto, minimo 6 caracteres!')
      .max(20, 'Demasiado largo, maximo 20 caracteres!')
})



export const CreateCompanyValidationSchema = Yup.object().shape({
  nifCif: Yup.string().required('Se necesita un NIF o CIF!')
    .min(6, 'Demasiado corto, minimo 6 caracteres!')
    .max(20, 'Demasiado largo, maximo 20 caracteres!'),

  name: Yup.string().required('Se necesita un nombre!')
    .min(6, 'Demasiado corto, minimo 6 caracteres!')
    .max(20, 'Demasiado largo, maximo 20 caracteres!'),

  identityTaxNumber: Yup.string().required('Se necesita un número de identificación fiscal!')
    .min(6, 'Demasiado corto, minimo 6 caracteres!')
    .max(20, 'Demasiado largo, maximo 20 caracteres!'),

  address: Yup.string().required('Se necesita una dirección!')
    .min(6, 'Demasiado corto, minimo 6 caracteres!')
    .max(20, 'Demasiado largo, maximo 20 caracteres!')
})


