// AULA 10: ELEVANDO O STATE
// https://pt-br.reactjs.org/docs/lifting-state-up.html
// Documentação do React.js
// 11 de fevereiro de 2020

import React from 'react';
import ReactDOM from 'react-dom';

const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>A água irá ferver.</p>;
  }
  return <p>A água não irá ferver.</p>;
}

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

// método para executar a função especificada como onChange no <input>
  handleChange(e) {
    // executa com o novo valor desejado, props fornecidas pelo seu componente pai, o Calculator
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Insira a temperatura em {scaleNames[scale]}:</legend>
        <input value={temperature}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = {temperature: '', scale: 'c'};
  }
// renderizado previamente, o comp. Calculator especifica que onTemperatureChange do TemepratureInput
// do Celsius é o método denominado como handleCelsiusChange do Calculator, e a mesma coisa acontece quando a escala é a Fahrenheit
// Portanto, um desses métodos do Calculator será executado dependendo de qual input foi editado
  handleCelsiusChange(temperature) {
    this.setState({scale: 'c', temperature});
  }

  handleFahrenheitChange(temperature) {
    this.setState({scale: 'f', temperature});
  }

  // o componente Calculator pede ao React para ser renderizado novamente ao chamar this.setState() com os novos valores da temperatura
  render() {
    // método executado para saber como a interface deveria ficar
    // valores de ambos inputs são recalculados com base na temp e escala atuais
    // a conversão de temperatura é realizada aqui
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
      <div>
        <TemperatureInput
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange} />
        <TemperatureInput
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange} />
        <BoilingVerdict
          celsius={parseFloat(celsius)} />
      </div>
    );
  }
}

ReactDOM.render(
  <Calculator />,
  document.getElementById('root')
);
