## Vanilla JS Timely Modal

In the index.js file we have a function 'openDittoTimely' this function is used to open the Ditto Timely Modal.
To use this function first import it from the package and then call it in the handler function of the html element.
There is also a function 'closeDittoTimely' to close the modal.

The 'openDittoTimely' function takes 2 parameters.

1."eventName" param which is mandatory is used to send the name of the timely event.It would be a string value.

2."params" is an optional field which is an object which is used to send the utm_params and other params.

## How to use

First install the vanilla-timely-plugin using npm.

```
npm install vanilla-timely-plugin
```

Now import the 2 functions "openDittoTimely" and "closeDittoTimely".
While calling "openDittoTimely" pass the eventName as the first param (Mandatory) and the second param can be used to pass the utm_params (Optional)

```
import { openDittoTimely,closeDittoTimely } from 'vanilla-timely-plugin';

return (

<button onClick={() => openDittoTimely("test",{"campaign":"influencer-z"}) }>

</button>

)
```
