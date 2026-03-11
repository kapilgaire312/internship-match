export function formatSalary(salary) {
  const formattedSalary = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "NPR",
    minimumFractionDigits: 0,
  }).format(salary);
  return formattedSalary;
}
