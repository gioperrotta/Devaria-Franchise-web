import { z } from 'zod'

export const FormSchema = z.object({
  zipCode: z.string()
    .min(8, 'Informe um CEP válido'),
  street: z.string()
    .min(2, 'Informe um endereço válido'),
  number: z.string()
    .min(1, '* Inválido'),
  complement: z.string(),
  district: z.string()
    .min(2, 'Informe um bairro válido'),
  city: z.string()
    .min(2, 'Informe um cidade válida'),
  state: z.string()
    .min(2, 'Informe um estado válido'),
}).transform((fields) => ({
  zipCode: fields.zipCode,
  street: fields.street,
  number: fields.number,
  complement: fields.complement,
  district: fields.district,
  city: fields.city,
  state: fields.state
}))