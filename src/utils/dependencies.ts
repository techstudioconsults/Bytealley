import { ProductService } from "~/services/product.service";
import { HttpAdapter } from "../adapters/http-adapter";
import { AuthService } from "../services/auth.service";

const dependencies = {
  HTTP_ADAPTER: Symbol("httpAdapter"),
  AUTH_SERVICE: Symbol("AuthService"),
  PRODUCT_SERVICE: Symbol("ProductService"),
};

const httpAdapter = new HttpAdapter();
const authService = new AuthService(httpAdapter);
const productService = new ProductService(httpAdapter);
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

container.add(dependencies.HTTP_ADAPTER, httpAdapter);
container.add(dependencies.AUTH_SERVICE, authService);
container.add(dependencies.PRODUCT_SERVICE, productService);

export { container, dependencies };
