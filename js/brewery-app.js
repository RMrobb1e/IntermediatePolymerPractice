import { LitElement, html } from "https://unpkg.com/lit-element?module";
import BreweryDetail from "./brewery-detail.js";

export default class BreweryApp extends LitElement {
  constructor() {
    super();
  }

  static get properties() {
    return {
      breweries: { type: Array },
      loading: { type: Boolean },
      filter: { type: String },
    };
  }

  connectedCallback() {
    super.connectedCallback();
    console.log("connected");
    if (!this.breweries) {
      this.fetchbreweries();
    }
  }

  async fetchbreweries() {
    let apiURL = `https://api.openbrewerydb.org/breweries`;
    this.loading = true;
    const breweries = await fetch(apiURL);
    this.breweries = await breweries.json();
    this.breweries = this.breweries.map((brewery) => ({
      name: brewery.name,
      type: brewery.brewery_type,
      city: brewery.city,
      visited: false,
    }));
    this.loading = false;
  }

  toggleVisited(brewery) {
    this.breweries = this.breweries.map((currentBrewery) => {
      if (currentBrewery === brewery) {
        return { ...currentBrewery, visited: !currentBrewery.visited };
      }
      return currentBrewery;
    });
  }

  toggleVisible(visibility) {
    this.filter = visibility;
  }

  render() {
    if (this.loading) {
      return html` <mwc-top-app-bar centerTitle
          ><div slot="title">My Brewery App</div></mwc-top-app-bar
        >
        <h2>Breweries fetching...</h2>`;
    } else {
      let totalVisited = this.breweries.filter((brewery) => brewery.visited === true).length;
      let totalUnvisited = this.breweries.length - totalVisited;
      const breweries = this.breweries.filter((brewery) => {
        switch (this.filter) {
          case "all":
            return brewery;
          case "visited":
            return brewery.visited;
          case "unvisited":
            return !brewery.visited;
          default:
            return brewery;
        }
      });
      return html`
        <style>
          * {
            box-sizing: border-box;
            color: white;
            font-family: Roboto;
            margin: 0;
          }
          .menu {
            float: left;
            width: 20%;
            text-align: center;
            z-index: 1;
            padding: 0 10px;
          }
          .menu a {
            background-color: #c9a0dc;
            padding: 8px;
            margin-top: 10px;
            display: block;
            width: 100%;
            border: none;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
            cursor: pointer;
            font-weight: 500;
            border-radius: 20px;
          }
          .main {
            float: left;
            width: 60%;
            padding: 0 20px;
            overflow: hidden;
            height: 83vh;
            margin-top: 10px;
          }
          .main:hover {
            overflow-y: auto;
          }
          .main::-webkit-scrollbar-track {
            -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
            background-color: blanchedalmond;
            border-radius: 10px;
          }
          .main::-webkit-scrollbar {
            width: 5px;
          }
          .main::-webkit-scrollbar-thumb {
            border-radius: 10px;
            background-image: -webkit-gradient(
              linear,
              left bottom,
              left top,
              color-stop(0.44, rgb(201, 160, 220)),
              color-stop(0.72, rgb(174, 135, 208)),
              color-stop(0.86, rgb(120, 81, 169))
            );
          }
          .right {
            float: left;
            width: 20%;
            padding: 15px;
            margin-top: 10px;
            padding-top: 0px;
            text-align: center;
          }
          .total {
            background-color: #c9a0dc;
            border-radius: 20px;
          }
          .total p {
            padding: 10px;
          }
          .header {
            background-color: #c9a0dc;
            padding: 15px;
            text-align: center;
            height: 10vh;
            font-size: 1.25rem;
          }
          .brew-container {
            background-color: blanchedalmond;
            background-size: cover;
            height: 85vh;
          }
          .footer {
            background-color: #c9a0dc;
            text-align: center;
            padding: 10px;
            height: 5vh;
            z-index: 1;
          }
          @media only screen and (max-width: 620px) {
            /* For mobile phones: */
            .menu,
            .right,
            .main {
              width: 100%;
              height: auto;
            }
            .brew-container {
              overflow: auto;
            }
          }
          /* Float four columns side by side */
          .column {
            float: left;
            width: 33.33%;
            padding: 0 10px;
          }
          /* Remove extra left and right margins, due to padding */
          .row {
            margin: 0 -5px;
          }
          /* Clear floats after the columns */
          .row:after {
            content: "";
            display: table;
            clear: both;
          }
          /* Responsive columns */
          @media screen and (max-width: 600px) {
            .column {
              width: 100%;
              display: block;
              margin-bottom: 20px;
            }
          }
        </style>
        <div class="header">My Brewery App</div>

        <div class="brew-container">
          <div class="menu">
            <a @click="${() => this.toggleVisible("all")}">Show All Brewery</a>
            <a @click="${() => this.toggleVisible("visited")}">
              Show All Visited Brewery
            </a>
            <a @click="${() => this.toggleVisible("unvisited")}">
              Show All Unvisited Brewery
            </a>
          </div>
          <div class="main">
            <div class="row">
              ${breweries.length > 0
                ? breweries.map(
                    (brewery) => html`
                      <div class="column">
                        <brewery-detail
                          .brewery="${brewery}"
                          @toggle-visited="${() => this.toggleVisited(brewery)}"
                        ></brewery-detail>
                      </div>
                    `
                  )
                : html`<div>No available brews</div>`}
            </div>
          </div>
          <div class="right">
            <div class="total">
              <p>Total Brewery Visited: ${totalVisited}</p>
              <p>Total Brewery Not Visited: ${totalUnvisited}</p>
            </div>
          </div>
        </div>

        <div class="footer">
          © copyright RALM
        </div>
      `;
    }
  }
}

customElements.define("brewery-app", BreweryApp);
