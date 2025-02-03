import { CustomerService } from "~/services/customer.service";
import { PayoutService } from "~/services/payout.service";
import { ProductService } from "~/services/product.service";
import { HttpAdapter } from "../adapters/http-adapter";
import { AuthService } from "../services/auth.service";
import { OrderService } from "./../services/orders.service";

const dependencies = {
  HTTP_ADAPTER: Symbol("httpAdapter"),
  AUTH_SERVICE: Symbol("AuthService"),
  PRODUCT_SERVICE: Symbol("ProductService"),
  ORDER_SERVICE: Symbol("OrderService"),
  CUSTOMER_SERVICE: Symbol("CustomerService"),
  PAYOUT_SERVICE: Symbol("PayoutService"),
};

const httpAdapter = new HttpAdapter();
const authService = new AuthService(httpAdapter);
const productService = new ProductService(httpAdapter);
const orderService = new OrderService(httpAdapter);
const customerService = new CustomerService(httpAdapter);
const payoutService = new PayoutService(httpAdapter);
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
container.add(dependencies.ORDER_SERVICE, orderService);
container.add(dependencies.CUSTOMER_SERVICE, customerService);
container.add(dependencies.PAYOUT_SERVICE, payoutService);
export { container, dependencies };
