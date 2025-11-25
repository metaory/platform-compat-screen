<div align="center">
  <img alt="logo" src="logo.svg" width="120">
  <h1>platform-compat-screen</h1>
  <p><strong>Device-targeted blocking and warning overlays</strong></p>
  <p>A minimal library for showing platform compatibility screens - blocking or warning overlays for mobile/desktop devices.</p>
</div>

## Installation

```bash
npm install platform-compat-screen
```

## Usage

### NPM (Source Files)

```javascript
import platformCompatScreen from "platform-compat-screen";

platformCompatScreen({
  mode: "block",
  target: "mobile",
  message: "This application requires a desktop device.",
});
```

### CDN (Unpkg)

```html
<link
  rel="stylesheet"
  href="https://unpkg.com/platform-compat-screen@latest/lib/style.css"
/>
<script
  type="module"
  src="https://unpkg.com/platform-compat-screen@latest/lib/cdn.js?mobile=true&mode=block"
></script>
```

## API

### `platformCompatScreen(options)`

- `mode` (string): `'block'` | `'warn'` - Blocking or dismissible overlay
- `target` (string): `'mobile'` | `'desktop'` | `'both'` - Device type to target
- `message` (string): Message to display
- `dismissText` (string): Button text for warn mode (default: 'Dismiss')

## CDN Query Parameters

- `mobile=true` - Target mobile devices
- `desktop=true` - Target desktop devices
- `mode=block` | `mode=warn` - Overlay mode
- `message=Your%20message` - Custom message (URL encoded)

## CSS Customization

Override design tokens:

```css
:root {
  --pcs-bg: rgba(0, 0, 0, 0.6);
  --pcs-bg-blur: 20px;
  --pcs-text: #ffffff;
  --pcs-button-bg: rgba(255, 255, 255, 0.9);
  --pcs-button-text: #000000;
  --pcs-padding: 2rem;
  --pcs-gap: 1.5rem;
  --pcs-font-size: 1.125rem;
  --pcs-title-size: 1.5rem;
  --pcs-title-weight: 600;
  --pcs-border-radius: 1rem;
  --pcs-z-index: 9999;
}
```

## License

[MIT](LICENSE)
