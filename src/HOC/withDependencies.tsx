/* eslint-disable react/display-name */

import { container } from "~/utils/dependencies";

export const withDependency = <T extends object>(
  Component: React.ComponentType<T>,
  dependencies: Record<string, symbol>,
) => {
  const resolvedDependencies = {};

  for (const property of Object.keys(dependencies)) {
    const dependencyKey = Object.getOwnPropertyDescriptor(
      dependencies,
      property,
    )?.value;

    if (dependencyKey) {
      Object.defineProperty(resolvedDependencies, property, {
        value: container.get(dependencyKey),
        enumerable: true,
      });
    } else {
      throw new Error(`Dependency ${property} not found`);
    }
  }

  return (properties: Omit<T, keyof typeof resolvedDependencies>) => (
    <Component {...properties} {...resolvedDependencies} />
  );
};
