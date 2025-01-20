import { HttpAdapter } from "../adapters/http-adapter";
import { AuthService } from "../services/auth.service";

// Dependency keys
export const dependencies = {
  HTTP_ADAPTER: Symbol("httpAdapter"),
  AUTH_SERVICE: Symbol("authService"),
} as const;

class DependencyContainer implements IDependencyContainer {
  private static instance: DependencyContainer;
  private readonly dependencies = new Map<symbol, unknown>();
  _dependencies: { [key: symbol]: object } = {};

  private constructor() {}

  static getInstance(): DependencyContainer {
    if (!this.instance) {
      this.instance = new DependencyContainer();
    }
    return this.instance;
  }

  add<T>(key: symbol, dependency: T): void {
    if (this.dependencies.has(key)) {
      throw new Error(`Dependency already registered: ${key.toString()}`);
    }
    this.dependencies.set(key, dependency);
  }

  get<T>(key: symbol): T {
    const dependency = this.dependencies.get(key);
    if (!dependency) {
      throw new Error(`Dependency not found: ${key.toString()}`);
    }
    return dependency as T;
  }
}

// Initialize container and dependencies
const container = DependencyContainer.getInstance();

const httpAdapter = new HttpAdapter();
const authService = new AuthService(httpAdapter);

// Register core dependencies
container.add(dependencies.HTTP_ADAPTER, httpAdapter);
container.add(dependencies.AUTH_SERVICE, authService);

export { container };
