"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TestDev {
  /**
   * Generates a JSON snapshot for the specified React component
   * @param {React.Component|string} componentOrHtml
   * @returns {JSON}
   */
  static createSnapshot(componentOrHtml) {
    return _reactTestRenderer.default.create(componentOrHtml).toJSON();
  }
  /**
   * Gets the HTML DOM which contains the React component for accessibility testing.
   * Once completed the full HTML content for the current document is returned, intended
   * for use with an accessibility framework.
   * @param {string} htmlTitle 
   * @returns {string}
   */


  static getComponentInHTMLTemplate(htmlTitle = 'Mounted HTML Template') {
    const htmlElement = document.getElementsByTagName('html')[0];
    htmlElement.setAttribute('lang', 'en');

    if (document.getElementsByTagName('title').length === 0) {
      /* Create a title element with the relevant title */
      const titleElement = document.createElement('title');
      titleElement.textContent = htmlTitle;
      /* Append the title element to the head element */

      const headElement = document.getElementsByTagName('head')[0];
      headElement.appendChild(titleElement);
    } else {
      /* Set the title text content to the existing element */
      const titleElement = document.getElementsByTagName('title')[0];
      titleElement.textContent = htmlTitle;
    }

    return document.getElementsByTagName('html')[0].outerHTML;
  }

}

exports.default = TestDev;