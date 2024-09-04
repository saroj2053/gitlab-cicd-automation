import { useFormContext, Controller } from "react-hook-form";
import { versions } from "../data/versions";
import { Select, SelectItem } from "@nextui-org/select";

const RVersions = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col space-y-4">
      <Controller
        name="version"
        control={control}
        render={({ field }) => (
          <Select
            label="R Versions"
            placeholder="Select a version"
            className="max-w-xs"
            {...field}
          >
            {versions.map((version) => (
              <SelectItem key={version.value}>{version.label}</SelectItem>
            ))}
          </Select>
        )}
      />
      {errors.version && (
        <div className="text-sm text-red-500">
          {Object(errors.version.message)}
        </div>
      )}
    </div>
  );
};

export default RVersions;
