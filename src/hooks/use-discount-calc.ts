/* eslint-disable unicorn/consistent-function-scoping */
export const useDiscountCalculator = () => {
  const calculateDiscountPercentage = (originalPrice: number, discountPrice: number) => {
    if (originalPrice > 0) {
      const discount = ((originalPrice - discountPrice) / originalPrice) * 100;
      const remaining = (discountPrice / originalPrice) * 100;
      return { discount, remaining };
    } else {
      return 0;
    }
  };

  return {
    calculateDiscountPercentage,
  };
};
