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
    stages: ["build", "push"],

    build: {
      stage: "build",
      script: [
        "echo 'Building docker image...'",
        "docker build -t $CI_REGISTRY_IMAGE:$CI_COMMIT_REF_NAME .",
        "docker images",
      ],
    },

    push: {
      stage: "push",
      before_script: [
        `echo $CI_REGISTRY_PASSWORD | docker login -u $CI_REGISTRY_USER --password-stdin $CI_REGISTRY`,
      ],
      script: ["docker push $CI_REGISTRY_IMAGE:$CI_COMMIT_REF_NAME"],
    },
  };

  // Transforming JavaScript object into YAML format
  const yamlStr = yaml.dump(gitlabCiCdConfig, { lineWidth: 120 });

  const writeFilePath = path.join(__dirname, "../../../.gitlab-ci.yml");

  // writing yaml content to a .gitlab-ci.yml file
  fs.writeFileSync(writeFilePath, yamlStr, "utf8");
};
