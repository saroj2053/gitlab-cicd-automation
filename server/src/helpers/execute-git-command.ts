import { exec } from "child_process";

export const executeShellCommand = () => {
  exec(
    'git add . && git commit -m ".gitlab-ci.yml updated" && git push -uf origin dev',
    (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing Git commands: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`Git error output: ${stderr}`);
        return;
      }
      console.log(`Git commands output:\n${stdout}`);
    }
  );
};
