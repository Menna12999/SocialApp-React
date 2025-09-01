import axios from "axios";
import { Button, Checkbox, Datepicker, Label, TextInput } from "flowbite-react";
import { Radio } from "flowbite-react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { zodResolver } from "@hookform/resolvers/zod";
import ValidationError from "../../../components/Shared/ValidationError";
import AppButton from "../../../components/Shared/AppButton";
import { useState } from "react";
import { Helmet } from "react-helmet";

const schema = z
  .object({
    name: z.string().min(3, { message: "name must be at least 3 characters" }),
    email: z.email({ message: "email is invalid" }),
    password: z
      .string()
      .min(8, { message: "password must be at least 8 characters" })
      .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
        message:
          "Contain at least one uppercase letter,Contain at least one lowercase lette,Contain at least one digit,Contain at least one special character",
      }),
    rePassword: z
      .string()
      .min(8, { message: "password must be at least 8 characters" })
      .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
        message:
          "Contain at least one uppercase letter,Contain at least one lowercase lette,Contain at least one digit,Contain at least one special character",
      }),
    dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    gender: z.enum(["male", "female"]),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "password and re-password must be the same",
    path: ["rePassword"],
  });
export default function Register() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, disabled, isValid },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
    resolver: zodResolver(schema),
  });
  const navigate = useNavigate();
  const [apiError, setApiError] = useState(null);

  async function onSubmit(data) {
    try {
      const { data: response, statusText } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/signup
`,
        data
      );

      if (response.message == "success") {
        setApiError(null);
        navigate("/login");
      } else {
        throw new Error("Error", statusText);
      }
    } catch (err) {
      console.log(err);
      setApiError(err?.response?.data?.error);
    }
    console.log(data);
  }
  return (
    <section className="container  my-20  bg-white p-5  max-w-md rounded-xl shadow-2xl  dark:bg-gray-700 dark:text-white'">
            <Helmet>
                      <title>Sociala. | Register</title>
                  </Helmet>
      <h1 className="text-center text-2xl text-sky-700 font-bold">Register</h1>

      <form
        className="flex max-w-md flex-col gap-4 mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        {apiError && <ValidationError error={apiError} />}

        <div>
          <div className="mb-2 block">
            <Label htmlFor="name">Your Name</Label>
          </div>
          <TextInput
            id="name"
            type="text"
            placeholder="name"
            shadow
            {...register("name")}
          />
        </div>
        {errors.name && <ValidationError error={errors.name.message} />}

        <div>
          <div className="mb-2 block">
            <Label htmlFor="email2">Your email</Label>
          </div>
          <TextInput
            id="email2"
            placeholder="name@flowbite.com"
            shadow
            {...register("email")}
          />
        </div>
        <div>
          {errors.email && <ValidationError error={errors.email.message} />}

          <div className="mb-2 block">
            <Label htmlFor="password2">Your password</Label>
          </div>
          <TextInput
            id="password2"
            type="password"
            shadow
            {...register("password")}
          />
        </div>
        {errors.password && <ValidationError error={errors.password.message} />}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="rePassword">Repeat password</Label>
          </div>
          <TextInput
            id="rePassword"
            type="password"
            shadow
            {...register("rePassword")}
          />
        </div>
        {errors.rePassword && (
          <ValidationError error={errors.rePassword.message} />
        )}

        <div>
          <div className="mb-2 block">
            <Label htmlFor="dateOfBirth&">Date Of Birth</Label>
          </div>
          <Controller
            name="dateOfBirth"
            control={control}
            render={({ field }) => (
              <Datepicker
                {...field}
                value={field.value ? new Date(field.value) : new Date()}
                  onChange={(date)=>{
                  if(date){
                    const formatedDate = new Date(date).toISOString("en-US",{
                      day:'2-digit',
                      month:'2-digit',
                      year:'numeric'
                    }).replaceAll('/','-')
                    return field.onChange(formatedDate)
                  }
                  }
                }
              />
            )}
          />
        </div>
        {errors.dateOfBirth && (
          <ValidationError error={errors.dateOfBirth.message} />
        )}

        <div className="flex max-w-md  gap-4">
          <div className="flex items-center gap-2">
            <Radio id="female" value="female" {...register("gender")} />
            <Label htmlFor="female">Female</Label>
          </div>
          <div className="flex items-center gap-2">
            <Radio id="male" value="male" {...register("gender")} />
            <Label htmlFor="male">Male</Label>
          </div>
        </div>
        {errors.gender && <ValidationError error={errors.gender.message} />}

        <AppButton isLoading={isSubmitting} disabled={!isValid}>
          Register new account
        </AppButton>
      </form>
    </section>
  );
}
