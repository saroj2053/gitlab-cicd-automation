import { useFormContext, Controller } from "react-hook-form";
import { dependencies } from "../config/dependencies-options-config";

import { Checkbox } from "@nextui-org/checkbox";

const RDependencies = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const hasError = Boolean(errors.dependencies);

  return (
    <div className="space-y-3">
      <h2 className="text-2xl font-bold">Dependencies</h2>
      <p className="text-sm">
        Select the dependencies that your R project contains.
      </p>
      <Controller
        name="dependencies"
        control={control}
        render={({ field: { value, onChange } }) => (
          <div className="grid md:grid-cols-5 gap-1">
            {dependencies.map((dependency, index) => (
              <div
                key={dependency + index}
                className="flex gap-4 flex-row items-center space-x-1 space-y-0 mt-4"
              >
                <Checkbox
                  radius="full"
                  isSelected={value.includes(dependency)}
                  onChange={(e) => {
                    const selected = e.target.checked;
                    if (selected) {
                      onChange([...value, dependency]);
                    } else {
                      onChange(
                        value.filter((item: any) => item !== dependency)
                      );
                    }
                  }}
                >
                  <span className={hasError ? "text-red-500" : ""}>
                    {dependency}
                  </span>
                </Checkbox>
              </div>
            ))}
          </div>
        )}
      />

      {errors?.dependencies && (
        <p className="text-sm text-red-500">
          {Object(errors.dependencies.message)}
        </p>
      )}
    </div>
  );
};

export default RDependencies;
