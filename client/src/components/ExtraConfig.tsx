import { Input } from "@nextui-org/input";
import { useFormContext, Controller } from "react-hook-form";

const ExtraConfig = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="w-full flex flex-col lg:flex-row justify-between gap-12">
      <div className="lg:w-1/3 flex flex-col space-y-2">
        <Controller
          name="port"
          control={control}
          render={({ field }) => (
            <Input {...field} type="text" label="PORT (optional)" />
          )}
        />
        {errors?.port && (
          <p className="text-red-500 text-sm">{Object(errors.port.message)}</p>
        )}
      </div>

      <div className="lg:w-1/3 flex flex-col space-y-2">
        <Controller
          name="ev"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type="text"
              label="Environment Variable (optional)"
            />
          )}
        />
        {errors?.ev && (
          <p className="text-sm text-red-500">{Object(errors.ev.message)}</p>
        )}
      </div>

      <div className="lg:w-1/3 flex flex-col space-y-2">
        <Controller
          name="startCommand"
          control={control}
          render={({ field }) => (
            <Input {...field} type="text" label="Start Command (optional)" />
          )}
        />
        {errors?.startCommand && (
          <p className="text-sm text-red-500">
            {Object(errors.startCommand.message)}
          </p>
        )}
      </div>
    </div>
  );
};

export default ExtraConfig;
