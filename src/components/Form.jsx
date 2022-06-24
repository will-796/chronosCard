import React, { Component } from 'react';

export default class Form extends Component {
  render() {
    return (
      <form>
        <label htmlFor="name">
          <input type="text" data-testid="name-input" name="name" id="name" />
        </label>
        <label htmlFor="description">
          <input
            type="textarea"
            data-testid="description-input"
            name="description"
            id="description"
          />
        </label>
        <label htmlFor="attr1">
          <input
            type="number"
            data-testid="attr1-input"
            name="attr1"
            id="attr1"
          />
        </label>
        <label htmlFor="attr2">
          <input
            type="number"
            data-testid="attr2-input"
            name="attr2"
            id="attr2"
          />
        </label>
        <label htmlFor="attr3">
          <input
            type="number"
            data-testid="attr3-input"
            name="attr3"
            id="attr3"
          />
        </label>
        <label htmlFor="image">
          <input
            type="text"
            data-testid="image-input"
            name="image"
            id="image"
          />
        </label>

        <label htmlFor="rare">
          <select name="rare" id="rare" data-testid="rare-input">
            <option value="normal">normal</option>
            <option value="raro">raro</option>
            <option value="muito raro">muito raro</option>
          </select>
        </label>

        <label htmlFor="trunfo">
          <input
            type="checkbox"
            name="trunfo"
            id="trunfo"
            data-testid="trunfo-input"
          />
        </label>

        <button type="submit" data-testid="save-button">
          Salvar
        </button>
      </form>
    );
  }
}
