## Vanilla JS Timely Modal

### Features

- Open Ditto's timely modal in any website to book call advisory slots
- Close the timely modal programmatically (sends close message to iframe)
- Responsive layout: centered on desktop, contained on tablet, bottom-sheet on mobile
- Loading spinner while the booking page loads
- Supports UTM params, embed configuration, and form prefill

### openTimely

```js
openTimely(eventName, params, env, options)
```

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `eventName` | string | Yes | — | The timely event name |
| `params` | object | No | `{}` | UTM and custom query params |
| `env` | string | No | `"prod"` | `"prod"` or `"staging"` |
| `options` | object | No | `{}` | Additional configuration (see below) |

> Make use of staging env to test out timely prior to using production version.

#### `options.embed`

Override embed parameters. Defaults are applied if not specified.

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `embed_type` | `"popup"` \| `"inline"` | `"popup"` | How the embed should display |
| `embed_domain` | string | `window.location.host` | Domain where the iframe is embedded |
| `embed_path` | string | `window.location.pathname` | Path where the iframe is embedded |

#### `options.prefill`

Prefill form fields in the booking page. All fields are optional.

| Key | Type | Description |
|-----|------|-------------|
| `name` | string | User's full name |
| `email` | string | User's email address |
| `phone` | string | User's phone number |
| `product` | string | Product or service identifier |
| `query` | string | User's query or question |
| `date` | string | Preferred date |

#### Supported UTM params

```
utm_source
utm_campaign
utm_medium
utm_content
utm_term
```

### closeTimely

```js
closeTimely()
```

No parameters. Sends a close message to the iframe and hides the modal.

## Installing

```
npm install @ditto-insurance/vanilla-timely
```

## Usage

### With a bundler (ES module)

```js
import { openTimely, closeTimely } from '@ditto-insurance/vanilla-timely';

// Basic usage
openTimely("ditto-hotline", { utm_source: "blog" }, "prod");

// With embed override
openTimely("ditto-hotline", { utm_source: "blog" }, "prod", {
  embed: { embed_type: "inline" }
});

// With prefill
openTimely("ditto-hotline", { utm_source: "blog" }, "prod", {
  prefill: { name: "John", email: "john@example.com", phone: "9876543210" }
});

// Close programmatically
closeTimely();
```

### Without a bundler (IIFE script tag)

Build the IIFE bundle:

```
npm run build:iife
```

Then include it in your HTML:

```html
<script src="dist/vanilla-timely.iife.js"></script>
<script>
  function openModal() {
    DittoTimely.openTimely("ditto-hotline", { utm_source: "landing-page" }, "prod");
  }

  function closeModal() {
    DittoTimely.closeTimely();
  }
</script>

<button onclick="openModal()">Open Modal</button>
<button onclick="closeModal()">Close Modal</button>
```
