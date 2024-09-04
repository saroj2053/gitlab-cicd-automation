export const generateDockerfile = (
  template: string,
  replaceProps: { [key: string]: string }
) => {
  return template
    .replace(/{{R_VERSION}}/g, replaceProps.R_VERSION)
    .replace(/{{R_PACKAGES}}/g, replaceProps.R_PACKAGES)
    .replace(/{{R_PORT}}/g, replaceProps.R_PORT)
    .replace(/{{R_ENV_KEY}}/g, replaceProps.R_ENV.split("=")[0])
    .replace(/{{R_ENV_VAL}}/g, replaceProps.R_ENV.split("=")[1])
    .replace(/{{R_START_SCRIPT}}/g, replaceProps.R_START_SCRIPT);
};
