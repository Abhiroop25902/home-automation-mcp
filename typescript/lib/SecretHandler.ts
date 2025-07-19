import { SecretManagerServiceClient } from "@google-cloud/secret-manager";

const secretClient = new SecretManagerServiceClient();

export default async function getSecret(secretId: string) {
  const projectId = await secretClient.getProjectId();
  const fullName = `projects/${projectId}/secrets/${secretId}/versions/latest`;

  const [version] = await secretClient.accessSecretVersion({ name: fullName });

  const secret = version.payload?.data?.toString();
  if (!secret) {
    throw new Error("Secret is empty or not found.");
  }

  return secret;
}
