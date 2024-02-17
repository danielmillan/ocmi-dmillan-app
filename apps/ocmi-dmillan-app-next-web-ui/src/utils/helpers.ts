export const formatCurrency = (value: number) => {
  return (
    value &&
    Number(value).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    })
  );
};
