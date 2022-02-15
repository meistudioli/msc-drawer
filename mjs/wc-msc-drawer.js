import { _wcl } from './common-lib.js';
import { _wccss } from './common-css.js';

const middleHeightRatio = 50; // cH * .5
const maxHeightRatio = 90; // cH * .9
const subjectPadding = 6;
const subjectBasicSize = 48;
const subjectBlockSize = subjectBasicSize + subjectPadding * 2 + 1;
const defaults = {
  active: false,
  subject: ''
};
const booleanAttrs = ['active'];
const objectAttrs = [];

const custumEvents = {
  switch: 'msc-drawer-switch'
};

const { down:evtDown, move:evtMove, up:evtUp } = _wcl.pursuer();
const template = document.createElement('template');
template.innerHTML = `
<style>
${_wccss}

:host{
  --msc-drawer-z-index: 1000;
  --msc-drawer-overlay-bgcolor: #000;
}
:host{position:fixed;inset-inline-start:0;inset-block-end:0;inline-size:100%;block-size:0;pointer-events:none;overflow:hidden;z-index:var(--msc-drawer-z-index);}
:host([active]){block-size:100%;pointer-events:auto;}

.main {
  --safearea-side-size: 0;
  --safearea-bottom-size: 0;

  --msc-drawer-side-size: max(12px, var(--safearea-side-size));
  --msc-drawer-bottom-size: max(12px, var(--safearea-bottom-size));

  --msc-drawer-block-factor: 0;
  --msc-drawer-block-size: calc(var(--msc-drawer-block-factor) * 1%);
  --msc-drawer-y: calc(100% - var(--msc-drawer-block-size));

  --overlay-bgcolor: var(--msc-drawer-overlay-bgcolor);
  --msc-drawer-overlay-opacity: calc((var(--msc-drawer-block-factor) * (60 / 90)) / 100);
  --msc-drawer-transition-duration: 200ms;

  --msc-drawer-subject-block-padding: ${subjectPadding}px;
  --msc-drawer-subject-block-size: ${subjectBlockSize}px;
  --msc-drawer-subject-content-block-size: calc(100% - var(--msc-drawer-subject-block-size));
  --msc-drawer-color: #000;
  --msc-drawer-bgcolor: #fefefe;
  --msc-drawer-border-color: #c6c6c8;
  --msc-drawer-slot-mask: linear-gradient(to bottom, black calc(100% - 10px), transparent 100%);
  --msc-drawer-indicator-color: #c6c6c8;

  --msc-drawer-close-color: #000;
  --msc-drawer-close-opacity-normal: 0;
  --msc-drawer-close-opacity-active: 1;
  --msc-drawer-close-opacity: var(--msc-drawer-close-opacity-active);
  --msc-drawer-close-bgcolor-normal: transparent;
  --msc-drawer-close-bgcolor-active: #eee;
  --msc-drawer-close-bgcolor: var(--msc-drawer-close-bgcolor-normal);
  --msc-drawer-close-mask: path('M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z');
}

.main{position:relative;inset-inline-start:0;inset-block-start:0;inline-size:100%;block-size:100%;}
.overlay{position:absolute;inline-size:100%;block-size:100%;background:var(--overlay-bgcolor);opacity:var(--msc-drawer-overlay-opacity);transition:opacity var(--msc-drawer-transition-duration) ease;}
.drawer{position:absolute;inset-inline-start:0;inset-block-start:var(--msc-drawer-y);inline-size:100%;block-size:var(--msc-drawer-block-size);border-radius:1.5em 1.5em 0 0;background:var(--msc-drawer-bgcolor);transition:top var(--msc-drawer-transition-duration) ease,height var(--msc-drawer-transition-duration) ease;box-shadow:0 0 6px rgba(0,0,0,.3);}
.drawer__subject{font-size:20px;color:var(--msc-drawer-color);text-align:center;line-height:calc(var(--msc-drawer-subject-block-size) - 1px);block-size:var(--msc-drawer-subject-block-size);box-sizing:border-box;border-bottom:1px solid var(--msc-drawer-border-color);cursor:move;}
.drawer__subject::before{position:absolute;inset-inline-start:50%;inset-block-start:6px;margin-inline-start:-30px;content:'';inline-size:60px;block-size:4px;background-color:var(--msc-drawer-indicator-color);border-radius:4px;pointer-events:none;}
.drawer__content{block-size:var(--msc-drawer-subject-content-block-size);box-sizing:border-box;padding:12px var(--msc-drawer-side-size) var(--msc-drawer-bottom-size);}
.drawer__slot{inline-size:100%;block-size:100%;mask-image:var(--msc-drawer-slot-mask);-webkit-mask-image:var(--msc-drawer-slot-mask);}
.drawer__close{position:absolute;inset-block-start:var(--msc-drawer-subject-block-padding);inset-inline-end:var(--msc-drawer-side-size);inline-size:3em;block-size:3em;border-radius:3em;display:block;background-color:var(--msc-drawer-close-bgcolor);opacity:var(--msc-drawer-close-opacity);transition:background-color 150ms ease,opacity 150ms ease;}
.drawer__close:active{transform:scale(.9);}
.drawer__close::before{position:absolute;inset-inline:0 0;inset-block:0 0;margin:auto;inline-size:1.5em;block-size:1.5em;content:'';background-color:var(--msc-drawer-close-color);clip-path:var(--msc-drawer-close-mask);}
.drawer__close:focus{--msc-drawer-close-opacity:var(--msc-drawer-close-opacity-active);--msc-drawer-close-bgcolor:var(--msc-drawer-close-bgcolor-active);outline:0 none;}

.main[data-action='start']{--msc-drawer-block-factor:${middleHeightRatio};}
.main[data-action='end']{--msc-drawer-block-factor:${maxHeightRatio};}
.main[data-action='dragging']]{}
:host([active]) .main[data-action='dragging']{--msc-drawer-transition-duration:0;}

@media (prefers-color-scheme: dark) {
  .main {
    --msc-drawer-color: #fefefe;
    --msc-drawer-bgcolor: #1c1c1e;
    --msc-drawer-border-color: #3d3d41;
    --msc-drawer-indicator-color: #69696f;

    --msc-drawer-close-color: #fefefe;
    --msc-drawer-close-bgcolor-active: #313136;
  }
}

@media (hover: hover) {
  .main{--msc-drawer-close-opacity:var(--msc-drawer-close-opacity-normal);}
  .drawer:hover{--msc-drawer-close-opacity:var(--msc-drawer-close-opacity-active);}
  .drawer__close:hover{--msc-drawer-close-bgcolor:var(--msc-drawer-close-bgcolor-active);}
}

@supports (bottom:env(safe-area-inset-top)) {
  .main {
    --safearea-side-size: max(env(safe-area-inset-left), env(safe-area-inset-right));
    --safearea-bottom-size: env(safe-area-inset-bottom);
  }
}
</style>

<div class="main">
  <div class="overlay"></div>
  <div class="drawer">
    <p class="drawer__subject"></p>
    <div class="drawer__content">
      <div class="drawer__slot overscrolling">
        <slot name="msc-drawer-content"></slot>
      </div>
    </div>
    <a href="#close" class="drawer__close stuff" title="close" aria-label="close" ontouchstart="">close</a>
  </div>
</div>
`;

