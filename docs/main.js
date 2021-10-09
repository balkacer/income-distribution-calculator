const input = document.getElementById("a_input");

// Amounts
const nResult = document.getElementById("a_n");
const gResult = document.getElementById("a_g");
const iResult = document.getElementById("a_i");
const aResult = document.getElementById("a_a");
const sResult = document.getElementById("a_s");
const cResult = document.getElementById("a_c");
const oResult = document.getElementById("a_o");

// Percents
const nPercent = document.getElementById("result_n_p");
const gPercent = document.getElementById("result_g_p");
const iPercent = document.getElementById("result_i_p");
const aPercent = document.getElementById("result_a_p");

// Incomings
const res = document.getElementById("res");

const format = (money) => (money + "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");

function calculate() {
  const v = +input.value;
  res.innerHTML = format(v.toFixed(2));

  const sizeA = v > 5000 && v < 10001;
  const sizeB = v > 10000 && v < 50001;
  const sizeC = v > 50000 && v < 100001;
  const sizeD = v > 100000;

  const calcPercent = (sa, sb, sc, sd) =>
    (v * (sizeD ? sd : sizeC ? sc : sizeB ? sb : sizeA ? sa : 0)).toFixed(2);

  const needs = calcPercent(0.651, 0.482, 0.415, 0.371);
  const pleasures = calcPercent(0.092, 0.136, 0.185, 0.143);
  const investments = calcPercent(0.085, 0.131, 0.145, 0.201);
  const savings = calcPercent(0.172, 0.251, 0.255, 0.285);

  nResult.innerHTML = format(needs);
  gResult.innerHTML = format(pleasures);
  iResult.innerHTML = format(investments);
  aResult.innerHTML = format(savings);

  sResult.innerHTML = format((savings * 0.2).toFixed(2));
  cResult.innerHTML = format((savings * 0.3).toFixed(2));
  oResult.innerHTML = format((savings * 0.5).toFixed(2));

  const getPercent = (value) => "%" + format(((value / v) * 100).toFixed(1));

  nPercent.innerHTML = getPercent(needs);
  gPercent.innerHTML = getPercent(pleasures);
  iPercent.innerHTML = getPercent(investments);
  aPercent.innerHTML = getPercent(savings);
}

input.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    calculate();
  }
});
