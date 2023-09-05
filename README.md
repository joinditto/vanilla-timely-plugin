## Vanilla JS Timely Modal

### Features

- Open Ditto's timely modal in any website to book call advisory slots
- Close the timely modal in case it has to be closed programmatically

### openTimely

The `openTimely` function takes 4 parameters.

1.`eventName` which is mandatory is used to send the name of the timely event. It would be a string value.

2.`params` is an optional field. It is an object, which can be used to send the **utm_params** and any other params which is mutually agreed with Ditto tech team.

3.`closeMethods` is an optional field.It is an array of strings with possible values as **overlay** or **button**.
By default all the 2 methods are enabled.If you want only certain close methods pass only those.
**button** - Modal is closed on clicking close button.
**overlay** -Modal is closed on clicking the overlay.

4.`env` which is used specify the timely server (prod/staging).It would be a string value.The values can be either **prod** or **staging**. By default it is set to **prod**.

> Make use of staging env to test out timely prior to using production version.

### closeTimely

No parameters.

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

## Example

**Javascript**

```
import { openTimely,closeTimely } from '@ditto-insurance/vanilla-timely';

function openModal(){
 openTimely("event-test",{"utm_param":"influencer"},[],"staging")
}

function closeModal(){
 closeTimely ();
}

```

**HTML**

```
<button onclick="openModal()">Open Modal</button>
<button onclick="closeModal()">Close Modal</button>
```

## Resources

We are using Tingle.js for implementing the modal. (https://tingle.robinparisi.com)
