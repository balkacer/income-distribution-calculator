const input = document.getElementById("a_input");

// To use key Enter to calculate
input.addEventListener("keyup", function (event) {
  if (event.code === 'Enter') {
    event.preventDefault();
    calculate();
  }
});

// Taxes
const isrResult = document.getElementById("a_isr");
const afpResult = document.getElementById("a_afp");
const arsResult = document.getElementById("a_ars");

// Amounts
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
function calculatePercent(input, ...percents) {
  let left = 5000;
  let result = 0;

  for (let i = 0; i < percents.length; i++) {
    const dp = +((i / 4).toString().split(".")[1]); // Get decimal part
    const right = left * (dp === 5 ? 1.5 : dp === 75 ? 1.666 + 1 : 2);

    if (input >= left && input < right) {
      result = input * percents[i];
      break;
    }

    left = right;
  }

  return result;
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

  const value = document.getElementById("r_nt").checked ? withTaxes : inputValue;

  const needs       = calculatePercent(value, 0.420, 0.417, 0.417, 0.417, 0.417, 0.417, 0.417, 0.417, 0.417, 0.417);
  const pleasures   = calculatePercent(value, 0.180, 0.128, 0.128, 0.127, 0.127, 0.128, 0.128, 0.128, 0.128, 0.128);
  const donations   = calculatePercent(value, 0.080, 0.055, 0.055, 0.055, 0.055, 0.055, 0.055, 0.055, 0.055, 0.055);
  const investments = calculatePercent(value, 0.100, 0.126, 0.126, 0.126, 0.126, 0.126, 0.126, 0.126, 0.126, 0.126);
  const savings     = calculatePercent(value, 0.220, 0.274, 0.274, 0.275, 0.275, 0.274, 0.274, 0.274, 0.274, 0.274);

  nResult.innerHTML = format(needs);
  dResult.innerHTML = format(donations);
  gResult.innerHTML = format(pleasures);
  iResult.innerHTML = format(investments);
  aResult.innerHTML = format(savings);

  sResult.innerHTML = format(savings * 0.23);
  cResult.innerHTML = format(savings * 0.31);
  oResult.innerHTML = format(savings * 0.46);

  nPercent.innerHTML = getPercent(value, needs);
  dPercent.innerHTML = getPercent(value, donations);
  gPercent.innerHTML = getPercent(value, pleasures);
  iPercent.innerHTML = getPercent(value, investments);
  aPercent.innerHTML = getPercent(value, savings);
}
