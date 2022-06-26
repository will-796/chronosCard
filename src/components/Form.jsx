import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Form extends Component {
  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      hasTrunfo,
      isSaveButtonDisabled,
      onInputChange,
      onSaveButtonClick,
    } = this.props;
    return (
      <div className="form-container">
        <h1>Adicionar uma nova carta</h1>
        <form>
          <label htmlFor="name" className="label-name">
            <span>Nome</span>
            <input
              type="text"
              data-testid="name-input"
              name="name"
              id="name"
              value={ cardName }
              onChange={ onInputChange }
            />
          </label>
          <label htmlFor="description" className="label-description">
            <span>Descrição</span>
            <input
              type="textarea"
              data-testid="description-input"
              name="description"
              id="description"
              value={ cardDescription }
              onChange={ onInputChange }
            />
          </label>
          <div className="attrs">
            <label htmlFor="attr1" className="label-attr1">
              <span>Atributo1</span>
              <input
                type="number"
                data-testid="attr1-input"
                name="attr1"
                id="attr1"
                value={ cardAttr1 }
                onChange={ onInputChange }
              />
            </label>
            <label htmlFor="attr2" className="label-attr2">
              <span>Atributo2</span>
              <input
                type="number"
                data-testid="attr2-input"
                name="attr2"
                id="attr2"
                value={ cardAttr2 }
                onChange={ onInputChange }
              />
            </label>
            <label htmlFor="attr3" className="label-attr3">
              <span>Atributo3</span>
              <input
                type="number"
                data-testid="attr3-input"
                name="attr3"
                id="attr3"
                value={ cardAttr3 }
                onChange={ onInputChange }
              />
            </label>
          </div>
          <label htmlFor="image" className="label-image">
            <span>Imagem</span>
            <input
              type="text"
              data-testid="image-input"
              name="image"
              id="image"
              placeholder="Insira uma url de Imagem"
              value={ cardImage }
              onChange={ onInputChange }
            />
          </label>

          <label htmlFor="rare" className="label-rare">
            <span>Raridade</span>
            <select
              name="rare"
              id="rare"
              data-testid="rare-input"
              value={ cardRare }
              onChange={ onInputChange }
            >
              <option value="normal">normal</option>
              <option value="raro">raro</option>
              <option value="muito raro">muito raro</option>
            </select>
          </label>
          {hasTrunfo ? (
            'Você já tem um Super Trunfo em seu baralho'
          ) : (
            <label htmlFor="trunfo" className="label-trunfo">
              <input
                type="checkbox"
                name="trunfo"
                id="trunfo"
                data-testid="trunfo-input"
                checked={ cardTrunfo }
                onChange={ onInputChange }
              />
              <span>Super Trunfo</span>
            </label>
          )}

          <button
            type="submit"
            data-testid="save-button"
            disabled={ isSaveButtonDisabled }
            onClick={ onSaveButtonClick }
          >
            Salvar
          </button>
        </form>
      </div>
    );
  }
}

Form.propTypes = {
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardName: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
  hasTrunfo: PropTypes.bool.isRequired,
  isSaveButtonDisabled: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
};
