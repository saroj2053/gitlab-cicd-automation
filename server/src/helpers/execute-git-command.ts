import { exec } from "child_process";
import { promisify } from "util";
import dotenv from "dotenv";

dotenv.config();

const execAsync = promisify(exec);

const GITLAB_USERNAME = process.env.GITLAB_USERNAME as string;
const GITLAB_ACCESS_TOKEN = process.env.GITLAB_ACCESS_TOKEN as string;
const GITLAB_URL = process.env.GITLAB_URL as string;

if (!GITLAB_USERNAME || !GITLAB_ACCESS_TOKEN || !GITLAB_URL) {
  console.error(
    "Please set GITLAB_USERNAME,  GITLAB_ACCESS_TOKEN, and GITLAB_URL environment variables."
  );
  process.exit(1);
}

export const executeShellCommand = async () => {
  const gitCommands = `
  git init && 
  git remote add origin https://${GITLAB_USERNAME}:${GITLAB_ACCESS_TOKEN}@${GITLAB_URL} && 
  git add . && 
  git commit -m "Dockerfile updated" && 
  git branch -M dev && 
  git push -uf origin dev`;

  try {
    const { stdout, stderr } = await execAsync(gitCommands);
    if (stderr) {
      console.error(`Git error: ${stderr}`);
      return;
    }
    console.log(`Git commands:\n${stdout}`);
  } catch (error: any) {
    console.error(`Error executing git commands: ${error.message}`);
    return;
  }
};
