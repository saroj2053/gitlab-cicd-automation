import { useState } from "react";
import { RConfiguration } from "../types";
import { toast } from "sonner";

const useGenerateFiles = () => {
  const [loading, setLoading] = useState(false);

  const generateFiles = async (data: RConfiguration) => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:8080/api/generate-docker-gitlab-file",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        toast.success("Files generated successfully");
      }

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return { loading, generateFiles };
};

export default useGenerateFiles;
