## Vanilla JS Timely Modal

### Features

- Open Ditto's timely modal in any website to book call advisory slots
- Close the timely modal in case it has to be closed programmatically

### openTimely

The `openTimely` function takes 3 parameters.

1.`eventName` which is mandatory is used to send the name of the timely event. It would be a string value.

2.`params` is an optional field. It is an object, which can be used to send the **utm_params** and any other params which is mutually agreed with Ditto tech team.

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

3.`env` which is used specify the timely server (prod/staging).It would be a string value.The values can be either **prod** or **staging**. By default it is set to **prod**.

> Make use of staging env to test out timely prior to using production version.

## Installing

```
npm install vanilla-timely-plugin
```

## Example

```
import { openTimely,closeDittoTimely } from 'vanilla-timely-plugin';

return (

<button onClick={() => openTimely("staging","test",{"campaign":"collab-1"}) }>

</button>

)
```

## Resources

We are using Tingle.js for implementing the modal. (https://tingle.robinparisi.com)