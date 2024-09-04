import fs from "fs";
import yaml from "js-yaml";
import path from "path";

type RConfigRequest = {
  R_VERSION: string;
  R_PACKAGES: string;
  R_PORT: string;
  R_ENV: string;
  R_START_SCRIPT: string;
};

export const generateYamlFile = ({
  R_VERSION,
  R_PACKAGES,
  R_PORT,
  R_ENV,
  R_START_SCRIPT,
}: RConfigRequest) => {
  // defining the contents of the yaml file
  const gitlabCiCdConfig = {
    image: "docker:latest",
    services: ["docker:dind"],
    stages: ["build", "deploy"],

    build: {
      stage: "build",
      script: [
        "docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY",
        "docker build -t $CI_REGISTRY_IMAGE:latest .",
        "docker push $CI_REGISTRY_IMAGE:latest",
      ],
    },

    deploy: {
      stage: "deploy",
      script: ["docker pull $CI_REGISTRY_IMAGE:latest"],
      environment: {
        name: "production",
      },
    },
  };

  // Transforming JavaScript object into YAML format
  const yamlStr = yaml.dump(gitlabCiCdConfig, { lineWidth: 120 });

  const writeFilePath = path.join(__dirname, "../../../.gitlab-ci.yml");

  // writing yaml content to a .gitlab-ci.yml file
  fs.writeFileSync(writeFilePath, yamlStr, "utf8");
};
