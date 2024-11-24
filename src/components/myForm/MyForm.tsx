/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type MyFormConfig = {
  defaultValues?: Record<string, any>;
  resolver?: any;
  className?: string;
  style?: object;
};

type MyFormProps = {
  onSubmit: SubmitHandler<FieldValues>;
  children: ReactNode;
  autoComplete?: "off" | "on";
} & MyFormConfig;

const MyForm = ({
  onSubmit,
  children,
  defaultValues,
  resolver,
  style,
  className,
  autoComplete = "off",
}: MyFormProps) => {
  const formConfig: MyFormConfig = {};

  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }

  if (resolver) {
    formConfig["resolver"] = resolver;
  }

  const methods = useForm(formConfig);

  return (
    <FormProvider {...methods}>
      <form
        autoComplete={autoComplete}
        className={className}
        style={style}
        onSubmit={methods.handleSubmit(onSubmit)} // Corrected from `onFinish` to `onSubmit`
      >
        {children}
      </form>
    </FormProvider>
  );
};

export default MyForm;
