## Vanilla JS Timely Modal

### Features

- Open Ditto's timely modal in any website to book call advisory slots
- Close the timely modal in case it has to be closed programmatically
- Responsive layout: centered on desktop, contained on tablet, bottom-sheet on mobile

### openTimely

The `openTimely` function takes 3 parameters.

1. `eventName` which is mandatory is used to send the name of the timely event. It would be a string value.

2. `params` is an optional field. It is an object, which can be used to send the **utm_params** and any other params which is mutually agreed with Ditto tech team.

3. `env` which is used to specify the timely server (prod/staging). It would be a string value. The values can be either **prod** or **staging**. By default it is set to **prod**.

> Make use of staging env to test out timely prior to using production version.

### closeTimely

No parameters. Closes the modal programmatically.

#### Supported utm_params

```
utm_source
utm_campaign
utm_medium
utm_content
utm_term
```

## Installing

```
npm i @ditto-insurance/vanilla-timely
```

or

```
yarn add @ditto-insurance/vanilla-timely
```

## Usage

### With a bundler (ES module)

**Javascript**

```js
import { openTimely, closeTimely } from '@ditto-insurance/vanilla-timely';

function openModal() {
  openTimely("event-test", { "utm_source": "influencer" }, "staging");
}

function closeModal() {
  closeTimely();
}
```

**HTML**

```html
<button onclick="openModal()">Open Modal</button>
<button onclick="closeModal()">Close Modal</button>
```

### Without a bundler (IIFE script tag)

Build the IIFE bundle:

```
yarn build:iife
```

Then include it in your HTML:

```html
<script src="dist/vanilla-timely.iife.js"></script>
<script>
  function openModal() {
    DittoTimely.openTimely("event-test", { "utm_source": "influencer" }, "staging");
  }

  function closeModal() {
    DittoTimely.closeTimely();
  }
</script>

<button onclick="openModal()">Open Modal</button>
<button onclick="closeModal()">Close Modal</button>
```
