import express, { Request, Response } from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { validateRConfigRequest } from "./middleware/validation";
import { generateDockerfile } from "./helpers/generate-dockerfile";
import { generateYamlFile } from "./helpers/generate-gitlab-cicd-file";

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(path.resolve(process.cwd()), "/client/dist")));

app.post(
  "/api/generate-docker-gitlab-file",
  validateRConfigRequest,
  async (req: Request, res: Response) => {
    const {
      version: R_VERSION,
      dependencies: R_PACKAGES_ARRAY,
      port: R_PORT,
      ev: R_ENV,
      startCommand: R_START_SCRIPT,
    } = req.body;

    const R_PACKAGES = R_PACKAGES_ARRAY.map((pkg: string) => `'${pkg}'`).join(
      ", "
    );

    try {
      const readTemplatePath = path.join(
        __dirname,
        "../../dockerfile.template"
      );
      const template = fs.readFileSync(readTemplatePath, "utf8");

      const dockerfileContent = generateDockerfile(template, {
        R_VERSION,
        R_PACKAGES,
        R_PORT,
        R_ENV,
        R_START_SCRIPT,
      });

      const writeFilePath = path.join(__dirname, "../../Dockerfile");
      fs.writeFileSync(writeFilePath, dockerfileContent, "utf8");

      generateYamlFile({
        R_VERSION,
        R_PACKAGES,
        R_PORT,
        R_ENV,
        R_START_SCRIPT,
      });

      res.send({
        message: `Dockerfile saved at ${writeFilePath}`,
      });
    } catch (error) {
      console.error("Error generating Dockerfile:", error);
      res.status(500).send({
        message: "Failed to generate Dockerfile.",
        error: error,
      });
    }
  }
);

app.get("*", (req, res) => {
  res.sendFile(
    path.join(path.resolve(process.cwd()), "client", "dist", "index.html")
  );
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`server started on localhost:${PORT}`);
});