import './style.css';
import { detectDevice } from './detect.js';
export { detectDevice };

const MODES = ['block', 'warn'];
const TARGETS = ['mobile', 'desktop', 'both'];
const OVERLAY_ID = 'pcs-overlay';

const isString = (x) => typeof x === 'string';
const isArray = (x) => Array.isArray(x);
const isObject = (x) => x && typeof x === 'object' && !isArray(x);

const attrHandlers = {
  class: (el, v) => el.className = v,
  textContent: (el, v) => el.textContent = v,
};
const setAttr = (el, k, v) => (attrHandlers[k] || ((e, val) => typeof val === 'function' ? e[k] = val : e.setAttribute(k, val)))(el, v);

const build = (node) => {
  if (isString(node)) return document.createTextNode(node);
  if (!isArray(node)) return null;
  const [tag, ...rest] = node;
  const attrs = rest.find(isObject);
  return rest.filter(x => x !== attrs).reduce(
    (el, child) => (el.appendChild(build(child)), el),
    Object.entries(attrs || {}).reduce((el, [k, v]) => (setAttr(el, k, v), el), document.createElement(tag))
  );
};

const removeOverlay = () => {
  document.getElementById(OVERLAY_ID)?.remove();
  document.body.classList.remove('pcs-overlay-active');
};

const dismissButton = (dismissText) => [
  'button',
  { class: 'pcs-button', textContent: dismissText, onclick: removeOverlay }
];

const overlayStructure = (message, mode, dismissText) => [
  'div',
  { class: 'pcs-overlay', id: OVERLAY_ID },
  [
    'div',
    { class: 'pcs-content' },
    ['p', { class: 'pcs-message' }, message],
    ...(mode === 'warn' ? [dismissButton(dismissText)] : [])
  ]
];

const shouldShow = (target, device) => target === 'both' || target === device;
const isValid = (value, valid) => valid.includes(value);

/**
 * @typedef {Object} InitOptions
 * @property {'block' | 'warn'} [mode='block'] Overlay behavior. 'block' shows non-dismissible overlay, 'warn' shows dismissible warning.
 * @property {'mobile' | 'desktop' | 'both'} [target='mobile'] Device type to target. Determines when overlay is shown.
 * @property {string} [message='This application is not compatible with your device.'] Message displayed to users.
 * @property {string} [dismissText='Dismiss'] Text displayed on dismiss button (only used in 'warn' mode).
 */

/**
 * Initializes the platform compatibility screen overlay.
 * @param {InitOptions} [options={}] Configuration options.
 * @returns {void}
 */
export default (options = {}) => {
  const { mode = 'block', message = 'This application is not compatible with your device.', target = 'mobile', dismissText = 'Dismiss' } = options;

  if (!isValid(mode, MODES)) return;
  if (!isValid(target, TARGETS)) return;
  if (!shouldShow(target, detectDevice())) return;

  removeOverlay();
  document.body.classList.add('pcs-overlay-active');
  document.body.appendChild(build(overlayStructure(message, mode, dismissText)));
};
