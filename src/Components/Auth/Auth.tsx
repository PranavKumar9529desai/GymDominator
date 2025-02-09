import { UserDetailsAtom } from "@state/Atom/userDeatilsAtom";
import axios from "axios";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { type ChangeEvent, useState, useTransition } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { z } from "zod";
import { GoogleAuth } from "./GoogleAuth";

const signUpSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  username: z.string().min(2, "Username must be at least 2 characters"),
});

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = { username?: string; email: string; password: string };

interface AuthProps {
  type: "signup" | "signin";
}

export function Auth({ type }: AuthProps) {
  const [isPending, startTransition] = useTransition();
  const [formErrors, setFormErrors] = useState<Partial<FormData>>({});
  const [, setUserDetails] = useRecoilState(UserDetailsAtom);

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    ...(type === "signup" ? { username: "" } : {}),
  });

  const navigate = useNavigate();

  const validateForm = () => {
    try {
      if (type === "signup") {
        signUpSchema.parse(formData);
      } else {
        signInSchema.parse(formData);
      }
      setFormErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.flatten().fieldErrors;
        setFormErrors(errors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    startTransition(() => {
      const payload =
        type === "signup" && "username" in formData
          ? {
              email: formData.email,
              username: formData.username,
              password: formData.password,
            }
          : {
              email: formData.email,
              password: formData.password,
            };

      axios
        .post(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/user${
            type === "signup" ? "/signup" : "/signin"
          }`,
          payload,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
          }
        )
        .then((response) => {
          const { token, name } = response.data;
          localStorage.setItem("jwt", token);
          // Update the atom with proper object structure
          setUserDetails({ name: name });
          navigate("/welcome");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-md"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-8 rounded-2xl lg:shadow-xl">
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                {type === "signup" ? "Create your account" : "Welcome back"}
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                {type === "signup"
                  ? "Start your fitness journey today"
                  : "Continue your fitness journey"}
              </p>
            </div>

            {type === "signup" && (
              <div>
                <LabeledInput
                  label="Username"
                  name="username"
                  type="text"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleInputChange}
                  error={formErrors.username}
                />
              </div>
            )}

            <div>
              <LabeledInput
                label="Email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                error={formErrors.email}
              />
            </div>

            <div>
              <LabeledInput
                label="Password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleInputChange}
                error={formErrors.password}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="mt-8 w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : type === "signup" ? (
              "Create Account"
            ) : (
              "Sign In"
            )}
          </button>

          {/* Add Google Auth */}
          <GoogleAuth />

          <p className="mt-4 text-center text-sm text-gray-600">
            {type === "signup"
              ? "Already have an account? "
              : "Don't have an account? "}
            <Link
              to={type === "signup" ? "/signin" : "/signup"}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              {type === "signup" ? "Sign in" : "Sign up"}
            </Link>
          </p>
        </div>
      </form>
    </motion.div>
  );
}

interface LabeledInputProps {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  value: string | undefined;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

function LabeledInput({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  error,
}: LabeledInputProps) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1">
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`
            w-full px-3 py-2 border rounded-lg shadow-sm
            focus:outline-none focus:ring-2 focus:ring-blue-500
            ${error ? "border-red-500 focus:ring-red-500" : "border-gray-300"}
          `}
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    </div>
  );
}
