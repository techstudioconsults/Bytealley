import { handleError } from "./errorHandler";

const tryCatchWrapper = async <T>(request: () => Promise<T>) => {
  try {
    return await request();
  } catch (error: unknown) {
    handleError(error);
  }
};

export default tryCatchWrapper;
