import { IDependencyContainer } from "~/types";
import { HttpAdapter } from "../adapters/http-adapter";
import { AuthService } from "../services/auth.service";

const dependencies = {
  HTTP_ADAPTER: Symbol("httpAdapter"),
  AUTH_SERVICE: Symbol("AuthService"),
};

const httpAdapter = new HttpAdapter();
const authService = new AuthService(httpAdapter);

class DependencyContainer implements IDependencyContainer {
  _dependencies = {};

  add<T>(key: symbol, dependency: T) {
    Object.defineProperty(this._dependencies, key, {
      value: dependency,
    });
  }

  get<T>(key: symbol): T {
    return Object.getOwnPropertyDescriptor(this._dependencies, key)?.value as T;
  }
}

const container = new DependencyContainer();

container.add(dependencies.AUTH_SERVICE, authService);
container.add(dependencies.HTTP_ADAPTER, httpAdapter);

export { container, dependencies };
