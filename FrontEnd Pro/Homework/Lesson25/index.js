/* eslint-disable max-classes-per-file */

class ExchangeService {
  constructor() {
    this.APIBase = 'https://currency-converter5.p.rapidapi.com/currency/';
    this.APIHeaders = {
      'x-rapidapi-host': 'currency-converter5.p.rapidapi.com',
      'x-rapidapi-key': 'ffac1b36e3mshdaacb158eb207c8p1ffba8jsn9c9d538f899e',
    };
  }

  async getData(url) {
    const res = await fetch(`${this.APIBase}${url}`, {
      method: 'GET',
      headers: this.APIHeaders,
    });

    if (res.status !== 200) {
      throw new Error(`Can not fetch, status: ${res.status}`);
    } else {
      return res.json();
    }
  }

  getAvalibleCurrencies() {
    return this.getData('list?format=json');
  }

  async converCurrency(
    baseCurrency = 'UAH',
    resultedCurrency = 'USD',
    amount = '100',
  ) {
    const res = await this.getData(
      `convert?format=json&from=${baseCurrency}&to=${resultedCurrency}&amount=${amount}`,
    );

    return this._transformData(res, resultedCurrency);
  }

  _transformData(data, resultedCurrency) {
    return {
      baseCurrencyCode: data.base_currency_code,
      baseCurrencyName: data.base_currency_name,
      resultedCurrencyCode: resultedCurrency,
      resultedCurrencyName: data.rates[resultedCurrency].currency_name,
      convertRate: data.rates[resultedCurrency].rate,
      resultedAmount: data.rates[resultedCurrency].rate_for_amount,
    };
  }
}

class ExchangeForm {
  constructor(
    Api,
    baseCurrencyInput,
    controlConvertFrom,
    controlConvertTo,
    resultedCurrencyInput,
    convertBtn,
  ) {
    this.api = new Api();

    this.baseCurrencyInput = baseCurrencyInput;
    this.controlConvertFrom = controlConvertFrom;
    this.controlConvertTo = controlConvertTo;
    this.resultedCurrencyInput = resultedCurrencyInput;
    this.convertBtn = convertBtn;
  }

  init() {
    this.setCurrencyList();
    this.convertBtn.addEventListener('click', () =>
      this.getSelectedCurrencies(),
    );
  }

  setCurrencyList() {
    this.api.getAvalibleCurrencies().then((res) => {
      const keys = Object.keys(res.currencies);
      this.currencyList = keys.map((key) => ({
        key: key,
        name: res.currencies[key],
      }));

      this.controlConvertFrom.innerHTML = this.currencyList
        .map(
          (item) =>
            `<option data-currency-key="${item.key}">${item.key}: ${item.name}</option>`,
        )
        .join('');
      this.controlConvertTo.innerHTML = this.currencyList
        .map(
          (item) =>
            `<option data-currency-key="${item.key}">${item.key}: ${item.name}</option>`,
        )
        .join('');
    });
  }

  getSelectedCurrencies() {
    console.log(this.controlConvertFrom.selectedIndex);
  }
}

const baseCurrencyInput = document.getElementById('base-currency');
const controlConvertFrom = document.getElementById('convert-from');
const controlConvertTo = document.getElementById('convert-to');
const resultedCurrencyInput = document.getElementById('resulted-currency');
const convertBtn = document.getElementById('convert-btn');

const exchangeForm = new ExchangeForm(
  ExchangeService,
  baseCurrencyInput,
  controlConvertFrom,
  controlConvertTo,
  resultedCurrencyInput,
  convertBtn,
);

exchangeForm.init();
