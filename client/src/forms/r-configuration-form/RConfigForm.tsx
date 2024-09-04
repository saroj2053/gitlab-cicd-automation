import { Divider } from "@nextui-org/divider";
import RVersions from "../../components/RVersions";
import RDependencies from "../../components/RDependencies";
import { Button } from "@nextui-org/button";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ExtraConfig from "../../components/ExtraConfig";
import useGenerateFiles from "../../hooks/useGenerateFiles";

const configFormSchema = z.object({
  version: z.string().min(1, { message: "R version is required" }),
  dependencies: z
    .array(z.string())
    .nonempty({ message: "Please select at least one r dependency" }),
  port: z
    .string()
    .optional()
    .refine((value) => !value || /^\d{4}$/.test(value), {
      message: "Please enter a 4 digit port number",
    }),

  ev: z
    .string()
    .optional()
    .refine((value) => !value || /^[a-zA-Z_][a-zA-Z0-9_]*=.+$/.test(value), {
      message: "Environment variable must be in the format key=value",
    }),

  startCommand: z
    .string()
    .optional()
    .refine((value) => !value || value.startsWith("Rscript"), {
      message: "Start command must start with Rscript",
    }),
});

type RConfigFormData = z.infer<typeof configFormSchema>;

const RConfigForm = () => {
  const { loading, generateFiles } = useGenerateFiles();
  const form = useForm<RConfigFormData>({
    resolver: zodResolver(configFormSchema),
    defaultValues: {
      version: "",
      dependencies: [],
      port: "",
      ev: "",
      startCommand: "",
    },
  });

  const handleConfigSubmit = async (formDataJson: RConfigFormData) => {
    try {
      await generateFiles(formDataJson);
      form.reset();
    } catch (error) {
      console.error("Error generating files", error);
    }
  };
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(handleConfigSubmit)}
        className="space-y-8 bg-gray-50 p-10 rounded-lg container mx-auto mt-8"
      >
        <RVersions />
        <ExtraConfig />

        <Divider style={{ border: "1px solid whitesmoke" }} />
        <RDependencies />

        <Button
          variant="flat"
          color="default"
          type="submit"
          isLoading={loading}
        >
          {loading ? "Generating Files" : "Generate File"}
        </Button>
      </form>
    </FormProvider>
  );
};

export default RConfigForm;
