# msc-drawer

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/msc-drawer) [![DeepScan grade](https://deepscan.io/api/teams/16372/projects/20204/branches/544941/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=16372&pid=20204&bid=544941)

Drawer effect provides extra promotion space for web page. It is also a common effect in web pages &amp; APPs, such as Google APP applied it for image search or other related search results. Developers could also apply it for mentioning some information. &lt;msc-drawer /> provides different themes for light / dark mode and also mobile ready.

![<msc-drawer />](https://blog.lalacube.com/mei/img/preview/msc-drawer.png)

## Basic Usage

&lt;msc-drawer /> is a web component. All we need to do is put the required script into your HTML document. Then follow &lt;msc-drawer />'s html structure and everything will be all set.

- Required Script

```html
<script
  type="module"
  src="https://your-domain/wc-msc-drawer.js">        
</script>
```

- Structure

Put `[slot="msc-drawer-content"]` inside &lt;msc-drawer /> as its child. It will use it as content.

```html
<msc-drawer>
  <script type="application/json">
    {
      "active": false,
      "subject": "your subject"
    }
  </script>
  <div slot="msc-drawer-content">
    ...
  </div>
</msc-drawer>
```

Or set attributes directly.

```html
<msc-drawer
  active
  subject="your subject"
>
  <div slot="msc-drawer-content">
    ...
  </div>
</msc-drawer>
```

Otherwise, developers could also choose remoteconfig to fetch config for &lt;msc-drawer />.

```html
<msc-drawer remoteconfig="https://your-domain/api-path">
  <div slot="msc-drawer-content">
    ...
  </div>
</msc-drawer>
```

## JavaScript Instantiation

&lt;msc-drawer /> could also use JavaScript to create DOM element. Here comes some examples.

```html
<script type="module">
import { MscDrawer } from 'https://your-domain/wc-msc-drawer.js';

const content = document.querySelector('[slot="msc-drawer-content"]');

// use DOM api
const nodeA = document.createElement('msc-drawer');
nodeA.appendChild(content.cloneNode(true));
document.body.appendChild(nodeA);
nodeA.subject = 'your subject';

// new instance with Class
const nodeB = new MscLens();
nodeB.appendChild(content.cloneNode(true));
document.body.appendChild(nodeB);
nodeB.subject = 'your subject';

// new instance with Class & default config
const config = {
  active: false,
  subject: 'your subject'
};
const nodeC = new MscLens(config);
nodeC.appendChild(content.cloneNode(true));
document.body.appendChild(nodeC);
nodeC.subject = 'your subject';
</script>
```

## Style Customization

&lt;msc-drawer /> uses CSS variables to style its interface. That means developer could easy change them into the lookup you like.

```html
<style>
msc-drawer {
  --msc-drawer-z-index: 1000;
  --msc-drawer-overlay-bgcolor: #000;
}
</style>
```

## Attributes

&lt;msc-drawer /> supports some attributes to let it become more convenience & useful.

- **subject**

Set subject for &lt;msc-drawer />.

```html
<msc-drawer
  subject="your subject"
>
  <div slot="msc-drawer-content">
    ...
  </div>
</msc-drawer>
```

- **active**

Set active for &lt;msc-drawer />. It will turn &lt;msc-drawer /> on or not. Default is `false` (not set).

```html
<msc-drawer
  active
>
  <div slot="msc-drawer-content">
    ...
  </div>
</msc-drawer>
```

## Properties

| Property Name | Type | Description |
| ----------- | ----------- | ----------- |
| subject | String | Getter / Setter for subject. Developers could use this property to setup subject. |
| active | Boolean | Getter / Setter for active. It will turn <msc-drawer /> on or not. |

## Method

| Method Signature | Description |
| ----------- | ----------- |
| toggle([force]) | Toggle <msc-drawer /> active or not. When argument is present: If the argument is true, <msc-drawer /> will be turned on, and if it is false, <msc-drawer /> will be turned off. |

## Event

| Event Signature | Description |
| ----------- | ----------- |
| msc-drawer-switch | FFired when <msc-drawer /> turn on or off. Developers could get `active` through `event.detail`. |


## Reference
- [&lt;msc-drawer /&gt;](https://blog.lalacube.com/mei/webComponent_msc-drawer.html)
