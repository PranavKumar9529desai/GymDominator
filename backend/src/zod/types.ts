import * as z from 'zod';

const hasUppercase = (str: string) => /[A-Z]/.test(str);
const hasLowercase = (str: string) => /[a-z]/.test(str);
const hasNumber = (str: string) => /\d/.test(str);
const hasSymbol = (str: string) => /[!@#$%^&*]/.test(str);

interface Value1 {
    email: string;
    username: string;
    password: string;

}

export const SignupInput = z.object({
    email: z.string().email('Invliad email format'),
    username: z.string().min(3, "Username must have atleast 3 letters"),
    password: z.string()
        .min(6, "Password must be of minimum of 6 letters")
}).refine((value: Value1) => {
    hasUppercase(value.password) &&
        hasLowercase(value.password) &&
        hasNumber(value.password) &&
        hasSymbol(value.password),
        'Password must contain uppercase, lowercase, numbers, and symbols'
},


);
// we are exporting the zod types so that they can be use in the frontend project.
export type signupInput = z.infer<typeof SignupInput>;

interface Value2 {
    email: string;
    password: string;
}

export const SigninInput = z.object({
    email: z.string().email('Invliad email format'),
    password: z.string()
        .min(6, "Password must be of minimum of 6 letters")
}).refine((value: Value2) =>
    hasUppercase(value.password) &&
    hasLowercase(value.password) &&
    hasNumber(value.password) &&
    hasSymbol(value.password),
    'Password must contain uppercase, lowercase, numbers, and symbols'
);

export type signinInput = z.infer<typeof SigninInput>
