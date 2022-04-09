import 'jsdom-global/register';
import React from 'react';
import { render } from '@testing-library/react';
import { TestDev } from '../../../src';

describe('Test Development Helper Class', () => {
  /* Set the expected html templates */
  const expectedCustomHtmlTemplate =
    '<html lang="en"><head><meta charset="utf-8"><title>Test Title</title></head><body><div><div><p>Hello World</p></div></div></body></html>';
  const expectedDefaultHtmlTemplate =
    '<html lang="en"><head><meta charset="utf-8"><title>Mounted HTML Template</title></head><body><div><div><p>Hello World</p></div></div></body></html>';
  /* Set the React component for use with the test */
  const SimpleComponent = () => {
    return <div><p>Hello World</p></div>;
  };
  /* Set the data to be returned by the snapshot test */
  const simpleComponentAsJson = {
    type: 'div',
    props: {},
    children: [
      {
        type: 'p',
        props: {},
        children: [
          'Hello World'
        ]
      }
    ]
  };
  
  describe('createSnapshot() method behaviour', () => {
    let jsonSnapshot;

    beforeAll(() => {
      jsonSnapshot = TestDev.createSnapshot(<SimpleComponent />);
    });

    it('verifies that json is generated from the React component as expected', () => {
      expect(typeof jsonSnapshot).toBe(typeof simpleComponentAsJson);
    });

    it('verifies that the json generated from the React component matches the expected json', () => {
      expect(jsonSnapshot).toStrictEqual(simpleComponentAsJson);
    });
  });

  describe('getComponentInHTMLTemplate() method behaviour - Default document title, no pre-existing title element', () => {
    let domHtml;

    beforeAll(() => {
      /* Render the component, get the html dom content and unmount the component again */
      const { unmount } = render(<SimpleComponent />);
      domHtml = TestDev.getComponentInHTMLTemplate();
      unmount();
    });

    it('verifies that the html document has been generated correctly', () => {
      expect(domHtml).toBe(expectedDefaultHtmlTemplate);
    });
  });

  describe('getComponentInHTMLTemplate() method behaviour - Custom document title, pre-existing title element', () => {
    let domHtml;
    let titleElement;

    beforeAll(() => {
      /* Add a custom title element for use with the test */
      if (document.getElementsByTagName('title').length === 0) {
        titleElement = document.createElement('title');
        document.getElementsByTagName('head')[0].appendChild(titleElement);
      } else {
        titleElement = document.getElementsByTagName('title')[0];
      }
      /* Render the component, get the html dom content and unmount the component again */
      const { unmount } = render(<SimpleComponent />);
      domHtml = TestDev.getComponentInHTMLTemplate('Test Title');
      unmount();
    });

    afterAll(() => {
      document.getElementsByTagName('head')[0].removeChild(titleElement);
    });

    it('verifies that the html document has been generated correctly', () => {
      expect(domHtml).toBe(expectedCustomHtmlTemplate);
    });
  });
});
