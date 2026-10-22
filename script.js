const form = document.getElementById("transaction-form");
const conceptInput = document.getElementById("concept");
const typeInput = document.getElementById("type");
const categoryInput = document.getElementById("category");
const amountInput = document.getElementById("amount");

const totalIncomeEl = document.getElementById("totalIncome");
const totalExpenseEl = document.getElementById("totalExpense");
const totalBalanceEl = document.getElementById("totalBalance");
const aiMessageEl = document.getElementById("aiMessage");

let transactions = [
  { concept: "Venta de servicio", type: "ingreso", category: "Ventas", amount: 2500 },
  { concept: "Pago de renta", type: "gasto", category: "Renta", amount: 1200 },
  { concept: "Compra de suministros", type: "gasto", category: "Operación", amount: 450 }
];

function formatMoney(value) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN"
  }).format(value);
}

function updateSummary() {
  const ingresos = transactions
    .filter(item => item.type === "ingreso")
    .reduce((sum, item) => sum + Number(item.amount), 0);

  const gastos = transactions
    .filter(item => item.type === "gasto")
    .reduce((sum, item) => sum + Number(item.amount), 0);

  const saldo = ingresos - gastos;

  totalIncomeEl.textContent = formatMoney(ingresos);
  totalExpenseEl.textContent = formatMoney(gastos);
  totalBalanceEl.textContent = formatMoney(saldo);

  if (saldo > 0) {
    aiMessageEl.textContent =
      "El agente de IA concluye que la actividad financiera está en balance positivo. La operación sigue siendo saludable y se recomienda seguir controlando gastos no esenciales.";
  } else if (saldo === 0) {
    aiMessageEl.textContent =
      "El agente de IA indica que el balance es neutro. Es recomendable revisar costos operativos para mejorar la rentabilidad.";
  } else {
    aiMessageEl.textContent =
      "El agente de IA detecta un déficit financiero. Se recomienda reducir gastos y buscar más ingresos o optimizar procesos contables.";
  }
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const concepto = conceptInput.value.trim();
  const tipo = typeInput.value;
  const categoria = categoryInput.value.trim();
  const monto = Number(amountInput.value);

  if (!concepto || !categoria || !monto || monto <= 0) {
    aiMessageEl.textContent = "Ingresa datos válidos para registrar el movimiento contable.";
    return;
  }

  transactions.push({
    concept: concepto,
    type: tipo,
    category: categoria,
    amount: monto
  });

  form.reset();
  conceptInput.focus();

  updateSummary();
});

updateSummary();
