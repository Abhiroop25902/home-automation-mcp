import dotenv from "dotenv";

export default class EnvHandler {
  static #instance: EnvHandler;

  static getInstance() {
    if (!EnvHandler.#instance) {
      EnvHandler.#instance = new EnvHandler();
    }

    return EnvHandler.#instance;
  }

  private constructor() {
    dotenv.config();
  }

  public getEnvValue({ key }: { key: string }): string | undefined {
    return process.env[key] ?? undefined;
  }
}