// Houdini Props and Vals
if (CSS?.registerProperty) {
  CSS.registerProperty({
    name: '--msc-drawer-overlay-bgcolor',
    syntax: '<color>',
    inherits: true,
    initialValue: '#000'
  });
}

export class MscDrawer extends HTMLElement {
  #data;
  #nodes;
  #config;

  constructor(config) {
    super();

    // template
    this.attachShadow({ mode: 'open', delegatesFocus: false });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    // data
    this.#data = {
      controller: '',
      ddController: '',
      cH: 0,
      y: 0,
      height: 0,
      min: 0,
      max: 0,
      factor: 0
    };

    // nodes
    this.#nodes = {
      styleSheet: this.shadowRoot.querySelector('style'),
      main: this.shadowRoot.querySelector('.main'),
      drawer: this.shadowRoot.querySelector('.drawer'),
      subject: this.shadowRoot.querySelector('.drawer__subject'),
      overlay: this.shadowRoot.querySelector('.overlay'),
      slotWrap: this.shadowRoot.querySelector('.drawer__slot'),
      btnClose: this.shadowRoot.querySelector('.drawer__close')
    };

    // config
    this.#config = {
      ...defaults,
      ...config // new MscDrawer(config)
    };

    // evts
    this._onDown = this._onDown.bind(this);
    this._onMove = this._onMove.bind(this);
    this._onUp = this._onUp.bind(this);
    this._onTransitionend = this._onTransitionend.bind(this);
    this._onClose = this._onClose.bind(this);
  }

  async connectedCallback() {
   const { config, error } = await _wcl.getWCConfig(this);

    if (error) {
      console.warn(`${_wcl.classToTagName(this.constructor.name)}: ${error}`);
      this.remove();
      return;
    } else {
      this.#config = {
        ...this.#config,
        ...config
      };
    }

    // upgradeProperty
    Object.keys(defaults).forEach((key) => this._upgradeProperty(key));
  }

  disconnectedCallback() {
    if (this.#data.controller?.abort) {
      this.#data.controller.abort();
    }
  }

  _format(attrName, oldValue, newValue) {
    const hasValue = newValue !== null;

    if (!hasValue) {
      this.#config[attrName] = defaults[attrName];
    } else {
      switch (attrName) {
        case 'active':
          this.#config[attrName] = true;
          break;
        default:
          this.#config[attrName] = newValue;
          break;
      }
    }
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (!MscDrawer.observedAttributes.includes(attrName)) {
      return;
    }

    this._format(attrName, oldValue, newValue);

    switch (attrName) {
      case 'subject': {
        this.#nodes.subject.textContent = this.subject;
        break;
      }
      case 'active': {
        this._clearMain();

        // cancel events binding
        if (this.#data.controller?.abort) {
          this.#data.controller.abort();
        }

        if (this.active) {
          const { main, subject, overlay, btnClose } = this.#nodes;
          main.dataset.action = 'start';

          this.#data.controller = new AbortController();
          const signal = this.#data.controller.signal;
          
          main.addEventListener('transitionend', this._onTransitionend, { signal });
          subject.addEventListener(evtDown, this._onDown, { signal });
          btnClose.addEventListener('click', this._onClose, { signal });
          overlay.addEventListener('click', this._onClose, { signal });
        }

        this._fireEvent(custumEvents.switch, { active:this.active });
        break;
      }
    }
  }

  static get observedAttributes() {
    return Object.keys(defaults); // MscDrawer.observedAttributes
  }

  _upgradeProperty(prop) {
    let value;

    if (MscDrawer.observedAttributes.includes(prop)) {
      if (Object.prototype.hasOwnProperty.call(this, prop)) {
        value = this[prop];
        delete this[prop];
      } else {
        if (booleanAttrs.includes(prop)) {
          value = (this.hasAttribute(prop) || this.#config[prop]) ? true : false;
        } else if (objectAttrs.includes(prop)) {
          value = this.hasAttribute(prop) ? this.getAttribute(prop) : JSON.stringify(this.#config[prop]);
        } else {
          value = this.hasAttribute(prop) ? this.getAttribute(prop) : this.#config[prop];
        }
      }

      this[prop] = value;
    }
  }

  set subject(value) {
    if (value) {
      this.setAttribute('subject', value);
    } else {
      this.removeAttribute('subject');
    }
  }

  get subject() {
    return this.#config.subject;
  }

  set active(value) {
    this.toggleAttribute('active', Boolean(value));
  }

  get active() {
    return this.#config.active;
  }

  _fireEvent(evtName, detail) {
    this.dispatchEvent(new CustomEvent(evtName,
      {
        bubbles: true,
        composed: true,
        ...(detail && { detail })
      }
    ));
  }

  _clearMain() {
    const { btnClose, slotWrap } = this.#nodes;

    delete(this.#nodes.main.dataset.action);
    btnClose.blur();
    slotWrap.scrollTop = 0;
  }

  _onClose(evt) {
    evt.preventDefault();
    this._clearMain();
  }

  _onTransitionend(evt) {
    if (!this.#nodes.main.dataset.action && evt.propertyName === 'height') {
      this.active = false;
    }
  }

  _setCustomProperties(newHeight) {
    const { styleSheet } = this.#nodes;
    const { cH, height } = this.#data;

    const nH = (typeof newHeight !== 'undefined') ? newHeight : height;
    const factor = (nH / cH) * 100;

    _wcl.addStylesheetRules(`.main[data-action='dragging']`,
      {
        '--msc-drawer-block-factor': `${factor}`
      }
    , styleSheet);
  }

  _updateInfo() {
    const { drawer } = this.#nodes;
    const { height:cH } = _wcl.getSize(this);
    const { y, height } = drawer.getBoundingClientRect();

    this.#data = {
      ...this.#data,
      cH,
      y,
      height,
      min: cH * ((100 - maxHeightRatio) / 100),
      max: cH - subjectBlockSize,
      factor: (height / cH) * 100
    };
  }

  _onDown(evt) {
    const { main } = this.#nodes;
    this.#data.ddController = new AbortController();

    const html = document.querySelector('html');
    const signal = this.#data.ddController.signal;
    const { y:pY } = _wcl.pointer(evt);

    if ((typeof evt.buttons !== 'undefined' && evt.buttons !== 1) || main.dataset.action === 'dragging') {
      return;
    }

    evt.preventDefault();

    // evts
    html.addEventListener(evtMove, this._onMove, { signal });
    html.addEventListener(evtUp, this._onUp, { signal });

    // state
    this._updateInfo();
    this._setCustomProperties();
    this.#data.dY = pY - _wcl.scrollY - this.#data.y;
    main.dataset.action = 'dragging';
  }

  _onMove(evt) {
    const { main } = this.#nodes;
    const { y:pY } = _wcl.pointer(evt);
    const { dY, min, max, cH } = this.#data;

    if ((typeof evt.buttons !== 'undefined' && evt.buttons !== 1) || main.dataset.action !== 'dragging') {
      return;
    }

    evt.preventDefault();

    let oY = pY - _wcl.scrollY - dY;

    if (oY < min) {
      oY = min;
    } else if (oY > max) {
      oY = max;
    }

    this._setCustomProperties(cH - oY);
  }

  _onUp(evt) {
    const { main } = this.#nodes;

    if ((typeof evt.buttons !== 'undefined' && (evt.buttons & 1)) || main.dataset.action !== 'dragging') {
      return;
    }

    evt.preventDefault();

    this.#data.ddController.abort();
    this._updateInfo();
    
    const { factor } = this.#data;

    if (factor > middleHeightRatio) {
      main.dataset.action = 'end';
    } else if (factor > middleHeightRatio / 2) {
      main.dataset.action = 'start';
    } else {
      this._clearMain();
    }
  }

  toggle(force) {
    const flag = (typeof force === 'boolean') ? force : !this.active;

    if (flag) {
      this.active = flag;
    } else {
      this._clearMain();
    }
  }
}

// define web component
const S = _wcl.supports();
const T = _wcl.classToTagName('MscDrawer');
if (S.customElements && S.shadowDOM && S.template && !window.customElements.get(T)) {
  window.customElements.define(_wcl.classToTagName('MscDrawer'), MscDrawer);
}