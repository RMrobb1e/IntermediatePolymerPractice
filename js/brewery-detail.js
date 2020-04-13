import { LitElement, html } from "https://unpkg.com/lit-element?module";

export default class BreweryDetail extends LitElement {
  constructor() {
    super();
  }

  static get properties() {
    return {
      brewery: { type: Object },
      visited: { type: Boolean },
    };
  }

  connectedCallback() {
    super.connectedCallback();
  }

  toggleVisited() {
    this.dispatchEvent(new CustomEvent("toggle-visited"));
  }

  render() {
    return html`<style>
        * {
          font-family: Roboto;
        }
        .card {
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
          max-width: 300px;
          margin: auto;
          text-align: center;
          font-family: arial;
          color: white;
          background-color: #c9a0dc;
          min-height: 200px;
          margin-top: 5px;
          position: relative;
        }

        .card h2 {
          padding: 20px 0 20px 0;
        }

        .type {
          color: #330066;
          font-size: 22px;
        }

        .card button {
          border: none;
          outline: 0;
          padding: 12px;
          color: white;
          background-color: #7c5295;
          text-align: center;
          cursor: pointer;
          width: 100%;
          font-size: 18px;
          position: absolute;
          bottom: 0;
          left: 0;
        }

        .card button:hover {
          opacity: 0.7;
        }
      </style>
      ${this.brewery &&
      html`
        <div class="card">
          <h2>${this.brewery.name}</h2>
          <p class="type">${this.brewery.brewery_type}</p>
          <p>${this.brewery.city}</p>
          <button @click="${this.toggleVisited}">
            ${this.brewery.visited ? "Visited" : "Not Visited"}
          </button>
        </div>
      `} `;
  }
}

customElements.define("brewery-detail", BreweryDetail);
