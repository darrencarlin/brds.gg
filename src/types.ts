import { User } from "next-auth";
import { z } from "zod";

export interface RawgGame {
  id: number;
  name: string;
  background_image: string;
}

export interface GoogleUser extends User {
  emailVerified?: null;
  createdAt?: Date;
  updatedAt?: Date;
}

// Field

// Types/validation code could use some adjustments
export const Field = z.object({
  id: z.string(),
  name: z.string(),
  type: z.enum(["number", "boolean"]),
  defaultValue: z.union([z.number(), z.boolean(), z.string()]).optional(),
  icon: z.string().optional(),
});

export type Field = z.infer<typeof Field>;

export const Fields = z.array(Field);

export type Fields = z.infer<typeof Fields>;

export const validateGameFields = (fields: unknown): Fields => {
  try {
    return Fields.parse(fields);
  } catch (error) {
    if (error instanceof z.ZodError) {
      // You can handle validation errors specifically here
      throw new Error(`Invalid fields format: ${error.message}`);
    }
    throw error;
  }
};
