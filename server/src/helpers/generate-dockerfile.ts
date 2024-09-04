type DockerfileConfigs = {
  R_VERSION: string;
  R_PACKAGES: string;
  R_PORT?: string;
  R_ENV?: string;
  R_START_SCRIPT?: string;
};

export const generateDockerfile = (
  template: string,
  { R_VERSION, R_PACKAGES, R_PORT, R_ENV, R_START_SCRIPT }: DockerfileConfigs
): string => {
  let dockerfileContent = template
    .replace(/{{R_VERSION}}/g, R_VERSION)
    .replace(/{{R_PACKAGES}}/g, R_PACKAGES);

  if (R_PORT) {
    dockerfileContent = dockerfileContent.replace(/{{R_PORT}}/g, R_PORT);
  } else {
    dockerfileContent = dockerfileContent.replace(/EXPOSE {{R_PORT}}\n?/g, "");
  }

  if (R_ENV) {
    dockerfileContent = dockerfileContent
      .replace(/{{R_ENV_KEY}}/g, R_ENV.split("=")[0])
      .replace(/{{R_ENV_VAL}}/g, R_ENV.split("=")[1]);
  } else {
    dockerfileContent = dockerfileContent.replace(
      /ENV {{R_ENV_KEY}}={{R_ENV_VAL}}\n?/g,
      ""
    );
  }

  if (R_START_SCRIPT) {
    const structuredScript = R_START_SCRIPT.split(" ")
      .map((script: string) => `"${script}"`)
      .join(",");
    dockerfileContent = dockerfileContent.replace(
      /{{R_START_SCRIPT}}/g,
      structuredScript
    );
  } else {
    dockerfileContent = dockerfileContent.replace(
      /CMD \[\{\{R_START_SCRIPT\}\}\]\n?/g,
      ""
    );
  }

  return dockerfileContent;
};
