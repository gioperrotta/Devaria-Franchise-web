import { z } from "zod"
import { FormSchema } from "./schema"

export type FormData = z.infer<typeof FormSchema>

export type AddreessProps = {
  logradouro: string
  bairro: string
  localidade: string
  uf: string
}
