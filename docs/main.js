const input = document.getElementById("a_input");

// To use key Enter to calculate
input.addEventListener("keyup", function (event) {
  if (event.code === 'Enter') {
    event.preventDefault();
    calculate();
  }
});

// Amounts
const isrResult = document.getElementById("a_isr");
const afpResult = document.getElementById("a_afp");
const arsResult = document.getElementById("a_ars");
const nResult = document.getElementById("a_n");
const dResult = document.getElementById("a_d");
const gResult = document.getElementById("a_g");
const iResult = document.getElementById("a_i");
const aResult = document.getElementById("a_a");
const sResult = document.getElementById("a_s");
const cResult = document.getElementById("a_c");
const oResult = document.getElementById("a_o");

// Percents
const nPercent = document.getElementById("result_n_p");
const dPercent = document.getElementById("result_d_p");
const gPercent = document.getElementById("result_g_p");
const iPercent = document.getElementById("result_i_p");
const aPercent = document.getElementById("result_a_p");

// Incomings
const resB = document.getElementById("res_b");
const resN = document.getElementById("res_n");

const format = (money, decimals = 2) =>
  money.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

// Get percent from an input
const getPercent = (input, value) => "%" + format((value / input) * 100, 1);

// ARS
function calculateARS(value) {
  if (value <= 13482) return 0;
  const ARS = value * 0.0304;
  return ARS < 4098.53 ? ARS : 4098.53;
}

// AFP
function calculateAFP(value) {
  if (value <= 13482) return 0;
  const AFP = value * 0.0287;
  return AFP < 7738.67 ? AFP : 7738.67;
}

// ISR
function calculateISR(grossSalary, ars, afp) {
  const netSalary = grossSalary - (ars + afp);

  const optionA = netSalary > 34685.0 && netSalary <= 52027.42;
  const optionB = netSalary > 52027.42 && netSalary <= 72260.25;
  const optionC = netSalary > 72260.25;

  const results = [
    (netSalary - 34685.0) * 0.15,
    (netSalary - 52027.42) * 0.2 + 2601.33,
    (netSalary - 72260.25) * 0.25 + 6648.0,
  ];

  return optionA ? results[0] : optionB ? results[1] : optionC ? results[2] : 0;
}

// Calculate percent to get from input
function calculatePercent(input = 0, ...percents) {
  const sizeA = input >= 5000 && input < 10000;
  const sizeB = input >= 10000 && input < 25000;
  const sizeC = input >= 25000 && input < 50000;
  const sizeD = input >= 50000 && input < 100000;
  const sizeE = input >= 100000 && input < 150000;
  const sizeF = input >= 150000 && input < 250000;
  const sizeG = input >= 250000 && input < 500000;
  const sizeH = input >= 500000 && input < 1000000;
  const sizeI = input >= 1000000;

  return (
    input *
    (sizeA
      ? percents[0]
      : sizeB
      ? percents[1]
      : sizeC
      ? percents[2]
      : sizeD
      ? percents[3]
      : sizeE
      ? percents[4]
      : sizeF
      ? percents[5]
      : sizeG
      ? percents[6]
      : sizeH
      ? percents[7]
      : sizeI
      ? percents[8]
      : 0)
  );
}

// Calculate results
function calculate() {
  const inputValue = +input.value;

  const ars = calculateARS(inputValue);
  const afp = calculateAFP(inputValue);
  const isr = calculateISR(inputValue, ars, afp);

  const withTaxes = inputValue - (ars + afp + isr);

  resB.innerHTML = format(inputValue);
  resN.innerHTML = format(withTaxes);

  isrResult.innerHTML = format(isr);
  afpResult.innerHTML = format(afp);
  arsResult.innerHTML = format(ars);

  const needs       = calculatePercent(withTaxes, 0.200, 0.200, 0.200, 0.450, 0.200, 0.200, 0.200, 0.200, 0.200);
  const pleasures   = calculatePercent(withTaxes, 0.200, 0.200, 0.200, 0.200, 0.200, 0.200, 0.200, 0.200, 0.200);
  const donations   = calculatePercent(withTaxes, 0.200, 0.200, 0.200, 0.020, 0.200, 0.200, 0.200, 0.200, 0.200);
  const investments = calculatePercent(withTaxes, 0.200, 0.200, 0.200, 0.200, 0.200, 0.200, 0.200, 0.200, 0.200);
  const savings     = calculatePercent(withTaxes, 0.200, 0.200, 0.200, 0.200, 0.200, 0.200, 0.200, 0.200, 0.200);

  nResult.innerHTML = format(needs);
  dResult.innerHTML = format(donations);
  gResult.innerHTML = format(pleasures);
  iResult.innerHTML = format(investments);
  aResult.innerHTML = format(savings);

  sResult.innerHTML = format(savings * 0.25);
  cResult.innerHTML = format(savings * 0.3);
  oResult.innerHTML = format(savings * 0.45);

  nPercent.innerHTML = getPercent(withTaxes, needs);
  dPercent.innerHTML = getPercent(withTaxes, donations);
  gPercent.innerHTML = getPercent(withTaxes, pleasures);
  iPercent.innerHTML = getPercent(withTaxes, investments);
  aPercent.innerHTML = getPercent(withTaxes, savings);
}
