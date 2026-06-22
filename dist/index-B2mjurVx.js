import { AnimationPathHelper as pa } from "three/addons/helpers/AnimationPathHelper.js";
import * as h from "three";
import { ObjectLoader as lt, Vector3 as Je, Euler as It, Box3 as ga, FileLoader as ha, PropertyBinding as Kt } from "three";
import { TGALoader as ba } from "three/addons/loaders/TGALoader.js";
import { unzipSync as ya, strFromU8 as Mt, strToU8 as ze, zipSync as fa } from "three/addons/libs/fflate.module.js";
import { FontLoader as wa } from "three/addons/loaders/FontLoader.js";
import { TextGeometry as xa } from "three/addons/geometries/TextGeometry.js";
import { clone as va } from "three/addons/utils/SkeletonUtils.js";
import { WebGLPathTracer as Ca } from "three-gpu-pathtracer";
import { FullScreenQuad as Sa } from "three/addons/postprocessing/Pass.js";
import { computeMikkTSpaceTangents as Ma } from "three/addons/utils/BufferGeometryUtils.js";
import * as Ut from "three/addons/libs/mikktspace.module.js";
import { VertexNormalsHelper as Bt } from "three/addons/helpers/VertexNormalsHelper.js";
import { WebGPURenderer as ja, PMREMGenerator as Ta } from "three/webgpu";
import { TransformControls as Va } from "three/addons/controls/TransformControls.js";
import { ViewHelper as Ra } from "three/addons/helpers/ViewHelper.js";
import { HTMLMesh as _a } from "three/addons/interactive/HTMLMesh.js";
import { InteractiveGroup as ka } from "three/addons/interactive/InteractiveGroup.js";
import { XRControllerModelFactory as La } from "three/addons/webxr/XRControllerModelFactory.js";
import { ColorEnvironment as Oa } from "three/addons/environments/ColorEnvironment.js";
import { RoomEnvironment as Pa } from "three/addons/environments/RoomEnvironment.js";
class ge {
  constructor(e) {
    this.dom = e;
  }
  add() {
    for (let e = 0; e < arguments.length; e++) {
      const a = arguments[e];
      a instanceof ge ? this.dom.appendChild(a.dom) : console.error("UIElement:", a, "is not an instance of UIElement.");
    }
    return this;
  }
  remove() {
    for (let e = 0; e < arguments.length; e++) {
      const a = arguments[e];
      a instanceof ge ? this.dom.removeChild(a.dom) : console.error("UIElement:", a, "is not an instance of UIElement.");
    }
    return this;
  }
  clear() {
    for (; this.dom.children.length; )
      this.dom.removeChild(this.dom.lastChild);
  }
  setId(e) {
    return this.dom.id = e, this;
  }
  getId() {
    return this.dom.id;
  }
  setClass(e) {
    return this.dom.className = e, this;
  }
  addClass(e) {
    return this.dom.classList.add(e), this;
  }
  removeClass(e) {
    return this.dom.classList.remove(e), this;
  }
  toggleClass(e, a) {
    return this.dom.classList.toggle(e, a), this;
  }
  setStyle(e, a) {
    for (let s = 0; s < a.length; s++)
      this.dom.style[e] = a[s];
    return this;
  }
  setHidden(e) {
    return this.dom.hidden = e, this;
  }
  isHidden() {
    return this.dom.hidden;
  }
  setDisabled(e) {
    return this.dom.disabled = e, this;
  }
  setTextContent(e) {
    return this.dom.textContent = e, this;
  }
  setInnerHTML(e) {
    this.dom.innerHTML = e;
  }
  getIndexOfChild(e) {
    return Array.prototype.indexOf.call(this.dom.children, e.dom);
  }
}
const Da = [
  "position",
  "left",
  "top",
  "right",
  "bottom",
  "width",
  "height",
  "display",
  "verticalAlign",
  "overflow",
  "color",
  "background",
  "backgroundColor",
  "opacity",
  "border",
  "borderLeft",
  "borderTop",
  "borderRight",
  "borderBottom",
  "borderColor",
  "margin",
  "marginLeft",
  "marginTop",
  "marginRight",
  "marginBottom",
  "padding",
  "paddingLeft",
  "paddingTop",
  "paddingRight",
  "paddingBottom",
  "fontSize",
  "fontWeight",
  "textAlign",
  "textDecoration",
  "textTransform",
  "cursor",
  "zIndex"
];
Da.forEach(function(t) {
  const e = "set" + t.substring(0, 1).toUpperCase() + t.substring(1);
  ge.prototype[e] = function() {
    return this.setStyle(t, arguments), this;
  };
});
const Ea = ["KeyUp", "KeyDown", "MouseOver", "MouseOut", "Click", "DblClick", "Change", "Input"];
Ea.forEach(function(t) {
  const e = "on" + t;
  ge.prototype[e] = function(a) {
    return this.dom.addEventListener(t.toLowerCase(), a.bind(this)), this;
  };
});
class Pe extends ge {
  constructor() {
    super(document.createElement("span"));
  }
}
class oe extends ge {
  constructor() {
    super(document.createElement("div"));
  }
}
class S extends oe {
  constructor() {
    super(), this.dom.className = "Row";
  }
}
class q extends oe {
  constructor() {
    super(), this.dom.className = "Panel";
  }
}
class k extends Pe {
  constructor(e) {
    super(), this.dom.className = "Text", this.dom.style.cursor = "default", this.dom.style.display = "inline-block", this.setValue(e);
  }
  getValue() {
    return this.dom.textContent;
  }
  setValue(e) {
    return e !== void 0 && (this.dom.textContent = e), this;
  }
}
class Ee extends ge {
  constructor(e) {
    super(document.createElement("input")), this.dom.className = "Input", this.dom.style.padding = "2px", this.dom.style.border = "1px solid transparent", this.dom.setAttribute("autocomplete", "off"), this.dom.addEventListener("keydown", function(a) {
      a.stopPropagation();
    }), this.setValue(e);
  }
  getValue() {
    return this.dom.value;
  }
  setValue(e) {
    return this.dom.value = e, this;
  }
}
class Rt extends ge {
  constructor() {
    super(document.createElement("textarea")), this.dom.className = "TextArea", this.dom.style.padding = "2px", this.dom.spellcheck = !1, this.dom.setAttribute("autocomplete", "off"), this.dom.addEventListener("keydown", function(e) {
      if (e.stopPropagation(), e.code === "Tab") {
        e.preventDefault();
        const a = this.selectionStart;
        this.value = this.value.substring(0, a) + "	" + this.value.substring(a), this.selectionStart = a + 1, this.selectionEnd = this.selectionStart;
      }
    });
  }
  getValue() {
    return this.dom.value;
  }
  setValue(e) {
    return this.dom.value = e, this;
  }
}
class pe extends ge {
  constructor() {
    super(document.createElement("select")), this.dom.className = "Select", this.dom.style.padding = "2px", this.dom.setAttribute("autocomplete", "off"), this.dom.addEventListener("pointerdown", function(e) {
      e.stopPropagation();
    });
  }
  setMultiple(e) {
    return this.dom.multiple = e, this;
  }
  setOptions(e) {
    const a = this.dom.value;
    for (; this.dom.children.length > 0; )
      this.dom.removeChild(this.dom.firstChild);
    for (const s in e) {
      const n = document.createElement("option");
      n.value = s, n.innerHTML = e[s], this.dom.appendChild(n);
    }
    return this.dom.value = a, this;
  }
  getValue() {
    return this.dom.value;
  }
  setValue(e) {
    return e = String(e), this.dom.value !== e && (this.dom.value = e), this;
  }
}
class Ne extends ge {
  constructor(e) {
    super(document.createElement("input")), this.dom.className = "Checkbox Input", this.dom.type = "checkbox", this.dom.addEventListener("pointerdown", function(a) {
      a.stopPropagation();
    }), this.setValue(e);
  }
  getValue() {
    return this.dom.checked;
  }
  setValue(e) {
    return e !== void 0 && (this.dom.checked = e), this;
  }
}
class ot extends ge {
  constructor() {
    super(document.createElement("input")), this.dom.className = "Color Input", this.dom.style.width = "32px", this.dom.style.height = "16px", this.dom.style.border = "0px", this.dom.style.padding = "2px", this.dom.style.backgroundColor = "transparent", this.dom.setAttribute("autocomplete", "off");
    try {
      this.dom.type = "color", this.dom.value = "#ffffff";
    } catch {
    }
  }
  getValue() {
    return this.dom.value;
  }
  getHexValue() {
    return parseInt(this.dom.value.substring(1), 16);
  }
  setValue(e) {
    return this.dom.value = e, this;
  }
  setHexValue(e) {
    return this.dom.value = "#" + ("000000" + e.toString(16)).slice(-6), this;
  }
}
class G extends ge {
  constructor(e) {
    super(document.createElement("input")), this.dom.style.cursor = "ns-resize", this.dom.className = "Number Input", this.dom.value = "0.00", this.dom.setAttribute("autocomplete", "off"), this.value = 0, this.min = -1 / 0, this.max = 1 / 0, this.precision = 2, this.step = 1, this.unit = "", this.nudge = 0.01, this.setValue(e);
    const a = this, s = new Event("change", { bubbles: !0, cancelable: !0 });
    let n = 0, r = 0;
    const l = { x: 0, y: 0 }, i = { x: 0, y: 0 };
    function c(b) {
      document.activeElement !== a.dom && (b.preventDefault(), n = 0, r = a.value, i.x = b.clientX, i.y = b.clientY, a.dom.setPointerCapture(b.pointerId), a.dom.addEventListener("pointermove", d), a.dom.addEventListener("pointerup", p));
    }
    function d(b) {
      const w = a.value;
      l.x = b.clientX, l.y = b.clientY, n += l.x - i.x - (l.y - i.y);
      let f = r + n / (b.shiftKey ? 5 : 50) * a.step;
      f = Math.min(a.max, Math.max(a.min, f)), w !== f && (a.setValue(f), a.dom.dispatchEvent(s)), i.x = b.clientX, i.y = b.clientY;
    }
    function p(b) {
      a.dom.releasePointerCapture(b.pointerId), a.dom.removeEventListener("pointermove", d), a.dom.removeEventListener("pointerup", p), Math.abs(n) < 2 && (a.dom.focus(), a.dom.select());
    }
    function m() {
      a.setValue(a.dom.value);
    }
    function o() {
      a.dom.style.backgroundColor = "", a.dom.style.cursor = "";
    }
    function u() {
      a.dom.style.backgroundColor = "transparent", a.dom.style.cursor = "ns-resize";
    }
    function g(b) {
      switch (b.stopPropagation(), b.code) {
        case "Enter":
          a.dom.blur();
          break;
        case "ArrowUp":
          b.preventDefault(), a.setValue(a.getValue() + a.nudge), a.dom.dispatchEvent(s);
          break;
        case "ArrowDown":
          b.preventDefault(), a.setValue(a.getValue() - a.nudge), a.dom.dispatchEvent(s);
          break;
      }
    }
    u(), this.dom.addEventListener("keydown", g), this.dom.addEventListener("pointerdown", c), this.dom.addEventListener("change", m), this.dom.addEventListener("focus", o), this.dom.addEventListener("blur", u);
  }
  getValue() {
    return this.value;
  }
  setValue(e) {
    return e !== void 0 && (e = parseFloat(e), e < this.min && (e = this.min), e > this.max && (e = this.max), this.value = e, this.dom.value = e.toFixed(this.precision), this.unit !== "" && (this.dom.value += " " + this.unit)), this;
  }
  setPrecision(e) {
    return this.precision = e, this;
  }
  setStep(e) {
    return this.step = e, this;
  }
  setNudge(e) {
    return this.nudge = e, this;
  }
  setRange(e, a) {
    return this.min = e, this.max = a, this;
  }
  setUnit(e) {
    return this.unit = e, this.setValue(this.value), this;
  }
}
class Ke extends ge {
  constructor(e) {
    super(document.createElement("input")), this.dom.style.cursor = "ns-resize", this.dom.className = "Number Input", this.dom.value = "0", this.dom.setAttribute("autocomplete", "off"), this.value = 0, this.min = -1 / 0, this.max = 1 / 0, this.step = 1, this.nudge = 1, this.setValue(e);
    const a = this, s = new Event("change", { bubbles: !0, cancelable: !0 });
    let n = 0, r = 0;
    const l = { x: 0, y: 0 }, i = { x: 0, y: 0 };
    function c(b) {
      document.activeElement !== a.dom && (b.preventDefault(), n = 0, r = a.value, i.x = b.clientX, i.y = b.clientY, a.dom.setPointerCapture(b.pointerId), a.dom.addEventListener("pointermove", d), a.dom.addEventListener("pointerup", p));
    }
    function d(b) {
      const w = a.value;
      l.x = b.clientX, l.y = b.clientY, n += l.x - i.x - (l.y - i.y);
      let f = r + n / (b.shiftKey ? 5 : 50) * a.step;
      f = Math.min(a.max, Math.max(a.min, f)) | 0, w !== f && (a.setValue(f), a.dom.dispatchEvent(s)), i.x = b.clientX, i.y = b.clientY;
    }
    function p(b) {
      a.dom.releasePointerCapture(b.pointerId), a.dom.removeEventListener("pointermove", d), a.dom.removeEventListener("pointerup", p), Math.abs(n) < 2 && (a.dom.focus(), a.dom.select());
    }
    function m() {
      a.setValue(a.dom.value);
    }
    function o() {
      a.dom.style.backgroundColor = "", a.dom.style.cursor = "";
    }
    function u() {
      a.dom.style.backgroundColor = "transparent", a.dom.style.cursor = "ns-resize";
    }
    function g(b) {
      switch (b.stopPropagation(), b.code) {
        case "Enter":
          a.dom.blur();
          break;
        case "ArrowUp":
          b.preventDefault(), a.setValue(a.getValue() + a.nudge), a.dom.dispatchEvent(s);
          break;
        case "ArrowDown":
          b.preventDefault(), a.setValue(a.getValue() - a.nudge), a.dom.dispatchEvent(s);
          break;
      }
    }
    u(), this.dom.addEventListener("keydown", g), this.dom.addEventListener("pointerdown", c), this.dom.addEventListener("change", m), this.dom.addEventListener("focus", o), this.dom.addEventListener("blur", u);
  }
  getValue() {
    return this.value;
  }
  setValue(e) {
    return e !== void 0 && (e = parseInt(e), this.value = e, this.dom.value = e), this;
  }
  setStep(e) {
    return this.step = parseInt(e), this;
  }
  setNudge(e) {
    return this.nudge = e, this;
  }
  setRange(e, a) {
    return this.min = e, this.max = a, this;
  }
}
class Se extends ge {
  constructor() {
    super(document.createElement("br")), this.dom.className = "Break";
  }
}
class ft extends ge {
  constructor() {
    super(document.createElement("hr")), this.dom.className = "HorizontalRule";
  }
}
class te extends ge {
  constructor(e) {
    super(document.createElement("button")), this.dom.className = "Button", this.dom.textContent = e;
  }
}
class _t extends oe {
  constructor() {
    super(), this.dom.className = "TabbedPanel", this.tabs = [], this.panels = [], this.tabsDiv = new oe(), this.tabsDiv.setClass("Tabs"), this.panelsDiv = new oe(), this.panelsDiv.setClass("Panels"), this.add(this.tabsDiv), this.add(this.panelsDiv), this.selected = "";
  }
  select(e) {
    let a, s;
    const n = this;
    if (this.selected && this.selected.length && (a = this.tabs.find(function(r) {
      return r.dom.id === n.selected;
    }), s = this.panels.find(function(r) {
      return r.dom.id === n.selected;
    }), a && a.removeClass("selected"), s && s.setDisplay("none")), a = this.tabs.find(function(r) {
      return r.dom.id === e;
    }), s = this.panels.find(function(r) {
      return r.dom.id === e;
    }), a && a.addClass("selected"), s && s.setDisplay(""), this.selected = e, a) {
      const r = a.dom.offsetLeft + a.dom.offsetWidth, l = this.tabsDiv.dom.getBoundingClientRect().width;
      r > l && this.tabsDiv.dom.scrollTo({ left: r - l, behavior: "smooth" }), a.dom.offsetLeft < this.tabsDiv.dom.scrollLeft && this.tabsDiv.dom.scrollTo({ left: 0, behavior: "smooth" });
    }
    return this;
  }
  addTab(e, a, s) {
    const n = new Na(a, this);
    n.setId(e), this.tabs.push(n), this.tabsDiv.add(n);
    const r = new oe();
    r.setId(e), r.add(s), r.setDisplay("none"), this.panels.push(r), this.panelsDiv.add(r), this.select(e);
  }
}
class Na extends k {
  constructor(e, a) {
    super(e), this.dom.className = "Tab", this.parent = a;
    const s = this;
    this.dom.addEventListener("click", function() {
      s.parent.select(s.dom.id);
    });
  }
}
class jt extends oe {
  constructor() {
    super(), this.dom.className = "Listbox", this.dom.tabIndex = 0, this.items = [], this.types = [], this.listitems = [], this.selectedIndex = 0, this.selectedValue = null;
  }
  setItems(e, a = []) {
    Array.isArray(e) && (this.items = e), Array.isArray(a) && (this.types = a), this.render();
  }
  render() {
    for (; this.listitems.length; )
      this.listitems[0].dom.remove(), this.listitems.splice(0, 1);
    for (let e = 0; e < this.items.length; e++) {
      const a = this.items[e], s = new Aa(this);
      s.setId(a.id || `Listbox-${e}`), s.setTextContent(a.name || this.types[e] || a.type), this.add(s);
    }
  }
  add() {
    const e = Array.from(arguments);
    this.listitems = this.listitems.concat(e), ge.prototype.add.apply(this, e);
  }
  selectIndex(e) {
    e >= 0 && e < this.items.length && this.setValue(this.listitems[e].getId()), this.selectedIndex = e;
  }
  getValue() {
    return this.selectedValue;
  }
  setValue(e) {
    for (let s = 0; s < this.listitems.length; s++) {
      const n = this.listitems[s];
      n.getId() === e ? n.addClass("active") : n.removeClass("active");
    }
    this.selectedValue = e;
    const a = new Event("change", { bubbles: !0, cancelable: !0 });
    this.dom.dispatchEvent(a);
  }
}
class Aa extends oe {
  constructor(e) {
    super(), this.dom.className = "ListboxItem", this.parent = e;
    const a = this;
    function s() {
      a.parent && a.parent.setValue(a.getId());
    }
    this.dom.addEventListener("click", s);
  }
}
function ir(t) {
  const e = t.signals, a = t.strings, s = t.mixer, n = new q();
  n.setId("animation"), n.dom.style.flexDirection = "column";
  let r = 36;
  e.animationPanelResized.add(function(I) {
    r = I, n.dom.style.height = I + "px", e.animationPanelChanged.dispatch(I);
  });
  const l = new q();
  l.dom.style.padding = "6px 10px", l.dom.style.borderBottom = "1px solid #ccc", l.dom.style.display = "flex", l.dom.style.alignItems = "center", l.dom.style.justifyContent = "center", l.dom.style.gap = "6px", l.dom.style.flexShrink = "0", n.add(l);
  const i = '<svg width="12" height="12" viewBox="0 0 12 12"><path d="M3 1.5v9l7-4.5z" fill="currentColor"/></svg>', c = '<svg width="12" height="12" viewBox="0 0 12 12"><path d="M2 1h3v10H2zM7 1h3v10H7z" fill="currentColor"/></svg>', d = '<svg width="12" height="12" viewBox="0 0 12 12"><rect x="2" y="2" width="8" height="8" fill="currentColor"/></svg>', p = new te();
  p.dom.innerHTML = i, p.dom.style.width = "24px", p.dom.style.height = "24px", p.dom.style.padding = "0", p.dom.style.borderRadius = "4px", p.dom.style.display = "flex", p.dom.style.alignItems = "center", p.dom.style.justifyContent = "center", p.onClick(function() {
    T && (T.paused ? T.paused = !1 : T.isRunning() || (T.reset(), T.play()));
  }), l.add(p);
  const m = new te();
  m.dom.innerHTML = c, m.dom.style.width = "24px", m.dom.style.height = "24px", m.dom.style.padding = "0", m.dom.style.borderRadius = "4px", m.dom.style.display = "flex", m.dom.style.alignItems = "center", m.dom.style.justifyContent = "center", m.onClick(function() {
    T && (T.paused = !0);
  }), l.add(m);
  const o = new te();
  o.dom.innerHTML = d, o.dom.style.width = "24px", o.dom.style.height = "24px", o.dom.style.padding = "0", o.dom.style.borderRadius = "4px", o.dom.style.display = "flex", o.dom.style.alignItems = "center", o.dom.style.justifyContent = "center", o.onClick(function() {
    T && T.stop();
  }), l.add(o);
  const u = document.createElement("div");
  u.style.display = "flex", u.style.alignItems = "center", u.style.justifyContent = "center", u.style.gap = "4px", u.style.height = "24px", u.style.padding = "0 8px", u.style.background = "rgba(0,0,0,0.05)", u.style.borderRadius = "4px", u.style.fontFamily = "monospace", u.style.fontSize = "11px", l.dom.appendChild(u);
  const g = new k("0.00").setWidth("36px");
  g.dom.style.textAlign = "right", u.appendChild(g.dom);
  const b = new k("/");
  u.appendChild(b.dom);
  const w = new k("0.00").setWidth("36px");
  u.appendChild(w.dom);
  const f = new G(1).setWidth("60px").setRange(-10, 10);
  f.onChange(function() {
    s.timeScale = f.getValue();
  }), l.add(new k(a.getKey("sidebar/animations/timescale")).setClass("Label")), l.add(f);
  const C = document.createElement("div");
  C.style.flex = "1", C.style.display = "flex", C.style.flexDirection = "column", C.style.overflow = "hidden", C.style.position = "relative", n.dom.appendChild(C);
  const O = document.createElement("div");
  O.style.flex = "1", O.style.overflowY = "auto", O.style.overflowX = "hidden", C.appendChild(O);
  const L = document.createElement("div");
  L.style.position = "absolute", L.style.top = "0", L.style.bottom = "0", L.style.width = "2px", L.style.background = "#f00", L.style.left = "150px", L.style.pointerEvents = "none", L.style.zIndex = "10", C.appendChild(L);
  let M = !1;
  const y = 150;
  function j(I) {
    const J = C.getBoundingClientRect(), E = y, K = J.width - y, F = Math.max(0, Math.min(I - J.left - E, K)) / K;
    if (T && N) {
      const V = F * N.duration;
      T.play(), T.time = V, T.paused = !0, t.mixer.update(0);
    }
  }
  C.addEventListener("mousedown", function(I) {
    const J = C.getBoundingClientRect();
    I.clientX - J.left > y && (I.preventDefault(), M = !0, j(I.clientX));
  }), document.addEventListener("mousemove", function(I) {
    M && j(I.clientX);
  }), document.addEventListener("mouseup", function() {
    M = !1;
  });
  const R = {
    position: "#4CAF50",
    quaternion: "#2196F3",
    rotation: "#2196F3",
    scale: "#FF9800",
    morphTargetInfluences: "#9C27B0",
    default: "#607D8B"
  };
  function A(I) {
    for (const J in R)
      if (I.endsWith("." + J))
        return R[J];
    return R.default;
  }
  function P(I) {
    const J = I.split(".");
    return J[J.length - 1];
  }
  let x = null, T = null, N = null, ee = null;
  function re() {
    const I = t.scene, J = [], E = /* @__PURE__ */ new Set();
    I.traverse(function(K) {
      if (K.animations && K.animations.length > 0)
        for (const D of K.animations)
          E.has(D.uuid) || (E.add(D.uuid), J.push({ clip: D, root: K }));
    });
    for (const K of I.animations)
      E.has(K.uuid) || (E.add(K.uuid), J.push({ clip: K, root: I }));
    return J;
  }
  function X(I, J) {
    const E = I.lastIndexOf(".");
    if (E === -1) return I;
    const K = I.substring(0, E), D = J.getObjectByProperty("uuid", K);
    return D ? D.name || "Object" : K.substring(0, 8);
  }
  function Z() {
    O.innerHTML = "", n.setDisplay("flex"), n.dom.style.height = r + "px", e.animationPanelChanged.dispatch(r);
    const I = re();
    if (I.length !== 0)
      for (const { clip: J, root: E } of I) {
        const K = document.createElement("div");
        K.style.display = "flex", K.style.alignItems = "center", K.style.height = "24px", K.style.borderBottom = "1px solid #ccc", K.style.cursor = "pointer", K.style.background = N === J ? "rgba(0, 136, 255, 0.1)" : "";
        const D = document.createElement("div");
        D.style.width = y + "px", D.style.padding = "0 10px", D.style.fontSize = "11px", D.style.fontWeight = "bold", D.style.overflow = "hidden", D.style.textOverflow = "ellipsis", D.style.whiteSpace = "nowrap", D.style.flexShrink = "0", D.style.boxSizing = "border-box", D.textContent = J.name || "Animation", K.appendChild(D);
        const F = document.createElement("div");
        if (F.style.flex = "1", F.style.height = "100%", F.style.background = "rgba(0,0,0,0.03)", K.appendChild(F), K.addEventListener("click", function() {
          t.selected !== E && (e.objectSelected.remove(Y), t.select(E), e.objectSelected.add(Y)), ae(J, E), Z();
        }), O.appendChild(K), N === J) {
          const V = J.duration;
          for (const U of J.tracks) {
            const z = U.times;
            if (z.length === 0) continue;
            const Q = z[0], ie = z[z.length - 1], Ce = Q / V * 100, Oe = (ie - Q) / V * 100, he = document.createElement("div");
            he.style.display = "flex", he.style.alignItems = "center", he.style.height = "20px", he.style.borderBottom = "1px solid #eee";
            const be = document.createElement("div");
            be.style.width = y + "px", be.style.padding = "0 10px 0 20px", be.style.fontSize = "10px", be.style.overflow = "hidden", be.style.textOverflow = "ellipsis", be.style.whiteSpace = "nowrap", be.style.flexShrink = "0", be.style.boxSizing = "border-box", be.style.color = "#666";
            const Ae = X(U.name, E), De = P(U.name);
            be.textContent = Ae + "." + De, be.title = U.name, he.appendChild(be);
            const Me = document.createElement("div");
            Me.style.flex = "1", Me.style.height = "100%", Me.style.position = "relative", Me.style.background = "rgba(0,0,0,0.02)";
            const xe = document.createElement("div");
            xe.style.position = "absolute", xe.style.left = Ce + "%", xe.style.width = Math.max(0.5, Oe) + "%", xe.style.top = "3px", xe.style.bottom = "3px", xe.style.background = A(U.name), xe.style.borderRadius = "2px", xe.style.opacity = "0.6", xe.title = De + ": " + Q.toFixed(2) + "s - " + ie.toFixed(2) + "s", Me.appendChild(xe);
            for (let je = 0; je < z.length; je++) {
              const ke = z[je] / V * 100, ye = document.createElement("div");
              ye.style.position = "absolute", ye.style.left = ke + "%", ye.style.top = "50%", ye.style.width = "6px", ye.style.height = "6px", ye.style.marginLeft = "-3px", ye.style.marginTop = "-3px", ye.style.background = A(U.name), ye.style.borderRadius = "1px", ye.style.transform = "rotate(45deg)", ye.title = z[je].toFixed(3) + "s", Me.appendChild(ye);
            }
            if (he.appendChild(Me), U.name.endsWith(".position") && U.getValueSize() === 3) {
              const je = U.name.replace(".position", ""), ke = E.getObjectByProperty("uuid", je);
              ke && (he.addEventListener("mouseenter", function() {
                W(J, ke);
              }), he.addEventListener("mouseleave", function() {
                _();
              }));
            }
            O.appendChild(he);
          }
        }
      }
  }
  function ae(I, J) {
    T && T.stop(), N === I ? (T = null, N = null, ee = null, g.setValue("0.00"), w.setValue("0.00")) : (N = I, ee = J, T = t.mixer.clipAction(I, J), w.setValue(I.duration.toFixed(2)));
  }
  function W(I, J) {
    _(), x = new pa(ee, I, J), t.sceneHelpers.add(x), e.sceneGraphChanged.dispatch();
  }
  function _() {
    x && (t.sceneHelpers.remove(x), x.dispose(), x = null, e.sceneGraphChanged.dispatch());
  }
  function B() {
    _(), O.innerHTML = "", T = null, N = null, ee = null, g.setValue("0.00"), w.setValue("0.00");
  }
  function $() {
    if (T && N) {
      const I = T.time % N.duration;
      g.setValue(I.toFixed(2));
      const E = C.getBoundingClientRect().width - y, K = y + I / N.duration * E;
      L.style.left = K + "px";
    }
    requestAnimationFrame($);
  }
  function Y(I) {
    I !== null && I.animations && I.animations.length > 0 && (ae(I.animations[0], I), Z());
  }
  return $(), e.objectSelected.add(Y), e.editorCleared.add(B), e.objectAdded.add(Z), e.objectRemoved.add(Z), n.setDisplay("flex"), n.dom.style.height = r + "px", e.animationPanelChanged.dispatch(r), n;
}
function or(t) {
  const e = t.signals, a = document.createElement("div");
  a.id = "animation-resizer";
  let s = 36, n = 0, r = 0;
  function l(d) {
    d.isPrimary !== !1 && (n = d.clientY, r = s, a.ownerDocument.addEventListener("pointermove", c), a.ownerDocument.addEventListener("pointerup", i));
  }
  function i(d) {
    d.isPrimary !== !1 && (a.ownerDocument.removeEventListener("pointermove", c), a.ownerDocument.removeEventListener("pointerup", i));
  }
  function c(d) {
    if (d.isPrimary === !1) return;
    const p = n - d.clientY, m = r + p, o = window.innerHeight / 2;
    s = Math.max(36, Math.min(o, m)), e.animationPanelResized.dispatch(s);
  }
  return a.addEventListener("pointerdown", l), e.animationPanelChanged.add(function(d) {
    d === !1 ? a.style.display = "none" : (a.style.display = "block", a.style.bottom = d + "px", s = d);
  }), new ge(a);
}
function Ia() {
  const t = "threejs-editor", e = navigator.language.split("-")[0], s = {
    language: ["fr", "ja", "zh", "ko", "fa"].includes(e) ? e : "en",
    autosave: !0,
    "project/title": "",
    "project/editable": !1,
    "project/vr": !1,
    "project/camera": "perspective",
    "project/renderer/type": "WebGLRenderer",
    "project/renderer/antialias": !0,
    "project/renderer/shadows": !0,
    "project/renderer/shadowType": 1,
    // PCF
    "project/renderer/toneMapping": 7,
    // NeutralToneMapping
    "project/renderer/toneMappingExposure": 1,
    "settings/history": !1,
    "settings/shortcuts/translate": "w",
    "settings/shortcuts/rotate": "e",
    "settings/shortcuts/scale": "r",
    "settings/shortcuts/undo": "z",
    "settings/shortcuts/focus": "f",
    "settings/shortcuts/perspective": "p",
    "settings/shortcuts/orthographic": "o"
  };
  if (window.localStorage[t] === void 0)
    window.localStorage[t] = JSON.stringify(s);
  else {
    const n = JSON.parse(window.localStorage[t]);
    for (const r in n)
      s[r] = n[r];
  }
  return {
    getKey: function(n) {
      return s[n];
    },
    setKey: function() {
      for (let n = 0, r = arguments.length; n < r; n += 2)
        s[arguments[n]] = arguments[n + 1];
      window.localStorage[t] = JSON.stringify(s), console.log("[" + /\d\d\:\d\d\:\d\d/.exec(/* @__PURE__ */ new Date())[0] + "]", "Saved config to LocalStorage.");
    },
    clear: function() {
      delete window.localStorage[t];
    }
  };
}
class ce {
  /**
   * @param {Editor} editor pointer to main editor object used to initialize
   *        each command object with a reference to the editor
   * @constructor
   */
  constructor(e) {
    this.id = -1, this.inMemory = !1, this.updatable = !1, this.type = "", this.name = "", this.editor = e;
  }
  toJSON() {
    const e = {};
    return e.type = this.type, e.id = this.id, e.name = this.name, e;
  }
  fromJSON(e) {
    this.inMemory = !0, this.type = e.type, this.id = e.id, this.name = e.name;
  }
}
class H extends ce {
  /**
   * @param {Editor} editor
   * @param {THREE.Object3D|null} [object=null]
   * @constructor
   */
  constructor(e, a = null) {
    super(e), this.type = "AddObjectCommand", this.object = a, a !== null && (this.name = e.strings.getKey("command/AddObject") + ": " + a.name);
  }
  execute() {
    this.editor.addObject(this.object), this.editor.select(this.object);
  }
  undo() {
    this.editor.removeObject(this.object), this.editor.deselect();
  }
  toJSON() {
    const e = super.toJSON(this);
    return e.object = this.object.toJSON(), e;
  }
  fromJSON(e) {
    if (super.fromJSON(e), this.object = this.editor.objectByUuid(e.object.object.uuid), this.object === void 0) {
      const a = new lt();
      this.object = a.parse(e.object);
    }
  }
}
class kt extends ce {
  /**
   * @param {Editor} editor
   * @param {THREE.Object3D|null} object
   * @param {string|null} newUuid
   * @constructor
   */
  constructor(e, a = null, s = null) {
    super(e), this.type = "SetUuidCommand", this.name = e.strings.getKey("command/SetUuid"), this.object = a, this.oldUuid = a !== null ? a.uuid : null, this.newUuid = s;
  }
  execute() {
    this.object.uuid = this.newUuid, this.editor.signals.objectChanged.dispatch(this.object), this.editor.signals.sceneGraphChanged.dispatch();
  }
  undo() {
    this.object.uuid = this.oldUuid, this.editor.signals.objectChanged.dispatch(this.object), this.editor.signals.sceneGraphChanged.dispatch();
  }
  toJSON() {
    const e = super.toJSON(this);
    return e.oldUuid = this.oldUuid, e.newUuid = this.newUuid, e;
  }
  fromJSON(e) {
    super.fromJSON(e), this.oldUuid = e.oldUuid, this.newUuid = e.newUuid, this.object = this.editor.objectByUuid(e.oldUuid), this.object === void 0 && (this.object = this.editor.objectByUuid(e.newUuid));
  }
}
class ue extends ce {
  /**
   * @param {Editor} editor
   * @param {THREE.Object3D|null} object
   * @param {string} attributeName
   * @param {number|string|boolean|Object|null} newValue
   * @constructor
   */
  constructor(e, a = null, s = "", n = null) {
    super(e), this.type = "SetValueCommand", this.name = e.strings.getKey("command/SetValue") + ": " + s, this.updatable = !0, this.object = a, this.attributeName = s, this.oldValue = a !== null ? a[s] : null, this.newValue = n;
  }
  execute() {
    this.object[this.attributeName] = this.newValue, this.editor.signals.objectChanged.dispatch(this.object);
  }
  undo() {
    this.object[this.attributeName] = this.oldValue, this.editor.signals.objectChanged.dispatch(this.object);
  }
  update(e) {
    this.newValue = e.newValue;
  }
  toJSON() {
    const e = super.toJSON(this);
    return e.objectUuid = this.object.uuid, e.attributeName = this.attributeName, e.oldValue = this.oldValue, e.newValue = this.newValue, e;
  }
  fromJSON(e) {
    super.fromJSON(e), this.attributeName = e.attributeName, this.oldValue = e.oldValue, this.newValue = e.newValue, this.object = this.editor.objectByUuid(e.objectUuid);
  }
}
class nt extends ce {
  /**
   * @param {Editor} editor
   * @param {THREE.Scene|null} [scene=null]
   * @constructor
   */
  constructor(e, a = null) {
    if (super(e), this.type = "SetSceneCommand", this.name = e.strings.getKey("command/SetScene"), this.cmdArray = [], a !== null)
      for (this.cmdArray.push(new kt(this.editor, this.editor.scene, a.uuid)), this.cmdArray.push(new ue(this.editor, this.editor.scene, "name", a.name)), this.cmdArray.push(new ue(this.editor, this.editor.scene, "userData", JSON.parse(JSON.stringify(a.userData)))), this.cmdArray.push(new ue(this.editor, this.editor.scene, "animations", a.animations)); a.children.length > 0; ) {
        const s = a.children.pop();
        this.cmdArray.push(new H(this.editor, s));
      }
  }
  execute() {
    this.editor.signals.sceneGraphChanged.active = !1;
    for (let e = 0; e < this.cmdArray.length; e++)
      this.cmdArray[e].execute();
    this.editor.signals.sceneGraphChanged.active = !0, this.editor.signals.sceneGraphChanged.dispatch();
  }
  undo() {
    this.editor.signals.sceneGraphChanged.active = !1;
    for (let e = this.cmdArray.length - 1; e >= 0; e--)
      this.cmdArray[e].undo();
    this.editor.signals.sceneGraphChanged.active = !0, this.editor.signals.sceneGraphChanged.dispatch();
  }
  toJSON() {
    const e = super.toJSON(this), a = [];
    for (let s = 0; s < this.cmdArray.length; s++)
      a.push(this.cmdArray[s].toJSON());
    return e.cmds = a, e;
  }
  fromJSON(e) {
    super.fromJSON(e);
    const a = e.cmds;
    for (let s = 0; s < a.length; s++) {
      const n = new window[a[s].type]();
      n.fromJSON(a[s]), this.cmdArray.push(n);
    }
  }
}
const Ft = {
  createFilesMap: function(t) {
    const e = {};
    for (let a = 0; a < t.length; a++) {
      const s = t[a];
      e[s.name] = s;
    }
    return e;
  },
  getFilesFromItemList: function(t, e) {
    let a = 0, s = 0;
    const n = [], r = {};
    function l() {
      a++, a === s && e(n, r);
    }
    function i(c) {
      c.isDirectory ? c.createReader().readEntries(function(p) {
        for (let m = 0; m < p.length; m++)
          i(p[m]);
        l();
      }) : c.isFile && c.file(function(d) {
        n.push(d), r[c.fullPath.slice(1)] = d, l();
      }), s++;
    }
    for (let c = 0; c < t.length; c++) {
      const d = t[c];
      d.kind === "file" && i(d.webkitGetAsEntry());
    }
  }
};
class pt {
  constructor(e) {
    this.strings = e;
    const a = document.createElement("div");
    a.className = "Dialog", this.dom = a;
    const s = document.createElement("div");
    s.className = "Dialog-background", s.addEventListener("click", () => this.cancel()), a.appendChild(s);
    const n = document.createElement("div");
    n.className = "Dialog-content", a.appendChild(n);
    const r = document.createElement("div");
    r.className = "Dialog-title", r.textContent = e.getKey("dialog/gltf/title"), n.appendChild(r);
    const l = document.createElement("div");
    l.className = "Dialog-body", n.appendChild(l);
    const i = new S();
    l.appendChild(i.dom), this.asSceneCheckbox = new Ne(!1), i.add(this.asSceneCheckbox), i.add(new k(e.getKey("dialog/gltf/asScene")).setMarginLeft("6px"));
    const c = document.createElement("div");
    c.className = "Dialog-buttons", l.appendChild(c);
    const d = new te(e.getKey("dialog/ok"));
    d.setWidth("80px"), d.onClick(() => this.confirm()), c.appendChild(d.dom);
    const p = new te(e.getKey("dialog/cancel"));
    p.setWidth("80px"), p.setMarginLeft("8px"), p.onClick(() => this.cancel()), c.appendChild(p.dom), this.resolve = null, this.reject = null;
  }
  show() {
    return document.body.appendChild(this.dom), new Promise((e, a) => {
      this.resolve = e, this.reject = a;
    });
  }
  confirm() {
    const e = {
      asScene: this.asSceneCheckbox.getValue()
    };
    this.dom.remove(), this.resolve && this.resolve(e);
  }
  cancel() {
    this.dom.remove(), this.reject && this.reject(new Error("Import cancelled"));
  }
}
function Ka(t) {
  const e = this;
  this.texturePath = "", this.loadItemList = function(r) {
    Ft.getFilesFromItemList(r, function(l, i) {
      e.loadFiles(l, i);
    });
  }, this.loadFiles = function(r, l) {
    if (r.length > 0) {
      l = l || Ft.createFilesMap(r);
      const i = function(m) {
        let o = String(m || "").replace(/\\/g, "/");
        const u = o.indexOf("?");
        u !== -1 && (o = o.slice(0, u));
        const g = o.indexOf("#");
        for (g !== -1 && (o = o.slice(0, g)); o.startsWith("./"); ) o = o.slice(2);
        for (; o.startsWith("../"); ) o = o.slice(3);
        for (; o.startsWith("/"); ) o = o.slice(1);
        try {
          o = decodeURIComponent(o);
        } catch {
        }
        return o = o.normalize("NFC"), o;
      }, d = function(m) {
        const o = {}, u = /* @__PURE__ */ new Set(), g = function(b, w) {
          o[b] || (o[b] = []), o[b].push(w);
        };
        for (const b in m) {
          const w = i(b), f = m[b];
          if (w === "" || !f) continue;
          const C = w.split("/");
          for (let O = 0; O < C.length; O++) {
            const L = C.slice(O).join("/");
            L !== "" && g(L, { key: w, file: f });
          }
        }
        for (const b in o)
          o[b].sort(function(w, f) {
            return w.key.length !== f.key.length ? w.key.length - f.key.length : w.key < f.key ? -1 : w.key > f.key ? 1 : 0;
          });
        return function(w) {
          const f = i(w);
          if (f === "") return null;
          const C = o[f];
          if (!C || C.length === 0) return null;
          if (C.length === 1) return C[0];
          for (let O = 0; O < C.length; O++)
            if (C[O].key === f) return C[O];
          return u.has(f) || (console.warn('Loader: Ambiguous file reference "' + f + '". Using "' + C[0].key + '".'), u.add(f)), C[0];
        };
      }(l), p = new h.LoadingManager();
      p.setURLModifier(function(m) {
        const o = d(m);
        return o ? (console.log("Loading", m), URL.createObjectURL(o.file)) : m;
      }), p.addHandler(/\.tga$/i, new ba());
      for (let m = 0; m < r.length; m++)
        e.loadFile(r[m], p);
    }
  }, this.loadFile = function(r, l) {
    const i = r.name, c = i.split(".").pop().toLowerCase(), d = new FileReader();
    switch (d.addEventListener("progress", function(p) {
      const m = "(" + t.utils.formatNumber(Math.floor(p.total / 1e3)) + " KB)", o = Math.floor(p.loaded / p.total * 100) + "%";
      console.log("Loading", i, m, o);
    }), c) {
      case "3dm": {
        d.addEventListener("load", async function(p) {
          const m = p.target.result, { Rhino3dmLoader: o } = await import("three/addons/loaders/3DMLoader.js"), u = new o();
          u.setLibraryPath("../examples/jsm/libs/rhino3dm/"), u.parse(m, function(g) {
            g.name = i, t.execute(new H(t, g));
          }, function(g) {
            console.error(g);
          });
        }, !1), d.readAsArrayBuffer(r);
        break;
      }
      case "3ds": {
        d.addEventListener("load", async function(p) {
          const { TDSLoader: m } = await import("three/addons/loaders/TDSLoader.js"), u = new m().parse(p.target.result);
          t.execute(new H(t, u));
        }, !1), d.readAsArrayBuffer(r);
        break;
      }
      case "3mf": {
        d.addEventListener("load", async function(p) {
          const { ThreeMFLoader: m } = await import("three/addons/loaders/3MFLoader.js"), u = new m().parse(p.target.result);
          t.execute(new H(t, u));
        }, !1), d.readAsArrayBuffer(r);
        break;
      }
      case "amf": {
        d.addEventListener("load", async function(p) {
          const { AMFLoader: m } = await import("three/addons/loaders/AMFLoader.js"), u = new m().parse(p.target.result);
          t.execute(new H(t, u));
        }, !1), d.readAsArrayBuffer(r);
        break;
      }
      case "dae": {
        d.addEventListener("load", async function(p) {
          const m = p.target.result, { ColladaLoader: o } = await import("three/addons/loaders/ColladaLoader.js"), g = new o(l).parse(m);
          g.scene.name = i, t.execute(new H(t, g.scene));
        }, !1), d.readAsText(r);
        break;
      }
      case "drc": {
        d.addEventListener("load", async function(p) {
          const m = p.target.result, { DRACOLoader: o } = await import("three/addons/loaders/DRACOLoader.js"), u = new o();
          u.setDecoderPath("../examples/jsm/libs/draco/"), u.parse(m, function(g) {
            let b;
            if (g.index !== null) {
              const w = new h.MeshStandardMaterial();
              b = new h.Mesh(g, w), b.name = i;
            } else {
              const w = new h.PointsMaterial({ size: 0.01 });
              w.vertexColors = g.hasAttribute("color"), b = new h.Points(g, w), b.name = i;
            }
            u.dispose(), t.execute(new H(t, b));
          });
        }, !1), d.readAsArrayBuffer(r);
        break;
      }
      case "fbx": {
        d.addEventListener("load", async function(p) {
          const m = p.target.result, { FBXLoader: o } = await import("three/addons/loaders/FBXLoader.js"), g = new o(l).parse(m);
          t.execute(new H(t, g));
        }, !1), d.readAsArrayBuffer(r);
        break;
      }
      case "glb": {
        d.addEventListener("load", async function(p) {
          const m = p.target.result;
          try {
            const u = await new pt(t.strings).show(), g = await n();
            g.parse(m, "", function(b) {
              const w = b.scene;
              w.name = i, w.animations.push(...b.animations), u.asScene ? t.execute(new nt(t, w)) : t.execute(new H(t, w)), g.dracoLoader.dispose(), g.ktx2Loader.dispose();
            });
          } catch {
          }
        }, !1), d.readAsArrayBuffer(r);
        break;
      }
      case "gltf": {
        d.addEventListener("load", async function(p) {
          const m = p.target.result;
          try {
            const u = await new pt(t.strings).show(), g = await n(l);
            g.parse(m, "", function(b) {
              const w = b.scene;
              w.name = i, w.animations.push(...b.animations), u.asScene ? t.execute(new nt(t, w)) : t.execute(new H(t, w)), g.dracoLoader.dispose(), g.ktx2Loader.dispose();
            });
          } catch {
          }
        }, !1), d.readAsArrayBuffer(r);
        break;
      }
      case "js":
      case "json": {
        d.addEventListener("load", function(p) {
          const m = p.target.result;
          let o;
          try {
            o = JSON.parse(m);
          } catch (u) {
            alert(u);
            return;
          }
          a(o);
        }, !1), d.readAsText(r);
        break;
      }
      case "kmz": {
        d.addEventListener("load", async function(p) {
          const { KMZLoader: m } = await import("three/addons/loaders/KMZLoader.js"), u = new m().parse(p.target.result);
          u.scene.name = i, t.execute(new H(t, u.scene));
        }, !1), d.readAsArrayBuffer(r);
        break;
      }
      case "ldr":
      case "mpd": {
        d.addEventListener("load", async function(p) {
          const { LDrawLoader: m } = await import("three/addons/loaders/LDrawLoader.js"), o = new m();
          o.setPath("../../examples/models/ldraw/officialLibrary/"), o.parse(p.target.result, function(u) {
            u.name = i, u.rotation.x = Math.PI, t.execute(new H(t, u));
          });
        }, !1), d.readAsText(r);
        break;
      }
      case "md2": {
        d.addEventListener("load", async function(p) {
          const m = p.target.result, { MD2Loader: o } = await import("three/addons/loaders/MD2Loader.js"), u = new o().parse(m), g = new h.MeshStandardMaterial(), b = new h.Mesh(u, g);
          b.mixer = new h.AnimationMixer(b), b.name = i, b.animations.push(...u.animations), t.execute(new H(t, b));
        }, !1), d.readAsArrayBuffer(r);
        break;
      }
      case "obj": {
        d.addEventListener("load", async function(p) {
          const m = p.target.result, { OBJLoader: o } = await import("three/addons/loaders/OBJLoader.js"), u = new o().parse(m);
          u.name = i, t.execute(new H(t, u));
        }, !1), d.readAsText(r);
        break;
      }
      case "pcd": {
        d.addEventListener("load", async function(p) {
          const m = p.target.result, { PCDLoader: o } = await import("three/addons/loaders/PCDLoader.js"), u = new o().parse(m);
          u.name = i, t.execute(new H(t, u));
        }, !1), d.readAsArrayBuffer(r);
        break;
      }
      case "ply": {
        d.addEventListener("load", async function(p) {
          const m = p.target.result, { PLYLoader: o } = await import("three/addons/loaders/PLYLoader.js"), u = new o().parse(m);
          let g;
          if (u.index !== null) {
            const b = new h.MeshStandardMaterial();
            g = new h.Mesh(u, b), g.name = i;
          } else {
            const b = new h.PointsMaterial({ size: 0.01 });
            b.vertexColors = u.hasAttribute("color"), g = new h.Points(u, b), g.name = i;
          }
          t.execute(new H(t, g));
        }, !1), d.readAsArrayBuffer(r);
        break;
      }
      case "stl": {
        d.addEventListener("load", async function(p) {
          const m = p.target.result, { STLLoader: o } = await import("three/addons/loaders/STLLoader.js"), u = new o().parse(m), g = new h.MeshStandardMaterial(), b = new h.Mesh(u, g);
          b.name = i, t.execute(new H(t, b));
        }, !1), d.readAsBinaryString !== void 0 ? d.readAsBinaryString(r) : d.readAsArrayBuffer(r);
        break;
      }
      case "svg": {
        d.addEventListener("load", async function(p) {
          const m = p.target.result, { SVGLoader: o } = await import("three/addons/loaders/SVGLoader.js"), g = new o().parse(m).paths, b = new h.Group();
          b.name = i, b.scale.multiplyScalar(0.1), b.scale.y *= -1;
          let w = 0;
          for (let f = 0; f < g.length; f++) {
            const C = g[f], O = o.createFillMaterial(C);
            if (O) {
              const M = C.toShapes();
              for (let y = 0; y < M.length; y++) {
                const j = M[y], R = new h.ShapeGeometry(j), A = new h.Mesh(R, O);
                A.renderOrder = w++, b.add(A);
              }
            }
            const L = o.createStrokeMaterial(C);
            if (L)
              for (const M of C.subPaths) {
                const y = o.pointsToStroke(M.getPoints(), C.userData.style);
                if (y) {
                  const j = new h.Mesh(y, L);
                  j.renderOrder = w++, b.add(j);
                }
              }
          }
          t.execute(new H(t, b));
        }, !1), d.readAsText(r);
        break;
      }
      case "usd":
      case "usda":
      case "usdc":
      case "usdz": {
        d.addEventListener("load", async function(p) {
          const m = p.target.result, { USDLoader: o } = await import("three/addons/loaders/USDLoader.js");
          new o(l).parse(m, "", function(g) {
            g.name = i, t.execute(new H(t, g));
          });
        }, !1), d.readAsArrayBuffer(r);
        break;
      }
      case "vox": {
        d.addEventListener("load", async function(p) {
          const m = p.target.result, { VOXLoader: o } = await import("three/addons/loaders/VOXLoader.js"), { scene: u } = new o().parse(m);
          u.name = i, t.execute(new H(t, u));
        }, !1), d.readAsArrayBuffer(r);
        break;
      }
      case "wrl": {
        d.addEventListener("load", async function(p) {
          const m = p.target.result, { VRMLLoader: o } = await import("three/addons/loaders/VRMLLoader.js"), u = new o().parse(m);
          t.execute(new H(t, u));
        }, !1), d.readAsText(r);
        break;
      }
      case "xyz": {
        d.addEventListener("load", async function(p) {
          const m = p.target.result, { XYZLoader: o } = await import("three/addons/loaders/XYZLoader.js"), u = new o().parse(m), g = new h.PointsMaterial();
          g.vertexColors = u.hasAttribute("color");
          const b = new h.Points(u, g);
          b.name = i, t.execute(new H(t, b));
        }, !1), d.readAsText(r);
        break;
      }
      case "zip": {
        d.addEventListener("load", function(p) {
          s(p.target.result);
        }, !1), d.readAsArrayBuffer(r);
        break;
      }
      case "bmp":
      case "gif":
      case "jpg":
      case "jpeg":
      case "png":
      case "tga":
        break;
      default:
        console.error("Unsupported file format (" + c + ").");
        break;
    }
  };
  function a(r) {
    switch (r.metadata === void 0 && (r.metadata = { type: "Geometry" }), r.metadata.type === void 0 && (r.metadata.type = "Geometry"), r.metadata.formatVersion !== void 0 && (r.metadata.version = r.metadata.formatVersion), r.metadata.type.toLowerCase()) {
      case "buffergeometry": {
        const i = new h.BufferGeometryLoader().parse(r), c = new h.Mesh(i);
        t.execute(new H(t, c));
        break;
      }
      case "geometry":
        console.error('Loader: "Geometry" is no longer supported.');
        break;
      case "object": {
        const l = new h.ObjectLoader();
        l.setResourcePath(e.texturePath), l.parse(r, function(i) {
          t.execute(new H(t, i));
        });
        break;
      }
      case "app":
        t.fromJSON(r);
        break;
    }
  }
  async function s(r) {
    const l = ya(new Uint8Array(r)), i = {};
    for (const d in l)
      i[d.normalize("NFC")] = l[d];
    const c = new h.LoadingManager();
    if (c.setURLModifier(function(d) {
      const p = decodeURIComponent(d).normalize("NFC"), m = i[p];
      if (m) {
        console.log("Loading", d);
        const o = new Blob([m.buffer], { type: "application/octet-stream" });
        return URL.createObjectURL(o);
      }
      return d;
    }), l["model.obj"] && l["materials.mtl"]) {
      const { MTLLoader: d } = await import("three/addons/loaders/MTLLoader.js"), { OBJLoader: p } = await import("three/addons/loaders/OBJLoader.js"), m = new d(c).parse(Mt(l["materials.mtl"])), o = new p().setMaterials(m).parse(Mt(l["model.obj"]));
      t.execute(new H(t, o));
      return;
    }
    for (const d in l) {
      const p = l[d];
      switch (d.split(".").pop().toLowerCase()) {
        case "fbx": {
          const { FBXLoader: o } = await import("three/addons/loaders/FBXLoader.js"), g = new o(c).parse(p.buffer);
          t.execute(new H(t, g));
          break;
        }
        case "glb": {
          try {
            const u = await new pt(t.strings).show(), g = await n();
            g.parse(p.buffer, "", function(b) {
              const w = b.scene;
              w.animations.push(...b.animations), u.asScene ? t.execute(new nt(t, w)) : t.execute(new H(t, w)), g.dracoLoader.dispose(), g.ktx2Loader.dispose();
            });
          } catch {
          }
          break;
        }
        case "gltf": {
          try {
            const u = await new pt(t.strings).show(), g = await n(c);
            g.parse(Mt(p), "", function(b) {
              const w = b.scene;
              w.animations.push(...b.animations), u.asScene ? t.execute(new nt(t, w)) : t.execute(new H(t, w)), g.dracoLoader.dispose(), g.ktx2Loader.dispose();
            });
          } catch {
          }
          break;
        }
      }
    }
  }
  async function n(r) {
    const { GLTFLoader: l } = await import("three/addons/loaders/GLTFLoader.js"), { DRACOLoader: i } = await import("three/addons/loaders/DRACOLoader.js"), { KTX2Loader: c } = await import("three/addons/loaders/KTX2Loader.js"), { MeshoptDecoder: d } = await import("three/addons/libs/meshopt_decoder.module.js"), p = new i();
    p.setDecoderPath("../examples/jsm/libs/draco/gltf/");
    const m = new c(r);
    m.setTranscoderPath("../examples/jsm/libs/basis/"), t.signals.rendererDetectKTX2Support.dispatch(m);
    const o = new l(r);
    return o.setDRACOLoader(p), o.setKTX2Loader(m), o.setMeshoptDecoder(d), o;
  }
}
class $t extends ce {
  /**
   * @param {Editor} editor
   * @param {THREE.Object3D|null} [object=null]
   * @param {string} [script='']
   * @constructor
   */
  constructor(e, a = null, s = "") {
    super(e), this.type = "AddScriptCommand", this.name = e.strings.getKey("command/AddScript"), this.object = a, this.script = s;
  }
  execute() {
    this.editor.scripts[this.object.uuid] === void 0 && (this.editor.scripts[this.object.uuid] = []), this.editor.scripts[this.object.uuid].push(this.script), this.editor.signals.scriptAdded.dispatch(this.script);
  }
  undo() {
    if (this.editor.scripts[this.object.uuid] === void 0) return;
    const e = this.editor.scripts[this.object.uuid].indexOf(this.script);
    e !== -1 && this.editor.scripts[this.object.uuid].splice(e, 1), this.editor.signals.scriptRemoved.dispatch(this.script);
  }
  toJSON() {
    const e = super.toJSON(this);
    return e.objectUuid = this.object.uuid, e.script = this.script, e;
  }
  fromJSON(e) {
    super.fromJSON(e), this.script = e.script, this.object = this.editor.objectByUuid(e.objectUuid);
  }
}
class Yt extends ce {
  /**
   * @param {Editor} editor
   * @param {THREE.Object3D|null} [object=null]
   * @param {THREE.Object3D|null} [newParent=null]
   * @param {THREE.Object3D|null} [newBefore=null]
   * @constructor
   */
  constructor(e, a = null, s = null, n = null) {
    super(e), this.type = "MoveObjectCommand", this.name = e.strings.getKey("command/MoveObject"), this.object = a, this.oldParent = a !== null ? a.parent : null, this.oldIndex = this.oldParent !== null ? this.oldParent.children.indexOf(this.object) : null, this.newParent = s, n !== null ? this.newIndex = s !== null ? s.children.indexOf(n) : null : this.newIndex = s !== null ? s.children.length : null, this.oldParent === this.newParent && this.newIndex > this.oldIndex && this.newIndex--, this.newBefore = n;
  }
  execute() {
    this.oldParent.remove(this.object), this.newParent.children.splice(this.newIndex, 0, this.object), this.object.parent = this.newParent, this.object.dispatchEvent({ type: "added" }), this.editor.signals.objectChanged.dispatch(this.object), this.editor.signals.objectChanged.dispatch(this.newParent), this.editor.signals.objectChanged.dispatch(this.oldParent), this.editor.signals.sceneGraphChanged.dispatch();
  }
  undo() {
    this.newParent.remove(this.object), this.oldParent.children.splice(this.oldIndex, 0, this.object), this.object.parent = this.oldParent, this.object.dispatchEvent({ type: "added" }), this.editor.signals.objectChanged.dispatch(this.object), this.editor.signals.objectChanged.dispatch(this.newParent), this.editor.signals.objectChanged.dispatch(this.oldParent), this.editor.signals.sceneGraphChanged.dispatch();
  }
  toJSON() {
    const e = super.toJSON(this);
    return e.objectUuid = this.object.uuid, e.newParentUuid = this.newParent.uuid, e.oldParentUuid = this.oldParent.uuid, e.newIndex = this.newIndex, e.oldIndex = this.oldIndex, e;
  }
  fromJSON(e) {
    super.fromJSON(e), this.object = this.editor.objectByUuid(e.objectUuid), this.oldParent = this.editor.objectByUuid(e.oldParentUuid), this.oldParent === void 0 && (this.oldParent = this.editor.scene), this.newParent = this.editor.objectByUuid(e.newParentUuid), this.newParent === void 0 && (this.newParent = this.editor.scene), this.newIndex = e.newIndex, this.oldIndex = e.oldIndex;
  }
}
class dt extends ce {
  /**
   * @param {Editor} editor
   * @param {Array<Command>} [cmdArray=[]]
   * @constructor
   */
  constructor(e, a = []) {
    super(e), this.type = "MultiCmdsCommand", this.name = e.strings.getKey("command/MultiCmds"), this.cmdArray = a;
  }
  execute() {
    this.editor.signals.sceneGraphChanged.active = !1;
    for (let e = 0; e < this.cmdArray.length; e++)
      this.cmdArray[e].execute();
    this.editor.signals.sceneGraphChanged.active = !0, this.editor.signals.sceneGraphChanged.dispatch();
  }
  undo() {
    this.editor.signals.sceneGraphChanged.active = !1;
    for (let e = this.cmdArray.length - 1; e >= 0; e--)
      this.cmdArray[e].undo();
    this.editor.signals.sceneGraphChanged.active = !0, this.editor.signals.sceneGraphChanged.dispatch();
  }
  toJSON() {
    const e = super.toJSON(this), a = [];
    for (let s = 0; s < this.cmdArray.length; s++)
      a.push(this.cmdArray[s].toJSON());
    return e.cmds = a, e;
  }
  fromJSON(e) {
    super.fromJSON(e);
    const a = e.cmds;
    for (let s = 0; s < a.length; s++) {
      const n = new window[a[s].type]();
      n.fromJSON(a[s]), this.cmdArray.push(n);
    }
  }
}
class Ue extends ce {
  /**
   * @param {Editor} editor
   * @param {THREE.Object3D|null} [object=null]
   * @constructor
   */
  constructor(e, a = null) {
    super(e), this.type = "RemoveObjectCommand", this.object = a, this.parent = a !== null ? a.parent : null, this.parent !== null && (this.index = this.parent.children.indexOf(this.object)), a !== null && (this.name = e.strings.getKey("command/RemoveObject") + ": " + a.name);
  }
  execute() {
    this.editor.removeObject(this.object), this.editor.deselect();
  }
  undo() {
    this.editor.addObject(this.object, this.parent, this.index), this.editor.select(this.object);
  }
  toJSON() {
    const e = super.toJSON(this);
    return e.object = this.object.toJSON(), e.index = this.index, e.parentUuid = this.parent.uuid, e;
  }
  fromJSON(e) {
    if (super.fromJSON(e), this.parent = this.editor.objectByUuid(e.parentUuid), this.parent === void 0 && (this.parent = this.editor.scene), this.index = e.index, this.object = this.editor.objectByUuid(e.object.object.uuid), this.object === void 0) {
      const a = new lt();
      this.object = a.parse(e.object);
    }
  }
}
class Zt extends ce {
  /**
   * @param {Editor} editor
   * @param {THREE.Object3D|null} [object=null]
   * @param {string} [script='']
   * @constructor
   */
  constructor(e, a = null, s = "") {
    super(e), this.type = "RemoveScriptCommand", this.name = e.strings.getKey("command/RemoveScript"), this.object = a, this.script = s, this.object !== null && this.script !== "" && (this.index = this.editor.scripts[this.object.uuid].indexOf(this.script));
  }
  execute() {
    this.editor.scripts[this.object.uuid] !== void 0 && (this.index !== -1 && this.editor.scripts[this.object.uuid].splice(this.index, 1), this.editor.signals.scriptRemoved.dispatch(this.script));
  }
  undo() {
    this.editor.scripts[this.object.uuid] === void 0 && (this.editor.scripts[this.object.uuid] = []), this.editor.scripts[this.object.uuid].splice(this.index, 0, this.script), this.editor.signals.scriptAdded.dispatch(this.script);
  }
  toJSON() {
    const e = super.toJSON(this);
    return e.objectUuid = this.object.uuid, e.script = this.script, e.index = this.index, e;
  }
  fromJSON(e) {
    super.fromJSON(e), this.script = e.script, this.index = e.index, this.object = this.editor.objectByUuid(e.objectUuid);
  }
}
class Vt extends ce {
  /**
   * @param {Editor} editor
   * @param {THREE.Object3D|null} [object=null]
   * @param {string} attributeName
   * @param {?number} [newValue=null] Integer representing a hex color value
   * @constructor
   */
  constructor(e, a = null, s = "", n = null) {
    super(e), this.type = "SetColorCommand", this.name = e.strings.getKey("command/SetColor") + ": " + s, this.updatable = !0, this.object = a, this.attributeName = s, this.oldValue = a !== null ? this.object[this.attributeName].getHex() : null, this.newValue = n;
  }
  execute() {
    this.object[this.attributeName].setHex(this.newValue), this.editor.signals.objectChanged.dispatch(this.object);
  }
  undo() {
    this.object[this.attributeName].setHex(this.oldValue), this.editor.signals.objectChanged.dispatch(this.object);
  }
  update(e) {
    this.newValue = e.newValue;
  }
  toJSON() {
    const e = super.toJSON(this);
    return e.objectUuid = this.object.uuid, e.attributeName = this.attributeName, e.oldValue = this.oldValue, e.newValue = this.newValue, e;
  }
  fromJSON(e) {
    super.fromJSON(e), this.object = this.editor.objectByUuid(e.objectUuid), this.attributeName = e.attributeName, this.oldValue = e.oldValue, this.newValue = e.newValue;
  }
}
class Qt extends ce {
  /**
   * @param {Editor} editor
   * @param {THREE.Object3D|null} [object=null]
   * @param {THREE.Geometry|null} [newGeometry=null]
   * @constructor
   */
  constructor(e, a = null, s = null) {
    super(e), this.type = "SetGeometryCommand", this.name = e.strings.getKey("command/SetGeometry"), this.updatable = !0, this.object = a, this.oldGeometry = a !== null ? a.geometry : null, this.newGeometry = s;
  }
  execute() {
    this.object.geometry.dispose(), this.object.geometry = this.newGeometry, this.object.geometry.computeBoundingSphere(), this.editor.signals.geometryChanged.dispatch(this.object), this.editor.signals.sceneGraphChanged.dispatch();
  }
  undo() {
    this.object.geometry.dispose(), this.object.geometry = this.oldGeometry, this.object.geometry.computeBoundingSphere(), this.editor.signals.geometryChanged.dispatch(this.object), this.editor.signals.sceneGraphChanged.dispatch();
  }
  update(e) {
    this.newGeometry = e.newGeometry;
  }
  toJSON() {
    const e = super.toJSON(this);
    return e.objectUuid = this.object.uuid, e.oldGeometry = this.oldGeometry.toJSON(), e.newGeometry = this.newGeometry.toJSON(), e;
  }
  fromJSON(e) {
    super.fromJSON(e), this.object = this.editor.objectByUuid(e.objectUuid), this.oldGeometry = a(e.oldGeometry), this.newGeometry = a(e.newGeometry);
    function a(s) {
      return new lt().parseGeometries([s])[s.uuid];
    }
  }
}
class bt extends ce {
  /**
   * @param {Editor} editor
   * @param {THREE.Object3D|null} [object=null]
   * @param {string} [attributeName='']
   * @param {number|string|boolean|Object|null} [newValue=null]
   * @constructor
   */
  constructor(e, a = null, s = "", n = null) {
    super(e), this.type = "SetGeometryValueCommand", this.name = e.strings.getKey("command/SetGeometryValue") + ": " + s, this.object = a, this.attributeName = s, this.oldValue = a !== null ? a.geometry[s] : null, this.newValue = n;
  }
  execute() {
    this.object.geometry[this.attributeName] = this.newValue, this.editor.signals.objectChanged.dispatch(this.object), this.editor.signals.geometryChanged.dispatch(), this.editor.signals.sceneGraphChanged.dispatch();
  }
  undo() {
    this.object.geometry[this.attributeName] = this.oldValue, this.editor.signals.objectChanged.dispatch(this.object), this.editor.signals.geometryChanged.dispatch(), this.editor.signals.sceneGraphChanged.dispatch();
  }
  toJSON() {
    const e = super.toJSON(this);
    return e.objectUuid = this.object.uuid, e.attributeName = this.attributeName, e.oldValue = this.oldValue, e.newValue = this.newValue, e;
  }
  fromJSON(e) {
    super.fromJSON(e), this.object = this.editor.objectByUuid(e.objectUuid), this.attributeName = e.attributeName, this.oldValue = e.oldValue, this.newValue = e.newValue;
  }
}
class ea extends ce {
  /**
   * @param {Editor} editor
   * @param {THREE.Object3D|null} [object=null]
   * @param {string} attributeName
   * @param {?number} [newValue=null] Integer representing a hex color value
   * @param {number} [materialSlot=-1]
   * @constructor
   */
  constructor(e, a = null, s = "", n = null, r = -1) {
    super(e), this.type = "SetMaterialColorCommand", this.name = e.strings.getKey("command/SetMaterialColor") + ": " + s, this.updatable = !0, this.object = a, this.materialSlot = r;
    const l = a !== null ? e.getObjectMaterial(a, r) : null;
    this.oldValue = l !== null ? l[s].getHex() : null, this.newValue = n, this.attributeName = s;
  }
  execute() {
    this.editor.getObjectMaterial(this.object, this.materialSlot)[this.attributeName].setHex(this.newValue), this.editor.signals.materialChanged.dispatch(this.object, this.materialSlot);
  }
  undo() {
    this.editor.getObjectMaterial(this.object, this.materialSlot)[this.attributeName].setHex(this.oldValue), this.editor.signals.materialChanged.dispatch(this.object, this.materialSlot);
  }
  update(e) {
    this.newValue = e.newValue;
  }
  toJSON() {
    const e = super.toJSON(this);
    return e.objectUuid = this.object.uuid, e.attributeName = this.attributeName, e.oldValue = this.oldValue, e.newValue = this.newValue, e.materialSlot = this.materialSlot, e;
  }
  fromJSON(e) {
    super.fromJSON(e), this.object = this.editor.objectByUuid(e.objectUuid), this.attributeName = e.attributeName, this.oldValue = e.oldValue, this.newValue = e.newValue, this.materialSlot = e.materialSlot;
  }
}
class Lt extends ce {
  /**
   * @param {Editor} editor
   * @param {THREE.Object3D|null} object
   * @param {THREE.Material|null} newMaterial
   * @param {number} [materialSlot=-1]
   * @constructor
   */
  constructor(e, a = null, s = null, n = -1) {
    super(e), this.type = "SetMaterialCommand", this.name = e.strings.getKey("command/SetMaterial"), this.object = a, this.materialSlot = n, this.oldMaterial = a !== null ? e.getObjectMaterial(a, n) : null, this.newMaterial = s;
  }
  execute() {
    this.editor.setObjectMaterial(this.object, this.materialSlot, this.newMaterial), this.editor.signals.materialChanged.dispatch(this.object, this.materialSlot);
  }
  undo() {
    this.editor.setObjectMaterial(this.object, this.materialSlot, this.oldMaterial), this.editor.signals.materialChanged.dispatch(this.object, this.materialSlot);
  }
  toJSON() {
    const e = super.toJSON(this);
    return e.objectUuid = this.object.uuid, e.oldMaterial = this.oldMaterial.toJSON(), e.newMaterial = this.newMaterial.toJSON(), e.materialSlot = this.materialSlot, e;
  }
  fromJSON(e) {
    super.fromJSON(e), this.object = this.editor.objectByUuid(e.objectUuid), this.oldMaterial = a(e.oldMaterial), this.newMaterial = a(e.newMaterial), this.materialSlot = e.materialSlot;
    function a(s) {
      const n = new lt(), r = n.parseImages(s.images), l = n.parseTextures(s.textures, r);
      return n.parseMaterials([s], l)[s.uuid];
    }
  }
}
class ta extends ce {
  /**
   * @param {Editor} editor
   * @param {THREE.Object3D|null} [object=null]
   * @param {string} [mapName='']
   * @param {THREE.Texture|null} [newMap=null]
   * @param {number} [materialSlot=-1]
   * @constructor
   */
  constructor(e, a = null, s = "", n = null, r = -1) {
    super(e), this.type = "SetMaterialMapCommand", this.name = e.strings.getKey("command/SetMaterialMap") + ": " + s, this.object = a, this.materialSlot = r;
    const l = a !== null ? e.getObjectMaterial(a, r) : null;
    this.oldMap = a !== null ? l[s] : void 0, this.newMap = n, this.mapName = s;
  }
  execute() {
    this.oldMap !== null && this.oldMap !== void 0 && this.oldMap.dispose();
    const e = this.editor.getObjectMaterial(this.object, this.materialSlot);
    e[this.mapName] = this.newMap, e.needsUpdate = !0, this.editor.signals.materialChanged.dispatch(this.object, this.materialSlot);
  }
  undo() {
    const e = this.editor.getObjectMaterial(this.object, this.materialSlot);
    e[this.mapName] = this.oldMap, e.needsUpdate = !0, this.editor.signals.materialChanged.dispatch(this.object, this.materialSlot);
  }
  toJSON() {
    const e = super.toJSON(this);
    return e.objectUuid = this.object.uuid, e.mapName = this.mapName, e.newMap = a(this.newMap), e.oldMap = a(this.oldMap), e.materialSlot = this.materialSlot, e;
    function a(n) {
      if (n == null) return null;
      const r = {
        geometries: {},
        materials: {},
        textures: {},
        images: {}
      }, l = n.toJSON(r), i = s(r.images);
      return i.length > 0 && (l.images = i), l.sourceFile = n.sourceFile, l;
    }
    function s(n) {
      const r = [];
      for (const l in n) {
        const i = n[l];
        delete i.metadata, r.push(i);
      }
      return r;
    }
  }
  fromJSON(e) {
    super.fromJSON(e), this.object = this.editor.objectByUuid(e.objectUuid), this.mapName = e.mapName, this.oldMap = a(e.oldMap), this.newMap = a(e.newMap), this.materialSlot = e.materialSlot;
    function a(s) {
      let n = null;
      if (s !== null) {
        const r = new lt(), l = r.parseImages(s.images);
        n = r.parseTextures([s], l)[s.uuid], n.sourceFile = s.sourceFile;
      }
      return n;
    }
  }
}
class Ot extends ce {
  /**
   * @param {Editor} editor
   * @param {THREE.Object3D|null} [object=null]
   * @param {string} [attributeName='']
   * @param {number} [newMinValue=-Infinity]
   * @param {number} [newMaxValue=Infinity]
   * @param {number} [materialSlot=-1]
   * @constructor
   */
  constructor(e, a = null, s = "", n = -1 / 0, r = 1 / 0, l = -1) {
    super(e), this.type = "SetMaterialRangeCommand", this.name = e.strings.getKey("command/SetMaterialRange") + ": " + s, this.updatable = !0, this.object = a, this.materialSlot = l;
    const i = a !== null ? e.getObjectMaterial(a, l) : null;
    this.oldRange = i !== null && i[s] !== void 0 ? [...i[s]] : null, this.newRange = [n, r], this.attributeName = s;
  }
  execute() {
    const e = this.editor.getObjectMaterial(this.object, this.materialSlot);
    e[this.attributeName] = [...this.newRange], e.needsUpdate = !0, this.editor.signals.objectChanged.dispatch(this.object), this.editor.signals.materialChanged.dispatch(this.object, this.materialSlot);
  }
  undo() {
    const e = this.editor.getObjectMaterial(this.object, this.materialSlot);
    e[this.attributeName] = [...this.oldRange], e.needsUpdate = !0, this.editor.signals.objectChanged.dispatch(this.object), this.editor.signals.materialChanged.dispatch(this.object, this.materialSlot);
  }
  update(e) {
    this.newRange = [...e.newRange];
  }
  toJSON() {
    const e = super.toJSON(this);
    return e.objectUuid = this.object.uuid, e.attributeName = this.attributeName, e.oldRange = [...this.oldRange], e.newRange = [...this.newRange], e.materialSlot = this.materialSlot, e;
  }
  fromJSON(e) {
    super.fromJSON(e), this.attributeName = e.attributeName, this.oldRange = [...e.oldRange], this.newRange = [...e.newRange], this.object = this.editor.objectByUuid(e.objectUuid), this.materialSlot = e.materialSlot;
  }
}
class Ve extends ce {
  /**
   * @param {Editor} editor
   * @param {THREE.Object3D|null} [object=null]
   * @param {string} [attributeName='']
   * @param {number|string|boolean|Object|null} [newValue=null]
   * @param {number} [materialSlot=-1]
   * @constructor
   */
  constructor(e, a = null, s = "", n = null, r = -1) {
    super(e), this.type = "SetMaterialValueCommand", this.name = e.strings.getKey("command/SetMaterialValue") + ": " + s, this.updatable = !0, this.object = a, this.materialSlot = r;
    const l = a !== null ? e.getObjectMaterial(a, r) : null;
    this.oldValue = l !== null ? l[s] : null, this.newValue = n, this.attributeName = s;
  }
  execute() {
    const e = this.editor.getObjectMaterial(this.object, this.materialSlot);
    e[this.attributeName] = this.newValue, e.needsUpdate = !0, this.editor.signals.objectChanged.dispatch(this.object), this.editor.signals.materialChanged.dispatch(this.object, this.materialSlot);
  }
  undo() {
    const e = this.editor.getObjectMaterial(this.object, this.materialSlot);
    e[this.attributeName] = this.oldValue, e.needsUpdate = !0, this.editor.signals.objectChanged.dispatch(this.object), this.editor.signals.materialChanged.dispatch(this.object, this.materialSlot);
  }
  update(e) {
    this.newValue = e.newValue;
  }
  toJSON() {
    const e = super.toJSON(this);
    return e.objectUuid = this.object.uuid, e.attributeName = this.attributeName, e.oldValue = this.oldValue, e.newValue = this.newValue, e.materialSlot = this.materialSlot, e;
  }
  fromJSON(e) {
    super.fromJSON(e), this.attributeName = e.attributeName, this.oldValue = e.oldValue, this.newValue = e.newValue, this.object = this.editor.objectByUuid(e.objectUuid), this.materialSlot = e.materialSlot;
  }
}
class aa extends ce {
  /**
   *
   * @param {Editor} editor
   * @param {THREE.Object3D|null} [object=null]
   * @param {string} [attributeName='']
   * @param {THREE.Vector2|THREE.Vector3|THREE.Vector4|null} [newValue=null]
   * @param {number} [materialSlot=-1]
   * @constructor
   */
  constructor(e, a = null, s = "", n = null, r = -1) {
    super(e), this.type = "SetMaterialVectorCommand", this.name = e.strings.getKey("command/SetMaterialVector") + ": " + s, this.updatable = !0, this.object = a, this.materialSlot = r;
    const l = a !== null ? e.getObjectMaterial(a, r) : null;
    this.oldValue = l !== null ? l[s].toArray() : null, this.newValue = n, this.attributeName = s;
  }
  execute() {
    this.editor.getObjectMaterial(this.object, this.materialSlot)[this.attributeName].fromArray(this.newValue), this.editor.signals.materialChanged.dispatch(this.object, this.materialSlot);
  }
  undo() {
    this.editor.getObjectMaterial(this.object, this.materialSlot)[this.attributeName].fromArray(this.oldValue), this.editor.signals.materialChanged.dispatch(this.object, this.materialSlot);
  }
  update(e) {
    this.newValue = e.newValue;
  }
  toJSON() {
    const e = super.toJSON(this);
    return e.objectUuid = this.object.uuid, e.attributeName = this.attributeName, e.oldValue = this.oldValue, e.newValue = this.newValue, e.materialSlot = this.materialSlot, e;
  }
  fromJSON(e) {
    super.fromJSON(e), this.object = this.editor.objectByUuid(e.objectUuid), this.attributeName = e.attributeName, this.oldValue = e.oldValue, this.newValue = e.newValue, this.materialSlot = e.materialSlot;
  }
}
class wt extends ce {
  /**
   * @param {Editor} editor
   * @param {THREE.Object3D|null} object
   * @param {THREE.Vector3|null} newPosition
   * @param {THREE.Vector3|null} optionalOldPosition
   * @constructor
   */
  constructor(e, a = null, s = null, n = null) {
    super(e), this.type = "SetPositionCommand", this.name = e.strings.getKey("command/SetPosition"), this.updatable = !0, this.object = a, a !== null && s !== null && (this.oldPosition = a.position.clone(), this.newPosition = s.clone()), n !== null && (this.oldPosition = n.clone());
  }
  execute() {
    this.object.position.copy(this.newPosition), this.object.updateMatrixWorld(!0), this.editor.signals.objectChanged.dispatch(this.object);
  }
  undo() {
    this.object.position.copy(this.oldPosition), this.object.updateMatrixWorld(!0), this.editor.signals.objectChanged.dispatch(this.object);
  }
  update(e) {
    this.newPosition.copy(e.newPosition);
  }
  toJSON() {
    const e = super.toJSON(this);
    return e.objectUuid = this.object.uuid, e.oldPosition = this.oldPosition.toArray(), e.newPosition = this.newPosition.toArray(), e;
  }
  fromJSON(e) {
    super.fromJSON(e), this.object = this.editor.objectByUuid(e.objectUuid), this.oldPosition = new Je().fromArray(e.oldPosition), this.newPosition = new Je().fromArray(e.newPosition);
  }
}
class Pt extends ce {
  /**
   * @param {Editor} editor
   * @param {THREE.Object3D|null} object
   * @param {THREE.Euler|null} newRotation
   * @param {THREE.Euler|null} optionalOldRotation
   * @constructor
   */
  constructor(e, a = null, s = null, n = null) {
    super(e), this.type = "SetRotationCommand", this.name = e.strings.getKey("command/SetRotation"), this.updatable = !0, this.object = a, a !== null && s !== null && (this.oldRotation = a.rotation.clone(), this.newRotation = s.clone()), n !== null && (this.oldRotation = n.clone());
  }
  execute() {
    this.object.rotation.copy(this.newRotation), this.object.updateMatrixWorld(!0), this.editor.signals.objectChanged.dispatch(this.object);
  }
  undo() {
    this.object.rotation.copy(this.oldRotation), this.object.updateMatrixWorld(!0), this.editor.signals.objectChanged.dispatch(this.object);
  }
  update(e) {
    this.newRotation.copy(e.newRotation);
  }
  toJSON() {
    const e = super.toJSON(this);
    return e.objectUuid = this.object.uuid, e.oldRotation = this.oldRotation.toArray(), e.newRotation = this.newRotation.toArray(), e;
  }
  fromJSON(e) {
    super.fromJSON(e), this.object = this.editor.objectByUuid(e.objectUuid), this.oldRotation = new It().fromArray(e.oldRotation), this.newRotation = new It().fromArray(e.newRotation);
  }
}
class Dt extends ce {
  /**
   * @param {Editor} editor
   * @param {THREE.Object3D|null} object
   * @param {THREE.Vector3|null} newScale
   * @param {THREE.Vector3|null} optionalOldScale
   * @constructor
   */
  constructor(e, a = null, s = null, n = null) {
    super(e), this.type = "SetScaleCommand", this.name = e.strings.getKey("command/SetScale"), this.updatable = !0, this.object = a, a !== null && s !== null && (this.oldScale = a.scale.clone(), this.newScale = s.clone()), n !== null && (this.oldScale = n.clone());
  }
  execute() {
    this.object.scale.copy(this.newScale), this.object.updateMatrixWorld(!0), this.editor.signals.objectChanged.dispatch(this.object);
  }
  undo() {
    this.object.scale.copy(this.oldScale), this.object.updateMatrixWorld(!0), this.editor.signals.objectChanged.dispatch(this.object);
  }
  update(e) {
    this.newScale.copy(e.newScale);
  }
  toJSON() {
    const e = super.toJSON(this);
    return e.objectUuid = this.object.uuid, e.oldScale = this.oldScale.toArray(), e.newScale = this.newScale.toArray(), e;
  }
  fromJSON(e) {
    super.fromJSON(e), this.object = this.editor.objectByUuid(e.objectUuid), this.oldScale = new Je().fromArray(e.oldScale), this.newScale = new Je().fromArray(e.newScale);
  }
}
class Et extends ce {
  /**
   * @param {Editor} editor
   * @param {THREE.Object3D|null} object
   * @param {string} script
   * @param {string} attributeName
   * @param {string} newValue
   * @constructor
   */
  constructor(e, a = null, s = "", n = "", r = null) {
    super(e), this.type = "SetScriptValueCommand", this.name = e.strings.getKey("command/SetScriptValue") + ": " + n, this.updatable = !0, this.object = a, this.script = s, this.attributeName = n, this.oldValue = s !== "" ? s[this.attributeName] : null, this.newValue = r;
  }
  execute() {
    this.script[this.attributeName] = this.newValue, this.editor.signals.scriptChanged.dispatch(this.script);
  }
  undo() {
    this.script[this.attributeName] = this.oldValue, this.editor.signals.scriptChanged.dispatch(this.script);
  }
  update(e) {
    this.newValue = e.newValue;
  }
  toJSON() {
    const e = super.toJSON(this);
    return e.objectUuid = this.object.uuid, e.index = this.editor.scripts[this.object.uuid].indexOf(this.script), e.attributeName = this.attributeName, e.oldValue = this.oldValue, e.newValue = this.newValue, e;
  }
  fromJSON(e) {
    super.fromJSON(e), this.oldValue = e.oldValue, this.newValue = e.newValue, this.attributeName = e.attributeName, this.object = this.editor.objectByUuid(e.objectUuid), this.script = this.editor.scripts[e.objectUuid][e.index];
  }
}
class it extends ce {
  /**
   * @param {Editor} editor
   * @param {THREE.Object3D|null} object
   * @param {string} attributeName
   * @param {number|string|boolean|Object|null} newValue
   * @constructor
   */
  constructor(e, a = null, s = "", n = null) {
    super(e), this.type = "SetShadowValueCommand", this.name = e.strings.getKey("command/SetShadowValue") + ": " + s, this.updatable = !0, this.object = a, this.attributeName = s, this.oldValue = a !== null ? a.shadow[s] : null, this.newValue = n;
  }
  execute() {
    this.object.shadow[this.attributeName] = this.newValue, this.editor.signals.objectChanged.dispatch(this.object);
  }
  undo() {
    this.object.shadow[this.attributeName] = this.oldValue, this.editor.signals.objectChanged.dispatch(this.object);
  }
  update(e) {
    this.newValue = e.newValue;
  }
  toJSON() {
    const e = super.toJSON(this);
    return e.objectUuid = this.object.uuid, e.attributeName = this.attributeName, e.oldValue = this.oldValue, e.newValue = this.newValue, e;
  }
  fromJSON(e) {
    super.fromJSON(e), this.object = this.editor.objectByUuid(e.objectUuid), this.attributeName = e.attributeName, this.oldValue = e.oldValue, this.newValue = e.newValue;
  }
}
const sa = ["offset", "repeat", "center"];
class ra extends ce {
  /**
   * @param {Editor} editor
   * @param {THREE.Texture} texture
   * @param {Object} newParameters
   * @constructor
   */
  constructor(e, a = null, s = {}) {
    super(e), this.type = "SetTextureParametersCommand", this.name = e.strings.getKey("command/SetTextureParameters"), this.texture = a, this.oldParameters = a !== null ? Ua(a, s) : {}, this.newParameters = s;
  }
  execute() {
    Ht(this.texture, this.newParameters), this.editor.signals.sceneGraphChanged.dispatch();
  }
  undo() {
    Ht(this.texture, this.oldParameters), this.editor.signals.sceneGraphChanged.dispatch();
  }
  toJSON() {
    const e = super.toJSON(this);
    return e.textureUuid = this.texture.uuid, e.oldParameters = this.oldParameters, e.newParameters = this.newParameters, e;
  }
  fromJSON(e) {
    super.fromJSON(e), this.texture = Ba(this.editor, e.textureUuid), this.oldParameters = e.oldParameters, this.newParameters = e.newParameters;
  }
}
function Ua(t, e) {
  const a = {};
  for (const s in e) {
    const n = t[s];
    sa.includes(s) ? a[s] = { x: n.x, y: n.y } : a[s] = n;
  }
  return a;
}
function Ht(t, e) {
  for (const a in e) {
    const s = e[a];
    sa.includes(a) ? t[a].set(s.x, s.y) : t[a] = s;
  }
  t.needsUpdate = !0;
}
function Ba(t, e) {
  let a = null;
  return t.scene.traverse((s) => {
    if (s.material === void 0) return;
    const n = Array.isArray(s.material) ? s.material : [s.material];
    for (const r of n)
      for (const l in r) {
        const i = r[l];
        i && i.isTexture === !0 && i.uuid === e && (a = i);
      }
  }), a;
}
const Gt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  AddObjectCommand: H,
  AddScriptCommand: $t,
  MoveObjectCommand: Yt,
  MultiCmdsCommand: dt,
  RemoveObjectCommand: Ue,
  RemoveScriptCommand: Zt,
  SetColorCommand: Vt,
  SetGeometryCommand: Qt,
  SetGeometryValueCommand: bt,
  SetMaterialColorCommand: ea,
  SetMaterialCommand: Lt,
  SetMaterialMapCommand: ta,
  SetMaterialRangeCommand: Ot,
  SetMaterialValueCommand: Ve,
  SetMaterialVectorCommand: aa,
  SetPositionCommand: wt,
  SetRotationCommand: Pt,
  SetScaleCommand: Dt,
  SetSceneCommand: nt,
  SetScriptValueCommand: Et,
  SetShadowValueCommand: it,
  SetTextureParametersCommand: ra,
  SetUuidCommand: kt,
  SetValueCommand: ue
}, Symbol.toStringTag, { value: "Module" }));
class Fa {
  constructor(e) {
    this.editor = e, this.undos = [], this.redos = [], this.lastCmdTime = Date.now(), this.idCounter = 0, this.historyDisabled = !1, this.config = e.config;
    const a = this;
    this.editor.signals.startPlayer.add(function() {
      a.historyDisabled = !0;
    }), this.editor.signals.stopPlayer.add(function() {
      a.historyDisabled = !1;
    });
  }
  execute(e, a) {
    const s = this.undos[this.undos.length - 1], n = Date.now() - this.lastCmdTime, r = s && s.updatable && e.updatable && s.object === e.object && s.type === e.type && s.script === e.script && s.attributeName === e.attributeName;
    r && e.type === "SetScriptValueCommand" || r && n < 500 ? (s.update(e), e = s) : (this.undos.push(e), e.id = ++this.idCounter), e.name = a !== void 0 ? a : e.name, e.execute(), e.inMemory = !0, this.config.getKey("settings/history") && (e.json = e.toJSON()), this.lastCmdTime = Date.now(), this.redos = [], this.editor.signals.historyChanged.dispatch(e);
  }
  undo() {
    if (this.historyDisabled) {
      alert(this.editor.strings.getKey("prompt/history/forbid"));
      return;
    }
    let e;
    return this.undos.length > 0 && (e = this.undos.pop(), e.inMemory === !1 && e.fromJSON(e.json)), e !== void 0 && (e.undo(), this.redos.push(e), this.editor.signals.historyChanged.dispatch(e)), e;
  }
  redo() {
    if (this.historyDisabled) {
      alert(this.editor.strings.getKey("prompt/history/forbid"));
      return;
    }
    let e;
    return this.redos.length > 0 && (e = this.redos.pop(), e.inMemory === !1 && e.fromJSON(e.json)), e !== void 0 && (e.execute(), this.undos.push(e), this.editor.signals.historyChanged.dispatch(e)), e;
  }
  toJSON() {
    const e = {};
    if (e.undos = [], e.redos = [], !this.config.getKey("settings/history"))
      return e;
    for (let a = 0; a < this.undos.length; a++)
      this.undos[a].hasOwnProperty("json") && e.undos.push(this.undos[a].json);
    for (let a = 0; a < this.redos.length; a++)
      this.redos[a].hasOwnProperty("json") && e.redos.push(this.redos[a].json);
    return e;
  }
  fromJSON(e) {
    if (e !== void 0) {
      for (let a = 0; a < e.undos.length; a++) {
        const s = e.undos[a], n = new Gt[s.type](this.editor);
        n.json = s, n.id = s.id, n.name = s.name, this.undos.push(n), this.idCounter = s.id > this.idCounter ? s.id : this.idCounter;
      }
      for (let a = 0; a < e.redos.length; a++) {
        const s = e.redos[a], n = new Gt[s.type](this.editor);
        n.json = s, n.id = s.id, n.name = s.name, this.redos.push(n), this.idCounter = s.id > this.idCounter ? s.id : this.idCounter;
      }
      this.editor.signals.historyChanged.dispatch(this.undos[this.undos.length - 1]);
    }
  }
  clear() {
    this.undos = [], this.redos = [], this.idCounter = 0, this.editor.signals.historyChanged.dispatch();
  }
  goToState(e) {
    if (this.historyDisabled) {
      alert(this.editor.strings.getKey("prompt/history/forbid"));
      return;
    }
    this.editor.signals.sceneGraphChanged.active = !1, this.editor.signals.historyChanged.active = !1;
    let a = this.undos.length > 0 ? this.undos[this.undos.length - 1] : void 0;
    if (a === void 0 || e > a.id)
      for (a = this.redo(); a !== void 0 && e > a.id; )
        a = this.redo();
    else
      for (; a = this.undos[this.undos.length - 1], !(a === void 0 || e === a.id); )
        this.undo();
    this.editor.signals.sceneGraphChanged.active = !0, this.editor.signals.historyChanged.active = !0, this.editor.signals.sceneGraphChanged.dispatch(), this.editor.signals.historyChanged.dispatch(a);
  }
  enableSerialization(e) {
    this.goToState(-1), this.editor.signals.sceneGraphChanged.active = !1, this.editor.signals.historyChanged.active = !1;
    let a = this.redo();
    for (; a !== void 0; )
      a.hasOwnProperty("json") || (a.json = a.toJSON()), a = this.redo();
    this.editor.signals.sceneGraphChanged.active = !0, this.editor.signals.historyChanged.active = !0, this.goToState(e);
  }
}
function Ha(t) {
  const e = t.getKey("language"), a = {
    fa: {
      "prompt/file/open": "تمام داده های ذخیره نشده پاک خواهند شد آیا مطمئنید؟",
      "prompt/file/failedToOpenProject": "خطایی در باز کردن پروژه پیش آمده",
      "prompt/file/export/noMeshSelected": "هیچ Mesh ای انتخاب نکردید",
      "prompt/file/export/noObjectSelected": "هیچ آبجکتی انتخاب نکردید!",
      "prompt/file/export/duplicateNames": "Some objects share the same name. They will be renamed to ensure unique names. Are you sure?",
      "prompt/script/remove": "آیا اطمینان دارید؟",
      "prompt/history/clear": "هیستوری قبل و بعد (undo / redo) پاک خواهند شد آیا مطمئنید؟",
      "prompt/history/preserve": `The history will be preserved across sessions.
This can have an impact on performance when working with textures.`,
      "prompt/history/forbid": "Undo/Redo disabled while scene is playing.",
      "prompt/rendering/realistic/unsupportedMaterial": "REALISTIC Shading: Only MeshStandardMaterial and MeshPhysicalMaterial are supported",
      "command/AddObject": "افزودن آبجکت",
      "command/AddScript": "افزودن اسکریپت",
      "command/MoveObject": "جابجایی آبجکت",
      "command/MultiCmds": "تغییرات گروهی",
      "command/RemoveObject": "حذف آبجکت",
      "command/RemoveScript": "حذف اسکریپت",
      "command/SetColor": "تنظیم رنگ",
      "command/SetGeometry": "تنظیم ژئومتری",
      "command/SetGeometryValue": "تنظیم مقدار ژئومتری",
      "command/SetMaterialColor": "تنظیم رنگ متریال",
      "command/SetMaterial": "تنظیم متریال",
      "command/SetMaterialMap": "تنظیم مپ متریال",
      "command/SetMaterialRange": "تنظیم رنج متریال",
      "command/SetMaterialValue": "تنظیم مقدار متریال",
      "command/SetMaterialVector": "تنظیم وکتور متریال",
      "command/SetPosition": "تنظیم پوزیشن",
      "command/SetRotation": "تنظیم چرخش",
      "command/SetScale": "تنظیم اندازه",
      "command/SetScene": "تنظیم صحنه",
      "command/SetScriptValue": "تنظیم مقدار اسکریپت",
      "command/SetShadowValue": "تنظیم مقدار سایه",
      "command/SetTextureParameters": "تنظیم پارامترهای تکسچر",
      "command/SetUuid": "تنظیم UUID",
      "command/SetValue": "تنظیم مقدار",
      "menubar/file": "فایل",
      "menubar/file/new": "جدید",
      "menubar/file/new/empty": "پروژه خالی",
      "menubar/file/new/Arkanoid": "آرکانوید",
      "menubar/file/new/Camera": "دوربین",
      "menubar/file/new/Particles": "Particles",
      "menubar/file/new/Pong": "پونگ",
      "menubar/file/new/Shaders": "Shaders",
      "menubar/file/open": "باز کردن",
      "menubar/file/save": "ذخیره تغییرات",
      "menubar/file/import": "ایمپورت",
      "menubar/file/export": "اکسپورت",
      "menubar/edit": "تغییر",
      "menubar/edit/undo": "بازگشت",
      "menubar/edit/redo": "بازگشت به جلو",
      "menubar/edit/center": "وسط",
      "menubar/edit/clone": "شبیه سازی",
      "menubar/edit/delete": "حذف",
      "menubar/add": "افزودن",
      "menubar/add/group": "گروه",
      "menubar/add/mesh": "مش",
      "menubar/add/mesh/plane": "صفحه",
      "menubar/add/mesh/box": "باکس",
      "menubar/add/mesh/capsule": "کپسول",
      "menubar/add/mesh/circle": "دایره",
      "menubar/add/mesh/cylinder": "سیلندر",
      "menubar/add/mesh/ring": "حلقه",
      "menubar/add/mesh/sphere": "کره",
      "menubar/add/mesh/dodecahedron": "دوازده وجهی",
      "menubar/add/mesh/icosahedron": "بیست وجهی",
      "menubar/add/mesh/octahedron": "هشت وجهی",
      "menubar/add/mesh/tetrahedron": "چهار وجهی",
      "menubar/add/text": "Text",
      "menubar/add/mesh/torus": "توروس (دونات)",
      "menubar/add/mesh/tube": "لوله",
      "menubar/add/mesh/torusknot": "torusknot",
      "menubar/add/mesh/lathe": "Lathe",
      "menubar/add/mesh/sprite": "Sprite",
      "menubar/add/light": "نور",
      "menubar/add/light/ambient": "محیط",
      "menubar/add/light/directional": "جهت دار",
      "menubar/add/light/hemisphere": "نیمکره",
      "menubar/add/light/point": "مستقیم",
      "menubar/add/light/spot": "نقطه ای",
      "menubar/add/camera": "دوربین",
      "menubar/add/camera/perspective": "پرسپکتیو",
      "menubar/add/camera/orthographic": "اورتوگرافیک",
      "menubar/status/autosave": "ذخیره اتوماتیک",
      "menubar/view": "نمایش",
      "menubar/view/fullscreen": "تمام صفحه",
      "menubar/view/gridHelper": "کمک کننده گرید",
      "menubar/view/cameraHelpers": "کمک کننده دوربین",
      "menubar/view/lightHelpers": "کمک کننده نور",
      "menubar/view/skeletonHelpers": "کمک کننده اسکلتون",
      "menubar/render": "رندر",
      "menubar/render/image": "عکس",
      "menubar/render/video": "ویدیو",
      "menubar/render/quality": "کیفیت",
      "menubar/render/cancel": "لغو",
      "menubar/help": "کمک",
      "menubar/help/source_code": "سورس کد",
      "menubar/help/icons": "پک آیکون",
      "menubar/help/about": "درباره ما",
      "menubar/help/manual": "کتابچه راهنما",
      "sidebar/animations": "انیمیشن ها",
      "sidebar/animations/play": "نمایش",
      "sidebar/animations/stop": "توقف",
      "sidebar/animations/timescale": "مقیاس زمانی",
      "sidebar/scene": "صحنه",
      "sidebar/scene/background": "پس زمینه",
      "sidebar/scene/environment": "محیط",
      "sidebar/scene/fog": "مه",
      "sidebar/properties/object": "آبجکت",
      "sidebar/properties/geometry": "ژئومتری",
      "sidebar/properties/material": "متریال",
      "sidebar/properties/script": "اسکریپت",
      "sidebar/object/type": "انواع",
      "sidebar/object/new": "جدید",
      "sidebar/object/uuid": "UUID",
      "sidebar/object/name": "نام",
      "sidebar/object/position": "پوزیشن",
      "sidebar/object/rotation": "چرخش",
      "sidebar/object/scale": "مقیاس",
      "sidebar/object/fov": "زاویه دید",
      "sidebar/object/left": "چپ",
      "sidebar/object/right": "راست",
      "sidebar/object/top": "بالا",
      "sidebar/object/bottom": "پایین",
      "sidebar/object/near": "نزدیک",
      "sidebar/object/far": "دور",
      "sidebar/object/intensity": "شدت",
      "sidebar/object/color": "رنگ",
      "sidebar/object/groundcolor": "رنگ زمینه",
      "sidebar/object/distance": "مسافت",
      "sidebar/object/angle": "زاویه",
      "sidebar/object/penumbra": "نیم سایه",
      "sidebar/object/decay": "پوسیدگی",
      "sidebar/object/shadow": "سایه",
      "sidebar/object/shadowIntensity": "شدت سایه",
      "sidebar/object/shadowBias": "انحراف سایه",
      "sidebar/object/shadowNormalBias": "انحراف معمول سایه",
      "sidebar/object/shadowRadius": "شعاع سایه",
      "sidebar/object/cast": "سایه انداختن",
      "sidebar/object/receive": "دریافت",
      "sidebar/object/visible": "آشکار",
      "sidebar/object/frustumcull": "فروستوم کال",
      "sidebar/object/renderorder": "ترتیب رندر",
      "sidebar/object/userdata": "داده کاربر",
      "sidebar/object/export": "اکسپورت جیسون",
      "sidebar/geometry/type": "انواع",
      "sidebar/geometry/new": "جدید",
      "sidebar/geometry/uuid": "UUID",
      "sidebar/geometry/name": "نام",
      "sidebar/geometry/bounds": "محدوده",
      "sidebar/geometry/userdata": "داده کاربر",
      "sidebar/geometry/show_vertex_normals": "نمایش راس های معمول",
      "sidebar/geometry/compute_vertex_normals": "محاسبه راس های معمول",
      "sidebar/geometry/compute_vertex_tangents": "محاسبه مماس ها",
      "sidebar/geometry/center": "وسط",
      "sidebar/geometry/export": "اکسپورت جیسون",
      "sidebar/geometry/morph": "Morph Targets",
      "sidebar/geometry/box_geometry/width": "عرض",
      "sidebar/geometry/box_geometry/height": "ارتفاع",
      "sidebar/geometry/box_geometry/depth": "عمق",
      "sidebar/geometry/box_geometry/widthseg": "ارجاع عرض",
      "sidebar/geometry/box_geometry/heightseg": "ارجاع ارتفاع",
      "sidebar/geometry/box_geometry/depthseg": "ارجاع عمق",
      "sidebar/geometry/buffer_geometry/attributes": "صفات",
      "sidebar/geometry/buffer_geometry/index": "شاخص",
      "sidebar/geometry/buffer_geometry/morphAttributes": "صفات شکل (مورف)",
      "sidebar/geometry/buffer_geometry/morphRelative": "صفات نسبی (رلتیو)",
      "sidebar/geometry/capsule_geometry/radius": "شعاع",
      "sidebar/geometry/capsule_geometry/height": "ارتفاع",
      "sidebar/geometry/capsule_geometry/capseg": "Cap Seg",
      "sidebar/geometry/capsule_geometry/radialseg": "Radial Seg",
      "sidebar/geometry/capsule_geometry/heightseg": "Height Seg",
      "sidebar/geometry/circle_geometry/radius": "شعاع",
      "sidebar/geometry/circle_geometry/segments": "بخش ها",
      "sidebar/geometry/circle_geometry/thetastart": "شروع تتا",
      "sidebar/geometry/circle_geometry/thetalength": "طول تتا",
      "sidebar/geometry/cylinder_geometry/radiustop": "شعاع بالا",
      "sidebar/geometry/cylinder_geometry/radiusbottom": "شعاع پایین",
      "sidebar/geometry/cylinder_geometry/height": "ارتفاع",
      "sidebar/geometry/cylinder_geometry/radialsegments": "بخش های شعاعی",
      "sidebar/geometry/cylinder_geometry/heightsegments": "بخش های ارتفاع",
      "sidebar/geometry/cylinder_geometry/openended": "پایان باز",
      "sidebar/geometry/extrude_geometry/curveSegments": "بخش های منحنی",
      "sidebar/geometry/extrude_geometry/steps": "گام ها",
      "sidebar/geometry/extrude_geometry/depth": "عمق",
      "sidebar/geometry/extrude_geometry/bevelEnabled": "اریب",
      "sidebar/geometry/extrude_geometry/bevelThickness": "ضخامت",
      "sidebar/geometry/extrude_geometry/bevelSize": "سایز",
      "sidebar/geometry/extrude_geometry/bevelOffset": "افست",
      "sidebar/geometry/extrude_geometry/bevelSegments": "بخش ها",
      "sidebar/geometry/extrude_geometry/shape": "تبدیل به شکل",
      "sidebar/geometry/dodecahedron_geometry/radius": "شعاع",
      "sidebar/geometry/dodecahedron_geometry/detail": "جزییات",
      "sidebar/geometry/icosahedron_geometry/radius": "شعاع",
      "sidebar/geometry/icosahedron_geometry/detail": "جزییات",
      "sidebar/geometry/octahedron_geometry/radius": "شعاع",
      "sidebar/geometry/octahedron_geometry/detail": "جزییات",
      "sidebar/geometry/tetrahedron_geometry/radius": "شعاع",
      "sidebar/geometry/tetrahedron_geometry/detail": "جزییات",
      "sidebar/geometry/lathe_geometry/segments": "بخش ها",
      "sidebar/geometry/lathe_geometry/phistart": "شروع فی (°)",
      "sidebar/geometry/lathe_geometry/philength": "طول فی (°)",
      "sidebar/geometry/lathe_geometry/points": "امتیاز ها",
      "sidebar/geometry/plane_geometry/width": "عرض",
      "sidebar/geometry/plane_geometry/height": "ارتفاع",
      "sidebar/geometry/plane_geometry/widthsegments": "بخش عرض",
      "sidebar/geometry/plane_geometry/heightsegments": "بخش ارتفاع",
      "sidebar/geometry/ring_geometry/innerRadius": "شعاع داخلی",
      "sidebar/geometry/ring_geometry/outerRadius": "شعاع خارجی",
      "sidebar/geometry/ring_geometry/thetaSegments": "بخش های تتا",
      "sidebar/geometry/ring_geometry/phiSegments": "بخش های فی",
      "sidebar/geometry/ring_geometry/thetastart": "شروع تتا",
      "sidebar/geometry/ring_geometry/thetalength": "طول تتا",
      "sidebar/geometry/text_geometry/text": "Text",
      "sidebar/geometry/text_geometry/size": "Font size",
      "sidebar/geometry/text_geometry/depth": "Extrude depth",
      "sidebar/geometry/text_geometry/scale": "Scale",
      "sidebar/geometry/text_geometry/curveseg": "Curve segments",
      "sidebar/geometry/text_geometry/bevelenabled": "Bevel enabled",
      "sidebar/geometry/text_geometry/bevelthickness": "Bevel thickness",
      "sidebar/geometry/text_geometry/bevelsize": "Bevel size",
      "sidebar/geometry/text_geometry/bevelOffset": "Bevel offset",
      "sidebar/geometry/text_geometry/bevelseg": "Bevel segments",
      "sidebar/geometry/shape_geometry/curveSegments": "بخش های منحنی",
      "sidebar/geometry/shape_geometry/extrude": "اکسترود کردن",
      "sidebar/geometry/sphere_geometry/radius": "شعاع",
      "sidebar/geometry/sphere_geometry/widthsegments": "بخش عرض",
      "sidebar/geometry/sphere_geometry/heightsegments": "بخش ارتفاع",
      "sidebar/geometry/sphere_geometry/phistart": "شروع فی",
      "sidebar/geometry/sphere_geometry/philength": " طول فی",
      "sidebar/geometry/sphere_geometry/thetastart": "شروع تتا",
      "sidebar/geometry/sphere_geometry/thetalength": "طول تتا",
      "sidebar/geometry/torus_geometry/radius": "شعاع",
      "sidebar/geometry/torus_geometry/tube": "لوله",
      "sidebar/geometry/torus_geometry/radialsegments": "بخش های شعاعی",
      "sidebar/geometry/torus_geometry/tubularsegments": "بخش های لوله ای",
      "sidebar/geometry/torus_geometry/arc": "آرک",
      "sidebar/geometry/torusKnot_geometry/radius": "شعاع",
      "sidebar/geometry/torusKnot_geometry/tube": "لوله",
      "sidebar/geometry/torusKnot_geometry/tubularsegments": "بخش های لوله ای",
      "sidebar/geometry/torusKnot_geometry/radialsegments": "بخش های شعاعی",
      "sidebar/geometry/torusKnot_geometry/p": "P",
      "sidebar/geometry/torusKnot_geometry/q": "Q",
      "sidebar/geometry/tube_geometry/path": "مسیر",
      "sidebar/geometry/tube_geometry/radius": "شعاع",
      "sidebar/geometry/tube_geometry/tube": "لوله",
      "sidebar/geometry/tube_geometry/tubularsegments": "بخش های لوله ای",
      "sidebar/geometry/tube_geometry/radialsegments": "بخش های شعاعی",
      "sidebar/geometry/tube_geometry/closed": "بسته شده",
      "sidebar/geometry/tube_geometry/curvetype": "نوع انحنا",
      "sidebar/geometry/tube_geometry/tension": "تنش",
      "sidebar/material/new": "جدید",
      "sidebar/material/copy": "کپی",
      "sidebar/material/paste": "پیست",
      "sidebar/material/slot": "شکاف",
      "sidebar/material/type": "نوع",
      "sidebar/material/uuid": "UUID",
      "sidebar/material/name": "نام",
      "sidebar/material/program": "برنامه",
      "sidebar/material/info": "اطلاعات",
      "sidebar/material/vertex": "راس",
      "sidebar/material/fragment": "فرگ",
      "sidebar/material/color": "رنگ",
      "sidebar/material/depthPacking": "بسته بندی عمق",
      "sidebar/material/roughness": "زبری",
      "sidebar/material/metalness": "فلزی بودن",
      "sidebar/material/reflectivity": "انعکاس",
      "sidebar/material/emissive": "پرتاب کنندگی",
      "sidebar/material/specular": "اسپکولار",
      "sidebar/material/shininess": "درخشندگی",
      "sidebar/material/clearcoat": "کلیرکت",
      "sidebar/material/clearcoatroughness": "زبری کلیرکت",
      "sidebar/material/dispersion": "پراکندگی",
      "sidebar/material/ior": "IOR",
      "sidebar/material/iridescence": "رنگین کمانی",
      "sidebar/material/iridescenceIOR": "IOR تین فیلم",
      "sidebar/material/iridescenceThicknessMax": "زبری تین فیلم",
      "sidebar/material/sheen": "درخشش (شین)",
      "sidebar/material/sheenroughness": "زبری درخشش (شین)",
      "sidebar/material/sheencolor": "رنگ درخشش (شین)",
      "sidebar/material/transmission": "انتقال",
      "sidebar/material/attenuationDistance": "تضعیف فاصله",
      "sidebar/material/attenuationColor": "تضعیف رنگ",
      "sidebar/material/thickness": "ضخامت",
      "sidebar/material/vertexcolors": "رنگ راس ها",
      "sidebar/material/matcap": "متکپ",
      "sidebar/material/map": "مپ",
      "sidebar/material/alphamap": "مپ آلفا",
      "sidebar/material/bumpmap": "مپ بامپ",
      "sidebar/material/normalmap": "مپ نرمال",
      "sidebar/material/clearcoatmap": "مپ کلیرکت",
      "sidebar/material/clearcoatnormalmap": "مپ معمولی کلیرکت",
      "sidebar/material/clearcoatroughnessmap": "مپ زبری کلیرکت",
      "sidebar/material/displacementmap": "مپ جابجایی",
      "sidebar/material/roughnessmap": "مپ زبری",
      "sidebar/material/metalnessmap": "مپ فلزی بودن",
      "sidebar/material/specularmap": "مپ اسپکولار",
      "sidebar/material/iridescencemap": "مپ رنگین کمانی",
      "sidebar/material/iridescencethicknessmap": "مپ ضخامت تین فیلم",
      "sidebar/material/sheencolormap": "مپ رنگ درخشش (شین)",
      "sidebar/material/sheenroughnessmap": "مپ زبری شین",
      "sidebar/material/envmap": "مپ محیط",
      "sidebar/material/lightmap": "مپ نور",
      "sidebar/material/aomap": "AO مپ",
      "sidebar/material/emissivemap": "مپ پرتاب کننده",
      "sidebar/material/gradientmap": "مپ گردینت",
      "sidebar/material/transmissionmap": "مپ انتقال",
      "sidebar/material/thicknessmap": "مپ ضخامت",
      "sidebar/material/side": "سمت",
      "sidebar/material/size": "سایز",
      "sidebar/material/sizeAttenuation": "تضعیف سایز",
      "sidebar/material/flatShading": "سایه زنی تخت",
      "sidebar/material/blending": "مخلوط کردن",
      "sidebar/material/opacity": "کدر بودن",
      "sidebar/material/transparent": "شفاف",
      "sidebar/material/forcesinglepass": "فورس سینگل پس",
      "sidebar/material/alphatest": "تست آلفا",
      "sidebar/material/depthtest": "تست عمق",
      "sidebar/material/depthwrite": "نوشتن عمق",
      "sidebar/material/wireframe": "وایرفریم",
      "sidebar/material/userdata": "داده کاربر",
      "sidebar/material/export": "اکسپورت جیسون",
      "sidebar/script/new": "جدید",
      "sidebar/script/edit": "ویرایش",
      "sidebar/script/remove": "حذف",
      "sidebar/project": "پروژه ها",
      "sidebar/project/renderer": "رندرر",
      "sidebar/project/antialias": "آنتی الآیس",
      "sidebar/project/shadows": "سایه ها",
      "sidebar/project/toneMapping": "تون مپینگ",
      "sidebar/project/geometries": "هندسه ها",
      "sidebar/project/materials": "متریال ها",
      "sidebar/project/textures": "تکستچرها",
      "sidebar/project/Assign": "اختصاص",
      "sidebar/project/app": "اپ",
      "sidebar/project/app/play": "پخش",
      "sidebar/project/app/stop": "توقف",
      "sidebar/project/app/title": "تیتر",
      "sidebar/project/app/editable": "قابل ویرایش",
      "sidebar/project/app/publish": "انتشار",
      "sidebar/project/image": "عکس",
      "sidebar/project/image/samples": "نمونه ها",
      "sidebar/project/video": "ویدیو",
      "sidebar/project/shading": "سایه زنی",
      "sidebar/project/resolution": "وضوح",
      "sidebar/project/duration": "مدت",
      "sidebar/project/render": "رندر",
      "sidebar/settings": "تنظیمات",
      "sidebar/settings/language": "زبان ها",
      "sidebar/settings/shortcuts": "شورت کات ها",
      "sidebar/settings/shortcuts/translate": "ترجمه",
      "sidebar/settings/shortcuts/rotate": "چرخش (دوران)",
      "sidebar/settings/shortcuts/scale": "مقیاس",
      "sidebar/settings/shortcuts/undo": "بازگشت به عقب",
      "sidebar/settings/shortcuts/focus": "فوکوس",
      "sidebar/history": "هیستوری",
      "sidebar/history/clear": "پاک کردن",
      "sidebar/history/persistent": "ماندگار",
      "toolbar/translate": "ترجمه",
      "toolbar/rotate": "چرخش (دوران)",
      "toolbar/scale": "مقیاس",
      "toolbar/local": "لوکال",
      "viewport/controls/grid": "گرید",
      "viewport/controls/helpers": "کمک کننده",
      "viewport/info/object": "آبجکت",
      "viewport/info/objects": "آبجکت ها",
      "viewport/info/vertex": "راس",
      "viewport/info/vertices": "رئوس",
      "viewport/info/triangle": "مثلث",
      "viewport/info/triangles": "مثلث ها",
      "viewport/info/sample": "نمونه",
      "viewport/info/samples": "نمونه ها",
      "viewport/info/rendertime": "زمان رندر",
      "script/title/vertexShader": "شیدر راس",
      "script/title/fragmentShader": "شیدر فرگمنت",
      "script/title/programInfo": "خواص برنامه",
      "dialog/gltf/title": "Import glTF",
      "dialog/gltf/asScene": "Import glTF as root scene",
      "dialog/texture/title": "Texture Parameters",
      "dialog/texture/group/preview": "Preview",
      "dialog/texture/group/mapping": "Mapping",
      "dialog/texture/group/filtering": "Filtering",
      "dialog/texture/group/transform": "Transform",
      "dialog/texture/group/color": "Color",
      "dialog/texture/mapping": "Mapping",
      "dialog/texture/wrapS": "Wrap S",
      "dialog/texture/wrapT": "Wrap T",
      "dialog/texture/magFilter": "Mag Filter",
      "dialog/texture/minFilter": "Min Filter",
      "dialog/texture/anisotropy": "Anisotropy",
      "dialog/texture/offset": "Offset",
      "dialog/texture/repeat": "Repeat",
      "dialog/texture/center": "Center",
      "dialog/texture/rotation": "Rotation",
      "dialog/texture/premultiplyAlpha": "Premultiply Alpha",
      "dialog/texture/colorSpace": "Color Space",
      "dialog/ok": "OK",
      "dialog/cancel": "Cancel"
    },
    en: {
      "prompt/file/open": "Any unsaved data will be lost. Are you sure?",
      "prompt/file/failedToOpenProject": "Failed to open project!",
      "prompt/file/export/noMeshSelected": "No Mesh selected!",
      "prompt/file/export/noObjectSelected": "No Object selected!",
      "prompt/file/export/duplicateNames": "Some objects share the same name. They will be renamed to ensure unique names. Are you sure?",
      "prompt/script/remove": "Are you sure?",
      "prompt/history/clear": "The Undo/Redo History will be cleared. Are you sure?",
      "prompt/history/preserve": `The history will be preserved across sessions.
This can have an impact on performance when working with textures.`,
      "prompt/history/forbid": "Undo/Redo disabled while scene is playing.",
      "prompt/rendering/realistic/unsupportedMaterial": "REALISTIC Shading: Only MeshStandardMaterial and MeshPhysicalMaterial are supported",
      "command/AddObject": "Add Object",
      "command/AddScript": "Add Script",
      "command/MoveObject": "Move Object",
      "command/MultiCmds": "Multiple Changes",
      "command/RemoveObject": "Remove Object",
      "command/RemoveScript": "Remove Script",
      "command/SetColor": "Set Color",
      "command/SetGeometry": "Set Geometry",
      "command/SetGeometryValue": "Set Geometry Value",
      "command/SetMaterialColor": "Set Material Color",
      "command/SetMaterial": "Set Material",
      "command/SetMaterialMap": "Set Material Map",
      "command/SetMaterialRange": "Set Material Range",
      "command/SetMaterialValue": "Set Material Value",
      "command/SetMaterialVector": "Set Material Vector",
      "command/SetPosition": "Set Position",
      "command/SetRotation": "Set Rotation",
      "command/SetScale": "Set Scale",
      "command/SetScene": "Set Scene",
      "command/SetScriptValue": "Set Script Value",
      "command/SetShadowValue": "Set Shadow Value",
      "command/SetTextureParameters": "Set Texture Parameters",
      "command/SetUuid": "Set UUID",
      "command/SetValue": "Set Value",
      "menubar/file": "File",
      "menubar/file/new": "New",
      "menubar/file/new/empty": "Empty",
      "menubar/file/new/Arkanoid": "Arkanoid",
      "menubar/file/new/Camera": "Camera",
      "menubar/file/new/Particles": "Particles",
      "menubar/file/new/Pong": "Pong",
      "menubar/file/new/Shaders": "Shaders",
      "menubar/file/open": "Open",
      "menubar/file/save": "Save",
      "menubar/file/import": "Import",
      "menubar/file/export": "Export",
      "menubar/edit": "Edit",
      "menubar/edit/undo": "Undo",
      "menubar/edit/redo": "Redo",
      "menubar/edit/center": "Center",
      "menubar/edit/clone": "Clone",
      "menubar/edit/delete": "Delete",
      "menubar/add": "Add",
      "menubar/add/group": "Group",
      "menubar/add/mesh": "Mesh",
      "menubar/add/mesh/plane": "Plane",
      "menubar/add/mesh/box": "Box",
      "menubar/add/mesh/capsule": "Capsule",
      "menubar/add/mesh/circle": "Circle",
      "menubar/add/mesh/cylinder": "Cylinder",
      "menubar/add/mesh/ring": "Ring",
      "menubar/add/mesh/sphere": "Sphere",
      "menubar/add/mesh/dodecahedron": "Dodecahedron",
      "menubar/add/mesh/icosahedron": "Icosahedron",
      "menubar/add/mesh/octahedron": "Octahedron",
      "menubar/add/mesh/tetrahedron": "Tetrahedron",
      "menubar/add/text": "Text",
      "menubar/add/mesh/torus": "Torus",
      "menubar/add/mesh/tube": "Tube",
      "menubar/add/mesh/torusknot": "TorusKnot",
      "menubar/add/mesh/lathe": "Lathe",
      "menubar/add/mesh/sprite": "Sprite",
      "menubar/add/light": "Light",
      "menubar/add/light/ambient": "Ambient",
      "menubar/add/light/directional": "Directional",
      "menubar/add/light/hemisphere": "Hemisphere",
      "menubar/add/light/point": "Point",
      "menubar/add/light/spot": "Spot",
      "menubar/add/camera": "Camera",
      "menubar/add/camera/perspective": "Perspective",
      "menubar/add/camera/orthographic": "Orthographic",
      "menubar/status/autosave": "autosave",
      "menubar/view": "View",
      "menubar/view/fullscreen": "Fullscreen",
      "menubar/view/gridHelper": "Grid Helper",
      "menubar/view/cameraHelpers": "Camera Helpers",
      "menubar/view/lightHelpers": "Light Helpers",
      "menubar/view/skeletonHelpers": "Skeleton Helpers",
      "menubar/render": "Render",
      "menubar/render/image": "Image",
      "menubar/render/video": "Video",
      "menubar/render/quality": "Quality",
      "menubar/render/cancel": "Cancel",
      "menubar/help": "Help",
      "menubar/help/source_code": "Source Code",
      "menubar/help/icons": "Icon Pack",
      "menubar/help/about": "About",
      "menubar/help/manual": "Manual",
      "sidebar/animations": "Animations",
      "sidebar/animations/play": "Play",
      "sidebar/animations/stop": "Stop",
      "sidebar/animations/timescale": "Time Scale",
      "sidebar/scene": "Scene",
      "sidebar/scene/background": "Background",
      "sidebar/scene/environment": "Environment",
      "sidebar/scene/fog": "Fog",
      "sidebar/properties/object": "Object",
      "sidebar/properties/geometry": "Geometry",
      "sidebar/properties/material": "Material",
      "sidebar/properties/script": "Script",
      "sidebar/object/type": "Type",
      "sidebar/object/new": "New",
      "sidebar/object/uuid": "UUID",
      "sidebar/object/name": "Name",
      "sidebar/object/position": "Position",
      "sidebar/object/rotation": "Rotation",
      "sidebar/object/scale": "Scale",
      "sidebar/object/fov": "Fov",
      "sidebar/object/left": "Left",
      "sidebar/object/right": "Right",
      "sidebar/object/top": "Top",
      "sidebar/object/bottom": "Bottom",
      "sidebar/object/near": "Near",
      "sidebar/object/far": "Far",
      "sidebar/object/intensity": "Intensity",
      "sidebar/object/color": "Color",
      "sidebar/object/groundcolor": "Ground Color",
      "sidebar/object/distance": "Distance",
      "sidebar/object/angle": "Angle",
      "sidebar/object/penumbra": "Penumbra",
      "sidebar/object/decay": "Decay",
      "sidebar/object/shadow": "Shadow",
      "sidebar/object/shadowIntensity": "Shadow Intensity",
      "sidebar/object/shadowBias": "Shadow Bias",
      "sidebar/object/shadowNormalBias": "Shadow Normal Bias",
      "sidebar/object/shadowRadius": "Shadow Radius",
      "sidebar/object/cast": "cast",
      "sidebar/object/receive": "receive",
      "sidebar/object/visible": "Visible",
      "sidebar/object/frustumcull": "Frustum Cull",
      "sidebar/object/renderorder": "Render Order",
      "sidebar/object/userdata": "User data",
      "sidebar/object/export": "Export JSON",
      "sidebar/geometry/type": "Type",
      "sidebar/geometry/new": "New",
      "sidebar/geometry/uuid": "UUID",
      "sidebar/geometry/name": "Name",
      "sidebar/geometry/bounds": "Bounds",
      "sidebar/geometry/userdata": "User Data",
      "sidebar/geometry/show_vertex_normals": "Show Vertex Normals",
      "sidebar/geometry/compute_vertex_normals": "Compute Vertex Normals",
      "sidebar/geometry/compute_vertex_tangents": "Compute Tangents",
      "sidebar/geometry/center": "Center",
      "sidebar/geometry/export": "Export JSON",
      "sidebar/geometry/morph": "Morph Targets",
      "sidebar/geometry/box_geometry/width": "Width",
      "sidebar/geometry/box_geometry/height": "Height",
      "sidebar/geometry/box_geometry/depth": "Depth",
      "sidebar/geometry/box_geometry/widthseg": "Width Seg",
      "sidebar/geometry/box_geometry/heightseg": "Height Seg",
      "sidebar/geometry/box_geometry/depthseg": "Depth Seg",
      "sidebar/geometry/buffer_geometry/attributes": "Attributes",
      "sidebar/geometry/buffer_geometry/index": "index",
      "sidebar/geometry/buffer_geometry/morphAttributes": "Morph Attributes",
      "sidebar/geometry/buffer_geometry/morphRelative": "Morph Relative",
      "sidebar/geometry/capsule_geometry/radius": "Radius",
      "sidebar/geometry/capsule_geometry/height": "Height",
      "sidebar/geometry/capsule_geometry/capseg": "Cap Seg",
      "sidebar/geometry/capsule_geometry/radialseg": "Radial Seg",
      "sidebar/geometry/capsule_geometry/heightseg": "Height Seg",
      "sidebar/geometry/circle_geometry/radius": "Radius",
      "sidebar/geometry/circle_geometry/segments": "Segments",
      "sidebar/geometry/circle_geometry/thetastart": "Theta start",
      "sidebar/geometry/circle_geometry/thetalength": "Theta length",
      "sidebar/geometry/cylinder_geometry/radiustop": "Radius top",
      "sidebar/geometry/cylinder_geometry/radiusbottom": "Radius bottom",
      "sidebar/geometry/cylinder_geometry/height": "Height",
      "sidebar/geometry/cylinder_geometry/radialsegments": "Radial segments",
      "sidebar/geometry/cylinder_geometry/heightsegments": "Height segments",
      "sidebar/geometry/cylinder_geometry/openended": "Open ended",
      "sidebar/geometry/extrude_geometry/curveSegments": "Curve Segments",
      "sidebar/geometry/extrude_geometry/steps": "Steps",
      "sidebar/geometry/extrude_geometry/depth": "Depth",
      "sidebar/geometry/extrude_geometry/bevelEnabled": "Bevel",
      "sidebar/geometry/extrude_geometry/bevelThickness": "Thickness",
      "sidebar/geometry/extrude_geometry/bevelSize": "Size",
      "sidebar/geometry/extrude_geometry/bevelOffset": "Offset",
      "sidebar/geometry/extrude_geometry/bevelSegments": "Segments",
      "sidebar/geometry/extrude_geometry/shape": "Convert to Shape",
      "sidebar/geometry/dodecahedron_geometry/radius": "Radius",
      "sidebar/geometry/dodecahedron_geometry/detail": "Detail",
      "sidebar/geometry/icosahedron_geometry/radius": "Radius",
      "sidebar/geometry/icosahedron_geometry/detail": "Detail",
      "sidebar/geometry/octahedron_geometry/radius": "Radius",
      "sidebar/geometry/octahedron_geometry/detail": "Detail",
      "sidebar/geometry/tetrahedron_geometry/radius": "Radius",
      "sidebar/geometry/tetrahedron_geometry/detail": "Detail",
      "sidebar/geometry/lathe_geometry/segments": "Segments",
      "sidebar/geometry/lathe_geometry/phistart": "Phi start (°)",
      "sidebar/geometry/lathe_geometry/philength": "Phi length (°)",
      "sidebar/geometry/lathe_geometry/points": "Points",
      "sidebar/geometry/plane_geometry/width": "Width",
      "sidebar/geometry/plane_geometry/height": "Height",
      "sidebar/geometry/plane_geometry/widthsegments": "Width segments",
      "sidebar/geometry/plane_geometry/heightsegments": "Height segments",
      "sidebar/geometry/ring_geometry/innerRadius": "Inner radius",
      "sidebar/geometry/ring_geometry/outerRadius": "Outer radius",
      "sidebar/geometry/ring_geometry/thetaSegments": "Theta segments",
      "sidebar/geometry/ring_geometry/phiSegments": "Phi segments",
      "sidebar/geometry/ring_geometry/thetastart": "Theta start",
      "sidebar/geometry/ring_geometry/thetalength": "Theta length",
      "sidebar/geometry/text_geometry/text": "Text",
      "sidebar/geometry/text_geometry/size": "Font size",
      "sidebar/geometry/text_geometry/depth": "Extrude depth",
      "sidebar/geometry/text_geometry/scale": "Scale",
      "sidebar/geometry/text_geometry/curveseg": "Curve segments",
      "sidebar/geometry/text_geometry/bevelenabled": "Bevel enabled",
      "sidebar/geometry/text_geometry/bevelthickness": "Bevel thickness",
      "sidebar/geometry/text_geometry/bevelsize": "Bevel size",
      "sidebar/geometry/text_geometry/bevelOffset": "Bevel offset",
      "sidebar/geometry/text_geometry/bevelseg": "Bevel segments",
      "sidebar/geometry/shape_geometry/curveSegments": "Curve Segments",
      "sidebar/geometry/shape_geometry/extrude": "Extrude",
      "sidebar/geometry/sphere_geometry/radius": "Radius",
      "sidebar/geometry/sphere_geometry/widthsegments": "Width segments",
      "sidebar/geometry/sphere_geometry/heightsegments": "Height segments",
      "sidebar/geometry/sphere_geometry/phistart": "Phi start",
      "sidebar/geometry/sphere_geometry/philength": "Phi length",
      "sidebar/geometry/sphere_geometry/thetastart": "Theta start",
      "sidebar/geometry/sphere_geometry/thetalength": "Theta length",
      "sidebar/geometry/torus_geometry/radius": "Radius",
      "sidebar/geometry/torus_geometry/tube": "Tube",
      "sidebar/geometry/torus_geometry/radialsegments": "Radial segments",
      "sidebar/geometry/torus_geometry/tubularsegments": "Tubular segments",
      "sidebar/geometry/torus_geometry/arc": "Arc",
      "sidebar/geometry/torusKnot_geometry/radius": "Radius",
      "sidebar/geometry/torusKnot_geometry/tube": "Tube",
      "sidebar/geometry/torusKnot_geometry/tubularsegments": "Tubular segments",
      "sidebar/geometry/torusKnot_geometry/radialsegments": "Radial segments",
      "sidebar/geometry/torusKnot_geometry/p": "P",
      "sidebar/geometry/torusKnot_geometry/q": "Q",
      "sidebar/geometry/tube_geometry/path": "Path",
      "sidebar/geometry/tube_geometry/radius": "Radius",
      "sidebar/geometry/tube_geometry/tube": "Tube",
      "sidebar/geometry/tube_geometry/tubularsegments": "Tubular segments",
      "sidebar/geometry/tube_geometry/radialsegments": "Radial segments",
      "sidebar/geometry/tube_geometry/closed": "Closed",
      "sidebar/geometry/tube_geometry/curvetype": "Curve Type",
      "sidebar/geometry/tube_geometry/tension": "Tension",
      "sidebar/material/new": "New",
      "sidebar/material/copy": "Copy",
      "sidebar/material/paste": "Paste",
      "sidebar/material/slot": "Slot",
      "sidebar/material/type": "Type",
      "sidebar/material/uuid": "UUID",
      "sidebar/material/name": "Name",
      "sidebar/material/program": "Program",
      "sidebar/material/info": "Info",
      "sidebar/material/vertex": "Vert",
      "sidebar/material/fragment": "Frag",
      "sidebar/material/color": "Color",
      "sidebar/material/depthPacking": "Depth Packing",
      "sidebar/material/roughness": "Roughness",
      "sidebar/material/metalness": "Metalness",
      "sidebar/material/reflectivity": "Reflectivity",
      "sidebar/material/emissive": "Emissive",
      "sidebar/material/specular": "Specular",
      "sidebar/material/shininess": "Shininess",
      "sidebar/material/clearcoat": "Clearcoat",
      "sidebar/material/clearcoatroughness": "Clearcoat Roughness",
      "sidebar/material/dispersion": "Dispersion",
      "sidebar/material/ior": "IOR",
      "sidebar/material/iridescence": "Iridescence",
      "sidebar/material/iridescenceIOR": "Thin-Film IOR",
      "sidebar/material/iridescenceThicknessMax": "Thin-Film Thickness",
      "sidebar/material/sheen": "Sheen",
      "sidebar/material/sheenroughness": "Sheen Roughness",
      "sidebar/material/sheencolor": "Sheen Color",
      "sidebar/material/transmission": "Transmission",
      "sidebar/material/attenuationDistance": "Attenuation Distance",
      "sidebar/material/attenuationColor": "Attenuation Color",
      "sidebar/material/thickness": "Thickness",
      "sidebar/material/vertexcolors": "Vertex Colors",
      "sidebar/material/matcap": "Matcap",
      "sidebar/material/map": "Map",
      "sidebar/material/alphamap": "Alpha Map",
      "sidebar/material/bumpmap": "Bump Map",
      "sidebar/material/normalmap": "Normal Map",
      "sidebar/material/clearcoatmap": "Clearcoat Map",
      "sidebar/material/clearcoatnormalmap": "Clearcoat Normal Map",
      "sidebar/material/clearcoatroughnessmap": "Clearcoat Roughness Map",
      "sidebar/material/displacementmap": "Displace Map",
      "sidebar/material/roughnessmap": "Rough. Map",
      "sidebar/material/metalnessmap": "Metal. Map",
      "sidebar/material/specularmap": "Specular Map",
      "sidebar/material/iridescencemap": "Irid. Map",
      "sidebar/material/iridescencethicknessmap": "Thin-Film Thickness Map",
      "sidebar/material/sheencolormap": "Sheen Color Map",
      "sidebar/material/sheenroughnessmap": "Sheen Rough. Map",
      "sidebar/material/envmap": "Env Map",
      "sidebar/material/lightmap": "Light Map",
      "sidebar/material/aomap": "AO Map",
      "sidebar/material/emissivemap": "Emissive Map",
      "sidebar/material/gradientmap": "Gradient Map",
      "sidebar/material/transmissionmap": "Transmission Map",
      "sidebar/material/thicknessmap": "Thickness Map",
      "sidebar/material/side": "Side",
      "sidebar/material/size": "Size",
      "sidebar/material/sizeAttenuation": "Size Attenuation",
      "sidebar/material/flatShading": "Flat Shading",
      "sidebar/material/blending": "Blending",
      "sidebar/material/opacity": "Opacity",
      "sidebar/material/transparent": "Transparent",
      "sidebar/material/forcesinglepass": "Force Single Pass",
      "sidebar/material/alphatest": "Alpha Test",
      "sidebar/material/depthtest": "Depth Test",
      "sidebar/material/depthwrite": "Depth Write",
      "sidebar/material/wireframe": "Wireframe",
      "sidebar/material/userdata": "User data",
      "sidebar/material/export": "Export JSON",
      "sidebar/script/new": "New",
      "sidebar/script/edit": "Edit",
      "sidebar/script/remove": "Remove",
      "sidebar/project": "Project",
      "sidebar/project/camera": "Camera",
      "sidebar/project/renderer": "Renderer",
      "sidebar/project/antialias": "Antialias",
      "sidebar/project/shadows": "Shadows",
      "sidebar/project/toneMapping": "Tonemapping",
      "sidebar/project/geometries": "Geometries",
      "sidebar/project/materials": "Materials",
      "sidebar/project/textures": "Textures",
      "sidebar/project/Assign": "Assign",
      "sidebar/project/app": "App",
      "sidebar/project/app/play": "Play",
      "sidebar/project/app/stop": "Stop",
      "sidebar/project/app/title": "Title",
      "sidebar/project/app/editable": "Editable",
      "sidebar/project/app/publish": "Publish",
      "sidebar/project/image": "Image",
      "sidebar/project/image/samples": "Samples",
      "sidebar/project/video": "Video",
      "sidebar/project/shading": "Shading",
      "sidebar/project/resolution": "Resolution",
      "sidebar/project/duration": "Duration",
      "sidebar/project/render": "Render",
      "sidebar/settings": "Settings",
      "sidebar/settings/language": "Language",
      "sidebar/settings/shortcuts": "Shortcuts",
      "sidebar/settings/shortcuts/translate": "Translate",
      "sidebar/settings/shortcuts/rotate": "Rotate",
      "sidebar/settings/shortcuts/scale": "Scale",
      "sidebar/settings/shortcuts/undo": "Undo",
      "sidebar/settings/shortcuts/focus": "Focus",
      "sidebar/settings/shortcuts/perspective": "Perspective",
      "sidebar/settings/shortcuts/orthographic": "Orthographic",
      "sidebar/history": "History",
      "sidebar/history/clear": "Clear",
      "sidebar/history/persistent": "Persistent",
      "toolbar/translate": "Translate",
      "toolbar/rotate": "Rotate",
      "toolbar/scale": "Scale",
      "toolbar/local": "Local",
      "viewport/controls/grid": "Grid",
      "viewport/controls/helpers": "Helpers",
      "viewport/info/object": "Object",
      "viewport/info/objects": "Objects",
      "viewport/info/vertex": "Vertex",
      "viewport/info/vertices": "Vertices",
      "viewport/info/triangle": "Triangle",
      "viewport/info/triangles": "Triangles",
      "viewport/info/sample": "Sample",
      "viewport/info/samples": "Samples",
      "viewport/info/rendertime": "Render time",
      "script/title/vertexShader": "Vertex Shader",
      "script/title/fragmentShader": "Fragment Shader",
      "script/title/programInfo": "Program Properties",
      "dialog/gltf/title": "Import glTF",
      "dialog/gltf/asScene": "Import glTF as root scene",
      "dialog/texture/title": "Texture Parameters",
      "dialog/texture/group/preview": "Preview",
      "dialog/texture/group/mapping": "Mapping",
      "dialog/texture/group/filtering": "Filtering",
      "dialog/texture/group/transform": "Transform",
      "dialog/texture/group/color": "Color",
      "dialog/texture/mapping": "Mapping",
      "dialog/texture/wrapS": "Wrap S",
      "dialog/texture/wrapT": "Wrap T",
      "dialog/texture/magFilter": "Mag Filter",
      "dialog/texture/minFilter": "Min Filter",
      "dialog/texture/anisotropy": "Anisotropy",
      "dialog/texture/offset": "Offset",
      "dialog/texture/repeat": "Repeat",
      "dialog/texture/center": "Center",
      "dialog/texture/rotation": "Rotation",
      "dialog/texture/premultiplyAlpha": "Premultiply Alpha",
      "dialog/texture/colorSpace": "Color Space",
      "dialog/ok": "OK",
      "dialog/cancel": "Cancel"
    },
    fr: {
      "prompt/file/open": "Toutes les données non enregistrées seront perdues Êtes-vous sûr ?",
      "prompt/file/failedToOpenProject": "Échec de l'ouverture du projet !",
      "prompt/file/export/noMeshSelected": "Aucun maillage sélectionné !",
      "prompt/file/export/noObjectSelected": "Aucun objet sélectionné !",
      "prompt/file/export/duplicateNames": "Certains objets portent le même nom. Ils seront renommés afin de garantir des noms uniques. Êtes-vous sûr ?",
      "prompt/script/remove": "Es-tu sûr?",
      "prompt/history/clear": "L'historique d'annulation/rétablissement sera effacé Êtes-vous sûr ?",
      "prompt/history/preserve": `L'histoire sera conservée entre les sessions.
Cela peut avoir un impact sur les performances lors de la manipulation des textures.`,
      "prompt/history/forbid": "Les fonctions Annuler/Rétablir sont désactivées pendant la lecture de la scène.",
      "prompt/rendering/realistic/unsupportedMaterial": "Ombrage REALISTIC : seuls MeshStandardMaterial et MeshPhysicalMaterial sont pris en charge",
      "command/AddObject": "Ajouter un objet",
      "command/AddScript": "Ajouter un script",
      "command/MoveObject": "Déplacer l’objet",
      "command/MultiCmds": "Changements multiples",
      "command/RemoveObject": "Supprimer l’objet",
      "command/RemoveScript": "Supprimer le script",
      "command/SetColor": "Définir la couleur",
      "command/SetGeometry": "Définir la géométrie",
      "command/SetGeometryValue": "Définir la valeur de la géométrie",
      "command/SetMaterialColor": "Définir la couleur du matériau",
      "command/SetMaterial": "Matériel de l’ensemble",
      "command/SetMaterialMap": "Définir la carte des matériaux",
      "command/SetMaterialRange": "Définir la gamme de matériaux",
      "command/SetMaterialValue": "Définir la valeur du matériau",
      "command/SetMaterialVector": "Définir le vecteur de matériau",
      "command/SetPosition": "Définir la position",
      "command/SetRotation": "Définir la rotation",
      "command/SetScale": "Définir l’échelle",
      "command/SetScene": "Planter le décor",
      "command/SetScriptValue": "Définir la valeur du script",
      "command/SetShadowValue": "Set Shadow Value",
      "command/SetTextureParameters": "Définir les paramètres de la texture",
      "command/SetUuid": "Définir l’UUID",
      "command/SetValue": "Définir la valeur",
      "menubar/file": "Fichier",
      "menubar/file/new": "Nouveau",
      "menubar/file/new/empty": "Vide",
      "menubar/file/new/Arkanoid": "Arkanoid",
      "menubar/file/new/Camera": "Camera",
      "menubar/file/new/Particles": "Particles",
      "menubar/file/new/Pong": "Pong",
      "menubar/file/new/Shaders": "Shaders",
      "menubar/file/open": "Open",
      "menubar/file/save": "Save",
      "menubar/file/import": "Importer",
      "menubar/file/export": "Exporter",
      "menubar/edit": "Edition",
      "menubar/edit/undo": "Annuler",
      "menubar/edit/redo": "Refaire",
      "menubar/edit/center": "Center",
      "menubar/edit/clone": "Cloner",
      "menubar/edit/delete": "Supprimer",
      "menubar/add": "Ajouter",
      "menubar/add/group": "Groupe",
      "menubar/add/mesh": "Maille",
      "menubar/add/mesh/plane": "Plan",
      "menubar/add/mesh/box": "Cube",
      "menubar/add/mesh/capsule": "Capsule",
      "menubar/add/mesh/circle": "Cercle",
      "menubar/add/mesh/cylinder": "Cylindre",
      "menubar/add/mesh/ring": "Bague",
      "menubar/add/mesh/sphere": "Sphère",
      "menubar/add/mesh/dodecahedron": "Dodécaèdre",
      "menubar/add/mesh/icosahedron": "Icosaèdre",
      "menubar/add/mesh/octahedron": "Octaèdre",
      "menubar/add/mesh/tetrahedron": "Tétraèdre",
      "menubar/add/text": "Text",
      "menubar/add/mesh/torus": "Torus",
      "menubar/add/mesh/tube": "Tube",
      "menubar/add/mesh/torusknot": "Noeud Torus",
      "menubar/add/mesh/lathe": "Tour",
      "menubar/add/mesh/sprite": "Sprite",
      "menubar/add/light": "Lumière",
      "menubar/add/light/ambient": "Ambiante",
      "menubar/add/light/directional": "Directionnelle",
      "menubar/add/light/hemisphere": "Hémisphérique",
      "menubar/add/light/point": "Ponctuelle",
      "menubar/add/light/spot": "Projecteur",
      "menubar/add/camera": "Caméra",
      "menubar/add/camera/perspective": "Perspective",
      "menubar/add/camera/orthographic": "Orthographique",
      "menubar/status/autosave": "enregistrement automatique",
      "menubar/view": "View",
      "menubar/view/fullscreen": "Fullscreen",
      "menubar/view/gridHelper": "Assistant de grille",
      "menubar/view/cameraHelpers": "Aides à la caméra",
      "menubar/view/lightHelpers": "Aides Lumière",
      "menubar/view/skeletonHelpers": "Aides squelettes",
      "menubar/render": "Rendu",
      "menubar/render/image": "Image",
      "menubar/render/video": "Vidéo",
      "menubar/render/quality": "Qualité",
      "menubar/render/cancel": "Annuler",
      "menubar/help": "Aide",
      "menubar/help/source_code": "Code Source",
      "menubar/help/icons": "Icon Pack",
      "menubar/help/about": "A propos",
      "menubar/help/manual": "Manual",
      "sidebar/animations": "Animations",
      "sidebar/animations/play": "Play",
      "sidebar/animations/stop": "Stop",
      "sidebar/animations/timescale": "Time Scale",
      "sidebar/scene": "Scène",
      "sidebar/scene/background": "Arrière Plan",
      "sidebar/scene/environment": "Environment",
      "sidebar/scene/fog": "Brouillard",
      "sidebar/properties/object": "Objet",
      "sidebar/properties/geometry": "Géométrie",
      "sidebar/properties/material": "Matériaux",
      "sidebar/properties/script": "Script",
      "sidebar/object/type": "Type",
      "sidebar/object/new": "Nouveau",
      "sidebar/object/uuid": "UUID",
      "sidebar/object/name": "Nom",
      "sidebar/object/position": "Position",
      "sidebar/object/rotation": "Rotation",
      "sidebar/object/scale": "Échelle",
      "sidebar/object/fov": "Champ de vision",
      "sidebar/object/left": "Gauche",
      "sidebar/object/right": "Droite",
      "sidebar/object/top": "Haut",
      "sidebar/object/bottom": "Bas",
      "sidebar/object/near": "Près",
      "sidebar/object/far": "Loin",
      "sidebar/object/intensity": "Intensité",
      "sidebar/object/color": "Couleur",
      "sidebar/object/groundcolor": "Couleur de fond",
      "sidebar/object/distance": "Distance",
      "sidebar/object/angle": "Angle",
      "sidebar/object/penumbra": "Pénombre",
      "sidebar/object/decay": "Affaiblissement",
      "sidebar/object/shadow": "Ombre",
      "sidebar/object/shadowIntensity": "Shadow Intensity",
      "sidebar/object/shadowBias": "Biais directionnel des ombres",
      "sidebar/object/shadowNormalBias": "Shadow Normal Bias",
      "sidebar/object/shadowRadius": "Rayon de l'ombre",
      "sidebar/object/cast": "Projète",
      "sidebar/object/receive": "Reçoit",
      "sidebar/object/visible": "Visible",
      "sidebar/object/frustumcull": "Culling",
      "sidebar/object/renderorder": "Ordre de rendus",
      "sidebar/object/userdata": "Données utilisateur",
      "sidebar/object/export": "Exporter JSON",
      "sidebar/geometry/type": "Type",
      "sidebar/geometry/new": "Nouveau",
      "sidebar/geometry/uuid": "UUID",
      "sidebar/geometry/name": "Nom",
      "sidebar/geometry/bounds": "Limites",
      "sidebar/geometry/userdata": "Données utilisateur",
      "sidebar/geometry/show_vertex_normals": "Afficher normales",
      "sidebar/geometry/compute_vertex_normals": "Compute Vertex Normals",
      "sidebar/geometry/compute_vertex_tangents": "Compute Tangents",
      "sidebar/geometry/center": "Center",
      "sidebar/geometry/export": "Exporter JSON",
      "sidebar/geometry/morph": "Morph Targets",
      "sidebar/geometry/box_geometry/width": "Largeur",
      "sidebar/geometry/box_geometry/height": "Hauteur",
      "sidebar/geometry/box_geometry/depth": "Profondeur",
      "sidebar/geometry/box_geometry/widthseg": "Segments en Largeur",
      "sidebar/geometry/box_geometry/heightseg": "Segments en Hauteur",
      "sidebar/geometry/box_geometry/depthseg": "Segments en Profondeur",
      "sidebar/geometry/buffer_geometry/attributes": "Attributs",
      "sidebar/geometry/buffer_geometry/index": "index",
      "sidebar/geometry/buffer_geometry/morphAttributes": "Morph Attributes",
      "sidebar/geometry/buffer_geometry/morphRelative": "Morph Relative",
      "sidebar/geometry/capsule_geometry/radius": "Radius",
      "sidebar/geometry/capsule_geometry/height": "Hauteur",
      "sidebar/geometry/capsule_geometry/capseg": "Cap Seg",
      "sidebar/geometry/capsule_geometry/radialseg": "Radial Seg",
      "sidebar/geometry/capsule_geometry/heightseg": "Height Seg",
      "sidebar/geometry/circle_geometry/radius": "Rayon",
      "sidebar/geometry/circle_geometry/segments": "Segments",
      "sidebar/geometry/circle_geometry/thetastart": "Début Thêta (°)",
      "sidebar/geometry/circle_geometry/thetalength": "Longueur Thêta (°)",
      "sidebar/geometry/cylinder_geometry/radiustop": "Rayon supérieur",
      "sidebar/geometry/cylinder_geometry/radiusbottom": "Rayon inférieur",
      "sidebar/geometry/cylinder_geometry/height": "Hauteur",
      "sidebar/geometry/cylinder_geometry/radialsegments": "Segments radiaux",
      "sidebar/geometry/cylinder_geometry/heightsegments": "Segments en hauteur",
      "sidebar/geometry/cylinder_geometry/openended": "Extrémités ouvertes",
      "sidebar/geometry/extrude_geometry/curveSegments": "Segments de courbe",
      "sidebar/geometry/extrude_geometry/steps": "Pas",
      "sidebar/geometry/extrude_geometry/depth": "Profondeur",
      "sidebar/geometry/extrude_geometry/bevelEnabled": "Biseau",
      "sidebar/geometry/extrude_geometry/bevelThickness": "Épaisseur",
      "sidebar/geometry/extrude_geometry/bevelSize": "Taille",
      "sidebar/geometry/extrude_geometry/bevelOffset": "Décalage",
      "sidebar/geometry/extrude_geometry/bevelSegments": "Segments",
      "sidebar/geometry/extrude_geometry/shape": "Convertir en forme",
      "sidebar/geometry/dodecahedron_geometry/radius": "Rayon",
      "sidebar/geometry/dodecahedron_geometry/detail": "Détail",
      "sidebar/geometry/icosahedron_geometry/radius": "Rayon",
      "sidebar/geometry/icosahedron_geometry/detail": "Détail",
      "sidebar/geometry/octahedron_geometry/radius": "Rayon",
      "sidebar/geometry/octahedron_geometry/detail": "Détail",
      "sidebar/geometry/tetrahedron_geometry/radius": "Rayon",
      "sidebar/geometry/tetrahedron_geometry/detail": "Détail",
      "sidebar/geometry/lathe_geometry/segments": "Segments",
      "sidebar/geometry/lathe_geometry/phistart": "Début Phi (°)",
      "sidebar/geometry/lathe_geometry/philength": "Longueur Phi (°)",
      "sidebar/geometry/lathe_geometry/points": "Points",
      "sidebar/geometry/plane_geometry/width": "Largeur",
      "sidebar/geometry/plane_geometry/height": "Hauteur",
      "sidebar/geometry/plane_geometry/widthsegments": "Segments en Largeur",
      "sidebar/geometry/plane_geometry/heightsegments": "Segments en Hauteur",
      "sidebar/geometry/ring_geometry/innerRadius": "Rayon intérieur",
      "sidebar/geometry/ring_geometry/outerRadius": "Rayon extérieur",
      "sidebar/geometry/ring_geometry/thetaSegments": "Segments Thêta",
      "sidebar/geometry/ring_geometry/phiSegments": "Phi segments",
      "sidebar/geometry/ring_geometry/thetastart": "Début Thêta",
      "sidebar/geometry/ring_geometry/thetalength": "Longueur Thêta",
      "sidebar/geometry/text_geometry/text": "Text",
      "sidebar/geometry/text_geometry/size": "Font size",
      "sidebar/geometry/text_geometry/depth": "Extrude depth",
      "sidebar/geometry/text_geometry/scale": "Scale",
      "sidebar/geometry/text_geometry/curveseg": "Curve segments",
      "sidebar/geometry/text_geometry/bevelenabled": "Bevel enabled",
      "sidebar/geometry/text_geometry/bevelthickness": "Bevel thickness",
      "sidebar/geometry/text_geometry/bevelsize": "Bevel size",
      "sidebar/geometry/text_geometry/bevelOffset": "Bevel offset",
      "sidebar/geometry/text_geometry/bevelseg": "Bevel segments",
      "sidebar/geometry/shape_geometry/curveSegments": "Segments de courbe",
      "sidebar/geometry/shape_geometry/extrude": "Extruder",
      "sidebar/geometry/sphere_geometry/radius": "Rayon",
      "sidebar/geometry/sphere_geometry/widthsegments": "Segments en Largeur",
      "sidebar/geometry/sphere_geometry/heightsegments": "Segments en Hauteur",
      "sidebar/geometry/sphere_geometry/phistart": "Début Phi (°)",
      "sidebar/geometry/sphere_geometry/philength": "Longueur Phi (°)",
      "sidebar/geometry/sphere_geometry/thetastart": "Début Thêta",
      "sidebar/geometry/sphere_geometry/thetalength": "Longueur Thêta",
      "sidebar/geometry/torus_geometry/radius": "Rayon",
      "sidebar/geometry/torus_geometry/tube": "Tube",
      "sidebar/geometry/torus_geometry/radialsegments": "Segments radiaux",
      "sidebar/geometry/torus_geometry/tubularsegments": "Segments tubulaires",
      "sidebar/geometry/torus_geometry/arc": "Arc",
      "sidebar/geometry/torusKnot_geometry/radius": "Rayon",
      "sidebar/geometry/torusKnot_geometry/tube": "Tube",
      "sidebar/geometry/torusKnot_geometry/tubularsegments": "Segments tubulaires",
      "sidebar/geometry/torusKnot_geometry/radialsegments": "Segments radiaux",
      "sidebar/geometry/torusKnot_geometry/p": "P",
      "sidebar/geometry/torusKnot_geometry/q": "Q",
      "sidebar/geometry/tube_geometry/path": "Chemin",
      "sidebar/geometry/tube_geometry/radius": "Rayon",
      "sidebar/geometry/tube_geometry/tube": "Tube",
      "sidebar/geometry/tube_geometry/tubularsegments": "Segments tubulaires",
      "sidebar/geometry/tube_geometry/radialsegments": "Segments radiaux",
      "sidebar/geometry/tube_geometry/closed": "Fermé",
      "sidebar/geometry/tube_geometry/curvetype": "Type de courbe",
      "sidebar/geometry/tube_geometry/tension": "Tension",
      "sidebar/material/new": "Nouveau",
      "sidebar/material/copy": "Copier",
      "sidebar/material/paste": "Coller",
      "sidebar/material/slot": "Slot",
      "sidebar/material/type": "Type",
      "sidebar/material/uuid": "UUID",
      "sidebar/material/name": "Nom",
      "sidebar/material/program": "Programme",
      "sidebar/material/info": "Info",
      "sidebar/material/vertex": "Sommet",
      "sidebar/material/fragment": "Fragment",
      "sidebar/material/color": "Couleur",
      "sidebar/material/depthPacking": "Encodage profondeur de couleur",
      "sidebar/material/roughness": "Rugosité",
      "sidebar/material/metalness": "Métal",
      "sidebar/material/reflectivity": "Reflectivity",
      "sidebar/material/emissive": "Émissif",
      "sidebar/material/specular": "Spéculaire",
      "sidebar/material/shininess": "Brillance",
      "sidebar/material/clearcoat": "Vernis",
      "sidebar/material/clearcoatroughness": "Rugosité du vernis",
      "sidebar/material/dispersion": "Dispersion",
      "sidebar/material/ior": "IOR",
      "sidebar/material/iridescence": "Iridescence",
      "sidebar/material/iridescenceIOR": "Thin-Film IOR",
      "sidebar/material/iridescenceThicknessMax": "Thin-Film Thickness",
      "sidebar/material/sheen": "Sheen",
      "sidebar/material/sheenroughness": "Sheen Roughness",
      "sidebar/material/sheencolor": "Sheen Color",
      "sidebar/material/transmission": "Transmission",
      "sidebar/material/attenuationDistance": "Attenuation Distance",
      "sidebar/material/attenuationColor": "Attenuation Color",
      "sidebar/material/thickness": "Thickness",
      "sidebar/material/vertexcolors": "Couleurs aux Sommets",
      "sidebar/material/matcap": "Matcap",
      "sidebar/material/map": "Texture",
      "sidebar/material/alphamap": "Texture de transparence",
      "sidebar/material/bumpmap": "Texture de relief",
      "sidebar/material/normalmap": "Texture de normales",
      "sidebar/material/clearcoatmap": "Clearcoat Map",
      "sidebar/material/clearcoatnormalmap": "Texture des normales du vernis",
      "sidebar/material/clearcoatroughnessmap": "Clearcoat Roughness Map",
      "sidebar/material/displacementmap": "Texture de déplacement",
      "sidebar/material/roughnessmap": "Texture de rugosité",
      "sidebar/material/metalnessmap": "Texture métallique",
      "sidebar/material/specularmap": "Texture spéculaire",
      "sidebar/material/iridescencemap": "Irid. Map",
      "sidebar/material/iridescencethicknessmap": "Thin-Film Thickness Map",
      "sidebar/material/sheencolormap": "Sheen Color Map",
      "sidebar/material/sheenroughnessmap": "Sheen Rough. Map",
      "sidebar/material/envmap": "Texture d'environnement",
      "sidebar/material/lightmap": "Texture d'éclairage",
      "sidebar/material/aomap": "Texture d'occlusion ambiante",
      "sidebar/material/emissivemap": "Texture d'émission",
      "sidebar/material/gradientmap": "Texture de gradient",
      "sidebar/material/transmissionmap": "Transmission Map",
      "sidebar/material/thicknessmap": "Thickness Map",
      "sidebar/material/side": "Côté",
      "sidebar/material/size": "Size",
      "sidebar/material/sizeAttenuation": "Size Attenuation",
      "sidebar/material/flatShading": "Flat Shading",
      "sidebar/material/blending": "Mélange",
      "sidebar/material/opacity": "Opacité",
      "sidebar/material/transparent": "Transparence",
      "sidebar/material/forcesinglepass": "Force Single Pass",
      "sidebar/material/alphatest": "Test de transparence",
      "sidebar/material/depthtest": "Depth Test",
      "sidebar/material/depthwrite": "Depth Write",
      "sidebar/material/wireframe": "Fil de fer",
      "sidebar/material/userdata": "Données utilisateur",
      "sidebar/material/export": "Exporter JSON",
      "sidebar/script/new": "Nouveau",
      "sidebar/script/edit": "Editer",
      "sidebar/script/remove": "Supprimer",
      "sidebar/project": "Projet",
      "sidebar/project/renderer": "Moteur",
      "sidebar/project/antialias": "Anticrénelage",
      "sidebar/project/shadows": "Ombres",
      "sidebar/project/toneMapping": "Mappage des nuances",
      "sidebar/project/geometries": "Géométries",
      "sidebar/project/materials": "Matériaux",
      "sidebar/project/textures": "Textures",
      "sidebar/project/Assign": "Attribuer",
      "sidebar/project/app": "App",
      "sidebar/project/app/play": "Jouer",
      "sidebar/project/app/stop": "Arrêter",
      "sidebar/project/app/title": "Titre",
      "sidebar/project/app/editable": "Modifiable",
      "sidebar/project/app/publish": "Publier",
      "sidebar/project/image": "Image",
      "sidebar/project/image/samples": "d'échantillons",
      "sidebar/project/video": "Video",
      "sidebar/project/shading": "Shading",
      "sidebar/project/resolution": "Resolution",
      "sidebar/project/duration": "Duration",
      "sidebar/project/render": "Render",
      "sidebar/settings": "Paramètres",
      "sidebar/settings/language": "Langue",
      "sidebar/settings/shortcuts": "Shortcuts",
      "sidebar/settings/shortcuts/translate": "Position",
      "sidebar/settings/shortcuts/rotate": "Rotation",
      "sidebar/settings/shortcuts/scale": "Échelle",
      "sidebar/settings/shortcuts/undo": "Annuler",
      "sidebar/settings/shortcuts/focus": "Focus",
      "sidebar/history": "Historique",
      "sidebar/history/clear": "Supprimer",
      "sidebar/history/persistent": "Permanent",
      "toolbar/translate": "Position",
      "toolbar/rotate": "Rotation",
      "toolbar/scale": "Échelle",
      "toolbar/local": "Local",
      "viewport/controls/grid": "Grille",
      "viewport/controls/helpers": "Helpers",
      "viewport/info/object": "Objet",
      "viewport/info/objects": "Objets",
      "viewport/info/vertex": "Sommet",
      "viewport/info/vertices": "Sommets",
      "viewport/info/triangle": "Triangle",
      "viewport/info/triangles": "Triangles",
      "viewport/info/sample": "Échantillon",
      "viewport/info/samples": "Échantillons",
      "viewport/info/rendertime": "Temps de rendu",
      "script/title/vertexShader": "Vertex Shader",
      "script/title/fragmentShader": "Fragment Shader",
      "script/title/programInfo": "Propriétés du programme",
      "dialog/gltf/title": "Importer glTF",
      "dialog/gltf/asScene": "Importer glTF comme scène racine",
      "dialog/texture/title": "Paramètres de la texture",
      "dialog/texture/group/preview": "Aperçu",
      "dialog/texture/group/mapping": "Mapping",
      "dialog/texture/group/filtering": "Filtrage",
      "dialog/texture/group/transform": "Transformation",
      "dialog/texture/group/color": "Couleur",
      "dialog/texture/mapping": "Mapping",
      "dialog/texture/wrapS": "Wrap S",
      "dialog/texture/wrapT": "Wrap T",
      "dialog/texture/magFilter": "Filtre d’agrandissement",
      "dialog/texture/minFilter": "Filtre de réduction",
      "dialog/texture/anisotropy": "Anisotropie",
      "dialog/texture/offset": "Décalage",
      "dialog/texture/repeat": "Répétition",
      "dialog/texture/center": "Centre",
      "dialog/texture/rotation": "Rotation",
      "dialog/texture/premultiplyAlpha": "Pré-multiplier alpha",
      "dialog/texture/colorSpace": "Espace colorimétrique",
      "dialog/ok": "OK",
      "dialog/cancel": "Annuler"
    },
    zh: {
      "prompt/file/open": "您确定吗？未保存的数据将会丢失。",
      "prompt/file/failedToOpenProject": "无法打开项目！",
      "prompt/file/export/noMeshSelected": "未选择网格！",
      "prompt/file/export/noObjectSelected": "未选择对象！",
      "prompt/file/export/duplicateNames": "部分对象具有相同的名称。它们将被重命名以确保名称唯一。确定吗？",
      "prompt/script/remove": "你确定吗？",
      "prompt/history/clear": "撤销/重做历史记录将被清除。您确定吗？",
      "prompt/history/preserve": `历史将在会话之间保留。
这可能会影响在处理纹理时的性能。`,
      "prompt/history/forbid": "在播放场景时，撤消/重做被禁用。",
      "prompt/rendering/realistic/unsupportedMaterial": "REALISTIC着色：仅支持 MeshStandardMaterial 和 MeshPhysicalMaterial",
      "command/AddObject": "添加对象",
      "command/AddScript": "添加脚本",
      "command/MoveObject": "移动对象",
      "command/MultiCmds": "多次更改",
      "command/RemoveObject": "删除对象",
      "command/RemoveScript": "删除脚本",
      "command/SetColor": "设置颜色",
      "command/SetGeometry": "设置几何图形",
      "command/SetGeometryValue": "设置几何值",
      "command/SetMaterialColor": "设置材质颜色",
      "command/SetMaterial": "设置材质",
      "command/SetMaterialMap": "设置材质贴图",
      "command/SetMaterialRange": "设置材料范围",
      "command/SetMaterialValue": "设置材料值",
      "command/SetMaterialVector": "设置材质矢量",
      "command/SetPosition": "设置位置",
      "command/SetRotation": "设置旋转",
      "command/SetScale": "设置比例",
      "command/SetScene": "设置布景",
      "command/SetScriptValue": "设置脚本值",
      "command/SetShadowValue": "设置阴影值",
      "command/SetTextureParameters": "设置纹理参数",
      "command/SetUuid": "设置 UUID",
      "command/SetValue": "设定值",
      "menubar/file": "文件",
      "menubar/file/new": "新建项目",
      "menubar/file/new/empty": "空",
      "menubar/file/new/Arkanoid": "打砖块",
      "menubar/file/new/Camera": " 摄像机",
      "menubar/file/new/Particles": "粒子",
      "menubar/file/new/Pong": "乒乓球",
      "menubar/file/new/Shaders": "着色器",
      "menubar/file/open": "打开",
      "menubar/file/save": "保存",
      "menubar/file/import": "导入",
      "menubar/file/export": "导出",
      "menubar/edit": "编辑",
      "menubar/edit/undo": "撤销",
      "menubar/edit/redo": "重做",
      "menubar/edit/center": "居中",
      "menubar/edit/clone": "拷贝",
      "menubar/edit/delete": "删除",
      "menubar/add": "添加",
      "menubar/add/group": "组",
      "menubar/add/mesh": "网格",
      "menubar/add/mesh/plane": "平面",
      "menubar/add/mesh/box": "正方体",
      "menubar/add/mesh/capsule": "胶囊",
      "menubar/add/mesh/circle": "圆",
      "menubar/add/mesh/cylinder": "圆柱体",
      "menubar/add/mesh/ring": "环",
      "menubar/add/mesh/sphere": "球体",
      "menubar/add/mesh/dodecahedron": "十二面体",
      "menubar/add/mesh/icosahedron": "二十面体",
      "menubar/add/mesh/octahedron": "八面体",
      "menubar/add/mesh/tetrahedron": "四面体",
      "menubar/add/text": "Text",
      "menubar/add/mesh/torus": "圆环体",
      "menubar/add/mesh/torusknot": "环面纽结体",
      "menubar/add/mesh/tube": "管",
      "menubar/add/mesh/lathe": "酒杯",
      "menubar/add/mesh/sprite": "精灵",
      "menubar/add/light": "光源",
      "menubar/add/light/ambient": "环境光",
      "menubar/add/light/directional": "平行光",
      "menubar/add/light/hemisphere": "半球光",
      "menubar/add/light/point": "点光源",
      "menubar/add/light/spot": "聚光灯",
      "menubar/add/camera": "摄像机",
      "menubar/add/camera/perspective": "透视相机",
      "menubar/add/camera/orthographic": "正交相机",
      "menubar/status/autosave": "自动保存",
      "menubar/view": "视图",
      "menubar/view/fullscreen": "全屏",
      "menubar/view/gridHelper": "网格助手",
      "menubar/view/cameraHelpers": "相机助手",
      "menubar/view/lightHelpers": "光助手",
      "menubar/view/skeletonHelpers": "骷髅助手",
      "menubar/render": "渲染",
      "menubar/render/image": "图片",
      "menubar/render/video": "视频",
      "menubar/render/quality": "质量",
      "menubar/render/cancel": "取消",
      "menubar/help": "帮助",
      "menubar/help/source_code": "源码",
      "menubar/help/icons": "图标组件包",
      "menubar/help/about": "关于",
      "menubar/help/manual": "手册",
      "sidebar/animations": "动画",
      "sidebar/animations/play": "播放",
      "sidebar/animations/stop": "暂停",
      "sidebar/animations/timescale": "时间缩放",
      "sidebar/scene": "场景",
      "sidebar/scene/background": "背景",
      "sidebar/scene/environment": "环境",
      "sidebar/scene/fog": "雾",
      "sidebar/properties/object": "属性",
      "sidebar/properties/geometry": "几何组件",
      "sidebar/properties/material": "材质组件",
      "sidebar/properties/script": "脚本",
      "sidebar/object/type": "类型",
      "sidebar/object/new": "更新",
      "sidebar/object/uuid": "识别码",
      "sidebar/object/name": "名称",
      "sidebar/object/position": "位置",
      "sidebar/object/rotation": "旋转",
      "sidebar/object/scale": "缩放",
      "sidebar/object/fov": "视角",
      "sidebar/object/left": "左",
      "sidebar/object/right": "右",
      "sidebar/object/top": "上",
      "sidebar/object/bottom": "下",
      "sidebar/object/near": "近点",
      "sidebar/object/far": "远点",
      "sidebar/object/intensity": "强度",
      "sidebar/object/color": "颜色",
      "sidebar/object/groundcolor": "基色",
      "sidebar/object/distance": "距离",
      "sidebar/object/angle": "角度",
      "sidebar/object/penumbra": "边缘",
      "sidebar/object/decay": "衰减",
      "sidebar/object/shadow": "阴影",
      "sidebar/object/shadowIntensity": "阴影强度",
      "sidebar/object/shadowBias": "阴影偏移",
      "sidebar/object/shadowNormalBias": "阴影法线偏移",
      "sidebar/object/shadowRadius": "阴影半径",
      "sidebar/object/cast": "产生",
      "sidebar/object/receive": "接受",
      "sidebar/object/visible": "可见性",
      "sidebar/object/frustumcull": "视锥体裁剪",
      "sidebar/object/renderorder": "渲染次序",
      "sidebar/object/userdata": "自定义数据",
      "sidebar/object/export": "导出JSON",
      "sidebar/geometry/type": "类型",
      "sidebar/geometry/new": "更新",
      "sidebar/geometry/uuid": "识别码",
      "sidebar/geometry/name": "名称",
      "sidebar/geometry/bounds": "界限",
      "sidebar/geometry/userdata": "自定义数据",
      "sidebar/geometry/show_vertex_normals": "显示顶点法线",
      "sidebar/geometry/compute_vertex_normals": "计算顶点法线",
      "sidebar/geometry/compute_vertex_tangents": "计算切线",
      "sidebar/geometry/center": "居中",
      "sidebar/geometry/export": "导出JSON",
      "sidebar/geometry/morph": "Morph Targets",
      "sidebar/geometry/box_geometry/width": "宽度",
      "sidebar/geometry/box_geometry/height": "高度",
      "sidebar/geometry/box_geometry/depth": "深度",
      "sidebar/geometry/box_geometry/widthseg": "宽度分段",
      "sidebar/geometry/box_geometry/heightseg": "高度分段",
      "sidebar/geometry/box_geometry/depthseg": "深度分段",
      "sidebar/geometry/buffer_geometry/attributes": "属性",
      "sidebar/geometry/buffer_geometry/index": "索引",
      "sidebar/geometry/buffer_geometry/morphAttributes": "变形属性",
      "sidebar/geometry/buffer_geometry/morphRelative": "相对变形",
      "sidebar/geometry/capsule_geometry/radius": "半径",
      "sidebar/geometry/capsule_geometry/height": "高度",
      "sidebar/geometry/capsule_geometry/capseg": "胶囊分段",
      "sidebar/geometry/capsule_geometry/radialseg": "半径分段",
      "sidebar/geometry/capsule_geometry/heightseg": "高度分段",
      "sidebar/geometry/circle_geometry/radius": "半径",
      "sidebar/geometry/circle_geometry/segments": "分段",
      "sidebar/geometry/circle_geometry/thetastart": "弧度起点",
      "sidebar/geometry/circle_geometry/thetalength": "弧度长度",
      "sidebar/geometry/cylinder_geometry/radiustop": "顶部半径",
      "sidebar/geometry/cylinder_geometry/radiusbottom": "底部半径",
      "sidebar/geometry/cylinder_geometry/height": "高度",
      "sidebar/geometry/cylinder_geometry/radialsegments": "径向分段",
      "sidebar/geometry/cylinder_geometry/heightsegments": "高度分段",
      "sidebar/geometry/cylinder_geometry/openended": "开端",
      "sidebar/geometry/extrude_geometry/curveSegments": "曲线段",
      "sidebar/geometry/extrude_geometry/steps": "细分点数",
      "sidebar/geometry/extrude_geometry/depth": "深度",
      "sidebar/geometry/extrude_geometry/bevelEnabled": "启用斜角",
      "sidebar/geometry/extrude_geometry/bevelThickness": "斜角厚度",
      "sidebar/geometry/extrude_geometry/bevelSize": "斜角大小",
      "sidebar/geometry/extrude_geometry/bevelOffset": "斜角偏移量",
      "sidebar/geometry/extrude_geometry/bevelSegments": "斜角分段",
      "sidebar/geometry/extrude_geometry/shape": "转换图形",
      "sidebar/geometry/dodecahedron_geometry/radius": "半径",
      "sidebar/geometry/dodecahedron_geometry/detail": "面片分段",
      "sidebar/geometry/icosahedron_geometry/radius": "半径",
      "sidebar/geometry/icosahedron_geometry/detail": "面片分段",
      "sidebar/geometry/octahedron_geometry/radius": "半径",
      "sidebar/geometry/octahedron_geometry/detail": "面片分段",
      "sidebar/geometry/tetrahedron_geometry/radius": "半径",
      "sidebar/geometry/tetrahedron_geometry/detail": "面片分段",
      "sidebar/geometry/lathe_geometry/segments": "分段",
      "sidebar/geometry/lathe_geometry/phistart": "经度起点",
      "sidebar/geometry/lathe_geometry/philength": "经度长度",
      "sidebar/geometry/lathe_geometry/points": "点",
      "sidebar/geometry/plane_geometry/width": "宽度",
      "sidebar/geometry/plane_geometry/height": "长度",
      "sidebar/geometry/plane_geometry/widthsegments": "宽度分段",
      "sidebar/geometry/plane_geometry/heightsegments": "长度分段",
      "sidebar/geometry/ring_geometry/innerRadius": "内半径",
      "sidebar/geometry/ring_geometry/outerRadius": "外半径",
      "sidebar/geometry/ring_geometry/thetaSegments": "弧度分段",
      "sidebar/geometry/ring_geometry/phiSegments": "经度分段",
      "sidebar/geometry/ring_geometry/thetastart": "弧度起点",
      "sidebar/geometry/ring_geometry/thetalength": "弧度长度",
      "sidebar/geometry/text_geometry/text": "Text",
      "sidebar/geometry/text_geometry/size": "Font size",
      "sidebar/geometry/text_geometry/depth": "Extrude depth",
      "sidebar/geometry/text_geometry/scale": "Scale",
      "sidebar/geometry/text_geometry/curveseg": "Curve segments",
      "sidebar/geometry/text_geometry/bevelenabled": "Bevel enabled",
      "sidebar/geometry/text_geometry/bevelthickness": "Bevel thickness",
      "sidebar/geometry/text_geometry/bevelsize": "Bevel size",
      "sidebar/geometry/text_geometry/bevelOffset": "Bevel offset",
      "sidebar/geometry/text_geometry/bevelseg": "Bevel segments",
      "sidebar/geometry/shape_geometry/curveSegments": "曲线段",
      "sidebar/geometry/shape_geometry/extrude": "拉伸",
      "sidebar/geometry/sphere_geometry/radius": "半径",
      "sidebar/geometry/sphere_geometry/widthsegments": "宽度分段",
      "sidebar/geometry/sphere_geometry/heightsegments": "长度分段",
      "sidebar/geometry/sphere_geometry/phistart": "经度起点",
      "sidebar/geometry/sphere_geometry/philength": "经度长度",
      "sidebar/geometry/sphere_geometry/thetastart": "纬度起点",
      "sidebar/geometry/sphere_geometry/thetalength": "纬度长度",
      "sidebar/geometry/torus_geometry/radius": "半径",
      "sidebar/geometry/torus_geometry/tube": "管厚",
      "sidebar/geometry/torus_geometry/radialsegments": "半径分段",
      "sidebar/geometry/torus_geometry/tubularsegments": "管厚分段",
      "sidebar/geometry/torus_geometry/arc": "弧度",
      "sidebar/geometry/torusKnot_geometry/radius": "半径",
      "sidebar/geometry/torusKnot_geometry/tube": "管厚",
      "sidebar/geometry/torusKnot_geometry/tubularsegments": "管厚分段",
      "sidebar/geometry/torusKnot_geometry/radialsegments": "半径分段",
      "sidebar/geometry/torusKnot_geometry/p": "管长弧度",
      "sidebar/geometry/torusKnot_geometry/q": "扭曲弧度",
      "sidebar/geometry/tube_geometry/path": "路径",
      "sidebar/geometry/tube_geometry/radius": "半径",
      "sidebar/geometry/tube_geometry/tube": "管厚",
      "sidebar/geometry/tube_geometry/tubularsegments": "管厚分段",
      "sidebar/geometry/tube_geometry/radialsegments": "半径分段",
      "sidebar/geometry/tube_geometry/closed": "闭合",
      "sidebar/geometry/tube_geometry/curvetype": "曲线类型",
      "sidebar/geometry/tube_geometry/tension": "张力",
      "sidebar/material/new": "更新",
      "sidebar/material/copy": "复制",
      "sidebar/material/paste": "粘贴",
      "sidebar/material/slot": "插槽",
      "sidebar/material/type": "类型",
      "sidebar/material/uuid": "识别码",
      "sidebar/material/name": "名称",
      "sidebar/material/program": "程序",
      "sidebar/material/info": "信息",
      "sidebar/material/vertex": "顶点",
      "sidebar/material/fragment": "片元",
      "sidebar/material/color": "颜色",
      "sidebar/material/depthPacking": "深度包装",
      "sidebar/material/roughness": "粗糙度",
      "sidebar/material/metalness": "金属度",
      "sidebar/material/reflectivity": "反射率",
      "sidebar/material/emissive": "自发光",
      "sidebar/material/specular": "高光",
      "sidebar/material/shininess": "高光大小",
      "sidebar/material/clearcoat": "清漆",
      "sidebar/material/clearcoatroughness": "清漆粗糙度",
      "sidebar/material/dispersion": "分散",
      "sidebar/material/ior": "IOR",
      "sidebar/material/iridescence": "彩虹色",
      "sidebar/material/iridescenceIOR": "彩虹色折射率",
      "sidebar/material/iridescenceThicknessMax": "彩虹色厚度",
      "sidebar/material/sheen": "光泽",
      "sidebar/material/sheenroughness": "光泽粗糙度",
      "sidebar/material/sheencolor": "光泽颜色",
      "sidebar/material/transmission": "透光",
      "sidebar/material/attenuationDistance": "衰减距离",
      "sidebar/material/attenuationColor": "衰减色",
      "sidebar/material/thickness": "厚度",
      "sidebar/material/vertexcolors": "顶点颜色",
      "sidebar/material/matcap": "材质捕获",
      "sidebar/material/map": "贴图",
      "sidebar/material/alphamap": "透明贴图",
      "sidebar/material/bumpmap": "凹凸贴图",
      "sidebar/material/normalmap": "法线贴图",
      "sidebar/material/clearcoatmap": "清漆贴图",
      "sidebar/material/clearcoatnormalmap": "清漆法线贴图",
      "sidebar/material/clearcoatroughnessmap": "清漆粗糙度贴图",
      "sidebar/material/displacementmap": "置换贴图",
      "sidebar/material/roughnessmap": "粗糙度贴图",
      "sidebar/material/metalnessmap": "金属贴图",
      "sidebar/material/specularmap": "高光贴图",
      "sidebar/material/iridescencemap": "彩虹色贴图",
      "sidebar/material/iridescencethicknessmap": "彩虹色厚度贴图",
      "sidebar/material/sheencolormap": "光泽颜色贴图",
      "sidebar/material/sheenroughnessmap": "光泽粗糙度贴图",
      "sidebar/material/envmap": "环境贴图",
      "sidebar/material/lightmap": "光照贴图",
      "sidebar/material/aomap": "环境光遮蔽贴图",
      "sidebar/material/emissivemap": "自发光贴图",
      "sidebar/material/gradientmap": "渐变贴图",
      "sidebar/material/transmissionmap": "透光贴图",
      "sidebar/material/thicknessmap": "厚度贴图",
      "sidebar/material/side": "面",
      "sidebar/material/size": "大小",
      "sidebar/material/sizeAttenuation": "大小衰减",
      "sidebar/material/flatShading": "平面着色",
      "sidebar/material/blending": "混合",
      "sidebar/material/opacity": "透明度",
      "sidebar/material/transparent": "透明性",
      "sidebar/material/forcesinglepass": "强制单通道",
      "sidebar/material/alphatest": "α测试",
      "sidebar/material/depthtest": "深度测试",
      "sidebar/material/depthwrite": "深度缓冲",
      "sidebar/material/wireframe": "线框",
      "sidebar/material/userdata": "自定义数据",
      "sidebar/material/export": "导出JSON",
      "sidebar/script/new": "新建",
      "sidebar/script/edit": "编辑",
      "sidebar/script/remove": "删除",
      "sidebar/project": "项目",
      "sidebar/project/renderer": "渲染器",
      "sidebar/project/antialias": "抗锯齿",
      "sidebar/project/shadows": "阴影",
      "sidebar/project/toneMapping": "色调映射",
      "sidebar/project/geometries": "几何体",
      "sidebar/project/materials": "材质",
      "sidebar/project/textures": "纹理",
      "sidebar/project/Assign": "应用",
      "sidebar/project/app": "App",
      "sidebar/project/app/play": "启动",
      "sidebar/project/app/stop": "暂停",
      "sidebar/project/app/title": "标题",
      "sidebar/project/app/editable": "编辑性",
      "sidebar/project/app/publish": "发布",
      "sidebar/project/image": "图片",
      "sidebar/project/image/samples": "样本",
      "sidebar/project/video": "视频",
      "sidebar/project/shading": "阴影",
      "sidebar/project/resolution": "分辨率",
      "sidebar/project/duration": "时长",
      "sidebar/project/render": "渲染",
      "sidebar/settings": "设置",
      "sidebar/settings/language": "语言",
      "sidebar/settings/shortcuts": "快捷键",
      "sidebar/settings/shortcuts/translate": "移动",
      "sidebar/settings/shortcuts/rotate": "旋转",
      "sidebar/settings/shortcuts/scale": "缩放",
      "sidebar/settings/shortcuts/undo": "撤销",
      "sidebar/settings/shortcuts/focus": "聚焦",
      "sidebar/history": "历史记录",
      "sidebar/history/clear": "清空",
      "sidebar/history/persistent": "本地存储",
      "toolbar/translate": "移动",
      "toolbar/rotate": "旋转",
      "toolbar/scale": "缩放",
      "toolbar/local": "本地",
      "viewport/controls/grid": "网格",
      "viewport/controls/helpers": "辅助",
      "viewport/info/object": "物体",
      "viewport/info/objects": "物体",
      "viewport/info/vertex": "顶点",
      "viewport/info/vertices": "顶点",
      "viewport/info/triangle": "三角形",
      "viewport/info/triangles": "三角形",
      "viewport/info/sample": "样本",
      "viewport/info/samples": "样本",
      "viewport/info/rendertime": "渲染时间",
      "script/title/vertexShader": "顶点着色器",
      "script/title/fragmentShader": "片段着色器",
      "script/title/programInfo": "程序属性",
      "dialog/gltf/title": "导入 glTF",
      "dialog/gltf/asScene": "将 glTF 导入为根场景",
      "dialog/texture/title": "纹理参数",
      "dialog/texture/group/preview": "预览",
      "dialog/texture/group/mapping": "映射",
      "dialog/texture/group/filtering": "过滤",
      "dialog/texture/group/transform": "变换",
      "dialog/texture/group/color": "颜色",
      "dialog/texture/mapping": "映射",
      "dialog/texture/wrapS": "环绕 S",
      "dialog/texture/wrapT": "环绕 T",
      "dialog/texture/magFilter": "放大过滤器",
      "dialog/texture/minFilter": "缩小过滤器",
      "dialog/texture/anisotropy": "各向异性",
      "dialog/texture/offset": "偏移",
      "dialog/texture/repeat": "重复",
      "dialog/texture/center": "中心",
      "dialog/texture/rotation": "旋转",
      "dialog/texture/premultiplyAlpha": "预乘 Alpha",
      "dialog/texture/colorSpace": "颜色空间",
      "dialog/ok": "确定",
      "dialog/cancel": "取消"
    },
    ja: {
      "prompt/file/open": "保存されていないデータは失われます。 本気ですか？",
      "prompt/file/failedToOpenProject": "プロジェクトを開くことができませんでした!",
      "prompt/file/export/noMeshSelected": "メッシュが選択されていません!",
      "prompt/file/export/noObjectSelected": "オブジェクトが選択されていません!",
      "prompt/file/export/duplicateNames": "一部のオブジェクトの名前が重複しています。名前を一意にするために変更します。よろしいですか？",
      "prompt/script/remove": "本気ですか？",
      "prompt/history/clear": "元に戻す/やり直しの履歴が消去されます。 本気ですか？",
      "prompt/history/preserve": `履歴はセッションをまたいで保存されます。
これは、テクスチャを操作する際のパフォーマンスに影響を与える可能性があります。`,
      "prompt/history/forbid": "シーンの再生中は元に戻す/やり直しは無効になります。",
      "prompt/rendering/realistic/unsupportedMaterial": "REALISTIC シェーディング: MeshStandardmaterial と MeshPhysicalmaterial のみがサポートされています",
      "command/AddObject": "オブジェクトを追加",
      "command/AddScript": "スクリプトを追加",
      "command/MoveObject": "オブジェクトの移動",
      "command/MultiCmds": "複数の変更",
      "command/RemoveObject": "オブジェクトを削除",
      "command/RemoveScript": "スクリプトの削除",
      "command/SetColor": "カラーを設定",
      "command/SetGeometry": "ジオメトリの設定",
      "command/SetGeometryValue": "ジオメトリ値の設定",
      "command/SetMaterialColor": "マテリアル カラーの設定",
      "command/SetMaterial": "マテリアルの設定",
      "command/SetMaterialMap": "マテリアル マップの設定",
      "command/SetMaterialRange": "マテリアル範囲の設定",
      "command/SetMaterialValue": "マテリアル値の設定",
      "command/SetMaterialVector": "素材のベクトルを設定します",
      "command/SetPosition": "位置を設定",
      "command/SetRotation": "回転を設定",
      "command/SetScale": "スケールを設定",
      "command/SetScene": "セットシーン",
      "command/SetScriptValue": "スクリプト値の設定",
      "command/SetShadowValue": "Set Shadow Value",
      "command/SetTextureParameters": "テクスチャパラメータの設定",
      "command/SetUuid": "UUIDの設定",
      "command/SetValue": "値の設定",
      "menubar/file": "ファイル",
      "menubar/file/new": "新規プロジェクト",
      "menubar/file/new/empty": "空",
      "menubar/file/new/Arkanoid": "ブロック崩し",
      "menubar/file/new/Camera": "カメラ",
      "menubar/file/new/Particles": "パーティクル",
      "menubar/file/new/Pong": "ピンポン",
      "menubar/file/new/Shaders": "シェーダー",
      "menubar/file/open": "開く",
      "menubar/file/save": "保存",
      "menubar/file/import": "インポート",
      "menubar/file/export": "エクスポート",
      "menubar/edit": "編集",
      "menubar/edit/undo": "元に戻す",
      "menubar/edit/redo": "やり直す",
      "menubar/edit/center": "中央揃え",
      "menubar/edit/clone": "複製",
      "menubar/edit/delete": "削除",
      "menubar/add": "追加",
      "menubar/add/group": "グループ",
      "menubar/add/mesh": "メッシュ",
      "menubar/add/mesh/plane": "平面",
      "menubar/add/mesh/box": "直方体",
      "menubar/add/mesh/capsule": "カプセル",
      "menubar/add/mesh/circle": "円",
      "menubar/add/mesh/cylinder": "円柱",
      "menubar/add/mesh/ring": "リング",
      "menubar/add/mesh/sphere": "球",
      "menubar/add/mesh/dodecahedron": "十二面体",
      "menubar/add/mesh/icosahedron": "二十面体",
      "menubar/add/mesh/octahedron": "八面体",
      "menubar/add/mesh/tetrahedron": "四面体",
      "menubar/add/text": "Text",
      "menubar/add/mesh/torus": "トーラス",
      "menubar/add/mesh/tube": "チューブ",
      "menubar/add/mesh/torusknot": "ノットトーラス",
      "menubar/add/mesh/lathe": "旋盤形",
      "menubar/add/mesh/sprite": "スプライト",
      "menubar/add/light": "ライト",
      "menubar/add/light/ambient": "アンビエント",
      "menubar/add/light/directional": "ディレクショナル",
      "menubar/add/light/hemisphere": "ヘミスフィア",
      "menubar/add/light/point": "ポイント",
      "menubar/add/light/spot": "スポット",
      "menubar/add/camera": "カメラ",
      "menubar/add/camera/perspective": "透視投影",
      "menubar/add/camera/orthographic": "平行投影",
      "menubar/status/autosave": "自動保存",
      "menubar/view": "表示",
      "menubar/view/fullscreen": "フルスクリーン",
      "menubar/view/gridHelper": "グリッドヘルパー",
      "menubar/view/cameraHelpers": "カメラヘルパー",
      "menubar/view/lightHelpers": "ライトヘルパー",
      "menubar/view/skeletonHelpers": "スケルトンヘルパー",
      "menubar/render": "レンダー",
      "menubar/render/image": "画像",
      "menubar/render/video": "動画",
      "menubar/render/quality": "品質",
      "menubar/render/cancel": "キャンセル",
      "menubar/help": "ヘルプ",
      "menubar/help/source_code": "ソースコード",
      "menubar/help/icons": "アイコンパック",
      "menubar/help/about": "Three.js について",
      "menubar/help/manual": "マニュアル",
      "sidebar/animations": "アニメーション",
      "sidebar/animations/play": "再生",
      "sidebar/animations/stop": "停止",
      "sidebar/animations/timescale": "タイムスケール",
      "sidebar/scene": "シーン",
      "sidebar/scene/background": "背景",
      "sidebar/scene/environment": "環境",
      "sidebar/scene/fog": "霧",
      "sidebar/properties/object": "オブジェクト",
      "sidebar/properties/geometry": "ジオメトリ",
      "sidebar/properties/material": "マテリアル",
      "sidebar/properties/script": "スクリプト",
      "sidebar/object/type": "タイプ",
      "sidebar/object/new": "新規",
      "sidebar/object/uuid": "UUID",
      "sidebar/object/name": "名前",
      "sidebar/object/position": "位置",
      "sidebar/object/rotation": "回転",
      "sidebar/object/scale": "スケール",
      "sidebar/object/fov": "Fov",
      "sidebar/object/left": "左",
      "sidebar/object/right": "右",
      "sidebar/object/top": "上",
      "sidebar/object/bottom": "下",
      "sidebar/object/near": "範囲の開始",
      "sidebar/object/far": "範囲の終了",
      "sidebar/object/intensity": "強度",
      "sidebar/object/color": "色",
      "sidebar/object/groundcolor": "地面の色",
      "sidebar/object/distance": "距離",
      "sidebar/object/angle": "角度",
      "sidebar/object/penumbra": "半影",
      "sidebar/object/decay": "減衰",
      "sidebar/object/shadow": "影",
      "sidebar/object/shadowIntensity": "Shadow Intensity",
      "sidebar/object/shadowBias": "影のバイアス",
      "sidebar/object/shadowNormalBias": "影のノーマルバイアス",
      "sidebar/object/shadowRadius": "影の半径",
      "sidebar/object/cast": "キャスト",
      "sidebar/object/receive": "レシーブ",
      "sidebar/object/visible": "表示",
      "sidebar/object/frustumcull": "フラスタムカリング",
      "sidebar/object/renderorder": "描画順序",
      "sidebar/object/userdata": "ユーザーデータ",
      "sidebar/object/export": "JSONをエクスポート",
      "sidebar/geometry/type": "タイプ",
      "sidebar/geometry/new": "新規",
      "sidebar/geometry/uuid": "UUID",
      "sidebar/geometry/name": "名前",
      "sidebar/geometry/bounds": "境界",
      "sidebar/geometry/userdata": "ユーザーデータ",
      "sidebar/geometry/show_vertex_normals": "頂点法線を表示",
      "sidebar/geometry/compute_vertex_normals": "頂点法線を計算",
      "sidebar/geometry/compute_vertex_tangents": "接線を計算",
      "sidebar/geometry/center": "中央",
      "sidebar/geometry/export": "JSONをエクスポート",
      "sidebar/geometry/morph": "Morph Targets",
      "sidebar/geometry/box_geometry/width": "幅",
      "sidebar/geometry/box_geometry/height": "高さ",
      "sidebar/geometry/box_geometry/depth": "奥行き",
      "sidebar/geometry/box_geometry/widthseg": "幅の分割数",
      "sidebar/geometry/box_geometry/heightseg": "高さの分割数",
      "sidebar/geometry/box_geometry/depthseg": "奥行きの分割数",
      "sidebar/geometry/buffer_geometry/attributes": "属性",
      "sidebar/geometry/buffer_geometry/index": "インデックス",
      "sidebar/geometry/buffer_geometry/morphAttributes": "モーフ属性",
      "sidebar/geometry/buffer_geometry/morphRelative": "相対モーフ",
      "sidebar/geometry/capsule_geometry/radius": "半径",
      "sidebar/geometry/capsule_geometry/height": "高さ",
      "sidebar/geometry/capsule_geometry/capseg": "キャップの分割数",
      "sidebar/geometry/capsule_geometry/radialseg": "円の分割数",
      "sidebar/geometry/capsule_geometry/heightseg": "高さの分割数",
      "sidebar/geometry/circle_geometry/radius": "半径",
      "sidebar/geometry/circle_geometry/segments": "セグメント",
      "sidebar/geometry/circle_geometry/thetastart": "開始角度",
      "sidebar/geometry/circle_geometry/thetalength": "角度の大きさ",
      "sidebar/geometry/cylinder_geometry/radiustop": "上部の半径",
      "sidebar/geometry/cylinder_geometry/radiusbottom": "下部の半径",
      "sidebar/geometry/cylinder_geometry/height": "高さ",
      "sidebar/geometry/cylinder_geometry/radialsegments": "円の分割数",
      "sidebar/geometry/cylinder_geometry/heightsegments": "高さの分割数",
      "sidebar/geometry/cylinder_geometry/openended": "ふた",
      "sidebar/geometry/extrude_geometry/curveSegments": "分割数",
      "sidebar/geometry/extrude_geometry/steps": "ステップ",
      "sidebar/geometry/extrude_geometry/depth": "深さ",
      "sidebar/geometry/extrude_geometry/bevelEnabled": "ベベルを有効にするか",
      "sidebar/geometry/extrude_geometry/bevelThickness": "ベベルの厚さ",
      "sidebar/geometry/extrude_geometry/bevelSize": "ベベルのサイズ",
      "sidebar/geometry/extrude_geometry/bevelOffset": "ベベルのオフセット",
      "sidebar/geometry/extrude_geometry/bevelSegments": "ベベルの分割数",
      "sidebar/geometry/extrude_geometry/shape": "形状に変換",
      "sidebar/geometry/dodecahedron_geometry/radius": "半径",
      "sidebar/geometry/dodecahedron_geometry/detail": "詳細",
      "sidebar/geometry/icosahedron_geometry/radius": "半径",
      "sidebar/geometry/icosahedron_geometry/detail": "詳細",
      "sidebar/geometry/octahedron_geometry/radius": "半径",
      "sidebar/geometry/octahedron_geometry/detail": "詳細",
      "sidebar/geometry/tetrahedron_geometry/radius": "半径",
      "sidebar/geometry/tetrahedron_geometry/detail": "詳細",
      "sidebar/geometry/lathe_geometry/segments": "分割数",
      "sidebar/geometry/lathe_geometry/phistart": "開始角度",
      "sidebar/geometry/lathe_geometry/philength": "角度の大きさ",
      "sidebar/geometry/lathe_geometry/points": "ポイント",
      "sidebar/geometry/plane_geometry/width": "幅",
      "sidebar/geometry/plane_geometry/height": "高さ",
      "sidebar/geometry/plane_geometry/widthsegments": "幅の分割数",
      "sidebar/geometry/plane_geometry/heightsegments": "奥行きの分割数",
      "sidebar/geometry/ring_geometry/innerRadius": "内半径",
      "sidebar/geometry/ring_geometry/outerRadius": "外半径",
      "sidebar/geometry/ring_geometry/thetaSegments": "円の分割数",
      "sidebar/geometry/ring_geometry/phiSegments": "リングの分割数",
      "sidebar/geometry/ring_geometry/thetastart": "開始角度",
      "sidebar/geometry/ring_geometry/thetalength": "角度の大きさ",
      "sidebar/geometry/text_geometry/text": "Text",
      "sidebar/geometry/text_geometry/size": "Font size",
      "sidebar/geometry/text_geometry/depth": "Extrude depth",
      "sidebar/geometry/text_geometry/scale": "Scale",
      "sidebar/geometry/text_geometry/curveseg": "Curve segments",
      "sidebar/geometry/text_geometry/bevelenabled": "Bevel enabled",
      "sidebar/geometry/text_geometry/bevelthickness": "Bevel thickness",
      "sidebar/geometry/text_geometry/bevelsize": "Bevel size",
      "sidebar/geometry/text_geometry/bevelOffset": "Bevel offset",
      "sidebar/geometry/text_geometry/bevelseg": "Bevel segments",
      "sidebar/geometry/shape_geometry/curveSegments": "分割数",
      "sidebar/geometry/shape_geometry/extrude": "押し出し",
      "sidebar/geometry/sphere_geometry/radius": "半径",
      "sidebar/geometry/sphere_geometry/widthsegments": "円の分割数",
      "sidebar/geometry/sphere_geometry/heightsegments": "リングの分割数",
      "sidebar/geometry/sphere_geometry/phistart": "開始角度",
      "sidebar/geometry/sphere_geometry/philength": "角度の大きさ",
      "sidebar/geometry/sphere_geometry/thetastart": "開始角度",
      "sidebar/geometry/sphere_geometry/thetalength": "角度の大きさ",
      "sidebar/geometry/torus_geometry/radius": "半径",
      "sidebar/geometry/torus_geometry/tube": "チューブの太さ",
      "sidebar/geometry/torus_geometry/radialsegments": "小セグメント数",
      "sidebar/geometry/torus_geometry/tubularsegments": "大セグメント数",
      "sidebar/geometry/torus_geometry/arc": "弧",
      "sidebar/geometry/torusKnot_geometry/radius": "半径",
      "sidebar/geometry/torusKnot_geometry/tube": "チューブの太さ",
      "sidebar/geometry/torusKnot_geometry/tubularsegments": "小セグメント数",
      "sidebar/geometry/torusKnot_geometry/radialsegments": "大セグメント数",
      "sidebar/geometry/torusKnot_geometry/p": "P",
      "sidebar/geometry/torusKnot_geometry/q": "Q",
      "sidebar/geometry/tube_geometry/path": "パス",
      "sidebar/geometry/tube_geometry/radius": "半径",
      "sidebar/geometry/tube_geometry/tube": "チューブの太さ",
      "sidebar/geometry/tube_geometry/tubularsegments": "小セグメント数",
      "sidebar/geometry/tube_geometry/radialsegments": "大セグメント数",
      "sidebar/geometry/tube_geometry/closed": "閉じる",
      "sidebar/geometry/tube_geometry/curvetype": "カーブタイプ",
      "sidebar/geometry/tube_geometry/tension": "テンション",
      "sidebar/material/new": "新規作成",
      "sidebar/material/copy": "コピー",
      "sidebar/material/paste": "貼り付け",
      "sidebar/material/slot": "スロット",
      "sidebar/material/type": "タイプ",
      "sidebar/material/uuid": "UUID",
      "sidebar/material/name": "名前",
      "sidebar/material/program": "プログラム",
      "sidebar/material/info": "情報",
      "sidebar/material/vertex": "頂点",
      "sidebar/material/fragment": "フラグメント",
      "sidebar/material/color": "色",
      "sidebar/material/depthPacking": "深度パッキング",
      "sidebar/material/roughness": "粗さ",
      "sidebar/material/metalness": "金属度",
      "sidebar/material/reflectivity": "反射率",
      "sidebar/material/emissive": "発光",
      "sidebar/material/specular": "鏡面",
      "sidebar/material/shininess": "光沢",
      "sidebar/material/clearcoat": "クリアコート",
      "sidebar/material/clearcoatroughness": "クリアコートの粗さ",
      "sidebar/material/dispersion": "Dispersion",
      "sidebar/material/ior": "IOR",
      "sidebar/material/iridescence": "遊色効果",
      "sidebar/material/iridescenceIOR": "遊色効果のIOR",
      "sidebar/material/iridescenceThicknessMax": "遊色効果の厚さ",
      "sidebar/material/sheen": "光沢",
      "sidebar/material/sheenroughness": "光沢の粗さ",
      "sidebar/material/sheencolor": "光沢の色",
      "sidebar/material/transmission": "透過",
      "sidebar/material/attenuationDistance": "減衰距離",
      "sidebar/material/attenuationColor": "減衰色",
      "sidebar/material/thickness": "厚さ",
      "sidebar/material/vertexcolors": "頂点色",
      "sidebar/material/matcap": "マットキャップ",
      "sidebar/material/map": "マップ",
      "sidebar/material/alphamap": "アルファマップ",
      "sidebar/material/bumpmap": "バンプマップ",
      "sidebar/material/normalmap": "ノーマルマップ",
      "sidebar/material/clearcoatmap": "クリアコートマップ",
      "sidebar/material/clearcoatnormalmap": "クリアコートノーマルマップ",
      "sidebar/material/clearcoatroughnessmap": "クリアコート粗さマップ",
      "sidebar/material/displacementmap": "変位マップ",
      "sidebar/material/roughnessmap": "粗さマップ",
      "sidebar/material/metalnessmap": "メタリックマップ",
      "sidebar/material/specularmap": "鏡面マップ",
      "sidebar/material/iridescencemap": "遊色効果マップ",
      "sidebar/material/iridescencethicknessmap": "遊色効果の厚さマップ",
      "sidebar/material/sheencolormap": "光沢色マップ",
      "sidebar/material/sheenroughnessmap": "光沢粗さマップ",
      "sidebar/material/envmap": "環境マップ",
      "sidebar/material/lightmap": "ライトマップ",
      "sidebar/material/aomap": "AOマップ",
      "sidebar/material/emissivemap": "発光マップ",
      "sidebar/material/gradientmap": "グラデーションマップ",
      "sidebar/material/transmissionmap": "透過マップ",
      "sidebar/material/thicknessmap": "厚さマップ",
      "sidebar/material/side": "側面",
      "sidebar/material/size": "サイズ",
      "sidebar/material/sizeAttenuation": "サイズ減衰",
      "sidebar/material/flatShading": "フラットシェーディング",
      "sidebar/material/blending": "ブレンディング",
      "sidebar/material/opacity": "不透明度",
      "sidebar/material/transparent": "透明",
      "sidebar/material/forcesinglepass": "シングルパスを強制",
      "sidebar/material/alphatest": "アルファテスト",
      "sidebar/material/depthtest": "深度テスト",
      "sidebar/material/depthwrite": "深度書き込み",
      "sidebar/material/wireframe": "ワイヤーフレーム",
      "sidebar/material/userdata": "ユーザーデータ",
      "sidebar/material/export": "JSONをエクスポート",
      "sidebar/script/new": "新規",
      "sidebar/script/edit": "編集",
      "sidebar/script/remove": "削除",
      "sidebar/project": "プロジェクト",
      "sidebar/project/renderer": "レンダラー",
      "sidebar/project/antialias": "アンチエイリアス",
      "sidebar/project/shadows": "シャドウ",
      "sidebar/project/toneMapping": "トーンマッピング",
      "sidebar/project/geometries": "ジオメトリ",
      "sidebar/project/materials": "マテリアル",
      "sidebar/project/textures": "テクスチャ",
      "sidebar/project/Assign": "割り当て",
      "sidebar/project/app": "アプリ",
      "sidebar/project/app/play": "再生",
      "sidebar/project/app/stop": "停止",
      "sidebar/project/app/title": "タイトル",
      "sidebar/project/app/editable": "編集可能",
      "sidebar/project/app/publish": "アプリファイルとして保存",
      "sidebar/project/image": "画像",
      "sidebar/project/image/samples": "サンプル",
      "sidebar/project/video": "動画",
      "sidebar/project/shading": "シェーディング",
      "sidebar/project/resolution": "解像度",
      "sidebar/project/duration": "長さ",
      "sidebar/project/render": "レンダー",
      "sidebar/settings": "設定",
      "sidebar/settings/language": "言語",
      "sidebar/settings/shortcuts": "ショートカット",
      "sidebar/settings/shortcuts/translate": "移動",
      "sidebar/settings/shortcuts/rotate": "回転",
      "sidebar/settings/shortcuts/scale": "スケール",
      "sidebar/settings/shortcuts/undo": "元に戻す",
      "sidebar/settings/shortcuts/focus": "フォーカス",
      "sidebar/history": "履歴",
      "sidebar/history/clear": "クリア",
      "sidebar/history/persistent": "永続的",
      "toolbar/translate": "移動",
      "toolbar/rotate": "回転",
      "toolbar/scale": "スケール",
      "toolbar/local": "ローカル",
      "viewport/controls/grid": "グリッド",
      "viewport/controls/helpers": "オーバーレイ表示",
      "viewport/info/object": "オブジェクト",
      "viewport/info/objects": "オブジェクト",
      "viewport/info/vertex": "頂点",
      "viewport/info/vertices": "頂点",
      "viewport/info/triangle": "三角形",
      "viewport/info/triangles": "三角形",
      "viewport/info/sample": "サンプル",
      "viewport/info/samples": "サンプル",
      "viewport/info/rendertime": "レンダリング時間",
      "script/title/vertexShader": "頂点シェーダー",
      "script/title/fragmentShader": "フラグメントシェーダ",
      "script/title/programInfo": "プログラムのプロパティ",
      "dialog/gltf/title": "glTFをインポート",
      "dialog/gltf/asScene": "glTFをルートシーンとしてインポート",
      "dialog/texture/title": "テクスチャパラメータ",
      "dialog/texture/group/preview": "プレビュー",
      "dialog/texture/group/mapping": "マッピング",
      "dialog/texture/group/filtering": "フィルタリング",
      "dialog/texture/group/transform": "変換",
      "dialog/texture/group/color": "カラー",
      "dialog/texture/mapping": "マッピング",
      "dialog/texture/wrapS": "ラップ S",
      "dialog/texture/wrapT": "ラップ T",
      "dialog/texture/magFilter": "拡大フィルター",
      "dialog/texture/minFilter": "縮小フィルター",
      "dialog/texture/anisotropy": "異方性",
      "dialog/texture/offset": "オフセット",
      "dialog/texture/repeat": "リピート",
      "dialog/texture/center": "中心",
      "dialog/texture/rotation": "回転",
      "dialog/texture/premultiplyAlpha": "プリマルチプライアルファ",
      "dialog/texture/colorSpace": "色空間",
      "dialog/ok": "OK",
      "dialog/cancel": "キャンセル"
    },
    ko: {
      "prompt/file/open": "저장되지 않은 데이터는 손실됩니다. 진행하시겠습니까?",
      "prompt/file/failedToOpenProject": "프로젝트를 여는 데 실패했습니다!",
      "prompt/file/export/noMeshSelected": "메시가 선택되지 않았습니다!",
      "prompt/file/export/noObjectSelected": "객체가 선택되지 않았습니다!",
      "prompt/file/export/duplicateNames": "일부 객체의 이름이 중복됩니다. 이름을 고유하게 만들기 위해 변경됩니다. 계속하시겠습니까?",
      "prompt/script/remove": "삭제하시겠습니까?",
      "prompt/history/clear": "되돌리기/다시하기 기록이 지워집니다. 진행하시겠습니까?",
      "prompt/history/preserve": "기록은 세션을 통해 저장됩니다. 이는 텍스처를 조작할 때 성능에 영향을 미칠 수 있습니다.",
      "prompt/history/forbid": "씬을 재생하는 동안 되돌리기/다시하기는 비활성화됩니다.",
      "prompt/rendering/realistic/unsupportedMaterial": "REALISTIC 셰이딩: MeshStandardmaterial 및 MeshPhysicalmaterial만 지원됩니다",
      "command/AddObject": "객체 추가",
      "command/AddScript": "스크립트 추가",
      "command/MoveObject": "객체 이동",
      "command/MultiCmds": "여러 변경",
      "command/RemoveObject": "객체 삭제",
      "command/RemoveScript": "스크립트 삭제",
      "command/SetColor": "색 설정",
      "command/SetGeometry": "지오메트리 설정",
      "command/SetGeometryValue": "지오메트리 값 설정",
      "command/SetMaterialColor": "머티리얼 색 설정",
      "command/SetMaterial": "머티리얼 설정",
      "command/SetMaterialMap": "머티리얼 맵 설정",
      "command/SetMaterialRange": "머티리얼 범위 설정",
      "command/SetMaterialValue": "머티리얼 값 설정",
      "command/SetMaterialVector": "머티리얼 벡터 설정",
      "command/SetPosition": "위치 설정",
      "command/SetRotation": "회전 설정",
      "command/SetScale": "스케일 설정",
      "command/SetScene": "장면 설정",
      "command/SetScriptValue": "스크립트 값 설정",
      "command/SetShadowValue": "그림자 값 설정",
      "command/SetTextureParameters": "텍스처 매개변수 설정",
      "command/SetUuid": "UUID 설정",
      "command/SetValue": "값 설정",
      "menubar/file": "파일",
      "menubar/file/new": "새 프로젝트",
      "menubar/file/new/empty": "비어 있음",
      "menubar/file/new/Arkanoid": "아카노이드",
      "menubar/file/new/Camera": "카메라",
      "menubar/file/new/Particles": "파티클",
      "menubar/file/new/Pong": "퐁",
      "menubar/file/new/Shaders": "셰이더",
      "menubar/file/open": "열기",
      "menubar/file/save": "저장",
      "menubar/file/import": "가져오기",
      "menubar/file/export": "내보내기",
      "menubar/edit": "편집",
      "menubar/edit/undo": "되돌리기",
      "menubar/edit/redo": "다시하기",
      "menubar/edit/center": "중앙으로 옮기기",
      "menubar/edit/clone": "복제",
      "menubar/edit/delete": "삭제",
      "menubar/add": "추가",
      "menubar/add/group": "그룹",
      "menubar/add/mesh": "메시",
      "menubar/add/mesh/plane": "평면",
      "menubar/add/mesh/box": "직육면체",
      "menubar/add/mesh/capsule": "캡슐",
      "menubar/add/mesh/circle": "원",
      "menubar/add/mesh/cylinder": "원통",
      "menubar/add/mesh/ring": "링",
      "menubar/add/mesh/sphere": "구",
      "menubar/add/mesh/dodecahedron": "십이면체",
      "menubar/add/mesh/icosahedron": "이십면체",
      "menubar/add/mesh/octahedron": "팔면체",
      "menubar/add/mesh/tetrahedron": "사면체",
      "menubar/add/text": "Text",
      "menubar/add/mesh/torus": "토러스",
      "menubar/add/mesh/tube": "튜브",
      "menubar/add/mesh/torusknot": "토러스 매듭",
      "menubar/add/mesh/lathe": "선반형",
      "menubar/add/mesh/sprite": "스프라이트",
      "menubar/add/light": "조명",
      "menubar/add/light/ambient": "환경광",
      "menubar/add/light/directional": "방향광",
      "menubar/add/light/hemisphere": "반구광",
      "menubar/add/light/point": "포인트",
      "menubar/add/light/spot": "스포트",
      "menubar/add/camera": "카메라",
      "menubar/add/camera/perspective": "투시 투영",
      "menubar/add/camera/orthographic": "정사영",
      "menubar/status/autosave": "자동 저장",
      "menubar/view": "보기",
      "menubar/view/fullscreen": "전체 화면",
      "menubar/view/gridHelper": "그리드 도우미",
      "menubar/view/cameraHelpers": "카메라 도우미",
      "menubar/view/lightHelpers": "조명 도우미",
      "menubar/view/skeletonHelpers": "골격 도우미",
      "menubar/render": "렌더",
      "menubar/render/image": "이미지",
      "menubar/render/video": "비디오",
      "menubar/render/quality": "품질",
      "menubar/render/cancel": "취소",
      "menubar/help": "도움말",
      "menubar/help/source_code": "소스 코드",
      "menubar/help/icons": "아이콘 팩",
      "menubar/help/about": "Three.js 알아보기",
      "menubar/help/manual": "매뉴얼",
      "sidebar/animations": "애니메이션",
      "sidebar/animations/play": "재생",
      "sidebar/animations/stop": "정지",
      "sidebar/animations/timescale": "시간 스케일",
      "sidebar/scene": "장면",
      "sidebar/scene/background": "배경",
      "sidebar/scene/environment": "환경",
      "sidebar/scene/fog": "안개",
      "sidebar/properties/object": "객체",
      "sidebar/properties/geometry": "지오메트리",
      "sidebar/properties/material": "머티리얼",
      "sidebar/properties/script": "스크립트",
      "sidebar/object/type": "타입",
      "sidebar/object/new": "새로 만들기",
      "sidebar/object/uuid": "UUID",
      "sidebar/object/name": "이름",
      "sidebar/object/position": "위치",
      "sidebar/object/rotation": "회전",
      "sidebar/object/scale": "스케일",
      "sidebar/object/fov": "화각",
      "sidebar/object/left": "왼쪽",
      "sidebar/object/right": "오른쪽",
      "sidebar/object/top": "위",
      "sidebar/object/bottom": "아래",
      "sidebar/object/near": "최소 시야",
      "sidebar/object/far": "최대 시야",
      "sidebar/object/intensity": "강도",
      "sidebar/object/color": "색",
      "sidebar/object/groundcolor": "지면 색",
      "sidebar/object/distance": "거리",
      "sidebar/object/angle": "각도",
      "sidebar/object/penumbra": "반음영",
      "sidebar/object/decay": "감쇠",
      "sidebar/object/shadow": "그림자",
      "sidebar/object/shadowIntensity": "그림자 강도",
      "sidebar/object/shadowBias": "그림자 바이어스",
      "sidebar/object/shadowNormalBias": "그림자 노멀 바이어스",
      "sidebar/object/shadowRadius": "그림자 반지름",
      "sidebar/object/cast": "cast",
      "sidebar/object/receive": "receive",
      "sidebar/object/visible": "보임",
      "sidebar/object/frustumcull": "프러스텀 컬링",
      "sidebar/object/renderorder": "렌더 순서",
      "sidebar/object/userdata": "사용자 데이터",
      "sidebar/object/export": "JSON으로 내보내기",
      "sidebar/geometry/type": "타입",
      "sidebar/geometry/new": "새로 만들기",
      "sidebar/geometry/uuid": "UUID",
      "sidebar/geometry/name": "이름",
      "sidebar/geometry/bounds": "경계",
      "sidebar/geometry/userdata": "사용자 데이터",
      "sidebar/geometry/show_vertex_normals": "버텍스 노멀 보기",
      "sidebar/geometry/compute_vertex_normals": "버텍스 노멀 계산",
      "sidebar/geometry/compute_vertex_tangents": "접선 계산",
      "sidebar/geometry/center": "중앙",
      "sidebar/geometry/export": "JSON으로 내보내기",
      "sidebar/geometry/morph": "Morph Targets",
      "sidebar/geometry/box_geometry/width": "너비",
      "sidebar/geometry/box_geometry/height": "높이",
      "sidebar/geometry/box_geometry/depth": "깊이",
      "sidebar/geometry/box_geometry/widthseg": "너비 분할 수",
      "sidebar/geometry/box_geometry/heightseg": "높이 분할 수",
      "sidebar/geometry/box_geometry/depthseg": "깊이 분할 수",
      "sidebar/geometry/buffer_geometry/attributes": "속성",
      "sidebar/geometry/buffer_geometry/index": "인덱스",
      "sidebar/geometry/buffer_geometry/morphAttributes": "모프 속성",
      "sidebar/geometry/buffer_geometry/morphRelative": "상대적 모프",
      "sidebar/geometry/capsule_geometry/radius": "반지름",
      "sidebar/geometry/capsule_geometry/height": "높이",
      "sidebar/geometry/capsule_geometry/capseg": "캡 분할 수",
      "sidebar/geometry/capsule_geometry/radialseg": "방사 분할 수",
      "sidebar/geometry/capsule_geometry/heightseg": "높이 분할 수",
      "sidebar/geometry/circle_geometry/radius": "반지름",
      "sidebar/geometry/circle_geometry/segments": "세그먼트",
      "sidebar/geometry/circle_geometry/thetastart": "시작 각도",
      "sidebar/geometry/circle_geometry/thetalength": "각도 길이",
      "sidebar/geometry/cylinder_geometry/radiustop": "상단 반지름",
      "sidebar/geometry/cylinder_geometry/radiusbottom": "하단 반지름",
      "sidebar/geometry/cylinder_geometry/height": "높이",
      "sidebar/geometry/cylinder_geometry/radialsegments": "방사 분할 수",
      "sidebar/geometry/cylinder_geometry/heightsegments": "높이 분할 수",
      "sidebar/geometry/cylinder_geometry/openended": "끝 열림",
      "sidebar/geometry/extrude_geometry/curveSegments": "곡선 분할 수",
      "sidebar/geometry/extrude_geometry/steps": "단계",
      "sidebar/geometry/extrude_geometry/depth": "깊이",
      "sidebar/geometry/extrude_geometry/bevelEnabled": "베벨 사용",
      "sidebar/geometry/extrude_geometry/bevelThickness": "베벨 두께",
      "sidebar/geometry/extrude_geometry/bevelSize": "베벨 크기",
      "sidebar/geometry/extrude_geometry/bevelOffset": "베벨 오프셋",
      "sidebar/geometry/extrude_geometry/bevelSegments": "베벨 분할 수",
      "sidebar/geometry/extrude_geometry/shape": "형상으로 변환",
      "sidebar/geometry/dodecahedron_geometry/radius": "반지름",
      "sidebar/geometry/dodecahedron_geometry/detail": "세부화",
      "sidebar/geometry/icosahedron_geometry/radius": "반지름",
      "sidebar/geometry/icosahedron_geometry/detail": "세부화",
      "sidebar/geometry/octahedron_geometry/radius": "반지름",
      "sidebar/geometry/octahedron_geometry/detail": "세부화",
      "sidebar/geometry/tetrahedron_geometry/radius": "반지름",
      "sidebar/geometry/tetrahedron_geometry/detail": "세부화",
      "sidebar/geometry/lathe_geometry/segments": "분할 수",
      "sidebar/geometry/lathe_geometry/phistart": "시작 각도",
      "sidebar/geometry/lathe_geometry/philength": "각도 길이",
      "sidebar/geometry/lathe_geometry/points": "포인트",
      "sidebar/geometry/plane_geometry/width": "너비",
      "sidebar/geometry/plane_geometry/height": "높이",
      "sidebar/geometry/plane_geometry/widthsegments": "너비 분할 수",
      "sidebar/geometry/plane_geometry/heightsegments": "깊이 분할 수",
      "sidebar/geometry/ring_geometry/innerRadius": "내부 반지름",
      "sidebar/geometry/ring_geometry/outerRadius": "외부 반지름",
      "sidebar/geometry/ring_geometry/thetaSegments": "원 분할 수",
      "sidebar/geometry/ring_geometry/phiSegments": "링 분할 수",
      "sidebar/geometry/ring_geometry/thetastart": "시작 각도",
      "sidebar/geometry/ring_geometry/thetalength": "각도 길이",
      "sidebar/geometry/text_geometry/text": "Text",
      "sidebar/geometry/text_geometry/size": "Font size",
      "sidebar/geometry/text_geometry/depth": "Extrude depth",
      "sidebar/geometry/text_geometry/scale": "Scale",
      "sidebar/geometry/text_geometry/curveseg": "Curve segments",
      "sidebar/geometry/text_geometry/bevelenabled": "Bevel enabled",
      "sidebar/geometry/text_geometry/bevelthickness": "Bevel thickness",
      "sidebar/geometry/text_geometry/bevelsize": "Bevel size",
      "sidebar/geometry/text_geometry/bevelOffset": "Bevel offset",
      "sidebar/geometry/text_geometry/bevelseg": "Bevel segments",
      "sidebar/geometry/shape_geometry/curveSegments": "곡선 분할 수",
      "sidebar/geometry/shape_geometry/extrude": "압출",
      "sidebar/geometry/sphere_geometry/radius": "반지름",
      "sidebar/geometry/sphere_geometry/widthsegments": "원 분할 수",
      "sidebar/geometry/sphere_geometry/heightsegments": "링 분할 수",
      "sidebar/geometry/sphere_geometry/phistart": "시작 각도",
      "sidebar/geometry/sphere_geometry/philength": "각도 길이",
      "sidebar/geometry/sphere_geometry/thetastart": "시작 각도",
      "sidebar/geometry/sphere_geometry/thetalength": "각도 길이",
      "sidebar/geometry/torus_geometry/radius": "반지름",
      "sidebar/geometry/torus_geometry/tube": "튜브 두께",
      "sidebar/geometry/torus_geometry/radialsegments": "소 분할 수",
      "sidebar/geometry/torus_geometry/tubularsegments": "대 분할 수",
      "sidebar/geometry/torus_geometry/arc": "호",
      "sidebar/geometry/torusKnot_geometry/radius": "반지름",
      "sidebar/geometry/torusKnot_geometry/tube": "튜브 두께",
      "sidebar/geometry/torusKnot_geometry/tubularsegments": "소 분할 수",
      "sidebar/geometry/torusKnot_geometry/radialsegments": "대 분할 수",
      "sidebar/geometry/torusKnot_geometry/p": "P",
      "sidebar/geometry/torusKnot_geometry/q": "Q",
      "sidebar/geometry/tube_geometry/path": "경로",
      "sidebar/geometry/tube_geometry/radius": "반지름",
      "sidebar/geometry/tube_geometry/tube": "튜브 두께",
      "sidebar/geometry/tube_geometry/tubularsegments": "소 분할 수",
      "sidebar/geometry/tube_geometry/radialsegments": "대 분할 수",
      "sidebar/geometry/tube_geometry/closed": "닫기",
      "sidebar/geometry/tube_geometry/curvetype": "곡선 타입",
      "sidebar/geometry/tube_geometry/tension": "텐션",
      "sidebar/material/new": "새로 만들기",
      "sidebar/material/copy": "복사",
      "sidebar/material/paste": "붙여넣기",
      "sidebar/material/slot": "슬롯",
      "sidebar/material/type": "타입",
      "sidebar/material/uuid": "UUID",
      "sidebar/material/name": "이름",
      "sidebar/material/program": "프로그램",
      "sidebar/material/info": "정보",
      "sidebar/material/vertex": "버텍스",
      "sidebar/material/fragment": "프래그먼트",
      "sidebar/material/color": "색",
      "sidebar/material/depthPacking": "깊이 패킹",
      "sidebar/material/roughness": "거칠기",
      "sidebar/material/metalness": "금속성",
      "sidebar/material/reflectivity": "반사율",
      "sidebar/material/emissive": "발광",
      "sidebar/material/specular": "스펙큘러",
      "sidebar/material/shininess": "광택",
      "sidebar/material/clearcoat": "클리어 코트",
      "sidebar/material/clearcoatroughness": "클리어 코트 거칠기",
      "sidebar/material/dispersion": "분산",
      "sidebar/material/ior": "굴절률",
      "sidebar/material/iridescence": "훈색",
      "sidebar/material/iridescenceIOR": "훈색 굴절률",
      "sidebar/material/iridescenceThicknessMax": "훈색 두께",
      "sidebar/material/sheen": "광택",
      "sidebar/material/sheenroughness": "광택 거칠기",
      "sidebar/material/sheencolor": "광택 색상",
      "sidebar/material/transmission": "투명도",
      "sidebar/material/attenuationDistance": "감쇠 거리",
      "sidebar/material/attenuationColor": "감쇠 색상",
      "sidebar/material/thickness": "두께",
      "sidebar/material/vertexcolors": "버텍스 색상",
      "sidebar/material/matcap": "매트 캡",
      "sidebar/material/map": "맵",
      "sidebar/material/alphamap": "알파맵",
      "sidebar/material/bumpmap": "범프맵",
      "sidebar/material/normalmap": "노멀맵",
      "sidebar/material/clearcoatmap": "클리어 코트 맵",
      "sidebar/material/clearcoatnormalmap": "클리어 코트 노멀맵",
      "sidebar/material/clearcoatroughnessmap": "클리어 코트 거칠기 맵",
      "sidebar/material/displacementmap": "변위 맵",
      "sidebar/material/roughnessmap": "거칠기 맵",
      "sidebar/material/metalnessmap": "금속성 맵",
      "sidebar/material/specularmap": "스펙큘러 맵",
      "sidebar/material/iridescencemap": "훈색 맵",
      "sidebar/material/iridescencethicknessmap": "훈색 두께 맵",
      "sidebar/material/sheencolormap": "광택 색상 맵",
      "sidebar/material/sheenroughnessmap": "광택 거칠기 맵",
      "sidebar/material/envmap": "환경 맵",
      "sidebar/material/lightmap": "조명 맵",
      "sidebar/material/aomap": "AO 맵",
      "sidebar/material/emissivemap": "발광 맵",
      "sidebar/material/gradientmap": "그라디언트 맵",
      "sidebar/material/transmissionmap": "투명 맵",
      "sidebar/material/thicknessmap": "두께 맵",
      "sidebar/material/side": "측면",
      "sidebar/material/size": "크기",
      "sidebar/material/sizeAttenuation": "크기 감쇠",
      "sidebar/material/flatShading": "플랫 셰이딩",
      "sidebar/material/blending": "블렌딩",
      "sidebar/material/opacity": "불투명도",
      "sidebar/material/transparent": "투명",
      "sidebar/material/forcesinglepass": "단일 패스 강제",
      "sidebar/material/alphatest": "알파 테스트",
      "sidebar/material/depthtest": "깊이 테스트",
      "sidebar/material/depthwrite": "깊이 쓰기",
      "sidebar/material/wireframe": "와이어프레임",
      "sidebar/material/userdata": "사용자 데이터",
      "sidebar/material/export": "JSON으로 내보내기",
      "sidebar/script/new": "새로 만들기",
      "sidebar/script/edit": "편집",
      "sidebar/script/remove": "삭제",
      "sidebar/project": "프로젝트",
      "sidebar/project/renderer": "렌더러",
      "sidebar/project/antialias": "안티앨리어싱",
      "sidebar/project/shadows": "그림자",
      "sidebar/project/toneMapping": "톤 매핑",
      "sidebar/project/geometries": "지오메트리",
      "sidebar/project/materials": "머티리얼",
      "sidebar/project/textures": "텍스처",
      "sidebar/project/Assign": "할당",
      "sidebar/project/app": "앱",
      "sidebar/project/app/play": "재생",
      "sidebar/project/app/stop": "정지",
      "sidebar/project/app/title": "제목",
      "sidebar/project/app/editable": "편집 가능",
      "sidebar/project/app/publish": "앱 파일로 저장",
      "sidebar/project/image": "이미지",
      "sidebar/project/image/samples": "샘플",
      "sidebar/project/video": "비디오",
      "sidebar/project/shading": "셰이딩",
      "sidebar/project/resolution": "해상도",
      "sidebar/project/duration": "길이",
      "sidebar/project/render": "렌더",
      "sidebar/settings": "설정",
      "sidebar/settings/language": "언어",
      "sidebar/settings/shortcuts": "단축키",
      "sidebar/settings/shortcuts/translate": "이동",
      "sidebar/settings/shortcuts/rotate": "회전",
      "sidebar/settings/shortcuts/scale": "스케일",
      "sidebar/settings/shortcuts/undo": "되돌리기",
      "sidebar/settings/shortcuts/focus": "포커스",
      "sidebar/history": "기록",
      "sidebar/history/clear": "지우기",
      "sidebar/history/persistent": "영구적",
      "toolbar/translate": "이동",
      "toolbar/rotate": "회전",
      "toolbar/scale": "스케일",
      "toolbar/local": "로컬",
      "viewport/controls/grid": "그리드",
      "viewport/controls/helpers": "도우미 보기",
      "viewport/info/object": "객체",
      "viewport/info/objects": "객체",
      "viewport/info/vertex": "버텍스",
      "viewport/info/vertices": "버텍스",
      "viewport/info/triangle": "삼각형",
      "viewport/info/triangles": "삼각형",
      "viewport/info/sample": "샘플",
      "viewport/info/samples": "샘플",
      "viewport/info/rendertime": "렌더링 시간",
      "script/title/vertexShader": "버텍스 셰이더",
      "script/title/fragmentShader": "프래그먼트 셰이더",
      "script/title/programInfo": "프로그램 속성",
      "dialog/gltf/title": "glTF 가져오기",
      "dialog/gltf/asScene": "glTF를 루트 씬으로 가져오기",
      "dialog/texture/title": "텍스처 매개변수",
      "dialog/texture/group/preview": "미리보기",
      "dialog/texture/group/mapping": "매핑",
      "dialog/texture/group/filtering": "필터링",
      "dialog/texture/group/transform": "변환",
      "dialog/texture/group/color": "색상",
      "dialog/texture/mapping": "매핑",
      "dialog/texture/wrapS": "랩 S",
      "dialog/texture/wrapT": "랩 T",
      "dialog/texture/magFilter": "확대 필터",
      "dialog/texture/minFilter": "축소 필터",
      "dialog/texture/anisotropy": "이방성",
      "dialog/texture/offset": "오프셋",
      "dialog/texture/repeat": "반복",
      "dialog/texture/center": "중심",
      "dialog/texture/rotation": "회전",
      "dialog/texture/premultiplyAlpha": "알파 미리 곱하기",
      "dialog/texture/colorSpace": "색 공간",
      "dialog/ok": "확인",
      "dialog/cancel": "취소"
    }
  };
  return {
    getKey: function(s) {
      return a[e][s] || "???";
    }
  };
}
function Ga() {
  const t = window.indexedDB;
  if (t === void 0)
    return console.warn("Storage: IndexedDB not available."), { init: function() {
    }, get: function() {
    }, set: function() {
    }, clear: function() {
    } };
  const e = "threejs-editor", a = 1;
  let s;
  return {
    init: function(n) {
      const r = t.open(e, a);
      r.onupgradeneeded = function(l) {
        const i = l.target.result;
        i.objectStoreNames.contains("states") === !1 && i.createObjectStore("states");
      }, r.onsuccess = function(l) {
        s = l.target.result, n();
      }, r.onerror = function(l) {
        console.error("IndexedDB", l);
      };
    },
    get: function(n) {
      const i = s.transaction(["states"], "readonly").objectStore("states").get(0);
      i.onsuccess = function(c) {
        n(c.target.result);
      };
    },
    set: function(n) {
      const r = performance.now(), c = s.transaction(["states"], "readwrite").objectStore("states").put(n, 0);
      c.onsuccess = function() {
        console.log("[" + /\d\d\:\d\d\:\d\d/.exec(/* @__PURE__ */ new Date())[0] + "]", "Saved state to IndexedDB. " + (performance.now() - r).toFixed(2) + "ms");
      };
    },
    clear: function() {
      if (s === void 0) return;
      const l = s.transaction(["states"], "readwrite").objectStore("states").clear();
      l.onsuccess = function() {
        console.log("[" + /\d\d\:\d\d\:\d\d/.exec(/* @__PURE__ */ new Date())[0] + "]", "Cleared IndexedDB.");
      };
    }
  };
}
const zt = new h.Vector2(), Jt = new h.Raycaster();
class za {
  constructor(e) {
    const a = e.signals;
    this.editor = e, this.signals = a, a.intersectionsDetected.add((s) => {
      if (s.length > 0) {
        const n = [];
        for (let l = 0; l < s.length; l++) {
          let i = s[l].object;
          i.userData.object !== void 0 && (i = i.userData.object), n.indexOf(i) === -1 && n.push(i);
        }
        const r = n.indexOf(e.selected);
        r !== -1 && r < n.length - 1 ? this.select(n[r + 1]) : this.select(n[0]);
      } else
        this.select(null);
    });
  }
  getIntersects(e) {
    const a = [];
    return this.editor.scene.traverseVisible(function(s) {
      a.push(s);
    }), this.editor.sceneHelpers.traverseVisible(function(s) {
      s.name === "picker" && a.push(s);
    }), e.intersectObjects(a, !1);
  }
  getPointerIntersects(e, a) {
    return zt.set(e.x * 2 - 1, -(e.y * 2) + 1), Jt.setFromCamera(zt, a), this.getIntersects(Jt);
  }
  select(e) {
    if (this.editor.selected === e) return;
    let a = null;
    e !== null && (a = e.uuid), this.editor.selected = e, this.editor.config.setKey("selected", a), this.signals.objectSelected.dispatch(e);
  }
  deselect() {
    this.select(null);
  }
}
var ct = new h.PerspectiveCamera(50, 1, 1e-3, 1e10);
ct.name = "Camera";
ct.position.set(0, 5, 10);
ct.lookAt(new h.Vector3());
const Ja = 100;
function Wa() {
  const t = signals.Signal;
  this.signals = {
    // script
    editScript: new t(),
    // player
    startPlayer: new t(),
    stopPlayer: new t(),
    // xr
    enterXR: new t(),
    offerXR: new t(),
    leaveXR: new t(),
    // notifications
    editorCleared: new t(),
    savingStarted: new t(),
    savingFinished: new t(),
    transformModeChanged: new t(),
    snapChanged: new t(),
    spaceChanged: new t(),
    rendererCreated: new t(),
    rendererUpdated: new t(),
    rendererDetectKTX2Support: new t(),
    sceneBackgroundChanged: new t(),
    sceneEnvironmentChanged: new t(),
    sceneFogChanged: new t(),
    sceneFogSettingsChanged: new t(),
    sceneGraphChanged: new t(),
    sceneRendered: new t(),
    cameraChanged: new t(),
    cameraResetted: new t(),
    geometryChanged: new t(),
    objectSelected: new t(),
    objectFocused: new t(),
    objectAdded: new t(),
    objectChanged: new t(),
    objectRemoved: new t(),
    cameraAdded: new t(),
    cameraRemoved: new t(),
    helperAdded: new t(),
    helperRemoved: new t(),
    materialAdded: new t(),
    materialChanged: new t(),
    materialRemoved: new t(),
    scriptAdded: new t(),
    scriptChanged: new t(),
    scriptRemoved: new t(),
    windowResize: new t(),
    showHelpersChanged: new t(),
    refreshSidebarObject3D: new t(),
    historyChanged: new t(),
    viewportCameraChanged: new t(),
    viewportShadingChanged: new t(),
    intersectionsDetected: new t(),
    pathTracerUpdated: new t(),
    animationPanelChanged: new t(),
    animationPanelResized: new t(),
    morphTargetsUpdated: new t()
  }, this.config = new Ia(), this.history = new Fa(this), this.selector = new za(this), this.storage = new Ga(), this.strings = new Ha(this.config), this.loader = new Ka(this), this.camera = ct.clone(), this.scene = new h.Scene(), this.scene.name = "Scene", this.sceneHelpers = new h.Scene(), this.sceneHelpers.add(new h.HemisphereLight(16777215, 8947848, 2)), this.backgroundType = "Default", this.environmentType = "Default", this.object = {}, this.geometries = {}, this.materials = {}, this.textures = {}, this.scripts = {}, this.materialsRefCounter = /* @__PURE__ */ new Map(), this.mixer = new h.AnimationMixer(this.scene), this.selected = null, this.helpers = {}, this.cameras = {}, this.viewportCamera = this.camera, this.viewportShading = "default", this.viewportColor = new h.Color(), this.addCamera(this.camera);
}
Wa.prototype = {
  setScene: function(t) {
    for (this.scene.uuid = t.uuid, this.scene.name = t.name, this.scene.background = t.background, this.scene.environment = t.environment, this.scene.fog = t.fog, this.scene.backgroundBlurriness = t.backgroundBlurriness, this.scene.backgroundIntensity = t.backgroundIntensity, this.scene.userData = JSON.parse(JSON.stringify(t.userData)), this.signals.sceneGraphChanged.active = !1; t.children.length > 0; )
      this.addObject(t.children[0]);
    this.signals.sceneGraphChanged.active = !0, this.signals.sceneGraphChanged.dispatch(), this.signals.sceneEnvironmentChanged.dispatch(this.environmentType, t.environment);
  },
  //
  addObject: function(t, e, a) {
    var s = this;
    t.traverse(function(n) {
      n.geometry !== void 0 && s.addGeometry(n.geometry), n.material !== void 0 && s.addMaterial(n.material), s.addCamera(n), s.addHelper(n);
    }), e === void 0 ? this.scene.add(t) : (e.children.splice(a, 0, t), t.parent = e), this.signals.objectAdded.dispatch(t), this.signals.sceneGraphChanged.dispatch();
  },
  nameObject: function(t, e) {
    t.name = e, this.signals.sceneGraphChanged.dispatch();
  },
  removeObject: function(t) {
    if (t.parent !== null) {
      var e = this;
      t.traverse(function(a) {
        e.removeCamera(a), e.removeHelper(a), a.material !== void 0 && e.removeMaterial(a.material);
      }), t.parent.remove(t), this.signals.objectRemoved.dispatch(t), this.signals.sceneGraphChanged.dispatch();
    }
  },
  addGeometry: function(t) {
    this.geometries[t.uuid] = t;
  },
  setGeometryName: function(t, e) {
    t.name = e, this.signals.sceneGraphChanged.dispatch();
  },
  addMaterial: function(t) {
    if (Array.isArray(t))
      for (var e = 0, a = t.length; e < a; e++)
        this.addMaterialToRefCounter(t[e]);
    else
      this.addMaterialToRefCounter(t);
    this.signals.materialAdded.dispatch();
  },
  addMaterialToRefCounter: function(t) {
    var e = this.materialsRefCounter, a = e.get(t);
    a === void 0 ? (e.set(t, 1), this.materials[t.uuid] = t) : (a++, e.set(t, a));
  },
  removeMaterial: function(t) {
    if (Array.isArray(t))
      for (var e = 0, a = t.length; e < a; e++)
        this.removeMaterialFromRefCounter(t[e]);
    else
      this.removeMaterialFromRefCounter(t);
    this.signals.materialRemoved.dispatch();
  },
  removeMaterialFromRefCounter: function(t) {
    var e = this.materialsRefCounter, a = e.get(t);
    a--, a === 0 ? (e.delete(t), delete this.materials[t.uuid]) : e.set(t, a);
  },
  getMaterialById: function(t) {
    for (var e, a = Object.values(this.materials), s = 0; s < a.length; s++)
      if (a[s].id === t) {
        e = a[s];
        break;
      }
    return e;
  },
  setMaterialName: function(t, e) {
    t.name = e, this.signals.sceneGraphChanged.dispatch();
  },
  addTexture: function(t) {
    this.textures[t.uuid] = t;
  },
  //
  addCamera: function(t) {
    t.isCamera && (this.cameras[t.uuid] = t, this.signals.cameraAdded.dispatch(t));
  },
  removeCamera: function(t) {
    this.cameras[t.uuid] !== void 0 && (delete this.cameras[t.uuid], this.signals.cameraRemoved.dispatch(t));
  },
  //
  addHelper: function() {
    var t = new h.SphereGeometry(2, 4, 2), e = new h.MeshBasicMaterial({ color: 16711680, visible: !1 });
    return function(a, s) {
      if (s === void 0) {
        if (a.isCamera)
          s = new h.CameraHelper(a);
        else if (a.isPointLight) {
          s = new h.PointLightHelper(a, 1), s.matrix = new h.Matrix4(), s.matrixAutoUpdate = !0;
          const r = a, l = this;
          s.updateMatrixWorld = function() {
            r.getWorldPosition(this.position);
            const i = l.viewportCamera.position.distanceTo(this.position);
            this.scale.setScalar(i / 30), this.updateMatrix(), this.matrixWorld.copy(this.matrix);
            const c = this.children;
            for (let d = 0, p = c.length; d < p; d++)
              c[d].updateMatrixWorld();
          };
        } else if (a.isDirectionalLight)
          s = new h.DirectionalLightHelper(a, 1);
        else if (a.isSpotLight)
          s = new h.SpotLightHelper(a);
        else if (a.isHemisphereLight)
          s = new h.HemisphereLightHelper(a, 1);
        else if (a.isSkinnedMesh)
          s = new h.SkeletonHelper(a.skeleton.bones[0]);
        else if (a.isBone === !0 && a.parent && a.parent.isBone !== !0)
          s = new h.SkeletonHelper(a);
        else
          return;
        const n = new h.Mesh(t, e);
        n.name = "picker", n.userData.object = a, s.add(n);
      }
      this.sceneHelpers.add(s), this.helpers[a.id] = s, this.signals.helperAdded.dispatch(s);
    };
  }(),
  removeHelper: function(t) {
    if (this.helpers[t.id] !== void 0) {
      var e = this.helpers[t.id];
      e.parent.remove(e), e.dispose(), delete this.helpers[t.id], this.signals.helperRemoved.dispatch(e);
    }
  },
  //
  addScript: function(t, e) {
    this.scripts[t.uuid] === void 0 && (this.scripts[t.uuid] = []), this.scripts[t.uuid].push(e), this.signals.scriptAdded.dispatch(e);
  },
  removeScript: function(t, e) {
    if (this.scripts[t.uuid] !== void 0) {
      var a = this.scripts[t.uuid].indexOf(e);
      a !== -1 && this.scripts[t.uuid].splice(a, 1), this.signals.scriptRemoved.dispatch(e);
    }
  },
  getObjectMaterial: function(t, e) {
    var a = t.material;
    return Array.isArray(a) && e !== void 0 && (a = a[e]), a;
  },
  setObjectMaterial: function(t, e, a) {
    Array.isArray(t.material) && e !== void 0 ? t.material[e] = a : t.material = a;
  },
  setCameraType: function(t) {
    const e = this.camera, a = e.isOrthographicCamera === !0;
    if (t === "orthographic" && a || t === "perspective" && !a) return;
    const s = this.controls ? this.controls.center : new h.Vector3(), n = e.position.distanceTo(s);
    let r;
    if (t === "orthographic") {
      const l = Ja / 2;
      r = new h.OrthographicCamera(-l, l, l, -l, 0, 1e4), r.position.copy(e.position), r.quaternion.copy(e.quaternion);
      const i = h.MathUtils.DEG2RAD * e.fov / 2;
      r.zoom = (r.top - r.bottom) / (2 * Math.max(n, 1e-4) * Math.tan(i));
    } else {
      r = new h.PerspectiveCamera(50, 1, 1e-3, 1e10), r.quaternion.copy(e.quaternion);
      const l = h.MathUtils.DEG2RAD * r.fov / 2, i = (e.top - e.bottom) / (2 * e.zoom * Math.tan(l)), c = new h.Vector3().subVectors(e.position, s);
      c.lengthSq() === 0 && c.set(0, 0, 1).applyQuaternion(e.quaternion), c.normalize().multiplyScalar(i), r.position.copy(s).add(c);
    }
    r.name = e.name, r.uuid = e.uuid, r.updateProjectionMatrix(), this.camera = r, this.cameras[r.uuid] = r, this.viewportCamera === e && (this.viewportCamera = r), this.signals.cameraResetted.dispatch(), this.selected === e && this.select(r);
  },
  setViewportCamera: function(t) {
    this.viewportCamera = this.cameras[t] || this.camera, this.signals.viewportCameraChanged.dispatch();
  },
  setViewportShading: function(t) {
    this.viewportShading = t, this.signals.viewportShadingChanged.dispatch();
  },
  //
  select: function(t) {
    this.selector.select(t);
  },
  selectById: function(t) {
    if (t === this.camera.id) {
      this.select(this.camera);
      return;
    }
    this.select(this.scene.getObjectById(t));
  },
  selectByUuid: function(t) {
    var e = this;
    this.scene.traverse(function(a) {
      a.uuid === t && e.select(a);
    });
  },
  deselect: function() {
    this.selector.deselect();
  },
  focus: function(t) {
    t !== void 0 && this.signals.objectFocused.dispatch(t);
  },
  focusById: function(t) {
    this.focus(this.scene.getObjectById(t));
  },
  clear: function() {
    this.history.clear(), this.storage.clear(), this.setCameraType("perspective"), this.camera.copy(ct), this.signals.cameraResetted.dispatch(), this.scene.name = "Scene", this.scene.userData = {}, this.scene.background = null, this.scene.environment = null, this.scene.fog = null;
    var t = this.scene.children;
    for (this.signals.sceneGraphChanged.active = !1; t.length > 0; )
      this.removeObject(t[0]);
    this.signals.sceneGraphChanged.active = !0, this.geometries = {}, this.materials = {}, this.textures = {}, this.scripts = {}, this.materialsRefCounter.clear(), this.animations = {}, this.mixer.stopAllAction(), this.deselect(), this.backgroundType = "Default", this.environmentType = "Default", this.signals.editorCleared.dispatch();
  },
  //
  fromJSON: async function(t) {
    var e = new h.ObjectLoader(), a = await e.parseAsync(t.camera);
    this.setCameraType(a.isOrthographicCamera ? "orthographic" : "perspective");
    const s = this.camera.uuid, n = a.uuid;
    this.camera.copy(a), this.camera.uuid = n, delete this.cameras[s], this.cameras[n] = this.camera, t.controls !== void 0 && this.controls.fromJSON(t.controls), this.signals.cameraResetted.dispatch(), this.history.fromJSON(t.history), this.scripts = t.scripts;
    const r = await e.parseAsync(t.scene);
    this.backgroundType = t.backgroundType || "Default", this.environmentType = t.environmentType || "Default", this.setScene(r);
  },
  toJSON: function() {
    var t = this.scene, e = this.scripts;
    for (var a in e) {
      var s = e[a];
      (s.length === 0 || t.getObjectByProperty("uuid", a) === void 0) && delete e[a];
    }
    return {
      metadata: {},
      project: {
        renderer: this.config.getKey("project/renderer/type"),
        shadows: this.config.getKey("project/renderer/shadows"),
        shadowType: this.config.getKey("project/renderer/shadowType"),
        toneMapping: this.config.getKey("project/renderer/toneMapping"),
        toneMappingExposure: this.config.getKey("project/renderer/toneMappingExposure")
      },
      camera: this.viewportCamera.toJSON(),
      controls: this.controls.toJSON(),
      scene: this.scene.toJSON(),
      scripts: this.scripts,
      history: this.history.toJSON(),
      backgroundType: this.backgroundType,
      environmentType: this.environmentType
    };
  },
  objectByUuid: function(t) {
    return this.scene.getObjectByProperty("uuid", t, !0);
  },
  execute: function(t, e) {
    this.history.execute(t, e);
  },
  undo: function() {
    this.history.undo();
  },
  redo: function() {
    this.history.redo();
  },
  utils: {
    save: Nt,
    saveArrayBuffer: qa,
    saveString: Xa,
    formatNumber: $a
  }
};
const et = document.createElement("a");
function Nt(t, e) {
  et.href && URL.revokeObjectURL(et.href), et.href = URL.createObjectURL(t), et.download = e || "data.json", et.dispatchEvent(new MouseEvent("click"));
}
function qa(t, e) {
  Nt(new Blob([t], { type: "application/octet-stream" }), e);
}
function Xa(t, e) {
  Nt(new Blob([t], { type: "text/plain" }), e);
}
function $a(t) {
  return new Intl.NumberFormat("en-us", { useGrouping: !0 }).format(t);
}
function Ya(t) {
  const e = t.strings, a = new q();
  a.setClass("menu");
  const s = new q();
  s.setClass("title"), s.setTextContent(e.getKey("menubar/add")), a.add(s);
  const n = new q();
  n.setClass("options"), a.add(n);
  let r = new S();
  r.setClass("option"), r.setTextContent(e.getKey("menubar/add/group")), r.onClick(function() {
    const o = new h.Group();
    o.name = "Group", t.execute(new H(t, o));
  }), n.add(r);
  const l = new S().setTextContent(e.getKey("menubar/add/mesh")).addClass("option").addClass("submenu-title");
  l.onMouseOver(function() {
    const { top: o, right: u } = l.dom.getBoundingClientRect(), { paddingTop: g } = getComputedStyle(this.dom);
    i.setLeft(u + "px"), i.setTop(o - parseFloat(g) + "px"), i.setStyle("max-height", [`calc( 100vh - ${o}px )`]), i.setDisplay("block");
  }), l.onMouseOut(function() {
    i.setDisplay("none");
  }), n.add(l);
  const i = new q().setPosition("fixed").addClass("options").setDisplay("none");
  l.add(i), r = new S(), r.setClass("option"), r.setTextContent(e.getKey("menubar/add/mesh/box")), r.onClick(function() {
    const o = new h.BoxGeometry(1, 1, 1, 1, 1, 1), u = new h.Mesh(o, new h.MeshStandardMaterial());
    u.name = "Box", t.execute(new H(t, u));
  }), i.add(r), r = new S(), r.setClass("option"), r.setTextContent(e.getKey("menubar/add/mesh/capsule")), r.onClick(function() {
    const o = new h.CapsuleGeometry(1, 1, 4, 8, 1), u = new h.MeshStandardMaterial(), g = new h.Mesh(o, u);
    g.name = "Capsule", t.execute(new H(t, g));
  }), i.add(r), r = new S(), r.setClass("option"), r.setTextContent(e.getKey("menubar/add/mesh/circle")), r.onClick(function() {
    const o = new h.CircleGeometry(1, 32, 0, Math.PI * 2), u = new h.Mesh(o, new h.MeshStandardMaterial());
    u.name = "Circle", t.execute(new H(t, u));
  }), i.add(r), r = new S(), r.setClass("option"), r.setTextContent(e.getKey("menubar/add/mesh/cylinder")), r.onClick(function() {
    const o = new h.CylinderGeometry(1, 1, 1, 32, 1, !1, 0, Math.PI * 2), u = new h.Mesh(o, new h.MeshStandardMaterial());
    u.name = "Cylinder", t.execute(new H(t, u));
  }), i.add(r), r = new S(), r.setClass("option"), r.setTextContent(e.getKey("menubar/add/mesh/dodecahedron")), r.onClick(function() {
    const o = new h.DodecahedronGeometry(1, 0), u = new h.Mesh(o, new h.MeshStandardMaterial());
    u.name = "Dodecahedron", t.execute(new H(t, u));
  }), i.add(r), r = new S(), r.setClass("option"), r.setTextContent(e.getKey("menubar/add/mesh/icosahedron")), r.onClick(function() {
    const o = new h.IcosahedronGeometry(1, 0), u = new h.Mesh(o, new h.MeshStandardMaterial());
    u.name = "Icosahedron", t.execute(new H(t, u));
  }), i.add(r), r = new S(), r.setClass("option"), r.setTextContent(e.getKey("menubar/add/mesh/lathe")), r.onClick(function() {
    const o = new h.LatheGeometry(), u = new h.Mesh(o, new h.MeshStandardMaterial({ side: h.DoubleSide }));
    u.name = "Lathe", t.execute(new H(t, u));
  }), i.add(r), r = new S(), r.setClass("option"), r.setTextContent(e.getKey("menubar/add/mesh/octahedron")), r.onClick(function() {
    const o = new h.OctahedronGeometry(1, 0), u = new h.Mesh(o, new h.MeshStandardMaterial());
    u.name = "Octahedron", t.execute(new H(t, u));
  }), i.add(r), r = new S(), r.setClass("option"), r.setTextContent(e.getKey("menubar/add/mesh/plane")), r.onClick(function() {
    const o = new h.PlaneGeometry(1, 1, 1, 1), u = new h.MeshStandardMaterial(), g = new h.Mesh(o, u);
    g.name = "Plane", t.execute(new H(t, g));
  }), i.add(r), r = new S(), r.setClass("option"), r.setTextContent(e.getKey("menubar/add/mesh/ring")), r.onClick(function() {
    const o = new h.RingGeometry(0.5, 1, 32, 1, 0, Math.PI * 2), u = new h.Mesh(o, new h.MeshStandardMaterial());
    u.name = "Ring", t.execute(new H(t, u));
  }), i.add(r), r = new S(), r.setClass("option"), r.setTextContent(e.getKey("menubar/add/mesh/sphere")), r.onClick(function() {
    const o = new h.SphereGeometry(1, 32, 16, 0, Math.PI * 2, 0, Math.PI), u = new h.Mesh(o, new h.MeshStandardMaterial());
    u.name = "Sphere", t.execute(new H(t, u));
  }), i.add(r), r = new S(), r.setClass("option"), r.setTextContent(e.getKey("menubar/add/mesh/sprite")), r.onClick(function() {
    const o = new h.Sprite(new h.SpriteMaterial());
    o.name = "Sprite", t.execute(new H(t, o));
  }), i.add(r), r = new S(), r.setClass("option"), r.setTextContent(e.getKey("menubar/add/mesh/tetrahedron")), r.onClick(function() {
    const o = new h.TetrahedronGeometry(1, 0), u = new h.Mesh(o, new h.MeshStandardMaterial());
    u.name = "Tetrahedron", t.execute(new H(t, u));
  }), i.add(r), r = new S(), r.setClass("option"), r.setTextContent(e.getKey("menubar/add/text")), r.onClick(function() {
    new wa().load("../examples/fonts/helvetiker_bold.typeface.json", function(u) {
      const g = "THREE.JS", b = new xa(g, {
        text: g,
        font: u,
        size: 1,
        depth: 0.5,
        curveSegments: 4,
        bevelEnabled: !1,
        bevelThickness: 0.1,
        bevelSize: 0.01,
        bevelOffset: 0,
        bevelSegments: 3
      }), w = new h.Mesh(b, new h.MeshStandardMaterial());
      w.name = "Text", t.execute(new H(t, w));
    });
  }), i.add(r), r = new S(), r.setClass("option"), r.setTextContent(e.getKey("menubar/add/mesh/torus")), r.onClick(function() {
    const o = new h.TorusGeometry(1, 0.4, 12, 48, Math.PI * 2), u = new h.Mesh(o, new h.MeshStandardMaterial());
    u.name = "Torus", t.execute(new H(t, u));
  }), i.add(r), r = new S(), r.setClass("option"), r.setTextContent(e.getKey("menubar/add/mesh/torusknot")), r.onClick(function() {
    const o = new h.TorusKnotGeometry(1, 0.4, 64, 8, 2, 3), u = new h.Mesh(o, new h.MeshStandardMaterial());
    u.name = "TorusKnot", t.execute(new H(t, u));
  }), i.add(r), r = new S(), r.setClass("option"), r.setTextContent(e.getKey("menubar/add/mesh/tube")), r.onClick(function() {
    const o = new h.CatmullRomCurve3([
      new h.Vector3(2, 2, -2),
      new h.Vector3(2, -2, -0.6666666666666667),
      new h.Vector3(-2, -2, 0.6666666666666667),
      new h.Vector3(-2, 2, 2)
    ]), u = new h.TubeGeometry(o, 64, 1, 8, !1), g = new h.Mesh(u, new h.MeshStandardMaterial());
    g.name = "Tube", t.execute(new H(t, g));
  }), i.add(r);
  const c = new S().setTextContent(e.getKey("menubar/add/light")).addClass("option").addClass("submenu-title");
  c.onMouseOver(function() {
    const { top: o, right: u } = c.dom.getBoundingClientRect(), { paddingTop: g } = getComputedStyle(this.dom);
    d.setLeft(u + "px"), d.setTop(o - parseFloat(g) + "px"), d.setStyle("max-height", [`calc( 100vh - ${o}px )`]), d.setDisplay("block");
  }), c.onMouseOut(function() {
    d.setDisplay("none");
  }), n.add(c);
  const d = new q().setPosition("fixed").addClass("options").setDisplay("none");
  c.add(d), r = new S(), r.setClass("option"), r.setTextContent(e.getKey("menubar/add/light/ambient")), r.onClick(function() {
    const u = new h.AmbientLight(2236962);
    u.name = "AmbientLight", t.execute(new H(t, u));
  }), d.add(r), r = new S(), r.setClass("option"), r.setTextContent(e.getKey("menubar/add/light/directional")), r.onClick(function() {
    const g = new h.DirectionalLight(16777215, 1);
    g.name = "DirectionalLight", g.target.name = "DirectionalLight Target", g.position.set(5, 10, 7.5), t.execute(new dt(t, [
      new H(t, g.target),
      new H(t, g)
    ]));
  }), d.add(r), r = new S(), r.setClass("option"), r.setTextContent(e.getKey("menubar/add/light/hemisphere")), r.onClick(function() {
    const b = new h.HemisphereLight(43775, 16755200, 1);
    b.name = "HemisphereLight", b.position.set(0, 10, 0), t.execute(new H(t, b));
  }), d.add(r), r = new S(), r.setClass("option"), r.setTextContent(e.getKey("menubar/add/light/point")), r.onClick(function() {
    const b = new h.PointLight(16777215, 1, 0);
    b.name = "PointLight", t.execute(new H(t, b));
  }), d.add(r), r = new S(), r.setClass("option"), r.setTextContent(e.getKey("menubar/add/light/spot")), r.onClick(function() {
    const b = Math.PI * 0.1, w = 0, f = new h.SpotLight(16777215, 1, 0, b, w);
    f.name = "SpotLight", f.target.name = "SpotLight Target", f.position.set(5, 10, 7.5), t.execute(new dt(t, [
      new H(t, f.target),
      new H(t, f)
    ]));
  }), d.add(r);
  const p = new S().setTextContent(e.getKey("menubar/add/camera")).addClass("option").addClass("submenu-title");
  p.onMouseOver(function() {
    const { top: o, right: u } = p.dom.getBoundingClientRect(), { paddingTop: g } = getComputedStyle(this.dom);
    m.setLeft(u + "px"), m.setTop(o - parseFloat(g) + "px"), m.setStyle("max-height", [`calc( 100vh - ${o}px )`]), m.setDisplay("block");
  }), p.onMouseOut(function() {
    m.setDisplay("none");
  }), n.add(p);
  const m = new q().setPosition("fixed").addClass("options").setDisplay("none");
  return p.add(m), r = new S(), r.setClass("option"), r.setTextContent(e.getKey("menubar/add/camera/orthographic")), r.onClick(function() {
    const o = t.camera.isPerspectiveCamera ? t.camera.aspect : (t.camera.right - t.camera.left) / (t.camera.top - t.camera.bottom), u = new h.OrthographicCamera(-o, o);
    u.name = "OrthographicCamera", t.execute(new H(t, u));
  }), m.add(r), r = new S(), r.setClass("option"), r.setTextContent(e.getKey("menubar/add/camera/perspective")), r.onClick(function() {
    const o = new h.PerspectiveCamera();
    o.name = "PerspectiveCamera", t.execute(new H(t, o));
  }), m.add(r), a;
}
function Za(t) {
  const e = t.strings, a = new q();
  a.setClass("menu");
  const s = new q();
  s.setClass("title"), s.setTextContent(e.getKey("menubar/edit")), a.add(s);
  const n = new q();
  n.setClass("options"), a.add(n);
  const r = new S();
  r.setClass("option"), r.setTextContent(e.getKey("menubar/edit/undo")), r.add(new k("CTRL+Z").setClass("key")), r.onClick(function() {
    t.undo();
  }), n.add(r);
  const l = new S();
  l.setClass("option"), l.setTextContent(e.getKey("menubar/edit/redo")), l.add(new k("CTRL+SHIFT+Z").setClass("key")), l.onClick(function() {
    t.redo();
  }), n.add(l);
  function i() {
    const d = t.history;
    r.setClass("option"), l.setClass("option"), d.undos.length == 0 && r.setClass("inactive"), d.redos.length == 0 && l.setClass("inactive");
  }
  t.signals.historyChanged.add(i), i(), n.add(new ft());
  let c = new S();
  return c.setClass("option"), c.setTextContent(e.getKey("menubar/edit/center")), c.onClick(function() {
    const d = t.selected;
    if (d === null || d.parent === null) return;
    const m = new ga().setFromObject(d).getCenter(new Je()), o = new Je();
    o.x = d.position.x - m.x, o.y = d.position.y - m.y, o.z = d.position.z - m.z, t.execute(new wt(t, d, o));
  }), n.add(c), c = new S(), c.setClass("option"), c.setTextContent(e.getKey("menubar/edit/clone")), c.onClick(function() {
    let d = t.selected;
    d === null || d.parent === null || (d = va(d), t.execute(new H(t, d)));
  }), n.add(c), c = new S(), c.setClass("option"), c.setTextContent(e.getKey("menubar/edit/delete")), c.add(new k("DEL").setClass("key")), c.onClick(function() {
    const d = t.selected;
    d === null || d.parent === null || (d.isSpotLight || d.isDirectionalLight ? t.execute(new dt(t, [
      new Ue(t, d),
      new Ue(t, d.target)
    ])) : t.execute(new Ue(t, d)));
  }), n.add(c), a;
}
function Qa(t) {
  const e = t.strings, a = t.utils.saveArrayBuffer, s = t.utils.saveString, n = new q();
  n.setClass("menu");
  const r = new q();
  r.setClass("title"), r.setTextContent(e.getKey("menubar/file")), n.add(r);
  const l = new q();
  l.setClass("options"), n.add(l);
  const i = new S().setTextContent(e.getKey("menubar/file/new")).addClass("option").addClass("submenu-title");
  i.onMouseOver(function() {
    const { top: M, right: y } = this.dom.getBoundingClientRect(), { paddingTop: j } = getComputedStyle(this.dom);
    c.setLeft(y + "px"), c.setTop(M - parseFloat(j) + "px"), c.setDisplay("block");
  }), i.onMouseOut(function() {
    c.setDisplay("none");
  }), l.add(i);
  const c = new q().setPosition("fixed").addClass("options").setDisplay("none");
  i.add(c);
  let d = new S().setTextContent(e.getKey("menubar/file/new/empty")).setClass("option");
  d.onClick(function() {
    confirm(e.getKey("prompt/file/open")) && t.clear();
  }), c.add(d), c.add(new ft());
  const p = [
    { title: "menubar/file/new/Arkanoid", file: "arkanoid.app.json" },
    { title: "menubar/file/new/Camera", file: "camera.app.json" },
    { title: "menubar/file/new/Particles", file: "particles.app.json" },
    { title: "menubar/file/new/Pong", file: "pong.app.json" },
    { title: "menubar/file/new/Shaders", file: "shaders.app.json" }
  ], m = new ha();
  for (let M = 0; M < p.length; M++)
    (function(y) {
      const j = p[y], R = new S();
      R.setClass("option"), R.setTextContent(e.getKey(j.title)), R.onClick(function() {
        confirm(e.getKey("prompt/file/open")) && m.load("examples/" + j.file, function(A) {
          t.clear(), t.fromJSON(JSON.parse(A));
        });
      }), c.add(R);
    })(M);
  const o = document.createElement("form");
  o.style.display = "none", document.body.appendChild(o);
  const u = document.createElement("input");
  u.multiple = !1, u.type = "file", u.accept = ".json", u.addEventListener("change", async function() {
    const M = u.files[0];
    if (M !== void 0)
      try {
        const y = JSON.parse(await M.text());
        async function j() {
          await t.fromJSON(y), t.signals.editorCleared.remove(j);
        }
        t.signals.editorCleared.add(j), t.clear();
      } catch (y) {
        alert(e.getKey("prompt/file/failedToOpenProject")), console.error(y);
      } finally {
        g.reset();
      }
  }), o.appendChild(u), d = new S().addClass("option").setTextContent(e.getKey("menubar/file/open")).onClick(function() {
    confirm(e.getKey("prompt/file/open")) && u.click();
  }), l.add(d), d = new S().addClass("option").setTextContent(e.getKey("menubar/file/save")).onClick(function() {
    const M = t.toJSON(), y = new Blob([JSON.stringify(M)], { type: "application/json" });
    t.utils.save(y, "project.json");
  }), l.add(d), l.add(new ft());
  const g = document.createElement("form");
  g.style.display = "none", document.body.appendChild(g);
  const b = document.createElement("input");
  b.multiple = !0, b.type = "file", b.addEventListener("change", function() {
    t.loader.loadFiles(b.files), g.reset();
  }), g.appendChild(b), d = new S(), d.setClass("option"), d.setTextContent(e.getKey("menubar/file/import")), d.onClick(function() {
    b.click();
  }), l.add(d);
  const w = new S().setTextContent(e.getKey("menubar/file/export")).addClass("option").addClass("submenu-title");
  w.onMouseOver(function() {
    const { top: M, right: y } = this.dom.getBoundingClientRect(), { paddingTop: j } = getComputedStyle(this.dom);
    f.setLeft(y + "px"), f.setTop(M - parseFloat(j) + "px"), f.setDisplay("block");
  }), w.onMouseOut(function() {
    f.setDisplay("none");
  }), l.add(w);
  const f = new q().setPosition("fixed").addClass("options").setDisplay("none");
  w.add(f), d = new S(), d.setClass("option"), d.setTextContent("DRC"), d.onClick(async function() {
    const M = t.selected;
    if (M === null || M.isMesh === void 0) {
      alert(e.getKey("prompt/file/export/noMeshSelected"));
      return;
    }
    const { DRACOExporter: y } = await import("three/addons/exporters/DRACOExporter.js"), j = new y(), R = {
      decodeSpeed: 5,
      encodeSpeed: 5,
      encoderMethod: y.MESH_EDGEBREAKER_ENCODING,
      quantization: [16, 8, 8, 8, 8],
      exportUvs: !0,
      exportNormals: !0,
      exportColor: M.geometry.hasAttribute("color")
    }, A = await j.parseAsync(M, R);
    a(A, "model.drc");
  }), f.add(d), d = new S(), d.setClass("option"), d.setTextContent("GLB"), d.onClick(async function() {
    const M = t.scene;
    if (O(M)) {
      if (confirm(e.getKey("prompt/file/export/duplicateNames")) === !1) return;
      L(M);
    }
    const y = C(M), j = [];
    for (const P of y)
      j.push(P.clone().optimize());
    const { GLTFExporter: R } = await import("three/addons/exporters/GLTFExporter.js");
    new R().parse(M, function(P) {
      a(P, "scene.glb");
    }, void 0, { binary: !0, animations: j });
  }), f.add(d), d = new S(), d.setClass("option"), d.setTextContent("GLTF"), d.onClick(async function() {
    const M = t.scene;
    if (O(M)) {
      if (confirm(e.getKey("prompt/file/export/duplicateNames")) === !1) return;
      L(M);
    }
    const y = C(M), j = [];
    for (const P of y)
      j.push(P.clone().optimize());
    const { GLTFExporter: R } = await import("three/addons/exporters/GLTFExporter.js");
    new R().parse(M, function(P) {
      s(JSON.stringify(P, null, 2), "scene.gltf");
    }, void 0, { animations: j });
  }), f.add(d), d = new S(), d.setClass("option"), d.setTextContent("OBJ"), d.onClick(async function() {
    const M = t.selected;
    if (M === null) {
      alert(e.getKey("prompt/file/export/noObjectSelected"));
      return;
    }
    const { OBJExporter: y } = await import("three/addons/exporters/OBJExporter.js"), j = new y();
    s(j.parse(M), "model.obj");
  }), f.add(d), d = new S(), d.setClass("option"), d.setTextContent("PLY"), d.onClick(async function() {
    const { PLYExporter: M } = await import("three/addons/exporters/PLYExporter.js");
    new M().parse(t.scene, function(j) {
      a(j, "model.ply");
    });
  }), f.add(d), d = new S(), d.setClass("option"), d.setTextContent("PLY (BINARY)"), d.onClick(async function() {
    const { PLYExporter: M } = await import("three/addons/exporters/PLYExporter.js");
    new M().parse(t.scene, function(j) {
      a(j, "model-binary.ply");
    }, { binary: !0 });
  }), f.add(d), d = new S(), d.setClass("option"), d.setTextContent("STL"), d.onClick(async function() {
    const { STLExporter: M } = await import("three/addons/exporters/STLExporter.js"), y = new M();
    s(y.parse(t.scene), "model.stl");
  }), f.add(d), d = new S(), d.setClass("option"), d.setTextContent("STL (BINARY)"), d.onClick(async function() {
    const { STLExporter: M } = await import("three/addons/exporters/STLExporter.js"), y = new M();
    a(y.parse(t.scene, { binary: !0 }), "model-binary.stl");
  }), f.add(d), d = new S(), d.setClass("option"), d.setTextContent("USDZ"), d.onClick(async function() {
    const { USDZExporter: M } = await import("three/addons/exporters/USDZExporter.js"), y = new M();
    a(await y.parseAsync(t.scene), "model.usdz");
  }), f.add(d);
  function C(M) {
    const y = [];
    return M.traverse(function(j) {
      y.push(...j.animations);
    }), y;
  }
  function O(M) {
    const y = /* @__PURE__ */ new Set();
    let j = !1, R = !1;
    return M.traverse(function(A) {
      A.animations.length > 0 && (R = !0), A.name !== "" && (y.has(A.name) && (j = !0), y.add(A.name));
    }), j && R;
  }
  function L(M) {
    const y = [];
    M.traverse(function(A) {
      for (const P of A.animations)
        for (const x of P.tracks) {
          const T = Kt.parseTrackName(x.name).nodeName, N = Kt.findNode(A, T);
          N !== null && N.name === T && y.push({ track: x, target: N, nodeName: T });
        }
    });
    let j = !1;
    const R = /* @__PURE__ */ new Set();
    if (M.traverse(function(A) {
      if (A.name !== "") {
        if (R.has(A.name)) {
          let P = 1, x;
          do
            x = A.name + "_" + P++;
          while (R.has(x));
          A.name = x, j = !0;
        }
        R.add(A.name);
      }
    }), j !== !1) {
      for (const { track: A, target: P, nodeName: x } of y)
        P.name !== x && (A.name = P.name + A.name.slice(x.length));
      t.signals.sceneGraphChanged.dispatch();
    }
  }
  return n;
}
function es(t) {
  const e = t.signals, a = t.strings, s = new q();
  s.setClass("menu");
  const n = new q();
  n.setClass("title"), n.setTextContent(a.getKey("menubar/view")), s.add(n);
  const r = new q();
  r.setClass("options"), s.add(r);
  const l = {
    gridHelper: !0,
    cameraHelpers: !0,
    lightHelpers: !0,
    skeletonHelpers: !0
  };
  let i = new S().addClass("option").addClass("toggle").setTextContent(a.getKey("menubar/view/gridHelper")).onClick(function() {
    l.gridHelper = !l.gridHelper, this.toggleClass("toggle-on", l.gridHelper), e.showHelpersChanged.dispatch(l);
  }).toggleClass("toggle-on", l.gridHelper);
  return r.add(i), i = new S().addClass("option").addClass("toggle").setTextContent(a.getKey("menubar/view/cameraHelpers")).onClick(function() {
    l.cameraHelpers = !l.cameraHelpers, this.toggleClass("toggle-on", l.cameraHelpers), e.showHelpersChanged.dispatch(l);
  }).toggleClass("toggle-on", l.cameraHelpers), r.add(i), i = new S().addClass("option").addClass("toggle").setTextContent(a.getKey("menubar/view/lightHelpers")).onClick(function() {
    l.lightHelpers = !l.lightHelpers, this.toggleClass("toggle-on", l.lightHelpers), e.showHelpersChanged.dispatch(l);
  }).toggleClass("toggle-on", l.lightHelpers), r.add(i), i = new S().addClass("option").addClass("toggle").setTextContent(a.getKey("menubar/view/skeletonHelpers")).onClick(function() {
    l.skeletonHelpers = !l.skeletonHelpers, this.toggleClass("toggle-on", l.skeletonHelpers), e.showHelpersChanged.dispatch(l);
  }).toggleClass("toggle-on", l.skeletonHelpers), r.add(i), e.helperAdded.add(function() {
    e.showHelpersChanged.dispatch(l);
  }), r.add(new ft()), i = new S(), i.setClass("option"), i.setTextContent(a.getKey("menubar/view/fullscreen")), i.onClick(function() {
    document.fullscreenElement === null ? document.documentElement.requestFullscreen() : document.exitFullscreen && document.exitFullscreen(), document.webkitFullscreenElement === null ? document.documentElement.webkitRequestFullscreen() : document.webkitExitFullscreen && document.webkitExitFullscreen();
  }), r.add(i), "xr" in navigator && ("offerSession" in navigator.xr ? e.offerXR.dispatch("immersive-ar") : navigator.xr.isSessionSupported("immersive-ar").then(function(c) {
    if (c) {
      const d = new S();
      d.setClass("option"), d.setTextContent("AR"), d.onClick(function() {
        e.enterXR.dispatch("immersive-ar");
      }), r.add(d);
    } else
      navigator.xr.isSessionSupported("immersive-vr").then(function(d) {
        if (d) {
          const p = new S();
          p.setClass("option"), p.setTextContent("VR"), p.onClick(function() {
            e.enterXR.dispatch("immersive-vr");
          }), r.add(p);
        }
      });
  })), s;
}
function na(t) {
  let e = null;
  function a(p, m) {
    e === null && (e = new Ca(t), e.filterGlossyFactor = 0.5), e.setScene(p, m);
  }
  function s() {
    e !== null && e.updateCamera();
  }
  function n() {
    e !== null && e.updateEnvironment();
  }
  function r() {
    e !== null && e.updateMaterials();
  }
  function l() {
    e !== null && e.updateEnvironment();
  }
  function i() {
    e !== null && e.renderSample();
  }
  function c() {
    e !== null && e.updateCamera();
  }
  function d() {
    if (e !== null)
      return e.samples;
  }
  return {
    init: a,
    setSize: s,
    setBackground: n,
    setEnvironment: l,
    updateMaterials: r,
    update: i,
    reset: c,
    getSamples: d
  };
}
const ia = {
  Player: function() {
    let t;
    const e = new THREE.ObjectLoader();
    let a, s, n = {};
    const r = document.createElement("div");
    this.dom = r, this.canvas = null, this.width = 500, this.height = 500, this.load = async function(f) {
      const C = f.project;
      if (t !== void 0 && (t.dispose(), r.removeChild(t.domElement), this.canvas = null), C.renderer === "WebGPURenderer") {
        const { WebGPURenderer: j } = await import("three/webgpu");
        t = new j({ antialias: !0, reversedDepthBuffer: !0 }), await t.init();
      } else
        t = new THREE.WebGLRenderer({ antialias: !0, reversedDepthBuffer: !0 });
      t.setPixelRatio(window.devicePixelRatio), C.shadows !== void 0 && (t.shadowMap.enabled = C.shadows), C.shadowType !== void 0 && (t.shadowMap.type = C.shadowType), C.toneMapping !== void 0 && (t.toneMapping = C.toneMapping), C.toneMappingExposure !== void 0 && (t.toneMappingExposure = C.toneMappingExposure), r.appendChild(t.domElement), this.canvas = t.domElement, this.setScene(e.parse(f.scene)), this.setCamera(e.parse(f.camera)), n = {
        init: [],
        start: [],
        stop: [],
        keydown: [],
        keyup: [],
        pointerdown: [],
        pointerup: [],
        pointermove: [],
        update: []
      };
      let O = "player,renderer,scene,camera";
      const L = {};
      for (var M in n)
        O += "," + M, L[M] = M;
      const y = JSON.stringify(L).replace(/\"/g, "");
      for (const j in f.scripts) {
        const R = s.getObjectByProperty("uuid", j, !0);
        if (R === void 0) {
          console.warn("APP.Player: Script without object.", j);
          continue;
        }
        const A = f.scripts[j];
        for (let P = 0; P < A.length; P++) {
          const x = A[P], T = new Function(O, x.source + `
return ` + y + ";").bind(R)(this, t, s, a);
          for (const N in T)
            if (T[N] !== void 0) {
              if (n[N] === void 0) {
                console.warn("APP.Player: Event type not supported (", N, ")");
                continue;
              }
              n[N].push(T[N].bind(R));
            }
        }
      }
      i(n.init, arguments);
    }, this.setCamera = function(f) {
      a = f, l(a, this.width / this.height);
    }, this.setScene = function(f) {
      s = f;
    }, this.setPixelRatio = function(f) {
      t.setPixelRatio(f);
    }, this.setClearColor = function(f) {
      t.setClearColor(f);
    }, this.setSize = function(f, C) {
      this.width = f, this.height = C, a && l(a, this.width / this.height), t && t.setSize(f, C);
    };
    function l(f, C) {
      if (f.isPerspectiveCamera)
        f.aspect = C;
      else {
        const O = f.top - f.bottom;
        f.left = -O * C / 2, f.right = O * C / 2;
      }
      f.updateProjectionMatrix();
    }
    function i(f, C) {
      for (let O = 0, L = f.length; O < L; O++)
        f[O](C);
    }
    let c, d, p;
    function m() {
      c = performance.now();
      try {
        i(n.update, { time: c - d, delta: c - p });
      } catch (f) {
        console.error(f.message || f, f.stack || "");
      }
      t.render(s, a), p = c;
    }
    this.play = function() {
      d = p = performance.now(), document.addEventListener("keydown", o), document.addEventListener("keyup", u), document.addEventListener("pointerdown", g), document.addEventListener("pointerup", b), document.addEventListener("pointermove", w), i(n.start, arguments), t.setAnimationLoop(m);
    }, this.stop = function() {
      document.removeEventListener("keydown", o), document.removeEventListener("keyup", u), document.removeEventListener("pointerdown", g), document.removeEventListener("pointerup", b), document.removeEventListener("pointermove", w), i(n.stop, arguments), t.setAnimationLoop(null);
    }, this.render = function(f) {
      i(n.update, {
        time: f * 1e3,
        delta: 0
        /* TODO */
      }), t.render(s, a);
    }, this.dispose = function() {
      t && t.dispose(), a = void 0, s = void 0;
    };
    function o(f) {
      i(n.keydown, f);
    }
    function u(f) {
      i(n.keyup, f);
    }
    function g(f) {
      i(n.pointerdown, f);
    }
    function b(f) {
      i(n.pointerup, f);
    }
    function w(f) {
      i(n.pointermove, f);
    }
  }
};
function ts(t) {
  const e = t.strings, a = new q();
  a.setClass("menu");
  const s = new q();
  s.setClass("title"), s.setTextContent(e.getKey("menubar/render")), a.add(s);
  const n = new q();
  n.setClass("options"), a.add(n);
  let r = new S();
  r.setClass("option"), r.setTextContent(e.getKey("menubar/render/image")), r.onClick(function() {
    l();
  }), n.add(r), "VideoEncoder" in window && (r = new S(), r.setClass("option"), r.setTextContent(e.getKey("menubar/render/video")), r.onClick(function() {
    i();
  }), n.add(r));
  function l() {
    const c = new as(t, e);
    document.body.appendChild(c.dom);
  }
  function i() {
    const c = new ss(t, e);
    document.body.appendChild(c.dom);
  }
  return a;
}
class as {
  constructor(e, a) {
    const s = document.createElement("div");
    s.className = "Dialog", this.dom = s;
    const n = document.createElement("div");
    n.className = "Dialog-background", n.addEventListener("click", () => this.close()), s.appendChild(n);
    const r = document.createElement("div");
    r.className = "Dialog-content", s.appendChild(r);
    const l = document.createElement("div");
    l.className = "Dialog-title", l.textContent = a.getKey("menubar/render") + " " + a.getKey("menubar/render/image"), r.appendChild(l);
    const i = document.createElement("div");
    i.className = "Dialog-body", r.appendChild(i);
    const c = new S();
    i.appendChild(c.dom), c.add(new k(a.getKey("sidebar/project/shading")).setClass("Label"));
    const d = new pe().setOptions({
      solid: "SOLID",
      realistic: "REALISTIC"
    }).setWidth("170px").onChange(g).setValue("solid");
    c.add(d);
    const p = 3, m = 65536, o = new Ke(16).setRange(p, m), u = new S();
    u.add(new k(a.getKey("sidebar/project/image/samples")).setClass("Label")), u.add(o), i.appendChild(u.dom);
    function g() {
      u.setHidden(d.getValue() !== "realistic");
    }
    g();
    const b = new S();
    i.appendChild(b.dom), b.add(new k(a.getKey("sidebar/project/resolution")).setClass("Label"));
    const w = new Ke(1024).setTextAlign("center").setWidth("28px");
    b.add(w), b.add(new k("×").setTextAlign("center").setFontSize("12px").setWidth("12px"));
    const f = new Ke(1024).setTextAlign("center").setWidth("28px");
    b.add(f);
    const C = document.createElement("div");
    C.className = "Dialog-buttons", i.appendChild(C);
    const O = new te(a.getKey("sidebar/project/render"));
    O.setWidth("80px"), O.onClick(async () => {
      if (d.getValue() === "realistic") {
        let W = !0;
        if (e.scene.traverseVisible((_) => {
          if (_.isMesh) {
            const B = Array.isArray(_.material) ? _.material : [_.material];
            for (let $ = 0; $ < B.length; $++)
              if (!B[$].isMeshStandardMaterial) {
                W = !1;
                return;
              }
          }
        }), W === !1) {
          alert(a.getKey("prompt/rendering/realistic/unsupportedMaterial"));
          return;
        }
      }
      const M = e.toJSON(), y = M.project, j = new h.ObjectLoader(), R = await j.parseAsync(M.camera), A = w.getValue() / f.getValue();
      if (R.isPerspectiveCamera)
        R.aspect = A;
      else {
        const W = R.top - R.bottom;
        R.left = -W * A / 2, R.right = W * A / 2;
      }
      R.updateProjectionMatrix(), R.updateMatrixWorld();
      const P = await j.parseAsync(M.scene), x = new h.WebGLRenderer({ antialias: !0, reversedDepthBuffer: !0 });
      x.setSize(w.getValue(), f.getValue()), x.setClearColor(e.viewportColor), y.shadows !== void 0 && (x.shadowMap.enabled = y.shadows), y.shadowType !== void 0 && (x.shadowMap.type = y.shadowType), y.toneMapping !== void 0 && (x.toneMapping = y.toneMapping), y.toneMappingExposure !== void 0 && (x.toneMappingExposure = y.toneMappingExposure);
      const T = w.getValue() / window.devicePixelRatio, N = f.getValue() / window.devicePixelRatio, ee = (screen.width - T) / 2, re = (screen.height - N) / 2, X = window.open("", "_blank", `location=no,left=${ee},top=${re},width=${T},height=${N}`), Z = document.createElement("meta");
      Z.name = "viewport", Z.content = "width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0", X.document.head.appendChild(Z), X.document.body.style.background = "#000", X.document.body.style.margin = "0px", X.document.body.style.overflow = "hidden";
      const ae = x.domElement;
      switch (ae.style.width = T + "px", ae.style.height = N + "px", X.document.body.appendChild(ae), d.getValue()) {
        case "solid":
          x.render(P, R), x.dispose();
          break;
        case "realistic":
          let $ = function() {
            if (X.closed === !0) return;
            const Y = Math.floor(_.getSamples()) + 1;
            Y < B && requestAnimationFrame($), _.update();
            const I = Math.floor(Y / B * 100);
            W.textContent = `${Y} / ${B} ( ${I}% )`, I === 100 && (W.textContent += " ✓");
          };
          const W = document.createElement("div");
          W.style.position = "absolute", W.style.top = "10px", W.style.left = "10px", W.style.color = "white", W.style.fontFamily = "system-ui", W.style.fontSize = "12px", X.document.body.appendChild(W);
          const _ = new na(x);
          _.init(P, R), _.setSize(w.getValue(), f.getValue());
          const B = Math.max(p, Math.min(m, o.getValue()));
          $();
          break;
      }
      this.close();
    }), C.appendChild(O.dom);
    const L = new te(a.getKey("menubar/render/cancel"));
    L.setWidth("80px"), L.setMarginLeft("8px"), L.onClick(() => this.close()), C.appendChild(L.dom);
  }
  close() {
    this.dom.remove();
  }
}
class ss {
  constructor(e, a) {
    const s = document.createElement("div");
    s.className = "Dialog", this.dom = s;
    const n = document.createElement("div");
    n.className = "Dialog-background", n.addEventListener("click", () => this.close()), s.appendChild(n);
    const r = document.createElement("div");
    r.className = "Dialog-content", s.appendChild(r);
    const l = document.createElement("div");
    l.className = "Dialog-title", l.textContent = a.getKey("menubar/render") + " " + a.getKey("menubar/render/video"), r.appendChild(l);
    const i = document.createElement("div");
    i.className = "Dialog-body", r.appendChild(i);
    function c() {
      this.setValue(2 * Math.floor(this.getValue() / 2));
    }
    const d = new S();
    i.appendChild(d.dom), d.add(new k(a.getKey("sidebar/project/resolution")).setClass("Label"));
    const p = new Ke(1024).setTextAlign("center").setWidth("28px").setStep(2).onChange(c);
    d.add(p), d.add(new k("×").setTextAlign("center").setFontSize("12px").setWidth("12px"));
    const m = new Ke(1024).setTextAlign("center").setWidth("28px").setStep(2).onChange(c);
    d.add(m);
    const o = new Ke(30).setTextAlign("center").setWidth("20px");
    d.add(o), d.add(new k("fps").setFontSize("12px"));
    const u = new S();
    u.add(new k(a.getKey("sidebar/project/duration")).setClass("Label")), i.appendChild(u.dom);
    const g = new Ke(10);
    u.add(g);
    const b = new S();
    b.add(new k(a.getKey("menubar/render/quality")).setClass("Label")), i.appendChild(b.dom);
    const w = new pe().setOptions({
      low: "Low",
      medium: "Medium",
      high: "High",
      ultra: "Ultra"
    }).setWidth("170px").setValue("high");
    b.add(w);
    const f = document.createElement("div");
    f.className = "Dialog-buttons", i.appendChild(f);
    const C = new te(a.getKey("sidebar/project/render"));
    C.setWidth("80px"), C.onClick(async () => {
      const L = new ia.Player();
      await L.load(e.toJSON()), L.setPixelRatio(1), L.setSize(p.getValue(), m.getValue()), L.setClearColor(e.viewportColor);
      const M = p.getValue() / window.devicePixelRatio, y = m.getValue() / window.devicePixelRatio, j = L.canvas;
      j.style.width = M + "px", j.style.height = y + "px";
      const R = (screen.width - M) / 2, A = (screen.height - y) / 2, P = window.open("", "_blank", `location=no,left=${R},top=${A},width=${M},height=${y}`), x = document.createElement("meta");
      x.name = "viewport", x.content = "width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0", P.document.head.appendChild(x), P.document.body.style.background = "#000", P.document.body.style.margin = "0px", P.document.body.style.overflow = "hidden", P.document.body.appendChild(j);
      const T = document.createElement("div");
      T.style.position = "absolute", T.style.top = "10px", T.style.left = "10px", T.style.color = "white", T.style.fontFamily = "system-ui", T.style.fontSize = "12px", T.style.textShadow = "0 0 2px black", P.document.body.appendChild(T);
      const N = document.createElement("video");
      N.width = M, N.height = y, N.controls = !0, N.loop = !0, N.hidden = !0, P.document.body.appendChild(N), P.addEventListener("unload", function() {
        N.src.startsWith("blob:") && URL.revokeObjectURL(N.src);
      });
      const ee = o.getValue(), X = g.getValue() * ee, Z = [];
      let ae = null;
      const W = new VideoEncoder({
        output: (Y, I) => {
          var E;
          (E = I == null ? void 0 : I.decoderConfig) != null && E.description && (ae = new Uint8Array(I.decoderConfig.description));
          const J = new Uint8Array(Y.byteLength);
          Y.copyTo(J), Z.push({ data: J, timestamp: Y.timestamp, type: Y.type });
        },
        error: (Y) => console.error("VideoEncoder error:", Y)
      }), _ = {
        low: 2e6,
        medium: 5e6,
        high: 1e7,
        ultra: 2e7
      };
      W.configure({
        codec: "avc1.640028",
        width: p.getValue(),
        height: m.getValue(),
        bitrate: _[w.getValue()],
        framerate: ee,
        avc: { format: "avc" }
      });
      let B = 0, $ = !1;
      for (let Y = 0; Y < X; Y++) {
        if (P.closed) {
          $ = !0;
          break;
        }
        L.render(B);
        const I = await createImageBitmap(j), J = new VideoFrame(I, { timestamp: Y * (1e6 / ee) });
        W.encode(J, { keyFrame: Y % ee === 0 }), J.close(), I.close(), B += 1 / ee;
        const E = Math.floor((Y + 1) / X * 100);
        T.textContent = `${Y + 1} / ${X} ( ${E}% )`;
      }
      if (!$) {
        await W.flush(), W.close(), P.document.body.removeChild(j);
        const Y = rs(Z, ae, p.getValue(), m.getValue(), ee);
        T.textContent = `${X} / ${X} ( 100% ) ${ns(Y.byteLength)} ✓`, N.src = URL.createObjectURL(new Blob([Y], { type: "video/mp4" })), N.hidden = !1;
      }
      L.dispose(), this.close();
    }), f.appendChild(C.dom);
    const O = new te(a.getKey("menubar/render/cancel"));
    O.setWidth("80px"), O.setMarginLeft("8px"), O.onClick(() => this.close()), f.appendChild(O.dom);
  }
  close() {
    this.dom.remove();
  }
}
function rs(t, e, a, s, n) {
  const l = 9e4 / n;
  function i(D) {
    return new Uint8Array([D >> 24 & 255, D >> 16 & 255, D >> 8 & 255, D & 255]);
  }
  function c(D) {
    return new Uint8Array([D >> 8 & 255, D & 255]);
  }
  function d(D) {
    return new TextEncoder().encode(D);
  }
  function p(...D) {
    const F = D.reduce((z, Q) => z + Q.length, 0), V = new Uint8Array(F);
    let U = 0;
    for (const z of D)
      V.set(z, U), U += z.length;
    return V;
  }
  function m(D, ...F) {
    const V = p(...F), U = V.length + 8;
    return p(i(U), d(D), V);
  }
  function o(D, F, V, ...U) {
    return m(D, new Uint8Array([F, V >> 16 & 255, V >> 8 & 255, V & 255]), ...U);
  }
  const u = m(
    "ftyp",
    d("isom"),
    i(512),
    d("isom"),
    d("iso2"),
    d("avc1"),
    d("mp41")
  ), g = [], b = [];
  for (let D = 0; D < t.length; D++)
    g.push(t[D].data.length), t[D].type === "key" && b.push(D + 1);
  let w = 8;
  for (const D of t) w += D.data.length;
  const f = m(
    "avc1",
    new Uint8Array(6),
    // reserved
    c(1),
    // data reference index
    new Uint8Array(16),
    // pre-defined + reserved
    c(a),
    c(s),
    i(4718592),
    // horizontal resolution 72 dpi
    i(4718592),
    // vertical resolution 72 dpi
    i(0),
    // reserved
    c(1),
    // frame count
    new Uint8Array(32),
    // compressor name
    c(24),
    // depth
    new Uint8Array([255, 255]),
    // pre-defined
    m("avcC", e)
  ), C = o("stsd", 0, 0, i(1), f), O = o(
    "stts",
    0,
    0,
    i(1),
    i(t.length),
    i(l)
  ), L = o(
    "stsc",
    0,
    0,
    i(1),
    i(1),
    i(t.length),
    i(1)
  ), M = [i(0), i(t.length)];
  for (const D of g) M.push(i(D));
  const y = o("stsz", 0, 0, ...M), j = o("stco", 0, 0, i(1), i(0)), R = [i(b.length)];
  for (const D of b) R.push(i(D));
  const A = o("stss", 0, 0, ...R), P = m("stbl", C, O, L, y, j, A), x = o(
    "dref",
    0,
    0,
    i(1),
    o("url ", 0, 1)
  ), T = m("dinf", x), N = o("vmhd", 0, 1, new Uint8Array(8)), ee = m("minf", N, T, P), re = o(
    "hdlr",
    0,
    0,
    i(0),
    // pre-defined
    d("vide"),
    new Uint8Array(12),
    // reserved
    d("VideoHandler"),
    new Uint8Array(1)
  ), X = t.length * l, Z = o(
    "mdhd",
    0,
    0,
    i(0),
    // creation time
    i(0),
    // modification time
    i(9e4),
    i(X),
    c(21956),
    // language (und)
    c(0)
    // quality
  ), ae = m("mdia", Z, re, ee), W = o(
    "tkhd",
    0,
    3,
    i(0),
    // creation time
    i(0),
    // modification time
    i(1),
    // track id
    i(0),
    // reserved
    i(X),
    new Uint8Array(8),
    // reserved
    c(0),
    // layer
    c(0),
    // alternate group
    c(0),
    // volume
    c(0),
    // reserved
    // matrix
    i(65536),
    i(0),
    i(0),
    i(0),
    i(65536),
    i(0),
    i(0),
    i(0),
    i(1073741824),
    i(a << 16),
    // width (16.16 fixed point)
    i(s << 16)
    // height (16.16 fixed point)
  ), _ = m("trak", W, ae), B = o(
    "mvhd",
    0,
    0,
    i(0),
    // creation time
    i(0),
    // modification time
    i(9e4),
    i(X),
    i(65536),
    // rate (1.0)
    c(256),
    // volume (1.0)
    new Uint8Array(10),
    // reserved
    // matrix
    i(65536),
    i(0),
    i(0),
    i(0),
    i(65536),
    i(0),
    i(0),
    i(0),
    i(1073741824),
    new Uint8Array(24),
    // pre-defined
    i(2)
    // next track id
  ), $ = m("moov", B, _), Y = u.length + $.length, I = new Uint8Array($);
  for (let D = 0; D < I.length - 16; D++)
    if (I[D] === 115 && I[D + 1] === 116 && I[D + 2] === 99 && I[D + 3] === 111) {
      const F = Y + 8;
      I[D + 12] = F >> 24 & 255, I[D + 13] = F >> 16 & 255, I[D + 14] = F >> 8 & 255, I[D + 15] = F & 255;
      break;
    }
  const J = i(w), E = new Uint8Array(u.length + I.length + w);
  let K = 0;
  E.set(u, K), K += u.length, E.set(I, K), K += I.length, E.set(J, K), E.set(d("mdat"), K + 4), K += 8;
  for (const D of t)
    E.set(D.data, K), K += D.data.length;
  return E;
}
function ns(t, e = 1024) {
  if (t === 0) return "0B";
  const a = [t, t / e, t / e / e].reverse(), s = ["B", "KB", "MB"].reverse(), n = a.findIndex((r) => r >= 1);
  return new Intl.NumberFormat("en-us", { useGrouping: !0, maximumFractionDigits: 1 }).format(a[n]) + s[n];
}
function is(t) {
  const e = t.strings, a = new q();
  a.setClass("menu");
  const s = new q();
  s.setClass("title"), s.setTextContent(e.getKey("menubar/help")), a.add(s);
  const n = new q();
  n.setClass("options"), a.add(n);
  let r = new S();
  return r.setClass("option"), r.setTextContent(e.getKey("menubar/help/source_code")), r.onClick(function() {
    window.open("https://github.com/mrdoob/three.js/tree/master/editor", "_blank");
  }), n.add(r), r = new S(), r.setClass("option"), r.setTextContent(e.getKey("menubar/help/about")), r.onClick(function() {
    window.open("https://threejs.org", "_blank");
  }), n.add(r), r = new S(), r.setClass("option"), r.setTextContent(e.getKey("menubar/help/manual")), r.onClick(function() {
    window.open("https://github.com/mrdoob/three.js/wiki/Editor-Manual", "_blank");
  }), n.add(r), a;
}
const tt = /* @__PURE__ */ new Map();
class yt extends Pe {
  constructor(e) {
    super();
    const a = this, s = document.createElement("form"), n = document.createElement("input");
    n.type = "file", n.addEventListener("change", function(i) {
      l(i.target.files[0]);
    }), s.appendChild(n);
    const r = document.createElement("canvas");
    r.width = 32, r.height = 16, r.style.cursor = "pointer", r.style.marginRight = "5px", r.style.border = "1px solid #888", r.addEventListener("click", function() {
      n.click();
    }), r.addEventListener("drop", function(i) {
      i.preventDefault(), i.stopPropagation(), l(i.dataTransfer.files[0]);
    }), this.dom.appendChild(r);
    async function l(i) {
      const c = i.name.split(".").pop().toLowerCase(), d = new FileReader(), p = `${i.lastModified}_${i.size}_${i.name}`;
      function m(o) {
        tt.has(p) || tt.set(p, o);
        const u = tt.get(p), g = u.clone();
        g.sourceFile = u.sourceFile, a.setValue(g), a.onChangeCallback && a.onChangeCallback(g);
      }
      tt.has(p) ? m(tt.get(p)) : c === "hdr" || c === "pic" ? (d.addEventListener("load", async function(o) {
        const { HDRLoader: u } = await import("three/addons/loaders/HDRLoader.js");
        new u().load(o.target.result, function(b) {
          b.sourceFile = i.name, m(b);
        });
      }), d.readAsDataURL(i)) : c === "tga" ? (d.addEventListener("load", async function(o) {
        const { TGALoader: u } = await import("three/addons/loaders/TGALoader.js");
        new u().load(o.target.result, function(b) {
          b.colorSpace = h.SRGBColorSpace, b.sourceFile = i.name, m(b);
        });
      }, !1), d.readAsDataURL(i)) : c === "ktx2" ? (d.addEventListener("load", async function(o) {
        const { KTX2Loader: u } = await import("three/addons/loaders/KTX2Loader.js"), g = o.target.result, b = URL.createObjectURL(new Blob([g])), w = new u();
        w.setTranscoderPath("../../examples/jsm/libs/basis/"), e.signals.rendererDetectKTX2Support.dispatch(w), w.load(b, function(f) {
          f.colorSpace = h.SRGBColorSpace, f.sourceFile = i.name, f.needsUpdate = !0, m(f), w.dispose();
        });
      }), d.readAsArrayBuffer(i)) : c === "exr" ? (d.addEventListener("load", async function(o) {
        const { EXRLoader: u } = await import("three/addons/loaders/EXRLoader.js"), g = o.target.result, b = URL.createObjectURL(new Blob([g]));
        new u().load(b, function(f) {
          f.sourceFile = i.name, f.needsUpdate = !0, m(f);
        });
      }), d.readAsArrayBuffer(i)) : i.type.match("image.*") && (d.addEventListener("load", function(o) {
        const u = document.createElement("img");
        u.addEventListener("load", function() {
          const g = new h.Texture(this);
          g.sourceFile = i.name, g.needsUpdate = !0, m(g);
        }, !1), u.src = o.target.result;
      }, !1), d.readAsDataURL(i)), s.reset();
    }
    this.texture = null, this.onChangeCallback = null;
  }
  getValue() {
    return this.texture;
  }
  setValue(e) {
    const a = this.dom.children[0], s = a.getContext("2d");
    if (s && s.clearRect(0, 0, a.width, a.height), e !== null) {
      const n = e.image;
      if (n != null && n.width > 0) {
        a.title = e.sourceFile;
        const r = a.width / n.width;
        if (e.isDataTexture || e.isCompressedTexture) {
          const l = la(e);
          s.drawImage(l, 0, 0, n.width * r, n.height * r);
        } else
          s.drawImage(n, 0, 0, n.width * r, n.height * r);
      } else
        a.title = e.sourceFile + " (error)";
    } else
      a.title = "empty";
    this.texture = e;
  }
  setColorSpace(e) {
    const a = this.getValue();
    return a !== null && (a.colorSpace = e), this;
  }
  onChange(e) {
    return this.onChangeCallback = e, this;
  }
}
class oa extends oe {
  constructor(e) {
    super(), this.dom.className = "Outliner", this.dom.tabIndex = 0;
    const a = this;
    this.scene = e.scene, this.dom.addEventListener("keydown", function(s) {
      switch (s.code) {
        case "ArrowUp":
        case "ArrowDown":
          s.preventDefault(), s.stopPropagation();
          break;
      }
    }), this.dom.addEventListener("keyup", function(s) {
      switch (s.code) {
        case "ArrowUp":
          a.selectIndex(a.selectedIndex - 1);
          break;
        case "ArrowDown":
          a.selectIndex(a.selectedIndex + 1);
          break;
      }
    }), this.editor = e, this.options = [], this.selectedIndex = -1, this.selectedValue = null;
  }
  selectIndex(e) {
    if (e >= 0 && e < this.options.length) {
      this.setValue(this.options[e].value);
      const a = new Event("change", { bubbles: !0, cancelable: !0 });
      this.dom.dispatchEvent(a);
    }
  }
  setOptions(e) {
    const a = this;
    for (; a.dom.children.length > 0; )
      a.dom.removeChild(a.dom.firstChild);
    function s() {
      a.setValue(this.value);
      const m = new Event("change", { bubbles: !0, cancelable: !0 });
      a.dom.dispatchEvent(m);
    }
    let n;
    function r() {
      n = this;
    }
    function l(m) {
      m.dataTransfer.setData("text", "foo");
    }
    function i(m) {
      if (this === n) return;
      const o = m.offsetY / this.clientHeight;
      o < 0.25 ? this.className = "option dragTop" : o > 0.75 ? this.className = "option dragBottom" : this.className = "option drag";
    }
    function c() {
      this !== n && (this.className = "option");
    }
    function d(m) {
      if (this === n || n === void 0) return;
      this.className = "option";
      const o = a.scene, u = o.getObjectById(n.value), g = m.offsetY / this.clientHeight;
      if (g < 0.25) {
        const b = o.getObjectById(this.value);
        p(u, b.parent, b);
      } else if (g > 0.75) {
        let b, w;
        this.nextSibling !== null ? (b = o.getObjectById(this.nextSibling.value), w = b.parent) : (b = null, w = o.getObjectById(this.value).parent), p(u, w, b);
      } else {
        const b = o.getObjectById(this.value);
        p(u, b);
      }
    }
    function p(m, o, u) {
      u === null && (u = void 0);
      let g = !1;
      if (m.traverse(function(f) {
        f === o && (g = !0);
      }), g) return;
      const b = a.editor;
      b.execute(new Yt(b, m, o, u));
      const w = new Event("change", { bubbles: !0, cancelable: !0 });
      a.dom.dispatchEvent(w);
    }
    a.options = [];
    for (let m = 0; m < e.length; m++) {
      const o = e[m];
      o.className = "option", a.dom.appendChild(o), a.options.push(o), o.addEventListener("click", s), o.draggable === !0 && (o.addEventListener("drag", r), o.addEventListener("dragstart", l), o.addEventListener("dragover", i), o.addEventListener("dragleave", c), o.addEventListener("drop", d));
    }
    return a;
  }
  getValue() {
    return this.selectedValue;
  }
  setValue(e) {
    for (let a = 0; a < this.options.length; a++) {
      const s = this.options[a];
      if (s.value === e) {
        s.classList.add("active");
        const n = s.offsetTop - this.dom.offsetTop, l = n + s.offsetHeight - this.dom.offsetHeight;
        this.dom.scrollTop > n ? this.dom.scrollTop = n : this.dom.scrollTop < l && (this.dom.scrollTop = l), this.selectedIndex = a;
      } else
        s.classList.remove("active");
    }
    return this.selectedValue = e, this;
  }
}
class da extends Pe {
  constructor() {
    super(), this.dom.style.display = "inline-block", this.pointsList = new oe(), this.add(this.pointsList), this.pointsUI = [], this.lastPointIdx = 0, this.onChangeCallback = null, this.update = () => {
      this.onChangeCallback !== null && this.onChangeCallback();
    };
  }
  onChange(e) {
    return this.onChangeCallback = e, this;
  }
  clear() {
    for (let e = this.pointsUI.length - 1; e >= 0; --e)
      this.deletePointRow(e, !1);
    this.lastPointIdx = 0;
  }
  deletePointRow(e, a = !0) {
    this.pointsUI[e] && (this.pointsList.remove(this.pointsUI[e].row), this.pointsUI.splice(e, 1), a === !0 && this.update(), this.lastPointIdx--);
  }
}
class dr extends da {
  constructor() {
    super();
    const e = new S();
    this.add(e);
    const a = new te("+");
    a.onClick(() => {
      if (this.pointsUI.length === 0)
        this.pointsList.add(this.createPointRow(0, 0));
      else {
        const s = this.pointsUI[this.pointsUI.length - 1];
        this.pointsList.add(this.createPointRow(s.x.getValue(), s.y.getValue()));
      }
      this.update();
    }), e.add(a);
  }
  getValue() {
    const e = [];
    let a = 0;
    for (let s = 0; s < this.pointsUI.length; s++) {
      const n = this.pointsUI[s];
      n && (e.push(new h.Vector2(n.x.getValue(), n.y.getValue())), ++a, n.lbl.setValue(a));
    }
    return e;
  }
  setValue(e, a = !0) {
    this.clear();
    for (let s = 0; s < e.length; s++) {
      const n = e[s];
      this.pointsList.add(this.createPointRow(n.x, n.y));
    }
    return a === !0 && this.update(), this;
  }
  createPointRow(e, a) {
    const s = new oe(), n = new k(this.lastPointIdx + 1).setWidth("20px"), r = new G(e).setWidth("30px").onChange(this.update), l = new G(a).setWidth("30px").onChange(this.update), i = this, c = new te("-").onClick(function() {
      if (i.isEditing) return;
      const d = i.pointsList.getIndexOfChild(s);
      i.deletePointRow(d);
    });
    return this.pointsUI.push({ row: s, lbl: n, x: r, y: l }), ++this.lastPointIdx, s.add(n, r, l, c), s;
  }
}
class lr extends da {
  constructor() {
    super();
    const e = new S();
    this.add(e);
    const a = new te("+");
    a.onClick(() => {
      if (this.pointsUI.length === 0)
        this.pointsList.add(this.createPointRow(0, 0, 0));
      else {
        const s = this.pointsUI[this.pointsUI.length - 1];
        this.pointsList.add(this.createPointRow(s.x.getValue(), s.y.getValue(), s.z.getValue()));
      }
      this.update();
    }), e.add(a);
  }
  getValue() {
    const e = [];
    let a = 0;
    for (let s = 0; s < this.pointsUI.length; s++) {
      const n = this.pointsUI[s];
      n && (e.push(new h.Vector3(n.x.getValue(), n.y.getValue(), n.z.getValue())), ++a, n.lbl.setValue(a));
    }
    return e;
  }
  setValue(e, a = !0) {
    this.clear();
    for (let s = 0; s < e.length; s++) {
      const n = e[s];
      this.pointsList.add(this.createPointRow(n.x, n.y, n.z));
    }
    return a === !0 && this.update(), this;
  }
  createPointRow(e, a, s) {
    const n = new oe(), r = new k(this.lastPointIdx + 1).setWidth("20px"), l = new G(e).setWidth("30px").onChange(this.update), i = new G(a).setWidth("30px").onChange(this.update), c = new G(s).setWidth("30px").onChange(this.update), d = this, p = new te("-").onClick(function() {
      if (d.isEditing) return;
      const m = d.pointsList.getIndexOfChild(n);
      d.deletePointRow(m);
    });
    return this.pointsUI.push({ row: n, lbl: r, x: l, y: i, z: c }), ++this.lastPointIdx, n.add(r, l, i, c, p), n;
  }
}
class We extends Pe {
  constructor(e, a) {
    super(), this.setMarginRight("4px"), this.checkbox = new Ne(e), this.text = new k(a).setMarginLeft("3px"), this.add(this.checkbox), this.add(this.text);
  }
  getValue() {
    return this.checkbox.getValue();
  }
  setValue(e) {
    return this.checkbox.setValue(e);
  }
}
let at, gt;
function la(t) {
  at === void 0 && (at = new h.WebGLRenderer()), gt === void 0 && (gt = new Sa(new h.MeshBasicMaterial()));
  const e = t.image;
  return at.setSize(e.width, e.height, !1), gt.material.map = t, gt.render(at), at.domElement;
}
function os(t) {
  const e = t.strings, a = new q();
  a.setClass("menu right");
  const s = new We(t.config.getKey("autosave"), e.getKey("menubar/status/autosave"));
  s.text.setColor("#888"), s.onChange(function() {
    const r = this.getValue();
    t.config.setKey("autosave", r), r === !0 && t.signals.sceneGraphChanged.dispatch();
  }), a.add(s), t.signals.savingStarted.add(function() {
    s.text.setTextDecoration("underline");
  }), t.signals.savingFinished.add(function() {
    s.text.setTextDecoration("none");
  });
  const n = new k("r" + h.REVISION);
  return n.setClass("title"), n.setOpacity(0.5), a.add(n), a;
}
function cr(t) {
  const e = new q();
  return e.setId("menubar"), e.add(new Qa(t)), e.add(new Za(t)), e.add(new Ya(t)), e.add(new es(t)), e.add(new ts(t)), e.add(new is(t)), e.add(new os(t)), e;
}
function mr(t) {
  const e = t.signals, a = new q();
  a.setId("player"), a.setPosition("absolute"), a.setDisplay("none");
  const s = new ia.Player();
  return a.dom.appendChild(s.dom), window.addEventListener("resize", function() {
    s.setSize(a.dom.clientWidth, a.dom.clientHeight);
  }), e.windowResize.add(function() {
    s.setSize(a.dom.clientWidth, a.dom.clientHeight);
  }), e.startPlayer.add(async function() {
    a.setDisplay(""), await s.load(t.toJSON()), s.setSize(a.dom.clientWidth, a.dom.clientHeight), s.play();
  }), e.stopPlayer.add(function() {
    a.setDisplay("none"), s.stop(), s.dispose();
  }), a;
}
function ur(t) {
  const e = t.signals, a = document.createElement("div");
  a.id = "resizer";
  function s(l) {
    l.isPrimary !== !1 && (a.ownerDocument.addEventListener("pointermove", r), a.ownerDocument.addEventListener("pointerup", n));
  }
  function n(l) {
    l.isPrimary !== !1 && (a.ownerDocument.removeEventListener("pointermove", r), a.ownerDocument.removeEventListener("pointerup", n));
  }
  function r(l) {
    if (l.isPrimary === !1) return;
    const i = document.body.offsetWidth, c = l.clientX, d = c < 0 ? 0 : c > i ? i : c, p = Math.max(335, i - d);
    a.style.right = p + "px", document.getElementById("sidebar").style.width = p + "px", document.getElementById("player").style.right = p + "px", document.getElementById("script").style.right = p + "px", document.getElementById("viewport").style.right = p + "px", document.getElementById("animation").style.right = p + "px", document.getElementById("animation-resizer").style.right = p + "px";
    const m = document.getElementById("toolbar"), o = i - p;
    m.style.left = o / 2 + "px", e.windowResize.dispatch();
  }
  return a.addEventListener("pointerdown", s), new ge(a);
}
function Be(t, e) {
  if (!t) return null;
  let a = t.trim();
  a = a.replace(/^\{/, "").replace(/\}$/, "").trim(), a.includes("|") && (a = a.split("|")[0].trim()), a = a.replace(/^[?!]/, "").replace(/^\.\.\./, "").trim();
  let s = a.match(/^Array\.?<(.+)>$/);
  if (s || (s = a.match(/^(.+)\[\]$/), s)) return "[" + (Be(s[1], e) || "?") + "]";
  switch (a) {
    case "number":
    case "string":
    case "boolean":
      return a;
    case "function":
    case "Function":
      return "fn()";
    case "*":
    case "any":
    case "Object":
    case "object":
    case "undefined":
    case "null":
    case "void":
      return "?";
  }
  return e.has(a) ? "+THREE." + a : "?";
}
function ds(t) {
  const e = [];
  let a = null, s = null, n = !1;
  const r = [];
  for (let c of t) {
    const d = c.replace(/^\s*\*?\s?/, ""), p = d.match(/^@param\s+(\{[^}]*\})?\s*\[?([\w.]+)/);
    if (p) {
      e.push({ type: p[1] || null, name: p[2].split(".")[0] });
      continue;
    }
    const m = d.match(/^@returns?\s+(\{[^}]*\})/);
    if (m) {
      a = m[1];
      continue;
    }
    const o = d.match(/^@type\s+(\{[^}]*\})/);
    if (o) {
      s = o[1];
      continue;
    }
    if (/^@readonly/.test(d)) {
      n = !0;
      continue;
    }
    /^@/.test(d) || d.trim() && r.push(d.trim());
  }
  const l = /* @__PURE__ */ new Set(), i = [];
  for (const c of e) l.has(c.name) || (l.add(c.name), i.push(c));
  return { params: i, returns: a, atType: s, readonly: n, doc: r.join(" ") };
}
function Wt(t, e) {
  let s = "fn(" + t.params.map((r) => r.name + ": " + (Be(r.type, e) || "?")).join(", ") + ")";
  const n = Be(t.returns, e);
  return n && (s += " -> " + n), s;
}
function ht(t, e) {
  const a = { "!type": t };
  return e.doc && (a["!doc"] = e.doc), a;
}
function ls(t) {
  const e = t.split(`
`), a = /* @__PURE__ */ new Set();
  for (const i of e) {
    const c = i.match(/^class\s+(\w+)/);
    c && a.add(c[1]);
  }
  const s = {};
  let n = null, r = null, l = null;
  for (let i = 0; i < e.length; i++) {
    const c = e[i], d = c.trim();
    if (d.startsWith("/**")) {
      const o = [];
      if (!d.endsWith("*/"))
        for (i++; i < e.length && !e[i].trim().endsWith("*/"); i++)
          o.push(e[i]);
      l = ds(o);
      continue;
    }
    const p = c.match(/^class\s+(\w+)(?:\s+extends\s+(\w+))?/);
    if (p) {
      r = p[1], n = s[r] || (s[r] = {}), n["!type"] = "fn()", n.prototype = n.prototype || {}, p[2] && a.has(p[2]) && (n.prototype["!proto"] = "THREE." + p[2] + ".prototype"), l && l.doc && (n["!doc"] = l.doc), l = null;
      continue;
    }
    if (c === "}") {
      n = null, r = null, l = null;
      continue;
    }
    if (!n || !l) {
      if (d === "") continue;
      l = null;
      continue;
    }
    let m = c.match(/^\t\tthis\.(\w+)\s*=/);
    if (m) {
      const o = Be(l.atType, a) || "?";
      n.prototype[m[1]] = ht(o, l), l = null;
      continue;
    }
    if (m = c.match(/^\tstatic\s+(\w+)\s*\(/), m) {
      n[m[1]] = ht(Wt(l, a), l), l = null;
      continue;
    }
    if (m = c.match(/^\t(?:get|set)\s+(\w+)\s*\(/), m) {
      const o = Be(l.atType || l.returns, a) || "?";
      n.prototype[m[1]] || (n.prototype[m[1]] = ht(o, l)), l = null;
      continue;
    }
    if (/^\tconstructor\s*\(/.test(c)) {
      n["!type"] = "fn(" + l.params.map((o) => o.name + ": " + (Be(o.type, a) || "?")).join(", ") + ")", l = null;
      continue;
    }
    if (m = c.match(/^\t(?:async\s+)?(\w+)\s*\(/), m) {
      n.prototype[m[1]] = ht(Wt(l, a), l), l = null;
      continue;
    }
    l = null;
  }
  return { "!name": "threejs", THREE: s };
}
function pr(t) {
  const e = t.signals, a = t.strings, s = new q();
  s.setId("script"), s.setPosition("absolute"), s.setBackgroundColor("#272822"), s.setDisplay("none");
  const n = new q();
  n.setPadding("10px"), s.add(n);
  const r = new k().setColor("#fff");
  n.add(r);
  const l = function() {
    const y = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    y.setAttribute("width", 32), y.setAttribute("height", 32);
    const j = document.createElementNS("http://www.w3.org/2000/svg", "path");
    return j.setAttribute("d", "M 12,12 L 22,22 M 22,12 12,22"), j.setAttribute("stroke", "#fff"), y.appendChild(j), y;
  }(), i = new ge(l);
  i.setPosition("absolute"), i.setTop("3px"), i.setRight("1px"), i.setCursor("pointer"), i.onClick(function() {
    s.setDisplay("none");
  }), n.add(i);
  let c;
  e.rendererCreated.add(function(y) {
    c = y;
  });
  let d, p, m, o;
  const u = CodeMirror(s.dom, {
    value: "",
    lineNumbers: !0,
    matchBrackets: !0,
    indentWithTabs: !0,
    tabSize: 4,
    indentUnit: 4,
    hintOptions: {
      completeSingle: !1
    }
  });
  u.setOption("theme", "monokai"), u.on("change", function() {
    u.state.focused !== !1 && (clearTimeout(d), d = setTimeout(function() {
      const y = u.getValue();
      if (!f(y)) return;
      if (typeof m == "object") {
        y !== m.source && t.execute(new Et(t, o, m, "source", y));
        return;
      }
      if (m !== "programInfo") return;
      const j = JSON.parse(y);
      if (JSON.stringify(o.material.defines) !== JSON.stringify(j.defines)) {
        const R = new Ve(t, o, "defines", j.defines);
        R.updatable = !1, t.execute(R);
      }
      if (JSON.stringify(o.material.uniforms) !== JSON.stringify(j.uniforms)) {
        const R = new Ve(t, o, "uniforms", j.uniforms);
        R.updatable = !1, t.execute(R);
      }
      if (JSON.stringify(o.material.attributes) !== JSON.stringify(j.attributes)) {
        const R = new Ve(t, o, "attributes", j.attributes);
        R.updatable = !1, t.execute(R);
      }
    }, 300));
  }), u.getWrapperElement().addEventListener("keydown", function(y) {
    y.stopPropagation();
  });
  const b = [], w = [], f = function(y) {
    let j, R = [];
    return u.operation(function() {
      for (; b.length > 0; )
        u.removeLineClass(b.shift(), "background", "errorLine");
      for (; w.length > 0; )
        u.removeLineWidget(w.shift());
      switch (p) {
        case "javascript":
          try {
            R = esprima.parse(y, { tolerant: !0 }).errors;
          } catch (x) {
            R.push({
              lineNumber: x.lineNumber - 1,
              message: x.message
            });
          }
          for (let x = 0; x < R.length; x++) {
            const T = R[x];
            T.message = T.message.replace(/Line [0-9]+: /, "");
          }
          break;
        case "json":
          R = [], jsonlint.parseError = function(x, T) {
            x = x.split(`
`)[3], R.push({
              lineNumber: T.loc.first_line - 1,
              message: x
            });
          };
          try {
            jsonlint.parse(y);
          } catch {
          }
          break;
        case "glsl":
          o.material[m] = y, o.material.needsUpdate = !0, e.materialChanged.dispatch(o, 0);
          const A = c.info.programs;
          j = !0;
          const P = /^(?:ERROR|WARNING): \d+:(\d+): (.*)/g;
          for (let x = 0, T = A.length; x !== T; ++x) {
            const N = A[x].diagnostics;
            if (N === void 0 || N.material !== o.material) continue;
            N.runnable || (j = !1);
            const ee = N[m], re = ee.prefix.split(/\r\n|\r|\n/).length;
            for (; ; ) {
              const X = P.exec(ee.log);
              if (X === null) break;
              R.push({
                lineNumber: X[1] - re,
                message: X[2]
              });
            }
            break;
          }
      }
      for (let A = 0; A < R.length; A++) {
        const P = R[A], x = document.createElement("div");
        x.className = "esprima-error", x.textContent = P.message;
        const T = Math.max(P.lineNumber, 0);
        b.push(T), u.addLineClass(T, "background", "errorLine");
        const N = u.addLineWidget(T, x);
        w.push(N);
      }
      return j !== void 0 ? j : R.length === 0;
    });
  }, C = new CodeMirror.TernServer({
    caseInsensitive: !0
  });
  let O = !1;
  async function L() {
    if (!O) {
      O = !0;
      try {
        const y = new URL("../build/three.core.js", document.baseURI).href, j = await (await fetch(y)).text();
        C.server.defs.push(ls(j)), C.server.reset();
      } catch (y) {
        console.warn("Script: Failed to build three.js autocomplete defs.", y);
      }
    }
  }
  u.setOption("extraKeys", {
    "Ctrl-Space": function(y) {
      C.complete(y);
    },
    "Ctrl-I": function(y) {
      C.showType(y);
    },
    "Ctrl-O": function(y) {
      C.showDocs(y);
    },
    "Alt-.": function(y) {
      C.jumpToDef(y);
    },
    "Alt-,": function(y) {
      C.jumpBack(y);
    },
    "Ctrl-Q": function(y) {
      C.rename(y);
    },
    "Ctrl-.": function(y) {
      C.selectName(y);
    }
  }), u.on("cursorActivity", function(y) {
    p === "javascript" && C.updateArgHints(y);
  }), u.on("keypress", function(y, j) {
    p === "javascript" && /[\w\.]/.exec(j.key) && C.complete(y);
  }), e.editorCleared.add(function() {
    s.setDisplay("none");
  });
  function M(y, j) {
    if (typeof j == "object")
      r.setValue(y.name + " / " + j.name);
    else
      switch (j) {
        case "vertexShader":
          r.setValue(y.material.name + " / " + a.getKey("script/title/vertexShader"));
          break;
        case "fragmentShader":
          r.setValue(y.material.name + " / " + a.getKey("script/title/fragmentShader"));
          break;
        case "programInfo":
          r.setValue(y.material.name + " / " + a.getKey("script/title/programInfo"));
          break;
        default:
          throw new Error("setTitle: Unknown script");
      }
  }
  return e.editScript.add(function(y, j) {
    let R, A;
    if (typeof j == "object")
      R = "javascript", A = j.source;
    else
      switch (j) {
        case "vertexShader":
          R = "glsl", A = y.material.vertexShader || "";
          break;
        case "fragmentShader":
          R = "glsl", A = y.material.fragmentShader || "";
          break;
        case "programInfo":
          R = "json";
          const P = {
            defines: y.material.defines,
            uniforms: y.material.uniforms,
            attributes: y.material.attributes
          };
          A = JSON.stringify(P, null, "	");
          break;
        default:
          throw new Error("editScript: Unknown script");
      }
    M(y, j), p = R, m = j, o = y, R === "javascript" && L(), s.setDisplay(""), u.setValue(A), u.clearHistory(), R === "json" && (R = { name: "javascript", json: !0 }), u.setOption("mode", R);
  }), e.scriptRemoved.add(function(y) {
    m === y && s.setDisplay("none");
  }), e.objectChanged.add(function(y) {
    y === o && (["programInfo", "vertexShader", "fragmentShader"].includes(m) || M(o, m));
  }), e.scriptChanged.add(function(y) {
    y === m && M(o, m);
  }), e.materialChanged.add(function(y) {
    y === o && M(o, m);
  }), s;
}
function cs(t) {
  const e = t.signals, a = t.strings, s = new q();
  s.setBorderTop("0"), s.setPaddingTop("20px");
  const n = /* @__PURE__ */ new WeakMap();
  function r(E, K) {
    const D = document.createElement("div");
    if (D.draggable = K, D.innerHTML = d(E), D.value = E.id, n.has(E)) {
      const F = n.get(E), V = document.createElement("span");
      V.classList.add("opener"), E.children.length > 0 && V.classList.add(F ? "open" : "closed"), V.addEventListener("click", function() {
        n.set(E, n.get(E) === !1), I();
      }), D.insertBefore(V, D.firstChild);
    }
    return D;
  }
  function l(E) {
    if (Array.isArray(E)) {
      const K = [];
      for (let D = 0; D < E.length; D++)
        K.push(E[D].name);
      return K.join(",");
    }
    return E.name;
  }
  function i(E) {
    return E.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function c(E) {
    return E.isScene ? "Scene" : E.isCamera ? "Camera" : E.isLight ? "Light" : E.isMesh ? "Mesh" : E.isLine ? "Line" : E.isPoints ? "Points" : "Object3D";
  }
  function d(E) {
    let K = `<span class="type ${c(E)}"></span> ${i(E.name)}`;
    if (E.isMesh) {
      const D = E.geometry, F = E.material;
      K += ` <span class="type Geometry"></span> ${i(D.name)}`, K += ` <span class="type Material"></span> ${i(l(F))}`;
    }
    return K += p(E.uuid), K;
  }
  function p(E) {
    return t.scripts[E] === void 0 || t.scripts[E].length === 0 ? "" : ' <span class="type Script"></span>';
  }
  let m = !1;
  const o = new oa(t);
  o.setId("outliner"), o.onChange(function() {
    m = !0, t.selectById(parseInt(o.getValue())), m = !1;
  }), o.onDblClick(function() {
    t.focusById(parseInt(o.getValue()));
  }), s.add(o), s.add(new Se());
  const u = new S(), g = new pe().setOptions({
    Default: "Default",
    Color: "Color",
    Texture: "Texture",
    Equirectangular: "Equirect"
  }).setWidth("150px");
  g.setValue("Default"), g.onChange(function() {
    R(), A();
  }), u.add(new k(a.getKey("sidebar/scene/background")).setClass("Label")), u.add(g);
  const b = new ot().setValue("#000000").setMarginLeft("8px").onInput(R);
  u.add(b);
  const w = new yt(t).setMarginLeft("8px").onChange(R);
  w.setDisplay("none"), u.add(w);
  const f = new yt(t).setMarginLeft("8px").onChange(R);
  f.setDisplay("none"), u.add(f);
  const C = new S();
  C.setDisplay("none"), C.setMarginLeft("120px");
  const O = new pe().setOptions({
    [h.NoColorSpace]: "No Color Space",
    [h.LinearSRGBColorSpace]: "srgb-linear",
    [h.SRGBColorSpace]: "srgb"
  }).setWidth("150px");
  O.setValue(h.NoColorSpace), O.onChange(R), C.add(O), s.add(u), s.add(C);
  const L = new S();
  L.setDisplay("none"), L.setMarginLeft("120px");
  const M = new G(0).setWidth("40px").setRange(0, 1).onChange(R);
  L.add(M);
  const y = new G(1).setWidth("40px").setRange(0, 1 / 0).onChange(R);
  L.add(y);
  const j = new G(0).setWidth("40px").setRange(-180, 180).setStep(10).setNudge(0.1).setUnit("°").onChange(R);
  L.add(j), s.add(L);
  function R() {
    e.sceneBackgroundChanged.dispatch(
      g.getValue(),
      b.getHexValue(),
      w.getValue(),
      f.getValue(),
      O.getValue(),
      M.getValue(),
      y.getValue(),
      j.getValue()
    );
  }
  function A() {
    const E = g.getValue();
    g.setWidth(E === "Default" ? "150px" : "110px"), b.setDisplay(E === "Color" ? "" : "none"), w.setDisplay(E === "Texture" ? "" : "none"), f.setDisplay(E === "Equirectangular" ? "" : "none"), L.setDisplay(E === "Equirectangular" ? "" : "none"), E === "Texture" || E === "Equirectangular" ? C.setDisplay("") : C.setDisplay("none");
  }
  const P = new S(), x = new pe().setOptions({
    Default: "Default",
    Equirectangular: "Equirect",
    None: "None"
  }).setWidth("150px");
  x.setValue("Default"), x.onChange(function() {
    N(), ee();
  }), P.add(new k(a.getKey("sidebar/scene/environment")).setClass("Label")), P.add(x);
  const T = new yt(t).setMarginLeft("8px").onChange(N);
  T.setDisplay("none"), P.add(T), s.add(P);
  function N() {
    e.sceneEnvironmentChanged.dispatch(
      x.getValue(),
      T.getValue()
    );
  }
  function ee() {
    const E = x.getValue();
    x.setWidth(E !== "Equirectangular" ? "150px" : "110px"), T.setDisplay(E === "Equirectangular" ? "" : "none");
  }
  function re() {
    e.sceneFogChanged.dispatch(
      ae.getValue(),
      _.getHexValue(),
      B.getValue(),
      $.getValue(),
      Y.getValue()
    );
  }
  function X() {
    e.sceneFogSettingsChanged.dispatch(
      ae.getValue(),
      _.getHexValue(),
      B.getValue(),
      $.getValue(),
      Y.getValue()
    );
  }
  const Z = new S(), ae = new pe().setOptions({
    None: "None",
    Fog: "Linear",
    FogExp2: "Exponential"
  }).setWidth("150px");
  ae.onChange(function() {
    re(), J();
  }), Z.add(new k(a.getKey("sidebar/scene/fog")).setClass("Label")), Z.add(ae), s.add(Z);
  const W = new S();
  W.setDisplay("none"), W.setMarginLeft("120px"), s.add(W);
  const _ = new ot().setValue("#aaaaaa");
  _.onInput(X), W.add(_);
  const B = new G(0.1).setWidth("40px").setRange(0, 1 / 0).onChange(X);
  W.add(B);
  const $ = new G(50).setWidth("40px").setRange(0, 1 / 0).onChange(X);
  W.add($);
  const Y = new G(0.05).setWidth("40px").setRange(0, 0.1).setStep(1e-3).setPrecision(3).onChange(X);
  W.add(Y);
  function I() {
    const E = t.camera, K = t.scene, D = [];
    switch (D.push(r(E, !1)), D.push(r(K, !1)), function F(V, U) {
      for (let z = 0, Q = V.length; z < Q; z++) {
        const ie = V[z];
        n.has(ie) === !1 && n.set(ie, !1);
        const Ce = r(ie, !0);
        Ce.style.paddingLeft = U * 18 + "px", D.push(Ce), n.get(ie) === !0 && F(ie.children, U + 1);
      }
    }(K.children, 0), o.setOptions(D), t.selected !== null && o.setValue(t.selected.id), g.setValue(t.backgroundType), t.backgroundType) {
      case "Color":
        b.setHexValue(K.background.getHex());
        break;
      case "Texture":
        w.setValue(K.background), O.setValue(K.background.colorSpace);
        break;
      case "Equirectangular":
        f.setValue(K.background), M.setValue(K.backgroundBlurriness), y.setValue(K.backgroundIntensity), O.setValue(K.background.colorSpace);
        break;
      default:
        w.setValue(null), f.setValue(null), O.setValue(h.NoColorSpace);
    }
    x.setValue(t.environmentType), t.environmentType === "Equirectangular" ? T.setValue(K.environment) : T.setValue(null), K.fog ? (_.setHexValue(K.fog.color.getHex()), K.fog.isFog ? (ae.setValue("Fog"), B.setValue(K.fog.near), $.setValue(K.fog.far)) : K.fog.isFogExp2 && (ae.setValue("FogExp2"), Y.setValue(K.fog.density))) : ae.setValue("None"), A(), ee(), J();
  }
  function J() {
    const E = ae.getValue();
    W.setDisplay(E === "None" ? "none" : ""), B.setDisplay(E === "Fog" ? "" : "none"), $.setDisplay(E === "Fog" ? "" : "none"), Y.setDisplay(E === "FogExp2" ? "" : "none");
  }
  return I(), e.editorCleared.add(I), e.sceneGraphChanged.add(I), e.cameraResetted.add(I), e.objectChanged.add(function(E) {
    const K = o.options;
    for (let D = 0; D < K.length; D++) {
      const F = K[D];
      if (F.value === E.id) {
        const V = F.querySelector(":scope > .opener");
        F.innerHTML = d(E), V !== null && F.insertBefore(V, F.firstChild);
        return;
      }
    }
  }), e.scriptAdded.add(function() {
    t.selected !== null && e.objectChanged.dispatch(t.selected);
  }), e.scriptRemoved.add(function() {
    t.selected !== null && e.objectChanged.dispatch(t.selected);
  }), e.objectSelected.add(function(E) {
    if (m !== !0)
      if (E !== null && E.parent !== null) {
        let K = !1, D = E.parent;
        for (; D !== t.scene; )
          n.get(D) !== !0 && (n.set(D, !0), K = !0), D = D.parent;
        K && I(), o.setValue(E.id);
      } else
        o.setValue(null);
  }), e.sceneBackgroundChanged.add(function() {
    x.getValue() === "Background" && (N(), ee());
  }), s;
}
function ms(t) {
  const e = t.strings, a = t.signals, s = new q();
  s.setBorderTop("0"), s.setPaddingTop("20px"), s.setDisplay("none");
  const n = new S(), r = new k();
  n.add(new k(e.getKey("sidebar/object/type")).setClass("Label")), n.add(r), s.add(n);
  const l = new S(), i = new Ee().setWidth("102px").setFontSize("12px").setDisabled(!0), c = new te(e.getKey("sidebar/object/new")).setMarginLeft("7px").onClick(function() {
    i.setValue(h.MathUtils.generateUUID()), t.execute(new kt(t, t.selected, i.getValue()));
  });
  l.add(new k(e.getKey("sidebar/object/uuid")).setClass("Label")), l.add(i), l.add(c), s.add(l);
  const d = new S(), p = new Ee().setWidth("150px").setFontSize("12px").onChange(function() {
    t.execute(new ue(t, t.selected, "name", p.getValue()));
  });
  d.add(new k(e.getKey("sidebar/object/name")).setClass("Label")), d.add(p), s.add(d);
  const m = new S(), o = new G().setPrecision(3).setWidth("50px").onChange(se), u = new G().setPrecision(3).setWidth("50px").onChange(se), g = new G().setPrecision(3).setWidth("50px").onChange(se);
  m.add(new k(e.getKey("sidebar/object/position")).setClass("Label")), m.add(o, u, g), s.add(m);
  const b = new S(), w = new G().setStep(10).setNudge(0.1).setUnit("°").setWidth("50px").onChange(se), f = new G().setStep(10).setNudge(0.1).setUnit("°").setWidth("50px").onChange(se), C = new G().setStep(10).setNudge(0.1).setUnit("°").setWidth("50px").onChange(se);
  b.add(new k(e.getKey("sidebar/object/rotation")).setClass("Label")), b.add(w, f, C), s.add(b);
  const O = new S(), L = new G(1).setPrecision(3).setWidth("50px").onChange(se), M = new G(1).setPrecision(3).setWidth("50px").onChange(se), y = new G(1).setPrecision(3).setWidth("50px").onChange(se);
  O.add(new k(e.getKey("sidebar/object/scale")).setClass("Label")), O.add(L, M, y), s.add(O);
  const j = new S(), R = new G().onChange(se);
  j.add(new k(e.getKey("sidebar/object/fov")).setClass("Label")), j.add(R), s.add(j);
  const A = new S(), P = new G().onChange(se);
  A.add(new k(e.getKey("sidebar/object/left")).setClass("Label")), A.add(P), s.add(A);
  const x = new S(), T = new G().onChange(se);
  x.add(new k(e.getKey("sidebar/object/right")).setClass("Label")), x.add(T), s.add(x);
  const N = new S(), ee = new G().onChange(se);
  N.add(new k(e.getKey("sidebar/object/top")).setClass("Label")), N.add(ee), s.add(N);
  const re = new S(), X = new G().onChange(se);
  re.add(new k(e.getKey("sidebar/object/bottom")).setClass("Label")), re.add(X), s.add(re);
  const Z = new S(), ae = new G().onChange(se);
  Z.add(new k(e.getKey("sidebar/object/near")).setClass("Label")), Z.add(ae), s.add(Z);
  const W = new S(), _ = new G().onChange(se);
  W.add(new k(e.getKey("sidebar/object/far")).setClass("Label")), W.add(_), s.add(W);
  const B = new S(), $ = new G().onChange(se);
  B.add(new k(e.getKey("sidebar/object/intensity")).setClass("Label")), B.add($), s.add(B);
  const Y = new S(), I = new ot().onInput(se);
  Y.add(new k(e.getKey("sidebar/object/color")).setClass("Label")), Y.add(I), s.add(Y);
  const J = new S(), E = new ot().onInput(se);
  J.add(new k(e.getKey("sidebar/object/groundcolor")).setClass("Label")), J.add(E), s.add(J);
  const K = new S(), D = new G().setRange(0, 1 / 0).onChange(se);
  K.add(new k(e.getKey("sidebar/object/distance")).setClass("Label")), K.add(D), s.add(K);
  const F = new S(), V = new G().setPrecision(3).setRange(0, Math.PI / 2).onChange(se);
  F.add(new k(e.getKey("sidebar/object/angle")).setClass("Label")), F.add(V), s.add(F);
  const U = new S(), z = new G().setRange(0, 1).onChange(se);
  U.add(new k(e.getKey("sidebar/object/penumbra")).setClass("Label")), U.add(z), s.add(U);
  const Q = new S(), ie = new G().setRange(0, 1 / 0).onChange(se);
  Q.add(new k(e.getKey("sidebar/object/decay")).setClass("Label")), Q.add(ie), s.add(Q);
  const Ce = new S();
  Ce.add(new k(e.getKey("sidebar/object/shadow")).setClass("Label"));
  const Oe = new We(!1, e.getKey("sidebar/object/cast")).onChange(se);
  Ce.add(Oe);
  const he = new We(!1, e.getKey("sidebar/object/receive")).onChange(se);
  Ce.add(he), s.add(Ce);
  const be = new S();
  be.add(new k(e.getKey("sidebar/object/shadowIntensity")).setClass("Label"));
  const Ae = new G(0).setRange(0, 1).onChange(se);
  be.add(Ae), s.add(be);
  const De = new S();
  De.add(new k(e.getKey("sidebar/object/shadowBias")).setClass("Label"));
  const Me = new G(0).setPrecision(5).setStep(1e-4).setNudge(1e-5).onChange(se);
  De.add(Me), s.add(De);
  const xe = new S();
  xe.add(new k(e.getKey("sidebar/object/shadowNormalBias")).setClass("Label"));
  const je = new G(0).onChange(se);
  xe.add(je), s.add(xe);
  const ke = new S();
  ke.add(new k(e.getKey("sidebar/object/shadowRadius")).setClass("Label"));
  const ye = new G(1).onChange(se);
  ke.add(ye), s.add(ke);
  const qe = new S(), Fe = new Ne().onChange(se);
  qe.add(new k(e.getKey("sidebar/object/visible")).setClass("Label")), qe.add(Fe), s.add(qe);
  const Xe = new S(), He = new Ne().onChange(se);
  Xe.add(new k(e.getKey("sidebar/object/frustumcull")).setClass("Label")), Xe.add(He), s.add(Xe);
  const $e = new S(), Ge = new Ke().setWidth("50px").onChange(se);
  $e.add(new k(e.getKey("sidebar/object/renderorder")).setClass("Label")), $e.add(Ge), s.add($e);
  const Ye = new S(), Te = new Rt().setWidth("150px").setHeight("40px").setFontSize("12px").onChange(se);
  Te.onKeyUp(function() {
    try {
      JSON.parse(Te.getValue()), Te.dom.classList.add("success"), Te.dom.classList.remove("fail");
    } catch {
      Te.dom.classList.remove("success"), Te.dom.classList.add("fail");
    }
  }), Ye.add(new k(e.getKey("sidebar/object/userdata")).setClass("Label")), Ye.add(Te), s.add(Ye);
  const Ze = new te(e.getKey("sidebar/object/export"));
  Ze.setMarginLeft("120px"), Ze.onClick(function() {
    let ve = t.selected.toJSON();
    try {
      ve = JSON.stringify(ve, null, "	"), ve = ve.replace(/[\n\t]+([\d\.e\-\[\]]+)/g, "$1");
    } catch {
      ve = JSON.stringify(ve);
    }
    t.utils.save(new Blob([ve]), `${p.getValue() || "object"}.json`);
  }), s.add(Ze);
  function se() {
    const v = t.selected;
    if (v !== null) {
      const ve = new h.Vector3(o.getValue(), u.getValue(), g.getValue());
      v.position.distanceTo(ve) >= 0.01 && t.execute(new wt(t, v, ve));
      const Le = new h.Euler(w.getValue() * h.MathUtils.DEG2RAD, f.getValue() * h.MathUtils.DEG2RAD, C.getValue() * h.MathUtils.DEG2RAD);
      new h.Vector3().setFromEuler(v.rotation).distanceTo(new h.Vector3().setFromEuler(Le)) >= 0.01 && t.execute(new Pt(t, v, Le));
      const fe = new h.Vector3(L.getValue(), M.getValue(), y.getValue());
      v.scale.distanceTo(fe) >= 0.01 && t.execute(new Dt(t, v, fe)), v.fov !== void 0 && Math.abs(v.fov - R.getValue()) >= 0.01 && (t.execute(new ue(t, v, "fov", R.getValue())), v.updateProjectionMatrix()), v.left !== void 0 && Math.abs(v.left - P.getValue()) >= 0.01 && (t.execute(new ue(t, v, "left", P.getValue())), v.updateProjectionMatrix()), v.right !== void 0 && Math.abs(v.right - T.getValue()) >= 0.01 && (t.execute(new ue(t, v, "right", T.getValue())), v.updateProjectionMatrix()), v.top !== void 0 && Math.abs(v.top - ee.getValue()) >= 0.01 && (t.execute(new ue(t, v, "top", ee.getValue())), v.updateProjectionMatrix()), v.bottom !== void 0 && Math.abs(v.bottom - X.getValue()) >= 0.01 && (t.execute(new ue(t, v, "bottom", X.getValue())), v.updateProjectionMatrix()), v.near !== void 0 && Math.abs(v.near - ae.getValue()) >= 0.01 && (t.execute(new ue(t, v, "near", ae.getValue())), v.isOrthographicCamera && v.updateProjectionMatrix()), v.far !== void 0 && Math.abs(v.far - _.getValue()) >= 0.01 && (t.execute(new ue(t, v, "far", _.getValue())), v.isOrthographicCamera && v.updateProjectionMatrix()), v.intensity !== void 0 && Math.abs(v.intensity - $.getValue()) >= 0.01 && t.execute(new ue(t, v, "intensity", $.getValue())), v.color !== void 0 && v.color.getHex() !== I.getHexValue() && t.execute(new Vt(t, v, "color", I.getHexValue())), v.groundColor !== void 0 && v.groundColor.getHex() !== E.getHexValue() && t.execute(new Vt(t, v, "groundColor", E.getHexValue())), v.distance !== void 0 && Math.abs(v.distance - D.getValue()) >= 0.01 && t.execute(new ue(t, v, "distance", D.getValue())), v.angle !== void 0 && Math.abs(v.angle - V.getValue()) >= 0.01 && t.execute(new ue(t, v, "angle", V.getValue())), v.penumbra !== void 0 && Math.abs(v.penumbra - z.getValue()) >= 0.01 && t.execute(new ue(t, v, "penumbra", z.getValue())), v.decay !== void 0 && Math.abs(v.decay - ie.getValue()) >= 0.01 && t.execute(new ue(t, v, "decay", ie.getValue())), v.visible !== Fe.getValue() && t.execute(new ue(t, v, "visible", Fe.getValue())), v.frustumCulled !== He.getValue() && t.execute(new ue(t, v, "frustumCulled", He.getValue())), v.renderOrder !== Ge.getValue() && t.execute(new ue(t, v, "renderOrder", Ge.getValue())), v.castShadow !== void 0 && v.castShadow !== Oe.getValue() && t.execute(new ue(t, v, "castShadow", Oe.getValue())), v.receiveShadow !== he.getValue() && (v.material !== void 0 && (v.material.needsUpdate = !0), t.execute(new ue(t, v, "receiveShadow", he.getValue()))), v.shadow !== void 0 && (v.shadow.intensity !== Ae.getValue() && t.execute(new it(t, v, "intensity", Ae.getValue())), v.shadow.bias !== Me.getValue() && t.execute(new it(t, v, "bias", Me.getValue())), v.shadow.normalBias !== je.getValue() && t.execute(new it(t, v, "normalBias", je.getValue())), v.shadow.radius !== ye.getValue() && t.execute(new it(t, v, "radius", ye.getValue())));
      try {
        const Re = JSON.parse(Te.getValue());
        JSON.stringify(v.userData) != JSON.stringify(Re) && t.execute(new ue(t, v, "userData", Re));
      } catch (Re) {
        console.warn(Re);
      }
    }
  }
  function xt(v) {
    const ve = {
      fov: j,
      left: A,
      right: x,
      top: N,
      bottom: re,
      near: Z,
      far: W,
      intensity: B,
      color: Y,
      groundColor: J,
      distance: K,
      angle: F,
      penumbra: U,
      decay: Q,
      castShadow: Ce,
      receiveShadow: he,
      shadow: [be, De, xe, ke]
    };
    for (const Le in ve) {
      const fe = ve[Le];
      if (Array.isArray(fe) === !0)
        for (let Re = 0; Re < fe.length; Re++)
          fe[Re].setDisplay(v[Le] !== void 0 ? "" : "none");
      else
        fe.setDisplay(v[Le] !== void 0 ? "" : "none");
    }
    v.isLight && he.setDisplay("none"), (v.isAmbientLight || v.isHemisphereLight) && Ce.setDisplay("none");
  }
  function vt(v) {
    v.isLight ? (b.setDisplay("none"), O.setDisplay("none")) : (b.setDisplay(""), O.setDisplay(""));
  }
  a.objectSelected.add(function(v) {
    v !== null ? (s.setDisplay("block"), xt(v), Qe(v)) : s.setDisplay("none");
  }), a.objectChanged.add(function(v) {
    v === t.selected && Qe(v);
  }), a.refreshSidebarObject3D.add(function(v) {
    v === t.selected && Qe(v);
  });
  function Qe(v) {
    r.setValue(v.type), i.setValue(v.uuid), p.setValue(v.name), o.setValue(v.position.x), u.setValue(v.position.y), g.setValue(v.position.z), w.setValue(v.rotation.x * h.MathUtils.RAD2DEG), f.setValue(v.rotation.y * h.MathUtils.RAD2DEG), C.setValue(v.rotation.z * h.MathUtils.RAD2DEG), L.setValue(v.scale.x), M.setValue(v.scale.y), y.setValue(v.scale.z), v.fov !== void 0 && R.setValue(v.fov), v.left !== void 0 && P.setValue(v.left), v.right !== void 0 && T.setValue(v.right), v.top !== void 0 && ee.setValue(v.top), v.bottom !== void 0 && X.setValue(v.bottom), v.near !== void 0 && ae.setValue(v.near), v.far !== void 0 && _.setValue(v.far), v.intensity !== void 0 && $.setValue(v.intensity), v.color !== void 0 && I.setHexValue(v.color.getHexString()), v.groundColor !== void 0 && E.setHexValue(v.groundColor.getHexString()), v.distance !== void 0 && D.setValue(v.distance), v.angle !== void 0 && V.setValue(v.angle), v.penumbra !== void 0 && z.setValue(v.penumbra), v.decay !== void 0 && ie.setValue(v.decay), v.castShadow !== void 0 && Oe.setValue(v.castShadow), v.receiveShadow !== void 0 && he.setValue(v.receiveShadow), v.shadow !== void 0 && (Ae.setValue(v.shadow.intensity), Me.setValue(v.shadow.bias), je.setValue(v.shadow.normalBias), ye.setValue(v.shadow.radius)), Fe.setValue(v.visible), He.setValue(v.frustumCulled), Ge.setValue(v.renderOrder);
    try {
      Te.setValue(JSON.stringify(v.userData, null, "  "));
    } catch (ve) {
      console.log(ve);
    }
    Te.setBorderColor("transparent"), Te.setBackgroundColor(""), vt(v);
  }
  return s;
}
const us = (t, e, a) => {
  const s = t[e];
  return s ? typeof s == "function" ? s() : Promise.resolve(s) : new Promise((n, r) => {
    (typeof queueMicrotask == "function" ? queueMicrotask : setTimeout)(
      r.bind(
        null,
        new Error(
          "Unknown variable dynamic import: " + e + (e.split("/").length !== a ? ". Note that variables only represent file names one level deep." : "")
        )
      )
    );
  });
};
function ca(t) {
  const e = t.strings, a = t.signals, s = new S();
  function n(r) {
    if (r === null || r === void 0) return;
    const l = r.geometry;
    if (l) {
      s.clear(), s.setDisplay("block");
      const i = new S(), c = new k(e.getKey("sidebar/geometry/buffer_geometry/attributes")).setClass("Label");
      i.add(c);
      const d = new Pe().setDisplay("inline-block").setVerticalAlign("middle").setWidth("160px");
      i.add(d);
      const p = l.index;
      p !== null && (d.add(new k(e.getKey("sidebar/geometry/buffer_geometry/index")).setWidth("70px")), d.add(new k(t.utils.formatNumber(p.count)).setFontSize("12px")), d.add(new Se()));
      const m = l.attributes;
      for (const g in m) {
        const b = m[g];
        d.add(new k(g).setWidth("70px"));
        let w = t.utils.formatNumber(b.count) + " (" + b.itemSize + ")";
        b.isInterleavedBufferAttribute && (w += " (" + b.data.stride + ")"), d.add(new k(w).setFontSize("12px")), d.add(new Se());
      }
      s.add(i);
      const o = l.morphAttributes;
      if (Object.keys(o).length > 0 === !0) {
        const g = new S(), b = new k(e.getKey("sidebar/geometry/buffer_geometry/morphAttributes")).setClass("Label");
        g.add(b);
        const w = new Pe().setDisplay("inline-block").setVerticalAlign("middle").setWidth("160px");
        g.add(w);
        for (const L in o) {
          const M = o[L];
          w.add(new k(L).setWidth("70px")), w.add(new k(t.utils.formatNumber(M.length)).setFontSize("12px")), w.add(new Se());
        }
        s.add(g);
        const f = new S(), C = new k(e.getKey("sidebar/geometry/buffer_geometry/morphRelative")).setClass("Label");
        f.add(C);
        const O = new Ne().setValue(l.morphTargetsRelative).setDisabled(!0);
        f.add(O), s.add(f);
      }
    } else
      s.setDisplay("none");
  }
  return a.objectSelected.add(n), a.geometryChanged.add(n), s;
}
const ps = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  SidebarGeometryBufferGeometry: ca
}, Symbol.toStringTag, { value: "Module" }));
function ma(t, e) {
  const a = t.strings, s = t.signals, n = new oe().setMarginLeft("120px"), r = e.geometry, l = new te(a.getKey("sidebar/geometry/compute_vertex_normals"));
  l.onClick(function() {
    r.computeVertexNormals(), s.geometryChanged.dispatch(e);
  });
  const i = new S();
  if (i.add(l), n.add(i), r.hasAttribute("position") && r.hasAttribute("normal") && r.hasAttribute("uv")) {
    const p = new te(a.getKey("sidebar/geometry/compute_vertex_tangents"));
    p.onClick(async function() {
      await Ut.ready, Ma(r, Ut), s.geometryChanged.dispatch(e);
    });
    const m = new S();
    m.add(p), n.add(m);
  }
  const c = new te(a.getKey("sidebar/geometry/center"));
  c.onClick(function() {
    r.center(), s.geometryChanged.dispatch(e);
  });
  const d = new S();
  return d.add(c), n.add(d), n;
}
const gs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  SidebarGeometryModifiers: ma
}, Symbol.toStringTag, { value: "Module" }));
function hs(t) {
  const e = t.strings, a = t.signals, s = new q();
  s.setBorderTop("0"), s.setDisplay("none"), s.setPaddingTop("20px");
  let n = null;
  const r = new S(), l = new k();
  r.add(new k(e.getKey("sidebar/geometry/type")).setClass("Label")), r.add(l), s.add(r);
  const i = new S(), c = new Ee().setWidth("102px").setFontSize("12px").setDisabled(!0), d = new te(e.getKey("sidebar/geometry/new")).setMarginLeft("7px").onClick(function() {
    c.setValue(h.MathUtils.generateUUID()), t.execute(new bt(t, t.selected, "uuid", c.getValue()));
  });
  i.add(new k(e.getKey("sidebar/geometry/uuid")).setClass("Label")), i.add(c), i.add(d), s.add(i);
  const p = new S(), m = new Ee().setWidth("150px").setFontSize("12px").onChange(function() {
    t.execute(new bt(t, t.selected, "name", m.getValue()));
  });
  p.add(new k(e.getKey("sidebar/geometry/name")).setClass("Label")), p.add(m), s.add(p);
  const o = new Pe();
  s.add(o), s.add(new ca(t));
  const u = new k().setFontSize("12px"), g = new S();
  g.add(new k(e.getKey("sidebar/geometry/bounds")).setClass("Label")), g.add(u), s.add(g);
  const b = new S(), w = new Rt().setValue("{}").setWidth("150px").setHeight("40px").setFontSize("12px").onChange(function() {
    try {
      const x = JSON.parse(w.getValue());
      JSON.stringify(t.selected.geometry.userData) != JSON.stringify(x) && (t.execute(new bt(t, t.selected, "userData", x)), j());
    } catch (x) {
      console.warn(x);
    }
  });
  w.onKeyUp(function() {
    try {
      JSON.parse(w.getValue()), w.dom.classList.add("success"), w.dom.classList.remove("fail");
    } catch {
      w.dom.classList.remove("success"), w.dom.classList.add("fail");
    }
  }), b.add(new k(e.getKey("sidebar/geometry/userdata")).setClass("Label")), b.add(w), s.add(b);
  const f = new S().setMarginLeft("120px");
  s.add(f);
  const C = new te(e.getKey("sidebar/geometry/show_vertex_normals"));
  C.onClick(function() {
    const x = t.selected;
    t.helpers[x.id] === void 0 ? t.addHelper(x, new Bt(x, O.getValue())) : t.removeHelper(x), a.sceneGraphChanged.dispatch();
  }), f.add(C);
  const O = new G(1).setWidth("30px").setMarginLeft("7px").setRange(0, 1 / 0).onChange(function() {
    const x = t.selected, T = t.helpers[x.id];
    T !== void 0 && T.isVertexNormalsHelper === !0 && (T.size = O.getValue(), a.objectChanged.dispatch(x));
  });
  f.add(O);
  const L = new te(e.getKey("sidebar/geometry/export"));
  L.setMarginLeft("120px"), L.onClick(function() {
    let N = t.selected.geometry.toJSON();
    try {
      N = JSON.stringify(N, null, "	"), N = N.replace(/[\n\t]+([\d\.e\-\[\]]+)/g, "$1");
    } catch {
      N = JSON.stringify(N);
    }
    t.utils.save(new Blob([N]), `${m.getValue() || "geometry"}.json`);
  }), s.add(L);
  const M = new oe();
  M.setMarginTop("20px"), M.setDisplay("none"), s.add(M), M.add(new k(e.getKey("sidebar/geometry/morph")).setTextTransform("uppercase")), M.add(new Se()), M.add(new Se());
  const y = new oe();
  M.add(y);
  async function j() {
    const x = t.selected;
    if (x && x.geometry) {
      const T = x.geometry;
      if (s.setDisplay("block"), l.setValue(T.type), c.setValue(T.uuid), m.setValue(T.name), n !== T.type) {
        if (o.clear(), T.type === "BufferGeometry" || T.type === "InstancedBufferGeometry")
          o.add(new ma(t, x));
        else {
          const { GeometryParametersPanel: ae } = await us(/* @__PURE__ */ Object.assign({ "./Sidebar.Geometry.BoxGeometry.js": () => import("./Sidebar.Geometry.BoxGeometry-CM79mMb_.js"), "./Sidebar.Geometry.BufferGeometry.js": () => Promise.resolve().then(() => ps), "./Sidebar.Geometry.CapsuleGeometry.js": () => import("./Sidebar.Geometry.CapsuleGeometry-BWjkoPL_.js"), "./Sidebar.Geometry.CircleGeometry.js": () => import("./Sidebar.Geometry.CircleGeometry-DXGHDyEi.js"), "./Sidebar.Geometry.CylinderGeometry.js": () => import("./Sidebar.Geometry.CylinderGeometry-BILv3BwD.js"), "./Sidebar.Geometry.DodecahedronGeometry.js": () => import("./Sidebar.Geometry.DodecahedronGeometry-Dy3iwIBL.js"), "./Sidebar.Geometry.ExtrudeGeometry.js": () => import("./Sidebar.Geometry.ExtrudeGeometry-COBuFRYm.js"), "./Sidebar.Geometry.IcosahedronGeometry.js": () => import("./Sidebar.Geometry.IcosahedronGeometry-eTHFYUPT.js"), "./Sidebar.Geometry.LatheGeometry.js": () => import("./Sidebar.Geometry.LatheGeometry-BeA63_Lz.js"), "./Sidebar.Geometry.Modifiers.js": () => Promise.resolve().then(() => gs), "./Sidebar.Geometry.OctahedronGeometry.js": () => import("./Sidebar.Geometry.OctahedronGeometry-nl7QMYjP.js"), "./Sidebar.Geometry.PlaneGeometry.js": () => import("./Sidebar.Geometry.PlaneGeometry-BpRhPrFP.js"), "./Sidebar.Geometry.RingGeometry.js": () => import("./Sidebar.Geometry.RingGeometry-CvWFTHEl.js"), "./Sidebar.Geometry.ShapeGeometry.js": () => import("./Sidebar.Geometry.ShapeGeometry-35f9VTPC.js"), "./Sidebar.Geometry.SphereGeometry.js": () => import("./Sidebar.Geometry.SphereGeometry-skta3VP8.js"), "./Sidebar.Geometry.TetrahedronGeometry.js": () => import("./Sidebar.Geometry.TetrahedronGeometry-BX92CzJB.js"), "./Sidebar.Geometry.TextGeometry.js": () => import("./Sidebar.Geometry.TextGeometry-BY0d0FIx.js"), "./Sidebar.Geometry.TorusGeometry.js": () => import("./Sidebar.Geometry.TorusGeometry-CYRNfaAF.js"), "./Sidebar.Geometry.TorusKnotGeometry.js": () => import("./Sidebar.Geometry.TorusKnotGeometry-CaQjVx3-.js"), "./Sidebar.Geometry.TubeGeometry.js": () => import("./Sidebar.Geometry.TubeGeometry-DDGWKB6K.js") }), `./Sidebar.Geometry.${T.type}.js`, 2);
          o.add(new ae(t, x));
        }
        n = T.type;
      }
      T.boundingBox === null && T.computeBoundingBox();
      const N = T.boundingBox, ee = Math.floor((N.max.x - N.min.x) * 1e3) / 1e3, re = Math.floor((N.max.y - N.min.y) * 1e3) / 1e3, X = Math.floor((N.max.z - N.min.z) * 1e3) / 1e3;
      u.setInnerHTML(`${ee}<br/>${re}<br/>${X}`), f.setDisplay(T.hasAttribute("normal") ? "" : "none"), w.setValue(JSON.stringify(T.userData, null, "  "));
      const Z = t.helpers[x.id];
      if (Z !== void 0 && Z.isVertexNormalsHelper === !0 && (t.removeHelper(x), t.addHelper(x, new Bt(x, O.getValue()))), R.length = 0, y.clear(), x.morphTargetInfluences) {
        const ae = x.morphTargetDictionary, W = x.morphTargetInfluences, _ = Object.keys(ae);
        for (let B = 0; B < _.length; B++) {
          const $ = _[B];
          y.add(new A(B, $, W));
        }
        M.setDisplay("");
      } else
        M.setDisplay("none");
    }
  }
  const R = [];
  function A(x, T, N) {
    const ee = new S(), re = new k(T).setWidth("200px");
    ee.add(re);
    const X = new G().setWidth("60px").setRange(0, 1).onChange(function() {
      N[x] = X.getValue(), a.objectChanged.dispatch(t.selected);
    });
    return X.setValue(N[x]), ee.add(X), R.push(X), ee;
  }
  function P() {
    const x = t.selected;
    if (x !== null && x.morphTargetInfluences)
      for (let T = 0; T < R.length; T++)
        R[T].setValue(x.morphTargetInfluences[T]);
  }
  return a.objectSelected.add(function() {
    n = null, j();
  }), a.geometryChanged.add(j), a.morphTargetsUpdated.add(P), s;
}
function Ie(t, e, a) {
  const s = t.signals, n = new S();
  n.add(new k(a).setClass("Label"));
  const r = new Ne().setLeft("100px").onChange(d);
  n.add(r);
  let l = null, i = null, c = null;
  function d() {
    c[e] !== r.getValue() && t.execute(new Ve(t, l, e, r.getValue(), i));
  }
  function p(m, o = 0) {
    l = m, i = o, l !== null && l.material !== void 0 && (c = t.getObjectMaterial(l, i), e in c ? (r.setValue(c[e]), n.setDisplay("")) : n.setDisplay("none"));
  }
  return s.objectSelected.add(p), s.materialChanged.add(p), n;
}
function st(t, e, a) {
  const s = t.signals, n = new S();
  n.add(new k(a).setClass("Label"));
  const r = new ot().onInput(p);
  n.add(r);
  let l;
  e === "emissive" && (l = new G(1).setWidth("30px").setRange(0, 1 / 0).onChange(p), n.add(l));
  let i = null, c = null, d = null;
  function p() {
    d[e].getHex() !== r.getHexValue() && t.execute(new ea(t, i, e, r.getHexValue(), c)), l !== void 0 && d[`${e}Intensity`] !== l.getValue() && t.execute(new Ve(t, i, `${e}Intensity`, l.getValue(), c));
  }
  function m(o, u = 0) {
    i = o, c = u, i !== null && i.material !== void 0 && (d = t.getObjectMaterial(i, c), e in d ? (r.setHexValue(d[e].getHexString()), l !== void 0 && l.setValue(d[`${e}Intensity`]), n.setDisplay("")) : n.setDisplay("none"));
  }
  return s.objectSelected.add(m), s.materialChanged.add(m), n;
}
function Tt(t, e, a, s) {
  const n = t.signals, r = new S();
  r.add(new k(a).setClass("Label"));
  const l = new pe().setOptions(s).onChange(p);
  r.add(l);
  let i = null, c = null, d = null;
  function p() {
    const o = parseInt(l.getValue());
    d[e] !== o && t.execute(new Ve(t, i, e, o, c));
  }
  function m(o, u = 0) {
    i = o, c = u, i !== null && i.material !== void 0 && (d = t.getObjectMaterial(i, c), e in d ? (l.setValue(d[e]), r.setDisplay("")) : r.setDisplay("none"));
  }
  return n.objectSelected.add(m), n.materialChanged.add(m), r;
}
class bs {
  constructor(e, a) {
    this.editor = e, this.strings = e.strings, this.texture = a;
    const s = new oe();
    s.setClass("Dialog"), this.dom = s.dom;
    const n = new oe();
    n.setClass("Dialog-background"), n.dom.addEventListener("click", () => this.cancel()), s.add(n);
    const r = new oe();
    r.setClass("Dialog-content TextureParametersDialog-content"), s.add(r);
    const l = new oe();
    l.setClass("Dialog-title"), l.setTextContent(this.strings.getKey("dialog/texture/title")), r.add(l);
    const i = new oe();
    i.setClass("Dialog-body TextureParametersDialog-body"), r.add(i);
    const c = new oe();
    c.setClass("TextureParametersDialog-split"), i.add(c);
    const d = new oe();
    d.setClass("TextureParametersDialog-preview"), c.add(d), d.add(rt(this.strings.getKey("dialog/texture/group/preview")));
    const p = document.createElement("canvas");
    p.width = 400, p.height = 400, d.dom.appendChild(p), this.previewCanvas = p, this.previewContext = p.getContext("2d"), this.previewTexture = a.clone();
    const m = () => this.updatePreview(), o = new oe();
    o.setClass("TextureParametersDialog-form"), c.add(o), o.add(rt(this.strings.getKey("dialog/texture/group/mapping"))), this.mapping = new pe().setOptions({
      [h.UVMapping]: "UV",
      [h.EquirectangularReflectionMapping]: "Equirectangular Reflection",
      [h.EquirectangularRefractionMapping]: "Equirectangular Refraction",
      [h.CubeReflectionMapping]: "Cube Reflection",
      [h.CubeRefractionMapping]: "Cube Refraction",
      [h.CubeUVReflectionMapping]: "CubeUV Reflection"
    }).setValue(a.mapping).onChange(m), o.add(_e(this.strings.getKey("dialog/texture/mapping"), this.mapping));
    const u = {
      [h.RepeatWrapping]: "Repeat",
      [h.ClampToEdgeWrapping]: "Clamp To Edge",
      [h.MirroredRepeatWrapping]: "Mirrored Repeat"
    };
    this.wrapS = new pe().setOptions(u).setValue(a.wrapS).onChange(m), o.add(_e(this.strings.getKey("dialog/texture/wrapS"), this.wrapS)), this.wrapT = new pe().setOptions(u).setValue(a.wrapT).onChange(m), o.add(_e(this.strings.getKey("dialog/texture/wrapT"), this.wrapT)), o.add(rt(this.strings.getKey("dialog/texture/group/filtering"))), this.minFilter = new pe().setOptions({
      [h.NearestFilter]: "Nearest",
      [h.NearestMipmapNearestFilter]: "Nearest Mipmap Nearest",
      [h.NearestMipmapLinearFilter]: "Nearest Mipmap Linear",
      [h.LinearFilter]: "Linear",
      [h.LinearMipmapNearestFilter]: "Linear Mipmap Nearest",
      [h.LinearMipmapLinearFilter]: "Linear Mipmap Linear"
    }).setValue(a.minFilter).onChange(m), o.add(_e(this.strings.getKey("dialog/texture/minFilter"), this.minFilter)), this.magFilter = new pe().setOptions({
      [h.NearestFilter]: "Nearest",
      [h.LinearFilter]: "Linear"
    }).setValue(a.magFilter).onChange(m), o.add(_e(this.strings.getKey("dialog/texture/magFilter"), this.magFilter)), this.anisotropy = new G(a.anisotropy).setPrecision(0).setRange(1, 16).setNudge(1).setStep(1).setWidth("60px").onChange(m), o.add(_e(this.strings.getKey("dialog/texture/anisotropy"), this.anisotropy)), o.add(rt(this.strings.getKey("dialog/texture/group/transform"))), this.offsetX = new G(a.offset.x).setWidth("60px").onChange(m), this.offsetY = new G(a.offset.y).setWidth("60px").onChange(m), o.add(_e(this.strings.getKey("dialog/texture/offset"), this.offsetX, this.offsetY)), this.repeatX = new G(a.repeat.x).setWidth("60px").onChange(m), this.repeatY = new G(a.repeat.y).setWidth("60px").onChange(m), o.add(_e(this.strings.getKey("dialog/texture/repeat"), this.repeatX, this.repeatY)), this.centerX = new G(a.center.x).setWidth("60px").onChange(m), this.centerY = new G(a.center.y).setWidth("60px").onChange(m), o.add(_e(this.strings.getKey("dialog/texture/center"), this.centerX, this.centerY)), this.rotation = new G(a.rotation * h.MathUtils.RAD2DEG).setStep(10).setNudge(0.1).setUnit("°").setWidth("60px").onChange(m), o.add(_e(this.strings.getKey("dialog/texture/rotation"), this.rotation)), o.add(rt(this.strings.getKey("dialog/texture/group/color"))), this.premultiplyAlpha = new Ne(a.premultiplyAlpha).onChange(m), o.add(_e(this.strings.getKey("dialog/texture/premultiplyAlpha"), this.premultiplyAlpha)), this.colorSpace = new pe().setOptions({
      [h.NoColorSpace]: "No Color Space",
      [h.SRGBColorSpace]: "sRGB",
      [h.LinearSRGBColorSpace]: "Linear sRGB"
    }).setValue(a.colorSpace).onChange(m), o.add(_e(this.strings.getKey("dialog/texture/colorSpace"), this.colorSpace)), m();
    const g = new oe();
    g.setClass("Dialog-buttons"), i.add(g);
    const b = new te(this.strings.getKey("dialog/ok"));
    b.setWidth("80px"), b.onClick(() => this.confirm()), g.add(b);
    const w = new te(this.strings.getKey("dialog/cancel"));
    w.setWidth("80px"), w.setMarginLeft("8px"), w.onClick(() => this.cancel()), g.add(w), this.resolve = null, this.reject = null;
  }
  show() {
    return document.body.appendChild(this.dom), new Promise((e, a) => {
      this.resolve = e, this.reject = a;
    });
  }
  getCurrentParameters() {
    return {
      mapping: parseInt(this.mapping.getValue()),
      wrapS: parseInt(this.wrapS.getValue()),
      wrapT: parseInt(this.wrapT.getValue()),
      magFilter: parseInt(this.magFilter.getValue()),
      minFilter: parseInt(this.minFilter.getValue()),
      anisotropy: this.anisotropy.getValue(),
      offset: { x: this.offsetX.getValue(), y: this.offsetY.getValue() },
      repeat: { x: this.repeatX.getValue(), y: this.repeatY.getValue() },
      center: { x: this.centerX.getValue(), y: this.centerY.getValue() },
      rotation: this.rotation.getValue() * h.MathUtils.DEG2RAD,
      premultiplyAlpha: this.premultiplyAlpha.getValue(),
      colorSpace: this.colorSpace.getValue()
    };
  }
  updatePreview() {
    ys(this.previewTexture, this.getCurrentParameters());
    const e = la(this.previewTexture), a = this.previewCanvas, s = this.previewContext;
    if (s.clearRect(0, 0, a.width, a.height), e.width === 0 || e.height === 0) return;
    const n = Math.min(a.width / e.width, a.height / e.height), r = e.width * n, l = e.height * n;
    s.drawImage(e, (a.width - r) / 2, (a.height - l) / 2, r, l);
  }
  confirm() {
    const e = this.getCurrentParameters();
    this.previewTexture.dispose(), this.dom.remove(), this.resolve && this.resolve(e);
  }
  cancel() {
    this.previewTexture.dispose(), this.dom.remove(), this.reject && this.reject(new Error("Texture parameters edit cancelled"));
  }
}
function _e(t, ...e) {
  const a = new S();
  a.add(new k(t).setClass("Label"));
  for (const s of e)
    a.add(s);
  return a;
}
function rt(t) {
  const e = new k(t);
  return e.setClass("TextureParametersDialog-groupHeading"), e.setStyle("display", ["block"]), e;
}
function ys(t, e) {
  t.mapping = e.mapping, t.wrapS = e.wrapS, t.wrapT = e.wrapT, t.magFilter = e.magFilter, t.minFilter = e.minFilter, t.anisotropy = e.anisotropy, t.offset.set(e.offset.x, e.offset.y), t.repeat.set(e.repeat.x, e.repeat.y), t.center.set(e.center.x, e.center.y), t.rotation = e.rotation, t.premultiplyAlpha = e.premultiplyAlpha, t.colorSpace = e.colorSpace, t.needsUpdate = !0;
}
function me(t, e, a) {
  const s = t.signals, n = new S();
  n.add(new k(a).setClass("Label"));
  const r = new Ne(!1).setMarginRight("8px").onChange(O);
  n.add(r);
  const l = new yt(t).onChange(M);
  n.add(l);
  const i = new te("⚙").setClass("TextureSettingsButton").setMarginRight("4px").onClick(L);
  i.setDisabled(!0), n.add(i);
  const c = e.replace("Map", ""), d = ["map", "emissiveMap", "sheenColorMap", "specularColorMap", "envMap"];
  let p;
  e === "aoMap" && (p = new G(1).setWidth("30px").setRange(0, 1).onChange(y), n.add(p));
  let m;
  (e === "bumpMap" || e === "displacementMap") && (m = new G().setWidth("30px").onChange(j), n.add(m));
  let o, u;
  (e === "normalMap" || e === "clearcoatNormalMap") && (o = new G().setWidth("30px").onChange(R), n.add(o), u = new G().setWidth("30px").onChange(R), n.add(u));
  let g, b;
  if (e === "iridescenceThicknessMap") {
    const x = new oe().setMarginLeft("3px");
    n.add(x);
    const T = new S().setMarginBottom("0px").setStyle("min-height", "0px");
    x.add(T), T.add(new k("min:").setWidth("35px")), g = new G().setWidth("40px").onChange(A), T.add(g);
    const N = new S().setMarginBottom("6px").setStyle("min-height", "0px");
    x.add(N), N.add(new k("max:").setWidth("35px")), b = new G().setWidth("40px").onChange(A), N.add(b), g.setPrecision(0).setRange(0, 1 / 0).setNudge(1).setStep(10).setUnit("nm"), b.setPrecision(0).setRange(0, 1 / 0).setNudge(1).setStep(10).setUnit("nm");
  }
  let w = null, f = null, C = null;
  function O() {
    const x = r.getValue() ? l.getValue() : null;
    if (C[e] !== x) {
      if (x !== null) {
        const T = w.geometry;
        T.hasAttribute("uv") === !1 && console.warn("Geometry doesn't have uvs:", T), e === "envMap" && (x.mapping = h.EquirectangularReflectionMapping);
      }
      t.execute(new ta(t, w, e, x, f));
    }
  }
  async function L() {
    const x = l.getValue();
    if (x === null) return;
    const T = new bs(t, x);
    try {
      const N = await T.show();
      t.execute(new ra(t, x, N));
    } catch {
    }
  }
  function M(x) {
    x !== null && d.includes(e) && x.isDataTexture !== !0 && x.colorSpace !== h.SRGBColorSpace && (x.colorSpace = h.SRGBColorSpace, C.needsUpdate = !0), r.setDisabled(!1), i.setDisabled(x === null), O();
  }
  function y() {
    C[`${e}Intensity`] !== p.getValue() && t.execute(new Ve(t, w, `${e}Intensity`, p.getValue(), f));
  }
  function j() {
    C[`${c}Scale`] !== m.getValue() && t.execute(new Ve(t, w, `${c}Scale`, m.getValue(), f));
  }
  function R() {
    const x = [o.getValue(), u.getValue()];
    (C[`${c}Scale`].x !== x[0] || C[`${c}Scale`].y !== x[1]) && t.execute(new aa(t, w, `${c}Scale`, x, f));
  }
  function A() {
    const x = [g.getValue(), b.getValue()];
    (C[`${c}Range`][0] !== x[0] || C[`${c}Range`][1] !== x[1]) && t.execute(new Ot(t, w, `${c}Range`, x[0], x[1], f));
  }
  function P(x, T = 0) {
    w = x, f = T, w !== null && w.material !== void 0 && (C = t.getObjectMaterial(w, f), e in C ? (C[e] !== null && l.setValue(C[e]), r.setValue(C[e] !== null), r.setDisabled(l.getValue() === null), i.setDisabled(l.getValue() === null), p !== void 0 && p.setValue(C[`${e}Intensity`]), m !== void 0 && m.setValue(C[`${c}Scale`]), o !== void 0 && (o.setValue(C[`${c}Scale`].x), u.setValue(C[`${c}Scale`].y)), g !== void 0 && (g.setValue(C[`${c}Range`][0]), b.setValue(C[`${c}Range`][1])), n.setDisplay("")) : n.setDisplay("none"));
  }
  return s.objectSelected.add(function(x) {
    l.setValue(null), P(x);
  }), s.materialChanged.add(P), n;
}
function we(t, e, a, s = [-1 / 0, 1 / 0], n = 2) {
  const r = t.signals, l = new S();
  l.add(new k(a).setClass("Label"));
  const i = new G().setWidth("60px").setRange(s[0], s[1]).setPrecision(n).onChange(m);
  l.add(i);
  let c = null, d = null, p = null;
  function m() {
    p[e] !== i.getValue() && t.execute(new Ve(t, c, e, i.getValue(), d));
  }
  function o(u, g = 0) {
    c = u, d = g, c !== null && c.material !== void 0 && (p = t.getObjectMaterial(c, d), e in p ? (i.setValue(p[e]), l.setDisplay("")) : l.setDisplay("none"));
  }
  return r.objectSelected.add(o), r.materialChanged.add(o), l;
}
function fs(t, e, a, s, n = [-1 / 0, 1 / 0], r = 2, l = 1, i = 0.01, c = "") {
  const d = t.signals, p = new S();
  p.add(new k(a).setClass("Label"));
  const m = new G().setWidth("60px").setRange(n[0], n[1]).setPrecision(r).setStep(l).setNudge(i).setUnit(c).onChange(b);
  p.add(m);
  let o = null, u = null, g = null;
  function b() {
    if (g[e][s ? 0 : 1] !== m.getValue()) {
      const f = s ? m.getValue() : g[e][0], C = s ? g[e][1] : m.getValue();
      t.execute(new Ot(t, o, e, f, C, u));
    }
  }
  function w(f, C = 0) {
    o = f, u = C, o !== null && o.material !== void 0 && (g = t.getObjectMaterial(o, u), e in g ? (m.setValue(g[e][s ? 0 : 1]), p.setDisplay("")) : p.setDisplay("none"));
  }
  return d.objectSelected.add(w), d.materialChanged.add(w), p;
}
function ws(t, e) {
  const a = t.signals, s = t.strings;
  let n = null, r = null, l = null;
  const i = new S();
  i.add(new k(s.getKey("sidebar/material/program")).setClass("Label"));
  const c = new te(s.getKey("sidebar/material/info"));
  c.setMarginRight("4px"), c.onClick(function() {
    a.editScript.dispatch(n, "programInfo");
  }), i.add(c);
  const d = new te(s.getKey("sidebar/material/vertex"));
  d.setMarginRight("4px"), d.onClick(function() {
    a.editScript.dispatch(n, "vertexShader");
  }), i.add(d);
  const p = new te(s.getKey("sidebar/material/fragment"));
  p.setMarginRight("4px"), p.onClick(function() {
    a.editScript.dispatch(n, "fragmentShader");
  }), i.add(p);
  function m(o, u = 0) {
    n = o, r = u, n !== null && n.material !== void 0 && (l = t.getObjectMaterial(n, r), e in l ? i.setDisplay("") : i.setDisplay("none"));
  }
  return a.objectSelected.add(m), a.materialChanged.add(m), i;
}
function xs(t) {
  const e = t.signals, a = t.strings;
  let s, n = 0;
  const r = new q();
  r.setBorderTop("0"), r.setDisplay("none"), r.setPaddingTop("20px");
  const l = new S();
  l.add(new k(a.getKey("sidebar/material/slot")).setClass("Label"));
  const i = new pe().setWidth("170px").setFontSize("12px").onChange(mt);
  i.setOptions({ 0: "" }).setValue(0), l.add(i), r.add(l);
  const c = new S(), d = new pe().setWidth("150px").setFontSize("12px").onChange(mt);
  c.add(new k(a.getKey("sidebar/material/type")).setClass("Label")), c.add(d), r.add(c);
  const p = new S(), m = new Ee().setWidth("102px").setFontSize("12px").setDisabled(!0), o = new te(a.getKey("sidebar/material/new")).setMarginLeft("7px");
  o.onClick(function() {
    m.setValue(h.MathUtils.generateUUID()), mt();
  }), p.add(new k(a.getKey("sidebar/material/uuid")).setClass("Label")), p.add(m), p.add(o), r.add(p);
  const u = new S(), g = new Ee().setWidth("150px").setFontSize("12px").onChange(function() {
    t.execute(new Ve(t, t.selected, "name", g.getValue(), n));
  });
  u.add(new k(a.getKey("sidebar/material/name")).setClass("Label")), u.add(g), r.add(u);
  const b = new ws(t, "vertexShader");
  r.add(b);
  const w = new st(t, "color", a.getKey("sidebar/material/color"));
  r.add(w);
  const f = new st(t, "specular", a.getKey("sidebar/material/specular"));
  r.add(f);
  const C = new we(t, "shininess", a.getKey("sidebar/material/shininess"));
  r.add(C);
  const O = new st(t, "emissive", a.getKey("sidebar/material/emissive"));
  r.add(O);
  const L = new we(t, "reflectivity", a.getKey("sidebar/material/reflectivity"));
  r.add(L);
  const M = new we(t, "ior", a.getKey("sidebar/material/ior"), [1, 2.333], 3);
  r.add(M);
  const y = new we(t, "roughness", a.getKey("sidebar/material/roughness"), [0, 1]);
  r.add(y);
  const j = new we(t, "metalness", a.getKey("sidebar/material/metalness"), [0, 1]);
  r.add(j);
  const R = new we(t, "clearcoat", a.getKey("sidebar/material/clearcoat"), [0, 1]);
  r.add(R);
  const A = new we(t, "clearcoatRoughness", a.getKey("sidebar/material/clearcoatroughness"), [0, 1]);
  r.add(A);
  const P = new we(t, "dispersion", a.getKey("sidebar/material/dispersion"), [0, 10]);
  r.add(P);
  const x = new we(t, "iridescence", a.getKey("sidebar/material/iridescence"), [0, 1]);
  r.add(x);
  const T = new we(t, "iridescenceIOR", a.getKey("sidebar/material/iridescenceIOR"), [1, 5]);
  r.add(T);
  const N = new fs(t, "iridescenceThicknessRange", a.getKey("sidebar/material/iridescenceThicknessMax"), !1, [0, 1 / 0], 0, 10, 1, "nm");
  r.add(N);
  const ee = new we(t, "sheen", a.getKey("sidebar/material/sheen"), [0, 1]);
  r.add(ee);
  const re = new we(t, "sheenRoughness", a.getKey("sidebar/material/sheenroughness"), [0, 1]);
  r.add(re);
  const X = new st(t, "sheenColor", a.getKey("sidebar/material/sheencolor"));
  r.add(X);
  const Z = new we(t, "transmission", a.getKey("sidebar/material/transmission"), [0, 1]);
  r.add(Z);
  const ae = new we(t, "attenuationDistance", a.getKey("sidebar/material/attenuationDistance"));
  r.add(ae);
  const W = new st(t, "attenuationColor", a.getKey("sidebar/material/attenuationColor"));
  r.add(W);
  const _ = new we(t, "thickness", a.getKey("sidebar/material/thickness"));
  r.add(_);
  const B = new Ie(t, "vertexColors", a.getKey("sidebar/material/vertexcolors"));
  r.add(B);
  const $ = {
    [h.BasicDepthPacking]: "Basic",
    [h.RGBADepthPacking]: "RGBA"
  }, Y = new Tt(t, "depthPacking", a.getKey("sidebar/material/depthPacking"), $);
  r.add(Y);
  const I = new me(t, "map", a.getKey("sidebar/material/map"));
  r.add(I);
  const J = new me(t, "specularMap", a.getKey("sidebar/material/specularmap"));
  r.add(J);
  const E = new me(t, "emissiveMap", a.getKey("sidebar/material/emissivemap"));
  r.add(E);
  const K = new me(t, "matcap", a.getKey("sidebar/material/matcap"));
  r.add(K);
  const D = new me(t, "alphaMap", a.getKey("sidebar/material/alphamap"));
  r.add(D);
  const F = new me(t, "bumpMap", a.getKey("sidebar/material/bumpmap"));
  r.add(F);
  const V = new me(t, "normalMap", a.getKey("sidebar/material/normalmap"));
  r.add(V);
  const U = new me(t, "clearcoatMap", a.getKey("sidebar/material/clearcoatmap"));
  r.add(U);
  const z = new me(t, "clearcoatNormalMap", a.getKey("sidebar/material/clearcoatnormalmap"));
  r.add(z);
  const Q = new me(t, "clearcoatRoughnessMap", a.getKey("sidebar/material/clearcoatroughnessmap"));
  r.add(Q);
  const ie = new me(t, "displacementMap", a.getKey("sidebar/material/displacementmap"));
  r.add(ie);
  const Ce = new me(t, "roughnessMap", a.getKey("sidebar/material/roughnessmap"));
  r.add(Ce);
  const Oe = new me(t, "metalnessMap", a.getKey("sidebar/material/metalnessmap"));
  r.add(Oe);
  const he = new me(t, "iridescenceMap", a.getKey("sidebar/material/iridescencemap"));
  r.add(he);
  const be = new me(t, "sheenColorMap", a.getKey("sidebar/material/sheencolormap"));
  r.add(be);
  const Ae = new me(t, "sheenRoughnessMap", a.getKey("sidebar/material/sheenroughnessmap"));
  r.add(Ae);
  const De = new me(t, "iridescenceThicknessMap", a.getKey("sidebar/material/iridescencethicknessmap"));
  r.add(De);
  const Me = new me(t, "envMap", a.getKey("sidebar/material/envmap"));
  r.add(Me);
  const xe = new me(t, "lightMap", a.getKey("sidebar/material/lightmap"));
  r.add(xe);
  const je = new me(t, "aoMap", a.getKey("sidebar/material/aomap"));
  r.add(je);
  const ke = new me(t, "gradientMap", a.getKey("sidebar/material/gradientmap"));
  r.add(ke);
  const ye = new me(t, "transmissionMap", a.getKey("sidebar/material/transmissionmap"));
  r.add(ye);
  const qe = new me(t, "thicknessMap", a.getKey("sidebar/material/thicknessmap"));
  r.add(qe);
  const Fe = {
    0: "Front",
    1: "Back",
    2: "Double"
  }, Xe = new Tt(t, "side", a.getKey("sidebar/material/side"), Fe);
  r.add(Xe);
  const He = new we(t, "size", a.getKey("sidebar/material/size"), [0, 1 / 0]);
  r.add(He);
  const $e = new Ie(t, "sizeAttenuation", a.getKey("sidebar/material/sizeAttenuation"));
  r.add($e);
  const Ge = new Ie(t, "flatShading", a.getKey("sidebar/material/flatShading"));
  r.add(Ge);
  const Ye = {
    0: "No",
    1: "Normal",
    2: "Additive",
    3: "Subtractive",
    4: "Multiply",
    5: "Custom"
  }, Te = new Tt(t, "blending", a.getKey("sidebar/material/blending"), Ye);
  r.add(Te);
  const Ze = new we(t, "opacity", a.getKey("sidebar/material/opacity"), [0, 1]);
  r.add(Ze);
  const se = new Ie(t, "transparent", a.getKey("sidebar/material/transparent"));
  r.add(se);
  const xt = new Ie(t, "forceSinglePass", a.getKey("sidebar/material/forcesinglepass"));
  r.add(xt);
  const vt = new we(t, "alphaTest", a.getKey("sidebar/material/alphatest"), [0, 1]);
  r.add(vt);
  const Qe = new Ie(t, "depthTest", a.getKey("sidebar/material/depthtest"));
  r.add(Qe);
  const v = new Ie(t, "depthWrite", a.getKey("sidebar/material/depthwrite"));
  r.add(v);
  const ve = new Ie(t, "wireframe", a.getKey("sidebar/material/wireframe"));
  r.add(ve);
  const Le = new S(), fe = new Rt().setWidth("150px").setHeight("40px").setFontSize("12px").onChange(mt);
  fe.onKeyUp(function() {
    try {
      JSON.parse(fe.getValue()), fe.dom.classList.add("success"), fe.dom.classList.remove("fail");
    } catch {
      fe.dom.classList.remove("success"), fe.dom.classList.add("fail");
    }
  }), Le.add(new k(a.getKey("sidebar/material/userdata")).setClass("Label")), Le.add(fe), r.add(Le);
  const Re = new te(a.getKey("sidebar/material/export"));
  Re.setMarginLeft("120px"), Re.onClick(function() {
    const ne = t.selected;
    let le = (Array.isArray(ne.material) ? ne.material[n] : ne.material).toJSON();
    try {
      le = JSON.stringify(le, null, "	"), le = le.replace(/[\n\t]+([\d\.e\-\[\]]+)/g, "$1");
    } catch {
      le = JSON.stringify(le);
    }
    t.utils.save(new Blob([le]), `${g.getValue() || "material"}.json`);
  }), r.add(Re);
  function mt() {
    const ne = n;
    n = parseInt(i.getValue()), n !== ne && t.signals.materialChanged.dispatch(s, n);
    let de = t.getObjectMaterial(s, n);
    if (de) {
      if (de.uuid !== void 0 && de.uuid !== m.getValue() && t.execute(new Ve(t, s, "uuid", m.getValue(), n)), de.type !== d.getValue()) {
        de = new vs[d.getValue()](), de.type === "RawShaderMaterial" && (de.vertexShader = Cs + de.vertexShader);
        const le = s.material;
        if (de.type === "MeshPhysicalMaterial" && le.type === "MeshStandardMaterial") {
          const At = [
            "color",
            "emissive",
            "roughness",
            "metalness",
            "map",
            "emissiveMap",
            "alphaMap",
            "bumpMap",
            "normalMap",
            "normalScale",
            "displacementMap",
            "roughnessMap",
            "metalnessMap",
            "envMap",
            "lightMap",
            "aoMap",
            "side"
          ];
          for (const St of At) {
            const ut = le[St];
            ut !== null && (ut.clone !== void 0 ? de[St] = ut.clone() : de[St] = ut);
          }
        }
        Array.isArray(le) ? t.removeMaterial(le[n]) : t.removeMaterial(le), t.execute(new Lt(t, s, de, n), a.getKey("command/SetMaterial") + ": " + d.getValue()), t.addMaterial(de);
      }
      try {
        const le = JSON.parse(fe.getValue());
        JSON.stringify(de.userData) != JSON.stringify(le) && t.execute(new Ve(t, s, "userData", le, n));
      } catch (le) {
        console.warn(le);
      }
      Ct();
    }
  }
  function ua() {
    const ne = s.material;
    Array.isArray(ne) ? l.setDisplay("") : l.setDisplay("none");
  }
  function Ct() {
    if (!s) return;
    let ne = s.material;
    if (Array.isArray(ne)) {
      const de = {};
      n = Math.max(0, Math.min(ne.length, n));
      for (let le = 0; le < ne.length; le++)
        de[le] = String(le + 1) + ": " + ne[le].name;
      i.setOptions(de).setValue(n);
    }
    ne = t.getObjectMaterial(s, n), ne.uuid !== void 0 && m.setValue(ne.uuid), ne.name !== void 0 && g.setValue(ne.name), s.isMesh ? d.setOptions(Ss) : s.isSprite ? d.setOptions(js) : s.isPoints ? d.setOptions(Ts) : s.isLine && d.setOptions(Ms), d.setValue(ne.type), ua();
    try {
      fe.setValue(JSON.stringify(ne.userData, null, "  "));
    } catch (de) {
      console.log(de);
    }
    fe.setBorderColor("transparent"), fe.setBackgroundColor("");
  }
  return e.objectSelected.add(function(ne) {
    let de = !1;
    ne && ne.material && (de = !0, Array.isArray(ne.material) && ne.material.length === 0 && (de = !1)), de ? (s = ne, Ct(), r.setDisplay("")) : (s = null, r.setDisplay("none"));
  }), e.materialChanged.add(Ct), r;
}
const vs = {
  LineBasicMaterial: h.LineBasicMaterial,
  LineDashedMaterial: h.LineDashedMaterial,
  MeshBasicMaterial: h.MeshBasicMaterial,
  MeshDepthMaterial: h.MeshDepthMaterial,
  MeshNormalMaterial: h.MeshNormalMaterial,
  MeshLambertMaterial: h.MeshLambertMaterial,
  MeshMatcapMaterial: h.MeshMatcapMaterial,
  MeshPhongMaterial: h.MeshPhongMaterial,
  MeshToonMaterial: h.MeshToonMaterial,
  MeshStandardMaterial: h.MeshStandardMaterial,
  MeshPhysicalMaterial: h.MeshPhysicalMaterial,
  RawShaderMaterial: h.RawShaderMaterial,
  ShaderMaterial: h.ShaderMaterial,
  ShadowMaterial: h.ShadowMaterial,
  SpriteMaterial: h.SpriteMaterial,
  PointsMaterial: h.PointsMaterial
}, Cs = [
  "uniform mat4 projectionMatrix;",
  `uniform mat4 modelViewMatrix;
`,
  `attribute vec3 position;

`
].join(`
`), Ss = {
  MeshBasicMaterial: "MeshBasicMaterial",
  MeshDepthMaterial: "MeshDepthMaterial",
  MeshNormalMaterial: "MeshNormalMaterial",
  MeshLambertMaterial: "MeshLambertMaterial",
  MeshMatcapMaterial: "MeshMatcapMaterial",
  MeshPhongMaterial: "MeshPhongMaterial",
  MeshToonMaterial: "MeshToonMaterial",
  MeshStandardMaterial: "MeshStandardMaterial",
  MeshPhysicalMaterial: "MeshPhysicalMaterial",
  RawShaderMaterial: "RawShaderMaterial",
  ShaderMaterial: "ShaderMaterial",
  ShadowMaterial: "ShadowMaterial"
}, Ms = {
  LineBasicMaterial: "LineBasicMaterial",
  LineDashedMaterial: "LineDashedMaterial",
  RawShaderMaterial: "RawShaderMaterial",
  ShaderMaterial: "ShaderMaterial"
}, js = {
  SpriteMaterial: "SpriteMaterial",
  RawShaderMaterial: "RawShaderMaterial",
  ShaderMaterial: "ShaderMaterial"
}, Ts = {
  PointsMaterial: "PointsMaterial",
  RawShaderMaterial: "RawShaderMaterial",
  ShaderMaterial: "ShaderMaterial"
};
function Vs(t) {
  const e = t.strings, a = t.signals, s = new q();
  s.setBorderTop("0"), s.setPaddingTop("20px"), s.setDisplay("none");
  const n = new S();
  s.add(n);
  const r = new te(e.getKey("sidebar/script/new"));
  r.onClick(function() {
    const i = { name: "", source: "function update( event ) {}" };
    t.execute(new $t(t, t.selected, i));
  }), s.add(r);
  function l() {
    n.clear(), n.setDisplay("none");
    const i = t.selected;
    if (i === null)
      return;
    const c = t.scripts[i.uuid];
    if (c !== void 0 && c.length > 0) {
      n.setDisplay("block");
      for (let d = 0; d < c.length; d++)
        (function(p, m) {
          const o = new Ee(m.name).setWidth("130px").setFontSize("12px");
          o.onChange(function() {
            t.execute(new Et(t, t.selected, m, "name", this.getValue()));
          }), n.add(o);
          const u = new te(e.getKey("sidebar/script/edit"));
          u.setMarginLeft("4px"), u.onClick(function() {
            a.editScript.dispatch(p, m);
          }), n.add(u);
          const g = new te(e.getKey("sidebar/script/remove"));
          g.setMarginLeft("4px"), g.onClick(function() {
            confirm(e.getKey("prompt/script/remove")) && t.execute(new Zt(t, t.selected, m));
          }), n.add(g), n.add(new Se());
        })(i, c[d]);
    }
  }
  return a.objectSelected.add(function(i) {
    i !== null && t.camera !== i ? (s.setDisplay("block"), l()) : s.setDisplay("none");
  }), a.scriptAdded.add(l), a.scriptRemoved.add(l), a.scriptChanged.add(l), s;
}
function Rs(t) {
  const e = t.strings, a = new _t();
  a.setId("properties"), a.addTab("objectTab", e.getKey("sidebar/properties/object"), new ms(t)), a.addTab("geometryTab", e.getKey("sidebar/properties/geometry"), new hs(t)), a.addTab("materialTab", e.getKey("sidebar/properties/material"), new xs(t)), a.addTab("scriptTab", e.getKey("sidebar/properties/script"), new Vs(t)), a.select("objectTab");
  function s(c, d) {
    return c.find(function(p) {
      return p.dom.id === d;
    });
  }
  const n = s(a.tabs, "geometryTab"), r = s(a.tabs, "materialTab"), l = s(a.tabs, "scriptTab");
  function i(c) {
    a.setHidden(c === null), c !== null && (n.setHidden(!c.geometry), r.setHidden(!c.material), l.setHidden(c === t.camera), a.selected === "geometryTab" ? a.select(n.isHidden() ? "objectTab" : "geometryTab") : a.selected === "materialTab" ? a.select(r.isHidden() ? "objectTab" : "materialTab") : a.selected === "scriptTab" && a.select(l.isHidden() ? "objectTab" : "scriptTab"));
  }
  return t.signals.objectSelected.add(i), i(t.selected), a;
}
function _s(t) {
  const e = t.config, a = t.signals, s = t.strings, n = t.utils.save, r = new q();
  r.setId("app");
  const l = new S();
  l.add(new k(s.getKey("sidebar/project/app").toUpperCase())), r.add(l);
  const i = new S(), c = new Ee(e.getKey("project/title")).setLeft("100px").setWidth("150px").onChange(function() {
    e.setKey("project/title", this.getValue());
  });
  i.add(new k(s.getKey("sidebar/project/app/title")).setClass("Label")), i.add(c), r.add(i);
  const d = new S(), p = new Ne(e.getKey("project/editable")).setLeft("100px").onChange(function() {
    e.setKey("project/editable", this.getValue());
  });
  d.add(new k(s.getKey("sidebar/project/app/editable")).setClass("Label")), d.add(p), r.add(d);
  let m = !1;
  const o = new te(s.getKey("sidebar/project/app/play"));
  o.setWidth("170px"), o.setMarginLeft("120px"), o.setMarginBottom("10px"), o.onClick(function() {
    m === !1 ? (m = !0, o.setTextContent(s.getKey("sidebar/project/app/stop")), a.startPlayer.dispatch()) : (m = !1, o.setTextContent(s.getKey("sidebar/project/app/play")), a.stopPlayer.dispatch());
  }), r.add(o);
  const u = new te(s.getKey("sidebar/project/app/publish"));
  return u.setWidth("170px"), u.setMarginLeft("120px"), u.setMarginBottom("10px"), u.onClick(function() {
    const g = {}, b = e.getKey("project/renderer/type");
    let w = t.toJSON();
    w.metadata.type = "App", delete w.history, w = JSON.stringify(w, null, "	"), w = w.replace(/[\n\t]+([\d\.e\-\[\]]+)/g, "$1"), g["app.json"] = ze(w);
    const f = e.getKey("project/title"), C = new h.LoadingManager(function() {
      const L = fa(g, { level: 9 }), M = new Blob([L.buffer], { type: "application/zip" });
      n(M, (f !== "" ? f : "untitled") + ".zip");
    }), O = new h.FileLoader(C);
    O.load("js/libs/app/index.html", function(L) {
      L = L.replace("<!-- title -->", f);
      const y = JSON.stringify({
        WebGLRenderer: {
          imports: {
            three: "./js/three.module.js"
          }
        },
        WebGPURenderer: {
          imports: {
            three: "./js/three.webgpu.js",
            "three/webgpu": "./js/three.webgpu.js"
          }
        }
      }[b], null, "	");
      L = L.replace("<!-- importmap -->", qt(`
` + qt(y, 1) + `
`, 2));
      let j = "";
      e.getKey("project/editable") && (j = [
        "			let button = document.createElement( 'a' );",
        "			button.href = 'https://threejs.org/editor/#file=' + location.href.split( '/' ).slice( 0, - 1 ).join( '/' ) + '/app.json';",
        "			button.style.cssText = 'position: absolute; bottom: 20px; right: 20px; padding: 10px 16px; color: #fff; border: 1px solid #fff; border-radius: 20px; text-decoration: none;';",
        "			button.target = '_blank';",
        "			button.textContent = 'EDIT';",
        "			document.body.appendChild( button );"
      ].join(`
`)), L = L.replace("			/* edit button */", j), g["index.html"] = ze(L);
    }), O.load("js/libs/app.js", function(L) {
      g["js/app.js"] = ze(L);
    }), O.load("../build/three.core.js", function(L) {
      g["js/three.core.js"] = ze(L);
    }), b === "WebGPURenderer" ? O.load("../build/three.webgpu.js", function(L) {
      g["js/three.webgpu.js"] = ze(L);
    }) : O.load("../build/three.module.js", function(L) {
      g["js/three.module.js"] = ze(L);
    });
  }), r.add(u), a.editorCleared.add(function() {
    c.setValue(""), e.setKey("project/title", "");
  }), r;
}
function qt(t, e, a = "	") {
  return t.split(`
`).map((s) => a.repeat(e) + s).join(`
`);
}
function ks(t) {
  const e = t.config, a = t.signals, s = t.strings;
  let n = null;
  const r = new q();
  r.setBorderTop("0px");
  const l = new S();
  r.add(l), l.add(new k(s.getKey("sidebar/project/camera")).setClass("Label"));
  const i = new pe().setOptions({
    perspective: "Perspective",
    orthographic: "Orthographic"
  }).setWidth("150px").onChange(function() {
    t.setCameraType(this.getValue());
  });
  i.setValue(e.getKey("project/camera")), l.add(i), e.getKey("project/camera") === "orthographic" && t.setCameraType("orthographic");
  const c = new S();
  r.add(c), c.add(new k(s.getKey("sidebar/project/renderer")).setClass("Label"));
  const d = new pe().setOptions({
    WebGLRenderer: "WebGL",
    WebGPURenderer: "WebGPU"
  }).setWidth("150px").onChange(L);
  d.setValue(e.getKey("project/renderer/type")), c.add(d);
  const p = new S();
  r.add(p), p.add(new k(s.getKey("sidebar/project/antialias")).setClass("Label"));
  const m = new We(e.getKey("project/renderer/antialias")).onChange(L);
  p.add(m);
  const o = new S();
  r.add(o), o.add(new k(s.getKey("sidebar/project/shadows")).setClass("Label"));
  const u = new We(e.getKey("project/renderer/shadows")).onChange(b);
  o.add(u);
  const g = new pe().setOptions({
    0: "Basic",
    1: "PCF",
    3: "VSM"
  }).setWidth("125px").onChange(b);
  g.setValue(e.getKey("project/renderer/shadowType")), o.add(g);
  function b() {
    n.shadowMap.enabled = u.getValue(), n.shadowMap.type = parseFloat(g.getValue()), a.rendererUpdated.dispatch();
  }
  const w = new S();
  r.add(w), w.add(new k(s.getKey("sidebar/project/toneMapping")).setClass("Label"));
  const f = new pe().setOptions({
    0: "No",
    1: "Linear",
    2: "Reinhard",
    3: "Cineon",
    4: "ACESFilmic",
    6: "AgX",
    7: "Neutral"
  }).setWidth("120px").onChange(O);
  f.setValue(e.getKey("project/renderer/toneMapping")), w.add(f);
  const C = new G(e.getKey("project/renderer/toneMappingExposure"));
  C.setDisplay(f.getValue() === "0" ? "none" : ""), C.setWidth("30px").setMarginLeft("10px"), C.setRange(0, 10), C.onChange(O), w.add(C);
  function O() {
    C.setDisplay(f.getValue() === "0" ? "none" : ""), n.toneMapping = parseFloat(f.getValue()), n.toneMappingExposure = C.getValue(), a.rendererUpdated.dispatch();
  }
  async function L() {
    const M = d.getValue(), y = m.getValue();
    M === "WebGPURenderer" ? (n = new ja({ antialias: y, reversedDepthBuffer: !0 }), await n.init()) : n = new h.WebGLRenderer({ antialias: y, reversedDepthBuffer: !0 }), n.shadowMap.enabled = u.getValue(), n.shadowMap.type = parseFloat(g.getValue()), n.toneMapping = parseFloat(f.getValue()), n.toneMappingExposure = C.getValue(), a.rendererCreated.dispatch(n), a.rendererUpdated.dispatch();
  }
  return L(), a.cameraResetted.add(function() {
    const M = t.camera.isOrthographicCamera ? "orthographic" : "perspective";
    i.setValue(M), e.setKey("project/camera", M);
  }), a.editorCleared.add(function() {
    n.shadowMap.enabled = !0, n.shadowMap.type = h.PCFShadowMap, n.toneMapping = h.NeutralToneMapping, n.toneMappingExposure = 1, u.setValue(n.shadowMap.enabled), g.setValue(n.shadowMap.type), f.setValue(n.toneMapping), C.setValue(n.toneMappingExposure), C.setDisplay(n.toneMapping === 0 ? "none" : ""), a.rendererUpdated.dispatch();
  }), a.rendererUpdated.add(function() {
    e.setKey(
      "project/renderer/type",
      d.getValue(),
      "project/renderer/antialias",
      m.getValue(),
      "project/renderer/shadows",
      u.getValue(),
      "project/renderer/shadowType",
      parseFloat(g.getValue()),
      "project/renderer/toneMapping",
      parseFloat(f.getValue()),
      "project/renderer/toneMappingExposure",
      C.getValue()
    );
  }), r;
}
function Ls(t) {
  const e = t.signals, a = t.strings, s = new _t(), n = new q();
  n.dom.style.borderTop = "none";
  const r = new jt();
  r.dom.style.height = "140px", r.dom.style.resize = "vertical", r.dom.style.marginBottom = "10px", n.add(r);
  const l = new te(a.getKey("sidebar/project/Assign"));
  n.add(l);
  const i = new k();
  i.dom.style.float = "right", n.add(i), l.onClick(function() {
    const y = t.selected;
    if (y !== null && y.geometry !== void 0) {
      const j = r.getValue(), A = Object.values(t.geometries).find((P) => P.id === parseInt(j));
      A !== void 0 && t.execute(new Qt(t, y, A));
    }
  }), s.addTab("geometries", a.getKey("sidebar/project/geometries"), n);
  const c = new q();
  c.dom.style.borderTop = "none";
  const d = new jt();
  d.dom.style.height = "140px", d.dom.style.resize = "vertical", d.dom.style.marginBottom = "10px", c.add(d);
  const p = new te(a.getKey("sidebar/project/Assign"));
  c.add(p);
  const m = new k();
  m.dom.style.float = "right", c.add(m), p.onClick(function() {
    const y = t.selected;
    if (y !== null && y.material !== void 0) {
      const j = d.getValue(), A = Object.values(t.materials).find((P) => P.id === parseInt(j));
      A !== void 0 && t.execute(new Lt(t, y, A));
    }
  }), s.addTab("materials", a.getKey("sidebar/project/materials"), c);
  const o = new q();
  o.dom.style.borderTop = "none";
  const u = new jt();
  u.dom.style.height = "140px", u.dom.style.resize = "vertical", u.dom.style.marginBottom = "10px", o.add(u);
  const g = new k();
  g.dom.style.float = "right", o.add(g), s.addTab("textures", a.getKey("sidebar/project/textures"), o), s.select("geometries");
  function b() {
    const y = Object.values(t.geometries);
    r.setItems(y), i.setValue(y.length + " " + a.getKey("sidebar/project/geometries").toLowerCase());
  }
  function w() {
    const y = Object.values(t.materials);
    d.setItems(y), m.setValue(y.length + " " + a.getKey("sidebar/project/materials").toLowerCase());
  }
  function f() {
    const y = [], j = [], R = /* @__PURE__ */ new Set(), A = Object.values(t.materials);
    for (const P of A)
      for (const x in P) {
        const T = P[x];
        T != null && T.isTexture === !0 && R.has(T.uuid) === !1 && (y.push(T), j.push(C(T)), R.add(T.uuid));
      }
    u.setItems(y, j), g.setValue(y.length + " " + a.getKey("sidebar/project/textures").toLowerCase());
  }
  function C(y) {
    return y.isCanvasTexture ? "CanvasTexture" : y.isVideoTexture ? "VideoTexture" : y.isCubeDepthTexture ? "CubeDepthTexture" : y.isDepthTexture ? "DepthTexture" : y.isCompressedArrayTexture ? "CompressedArrayTexture" : y.isCompressedCubeTexture ? "CompressedCubeTexture" : y.isCompressedTexture ? "CompressedTexture" : y.isCubeTexture ? "CubeTexture" : y.isData3DTexture ? "Data3DTexture" : y.isDataArrayTexture ? "DataArrayTexture" : y.isDataTexture ? "DataTexture" : y.isFramebufferTexture ? "FramebufferTexture" : "Texture";
  }
  function O() {
    b(), w(), f();
  }
  let L;
  function M() {
    clearTimeout(L), L = setTimeout(O, 100);
  }
  return e.editorCleared.add(M), e.sceneGraphChanged.add(M), e.geometryChanged.add(M), e.materialAdded.add(M), e.materialChanged.add(M), e.materialRemoved.add(M), e.objectSelected.add(function(y) {
    if (y !== null) {
      const j = Object.values(t.geometries), R = Object.values(t.materials);
      if (y.geometry !== void 0) {
        const A = j.indexOf(y.geometry);
        r.selectIndex(A);
      }
      if (y.material !== void 0) {
        const A = Array.isArray(y.material) ? y.material[0] : y.material, P = R.indexOf(A);
        d.selectIndex(P);
      }
    } else
      r.selectIndex(-1), d.selectIndex(-1);
  }), s;
}
function Os(t) {
  const e = new Pe();
  return e.add(new ks(t)), e.add(new _s(t)), e.add(new Ls(t)), e;
}
function Ps(t) {
  const e = t.strings, a = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
  function s(p) {
    return p.match(/^[A-Za-z0-9]$/i);
  }
  const n = t.config, r = t.signals, l = new q(), i = new S();
  i.add(new k(e.getKey("sidebar/settings/shortcuts").toUpperCase())), l.add(i);
  const c = ["translate", "rotate", "scale", "undo", "focus", "perspective", "orthographic"];
  function d(p) {
    const m = "settings/shortcuts/" + p, o = new S(), u = new Ee().setWidth("15px").setFontSize("12px");
    u.setTextAlign("center"), u.setTextTransform("lowercase"), u.onChange(function() {
      const g = u.getValue().toLowerCase();
      s(g) && n.setKey(m, g);
    }), u.dom.addEventListener("click", function() {
      u.dom.select();
    }), u.dom.addEventListener("blur", function() {
      s(u.getValue()) || u.setValue(n.getKey(m));
    }), u.dom.addEventListener("keyup", function(g) {
      s(g.key) && u.dom.blur();
    }), n.getKey(m) !== void 0 && u.setValue(n.getKey(m)), u.dom.maxLength = 1, o.add(new k(e.getKey("sidebar/settings/shortcuts/" + p)).setTextTransform("capitalize").setClass("Label")), o.add(u), l.add(o);
  }
  for (let p = 0; p < c.length; p++)
    d(c[p]);
  return document.addEventListener("keydown", function(p) {
    switch (p.key.toLowerCase()) {
      case "backspace":
        p.preventDefault();
      case "delete":
        const m = t.selected;
        if (m === null || m.parent === null) return;
        m.isSpotLight || m.isDirectionalLight ? t.execute(new dt(t, [
          new Ue(t, m),
          new Ue(t, m.target)
        ])) : t.execute(new Ue(t, m));
        break;
      case n.getKey("settings/shortcuts/translate"):
        r.transformModeChanged.dispatch("translate");
        break;
      case n.getKey("settings/shortcuts/rotate"):
        r.transformModeChanged.dispatch("rotate");
        break;
      case n.getKey("settings/shortcuts/scale"):
        r.transformModeChanged.dispatch("scale");
        break;
      case n.getKey("settings/shortcuts/undo"):
        (a ? p.metaKey : p.ctrlKey) && (p.preventDefault(), p.shiftKey ? t.redo() : t.undo());
        break;
      case n.getKey("settings/shortcuts/focus"):
        t.selected !== null && t.focus(t.selected);
        break;
      case n.getKey("settings/shortcuts/perspective"):
        t.setCameraType("perspective");
        break;
      case n.getKey("settings/shortcuts/orthographic"):
        t.setCameraType("orthographic");
        break;
    }
  }), l;
}
function Ds(t) {
  const e = t.strings, a = t.signals, s = t.config, n = t.history, r = new q();
  r.add(new k(e.getKey("sidebar/history").toUpperCase()));
  const l = new We(s.getKey("settings/history"), e.getKey("sidebar/history/persistent"));
  l.setPosition("absolute").setRight("8px"), l.onChange(function() {
    const m = this.getValue();
    if (s.setKey("settings/history", m), m) {
      alert(e.getKey("prompt/history/preserve"));
      const o = n.undos[n.undos.length - 1], u = o !== void 0 ? o.id : 0;
      t.history.enableSerialization(u);
    } else
      a.historyChanged.dispatch();
  }), r.add(l), r.add(new Se(), new Se());
  let i = !1;
  const c = new oa(t);
  c.onChange(function() {
    i = !0, t.history.goToState(parseInt(c.getValue())), i = !1;
  }), r.add(c), r.add(new Se());
  const d = new te(e.getKey("sidebar/history/clear"));
  d.onClick(function() {
    confirm(e.getKey("prompt/history/clear")) && t.history.clear();
  }), r.add(d);
  const p = function() {
    const m = [];
    function o(u) {
      const g = document.createElement("div");
      return g.value = u.id, g;
    }
    (function(g) {
      for (let b = 0, w = g.length; b < w; b++) {
        const f = g[b], C = o(f);
        C.innerHTML = "&nbsp;" + f.name, m.push(C);
      }
    })(n.undos), function(g) {
      for (let b = g.length - 1; b >= 0; b--) {
        const w = g[b], f = o(w);
        f.innerHTML = "&nbsp;" + w.name, f.style.opacity = 0.3, m.push(f);
      }
    }(n.redos), c.setOptions(m);
  };
  return p(), a.editorCleared.add(p), a.historyChanged.add(p), a.historyChanged.add(function(m) {
    i !== !0 && c.setValue(m !== void 0 ? m.id : null);
  }), r;
}
function Es(t) {
  const e = t.config, a = t.strings, s = new Pe(), n = new q();
  n.setBorderTop("0"), n.setPaddingTop("20px"), s.add(n);
  const r = Object.fromEntries(["en", "fr", "zh", "ja", "ko", "fa"].map((c) => [c, new Intl.DisplayNames(c, { type: "language" }).of(c)])), l = new S(), i = new pe().setWidth("150px");
  return i.setOptions(r), e.getKey("language") !== void 0 && i.setValue(e.getKey("language")), i.onChange(function() {
    const c = this.getValue();
    t.config.setKey("language", c);
  }), l.add(new k(a.getKey("sidebar/settings/language")).setClass("Label")), l.add(i), n.add(l), s.add(new Ps(t)), s.add(new Ds(t)), s;
}
function gr(t) {
  const e = t.strings, a = new _t();
  a.setId("sidebar");
  const s = new Rs(t), n = new Pe().add(
    new cs(t),
    s
  ), r = new Os(t), l = new Es(t);
  return a.addTab("scene", e.getKey("sidebar/scene"), n), a.addTab("project", e.getKey("sidebar/project"), r), a.addTab("settings", e.getKey("sidebar/settings"), l), a.select("scene"), new ResizeObserver(function() {
    s.tabsDiv.setWidth(getComputedStyle(a.dom).width);
  }).observe(a.tabsDiv.dom), a;
}
function hr(t) {
  const e = t.signals, a = t.strings, s = new q();
  s.setId("toolbar");
  const n = document.createElement("img");
  n.title = a.getKey("toolbar/translate"), n.src = "images/translate.svg";
  const r = new te();
  r.dom.className = "Button selected", r.dom.appendChild(n), r.onClick(function() {
    e.transformModeChanged.dispatch("translate");
  }), s.add(r);
  const l = document.createElement("img");
  l.title = a.getKey("toolbar/rotate"), l.src = "images/rotate.svg";
  const i = new te();
  i.dom.appendChild(l), i.onClick(function() {
    e.transformModeChanged.dispatch("rotate");
  }), s.add(i);
  const c = document.createElement("img");
  c.title = a.getKey("toolbar/scale"), c.src = "images/scale.svg";
  const d = new te();
  return d.dom.appendChild(c), d.onClick(function() {
    e.transformModeChanged.dispatch("scale");
  }), s.add(d), e.transformModeChanged.add(function(p) {
    switch (r.dom.classList.remove("selected"), i.dom.classList.remove("selected"), d.dom.classList.remove("selected"), p) {
      case "translate":
        r.dom.classList.add("selected");
        break;
      case "rotate":
        i.dom.classList.add("selected");
        break;
      case "scale":
        d.dom.classList.add("selected");
        break;
    }
  }), s;
}
class Ns extends h.EventDispatcher {
  constructor(e) {
    super(), this.enabled = !0, this.center = new h.Vector3(), this.panSpeed = 2e-3, this.zoomSpeed = 0.1, this.rotationSpeed = 5e-3;
    var a = this, s = new h.Vector3(), n = new h.Vector3(), r = new h.Box3(), l = { NONE: -1, ROTATE: 0, ZOOM: 1, PAN: 2 }, i = l.NONE, c = this.center, d = new h.Matrix3(), p = new h.Vector2(), m = new h.Vector2(), o = new h.Spherical(), u = new h.Sphere(), g = [], b = {}, w = null, f = { type: "change" };
    this.setCamera = function(_) {
      e = _;
    }, this.focus = function(_) {
      var B;
      r.setFromObject(_), r.isEmpty() === !1 ? (r.getCenter(c), B = r.getBoundingSphere(u).radius) : (c.setFromMatrixPosition(_.matrixWorld), B = 0.1), n.set(0, 0, 1), n.applyQuaternion(e.quaternion), n.multiplyScalar(B * 4), e.position.copy(c).add(n), e.isOrthographicCamera && (e.zoom = (e.top - e.bottom) / (B * 2), e.updateProjectionMatrix()), a.dispatchEvent(f);
    }, this.pan = function(_) {
      var B = e.isOrthographicCamera ? (e.top - e.bottom) / e.zoom : e.position.distanceTo(c);
      _.multiplyScalar(B * a.panSpeed), _.applyMatrix3(d.getNormalMatrix(e.matrix)), e.position.add(_), c.add(_), a.dispatchEvent(f);
    }, this.zoom = function(_) {
      if (e.isOrthographicCamera)
        e.zoom = Math.max(1e-4, e.zoom * Math.pow(0.95, _.z)), e.updateProjectionMatrix();
      else {
        var B = e.position.distanceTo(c);
        if (_.multiplyScalar(B * a.zoomSpeed), _.length() > B) return;
        _.applyMatrix3(d.getNormalMatrix(e.matrix)), e.position.add(_);
      }
      a.dispatchEvent(f);
    }, this.rotate = function(_) {
      s.copy(e.position).sub(c), o.setFromVector3(s), o.theta += _.x * a.rotationSpeed, o.phi += _.y * a.rotationSpeed, o.makeSafe(), s.setFromSpherical(o), e.position.copy(c).add(s), e.lookAt(c), a.dispatchEvent(f);
    };
    function C(_) {
      a.enabled !== !1 && (g.length === 0 && (w.setPointerCapture(_.pointerId), w.ownerDocument.addEventListener("pointermove", O), w.ownerDocument.addEventListener("pointerup", L)), !Z(_) && (re(_), _.pointerType === "touch" ? N(_) : M(_)));
    }
    function O(_) {
      a.enabled !== !1 && (_.pointerType === "touch" ? ee(_) : y(_));
    }
    function L(_) {
      switch (X(_), g.length) {
        case 0:
          w.releasePointerCapture(_.pointerId), w.ownerDocument.removeEventListener("pointermove", O), w.ownerDocument.removeEventListener("pointerup", L);
          break;
        case 1:
          var B = g[0], $ = b[B];
          N({ pointerId: B, pageX: $.x, pageY: $.y });
          break;
      }
    }
    function M(_) {
      _.button === 0 ? i = l.ROTATE : _.button === 1 ? i = l.ZOOM : _.button === 2 && (i = l.PAN), m.set(_.clientX, _.clientY);
    }
    function y(_) {
      p.set(_.clientX, _.clientY);
      var B = p.x - m.x, $ = p.y - m.y;
      i === l.ROTATE ? a.rotate(n.set(-B, -$, 0)) : i === l.ZOOM ? a.zoom(n.set(0, 0, $)) : i === l.PAN && a.pan(n.set(-B, $, 0)), m.set(_.clientX, _.clientY);
    }
    function j() {
      i = l.NONE;
    }
    function R(_) {
      a.enabled !== !1 && (_.preventDefault(), a.zoom(n.set(0, 0, _.deltaY > 0 ? 1 : -1)));
    }
    function A(_) {
      _.preventDefault();
    }
    this.connect = function(_) {
      w !== null && this.disconnect(), w = _, w.addEventListener("contextmenu", A), w.addEventListener("dblclick", j), w.addEventListener("wheel", R, { passive: !1 }), w.addEventListener("pointerdown", C);
    }, this.disconnect = function() {
      w.removeEventListener("contextmenu", A), w.removeEventListener("dblclick", j), w.removeEventListener("wheel", R), w.removeEventListener("pointerdown", C), w = null;
    };
    var P = [new h.Vector3(), new h.Vector3(), new h.Vector3()], x = [new h.Vector3(), new h.Vector3(), new h.Vector3()], T = null;
    function N(_) {
      switch (ae(_), g.length) {
        case 1:
          P[0].set(_.pageX, _.pageY, 0).divideScalar(window.devicePixelRatio), P[1].set(_.pageX, _.pageY, 0).divideScalar(window.devicePixelRatio);
          break;
        case 2:
          var B = W(_);
          P[0].set(_.pageX, _.pageY, 0).divideScalar(window.devicePixelRatio), P[1].set(B.x, B.y, 0).divideScalar(window.devicePixelRatio), T = P[0].distanceTo(P[1]);
          break;
      }
      x[0].copy(P[0]), x[1].copy(P[1]);
    }
    function ee(_) {
      ae(_);
      function B(E, K) {
        var D = K[0];
        for (var F of K)
          D.distanceTo(E) > F.distanceTo(E) && (D = F);
        return D;
      }
      switch (g.length) {
        case 1:
          P[0].set(_.pageX, _.pageY, 0).divideScalar(window.devicePixelRatio), P[1].set(_.pageX, _.pageY, 0).divideScalar(window.devicePixelRatio), a.rotate(P[0].sub(B(P[0], x)).multiplyScalar(-1));
          break;
        case 2:
          var $ = W(_);
          P[0].set(_.pageX, _.pageY, 0).divideScalar(window.devicePixelRatio), P[1].set($.x, $.y, 0).divideScalar(window.devicePixelRatio);
          var Y = P[0].distanceTo(P[1]) / 10;
          a.zoom(n.set(0, 0, T - Y)), T = Y;
          var I = P[0].clone().sub(B(P[0], x)), J = P[1].clone().sub(B(P[1], x));
          I.x = -I.x, J.x = -J.x, a.pan(I.add(J));
          break;
      }
      x[0].copy(P[0]), x[1].copy(P[1]);
    }
    function re(_) {
      g.push(_.pointerId);
    }
    function X(_) {
      delete b[_.pointerId];
      for (var B = 0; B < g.length; B++)
        if (g[B] == _.pointerId) {
          g.splice(B, 1);
          return;
        }
    }
    function Z(_) {
      for (var B = 0; B < g.length; B++)
        if (g[B] == _.pointerId) return !0;
      return !1;
    }
    function ae(_) {
      var B = b[_.pointerId];
      B === void 0 && (B = new h.Vector2(), b[_.pointerId] = B), B.set(_.pageX, _.pageY);
    }
    function W(_) {
      var B = _.pointerId === g[0] ? g[1] : g[0];
      return b[B];
    }
  }
  fromJSON(e) {
    e.center !== void 0 && this.center.fromArray(e.center);
  }
  toJSON() {
    return {
      center: this.center.toArray()
    };
  }
}
function As(t) {
  const e = t.signals, a = new q();
  a.setPosition("absolute"), a.setRight("10px"), a.setTop("10px");
  const s = new pe();
  s.setMarginRight("10px"), s.onChange(function() {
    t.setViewportCamera(this.getValue());
  }), a.add(s), e.cameraAdded.add(l), e.cameraRemoved.add(l), e.objectChanged.add(function(i) {
    i.isCamera && r();
  });
  const n = new pe();
  n.setOptions({ realistic: "realistic", solid: "solid", normals: "normals", wireframe: "wireframe" }), n.setValue("solid"), n.onChange(function() {
    t.setViewportShading(this.getValue());
  }), a.add(n), e.editorCleared.add(function() {
    t.setViewportCamera(t.camera.uuid), n.setValue("solid"), t.setViewportShading(n.getValue());
  }), e.cameraResetted.add(l), l();
  function r() {
    const i = {}, c = t.cameras;
    for (const p in c) {
      const m = c[p];
      i[m.uuid] = m.name;
    }
    s.setOptions(i);
    const d = t.viewportCamera.uuid in i ? t.viewportCamera : t.camera;
    return s.setValue(d.uuid), d;
  }
  function l() {
    const i = r();
    t.setViewportCamera(i.uuid);
  }
  return a;
}
function Is(t) {
  const e = t.signals, a = t.strings, s = new q();
  s.setId("info"), s.setPosition("absolute"), s.setLeft("10px"), s.setBottom("50px"), s.setFontSize("12px"), s.setColor("#fff"), s.setTextTransform("lowercase");
  const n = new k("0").setTextAlign("right").setWidth("60px").setMarginRight("6px"), r = new k("0").setTextAlign("right").setWidth("60px").setMarginRight("6px"), l = new k("0").setTextAlign("right").setWidth("60px").setMarginRight("6px"), i = new k("0").setTextAlign("right").setWidth("60px").setMarginRight("6px"), c = new k("0").setTextAlign("right").setWidth("60px").setMarginRight("6px").setHidden(!0), d = new k(a.getKey("viewport/info/objects")), p = new k(a.getKey("viewport/info/vertices")), m = new k(a.getKey("viewport/info/triangles")), o = new k(a.getKey("viewport/info/samples")).setHidden(!0);
  s.add(n, d, new Se()), s.add(r, p, new Se()), s.add(l, m, new Se()), s.add(i, new k(a.getKey("viewport/info/rendertime")), new Se()), s.add(c, o, new Se()), e.objectAdded.add(g), e.objectRemoved.add(g), e.objectChanged.add(g), e.geometryChanged.add(g), e.sceneRendered.add(b);
  const u = new Intl.PluralRules(t.config.getKey("language"));
  function g() {
    const w = t.scene;
    let f = 0, C = 0, O = 0;
    for (let R = 0, A = w.children.length; R < A; R++)
      w.children[R].traverseVisible(function(x) {
        if (f++, x.isMesh || x.isPoints) {
          const T = x.geometry, N = T.attributes.position;
          N != null && (C += N.count), x.isMesh && (T.index !== null ? O += T.index.count / 3 : N != null && (O += N.count / 3));
        }
      });
    n.setValue(t.utils.formatNumber(f)), r.setValue(t.utils.formatNumber(C)), l.setValue(t.utils.formatNumber(O));
    const L = new Intl.PluralRules(t.config.getKey("language")), M = L.select(f) === "one" ? "viewport/info/object" : "viewport/info/objects";
    d.setValue(a.getKey(M));
    const y = L.select(C) === "one" ? "viewport/info/vertex" : "viewport/info/vertices";
    p.setValue(a.getKey(y));
    const j = L.select(O) === "one" ? "viewport/info/triangle" : "viewport/info/triangles";
    m.setValue(a.getKey(j));
  }
  function b(w) {
    i.setValue(Number(w).toFixed(2));
  }
  return t.signals.pathTracerUpdated.add(function(w) {
    w = Math.floor(w), c.setValue(w);
    const f = u.select(w) === "one" ? "viewport/info/sample" : "viewport/info/samples";
    o.setValue(a.getKey(f));
  }), t.signals.viewportShadingChanged.add(function() {
    const w = t.viewportShading === "realistic";
    c.setHidden(!w), o.setHidden(!w), s.setBottom(w ? "62px" : "50px");
  }), s;
}
class Ks extends Ra {
  constructor(e, a) {
    super(e, a.dom), this.location.top = 30;
    const s = new q();
    s.setId("viewHelper"), s.setPosition("absolute"), s.setRight("0px"), s.setTop("30px"), s.setHeight("128px"), s.setWidth("128px"), s.dom.addEventListener("pointerup", (n) => {
      n.stopPropagation(), this.handleClick(n);
    }), s.dom.addEventListener("pointerdown", function(n) {
      n.stopPropagation();
    }), a.add(s);
  }
}
class Us {
  constructor(e, a) {
    const s = e.selector, n = e.signals;
    let r = null, l = null, i = null;
    const c = new h.PerspectiveCamera(), d = async (o) => {
      e.camera.isPerspectiveCamera ? c.copy(e.camera) : (c.position.copy(e.camera.position), c.quaternion.copy(e.camera.quaternion));
      const u = document.getElementById("sidebar");
      if (u.style.width = "350px", u.style.height = "700px", r === null) {
        let f = function(A) {
          const P = A.target;
          O.userData.active = !1, L.userData.active = !1, P === O && (O.userData.active = !0, O.add(b)), P === L && (L.userData.active = !0, L.add(b)), w.setFromXRController(P);
          const x = s.getIntersects(w);
          x.length > 0 && x[0].object === l.children[0] || n.intersectionsDetected.dispatch(x);
        }, C = function(A) {
          const P = A.target;
          if (P.userData.active !== !1)
            switch (a.getRaycaster().setFromXRController(P), A.type) {
              case "selectstart":
                a.pointerDown(null);
                break;
              case "selectend":
                a.pointerUp(null);
                break;
              case "move":
                a.pointerHover(null), a.pointerMove(null);
                break;
            }
        };
        const g = new h.BufferGeometry();
        g.setAttribute("position", new h.Float32BufferAttribute([0, 0, 0, 0, 0, -5], 3));
        const b = new h.Line(g), w = new h.Raycaster();
        r = new h.Group();
        const O = i.xr.getController(0);
        O.addEventListener("select", f), O.addEventListener("selectstart", C), O.addEventListener("selectend", C), O.addEventListener("move", C), O.userData.active = !1, r.add(O);
        const L = i.xr.getController(1);
        L.addEventListener("select", f), L.addEventListener("selectstart", C), L.addEventListener("selectend", C), L.addEventListener("move", C), L.userData.active = !0, r.add(L);
        const M = new La(), y = i.xr.getControllerGrip(0);
        y.add(M.createControllerModel(y)), r.add(y);
        const j = i.xr.getControllerGrip(1);
        j.add(M.createControllerModel(j)), r.add(j), l = new ka();
        const R = new _a(u);
        R.name = "picker", R.position.set(0.5, 1, -0.5), R.rotation.y = -0.5, l.add(R), l.listenToXRControllerEvents(O), l.listenToXRControllerEvents(L);
      }
      e.sceneHelpers.add(l), e.sceneHelpers.add(r), i.xr.enabled = !0, i.xr.addEventListener("sessionend", p), await i.xr.setSession(o);
    }, p = async () => {
      e.sceneHelpers.remove(l), e.sceneHelpers.remove(r);
      const o = document.getElementById("sidebar");
      o.style.width = "", o.style.height = "", i.xr.removeEventListener("sessionend", p), i.xr.enabled = !1, e.camera.copy(c), n.windowResize.dispatch(), n.leaveXR.dispatch();
    }, m = { optionalFeatures: ["local-floor"] };
    n.enterXR.add((o) => {
      "xr" in navigator && navigator.xr.requestSession(o, m).then(d);
    }), n.offerXR.add(function(o) {
      "xr" in navigator && (navigator.xr.offerSession(o, m).then(d), n.leaveXR.add(function() {
        navigator.xr.offerSession(o, m).then(d);
      }));
    }), n.rendererCreated.add((o) => {
      i = o;
    });
  }
}
function br(t) {
  const e = t.selector, a = t.signals, s = new q();
  s.setId("viewport"), s.setPosition("absolute"), s.add(new As(t)), s.add(new Is(t));
  let n = null, r = null, l = null, i = t.camera;
  const c = t.scene, d = t.sceneHelpers, p = [10066329, 7829367], m = [5592405, 8947848], o = new h.Group(), u = new h.GridHelper(30, 30);
  u.material.color.setHex(p[0]), u.material.vertexColors = !1, o.add(u);
  const g = new h.GridHelper(30, 6);
  g.material.color.setHex(p[1]), g.material.vertexColors = !1, o.add(g);
  const b = new Ks(i, s), w = new h.Box3(), f = new h.Box3Helper(w);
  f.material.depthTest = !1, f.material.transparent = !0, f.visible = !1, d.add(f);
  let C = null, O = null, L = null;
  const M = new Va(i);
  M.addEventListener("axis-changed", function() {
    t.viewportShading !== "realistic" && F();
  }), M.addEventListener("objectChange", function() {
    a.objectChanged.dispatch(M.object);
  }), M.addEventListener("mouseDown", function() {
    const V = M.object;
    C = V.position.clone(), O = V.rotation.clone(), L = V.scale.clone(), Z.enabled = !1;
  }), M.addEventListener("mouseUp", function() {
    const V = M.object;
    if (V !== void 0)
      switch (M.getMode()) {
        case "translate":
          C.equals(V.position) || t.execute(new wt(t, V, V.position, C));
          break;
        case "rotate":
          O.equals(V.rotation) || t.execute(new Pt(t, V, V.rotation, O));
          break;
        case "scale":
          L.equals(V.scale) || t.execute(new Dt(t, V, V.scale, L));
          break;
      }
    Z.enabled = !0;
  }), d.add(M.getHelper()), new Us(t, M);
  function y() {
    for (const V in t.cameras) {
      const U = t.cameras[V], z = s.dom.offsetWidth / s.dom.offsetHeight;
      if (U.isPerspectiveCamera)
        U.aspect = z;
      else {
        const ie = U.top - U.bottom;
        U.left = -ie * z / 2, U.right = ie * z / 2;
      }
      U.updateProjectionMatrix();
      const Q = t.helpers[U.id];
      Q && Q.update();
    }
  }
  const j = new h.Vector2(), R = new h.Vector2(), A = new h.Vector2();
  function P(V, U, z) {
    const Q = V.getBoundingClientRect();
    return [(U - Q.left) / Q.width, (z - Q.top) / Q.height];
  }
  function x() {
    if (j.distanceTo(R) === 0) {
      const V = e.getPointerIntersects(R, i);
      a.intersectionsDetected.dispatch(V), F();
    }
  }
  function T(V) {
    if (V.target !== n.domElement) return;
    const U = P(s.dom, V.clientX, V.clientY);
    j.fromArray(U), document.addEventListener("mouseup", N);
  }
  function N(V) {
    const U = P(s.dom, V.clientX, V.clientY);
    R.fromArray(U), x(), document.removeEventListener("mouseup", N);
  }
  function ee(V) {
    const U = V.changedTouches[0], z = P(s.dom, U.clientX, U.clientY);
    j.fromArray(z), document.addEventListener("touchend", re);
  }
  function re(V) {
    const U = V.changedTouches[0], z = P(s.dom, U.clientX, U.clientY);
    R.fromArray(z), x(), document.removeEventListener("touchend", re);
  }
  function X(V) {
    const U = P(s.dom, V.clientX, V.clientY);
    A.fromArray(U);
    const z = e.getPointerIntersects(A, i);
    if (z.length > 0) {
      const Q = z[0];
      a.objectFocused.dispatch(Q.object);
    }
  }
  s.dom.addEventListener("mousedown", T), s.dom.addEventListener("touchstart", ee, { passive: !1 }), s.dom.addEventListener("dblclick", X);
  const Z = new Ns(i);
  Z.addEventListener("change", function() {
    a.cameraChanged.dispatch(i), a.refreshSidebarObject3D.dispatch(i);
  }), b.center = Z.center, t.controls = Z, a.editorCleared.add(function() {
    Z.center.set(0, 0, 0), l && l.reset(), $(), a.sceneEnvironmentChanged.dispatch(t.environmentType);
  }), a.transformModeChanged.add(function(V) {
    M.setMode(V), F();
  }), a.snapChanged.add(function(V) {
    M.setTranslationSnap(V);
  }), a.spaceChanged.add(function(V) {
    M.setSpace(V), F();
  }), a.rendererUpdated.add(function() {
    c.traverse(function(V) {
      V.material !== void 0 && (V.material.needsUpdate = !0);
    }), F();
  }), a.rendererCreated.add(function(V) {
    if (n !== null) {
      n.setAnimationLoop(null);
      try {
        r.dispose();
      } catch (U) {
        console.warn("PMREMGenerator dispose error:", U);
      }
      n.dispose(), s.dom.removeChild(n.domElement);
    }
    if (Z.connect(V.domElement), M.connect(V.domElement), n = V, n.setAnimationLoop(B), n.setClearColor(11184810), window.matchMedia) {
      const U = window.matchMedia("(prefers-color-scheme: dark)");
      U.addEventListener("change", function(z) {
        n.setClearColor(z.matches ? 3355443 : 11184810), Xt(u, g, z.matches ? m : p), F();
      }), n.setClearColor(U.matches ? 3355443 : 11184810), Xt(u, g, U.matches ? m : p);
    }
    n.getClearColor(t.viewportColor), n.setPixelRatio(window.devicePixelRatio), n.setSize(s.dom.offsetWidth, s.dom.offsetHeight), n.isWebGLRenderer ? (r = new h.PMREMGenerator(n), r.compileEquirectangularShader(), l = new na(n)) : (r = new Ta(n), l = null), s.dom.appendChild(n.domElement), a.sceneEnvironmentChanged.dispatch(t.environmentType), F();
  }), a.rendererDetectKTX2Support.add(function(V) {
    V.detectSupport(n);
  }), a.sceneGraphChanged.add(function() {
    $(), F();
  }), a.cameraChanged.add(function() {
    l && l.reset(), F();
  }), a.objectSelected.add(function(V) {
    f.visible = !1, M.detach(), V !== null && V !== c && V !== i && (w.setFromObject(V, !0), w.isEmpty() === !1 && (f.visible = !0), M.attach(V)), F();
  }), a.objectFocused.add(function(V) {
    Z.focus(V);
  }), a.geometryChanged.add(function(V) {
    V !== void 0 && w.setFromObject(V, !0), $(), F();
  }), a.objectChanged.add(function(V) {
    t.selected === V && w.setFromObject(V, !0), V.isPerspectiveCamera && V.updateProjectionMatrix();
    const U = t.helpers[V.id];
    U !== void 0 && U.isSkeletonHelper !== !0 && U.update();
    for (const z in t.helpers) {
      const Q = t.helpers[z];
      Q.light && Q.light.target === V && Q.update();
    }
    $(), F();
  }), a.objectRemoved.add(function(V) {
    Z.enabled = !0, V === M.object && M.detach();
  }), a.materialChanged.add(function() {
    J(), F();
  }), a.sceneBackgroundChanged.add(function(V, U, z, Q, ie, Ce, Oe, he) {
    switch (t.backgroundType = V, c.background = null, V) {
      case "Color":
        c.background = new h.Color(U);
        break;
      case "Texture":
        z && (z.colorSpace = ie, z.needsUpdate = !0, c.background = z);
        break;
      case "Equirectangular":
        Q && (Q.mapping = h.EquirectangularReflectionMapping, Q.colorSpace = ie, Q.needsUpdate = !0, c.background = Q, c.backgroundBlurriness = Ce, c.backgroundIntensity = Oe, c.backgroundRotation.y = he * h.MathUtils.DEG2RAD);
        break;
    }
    ae && a.sceneEnvironmentChanged.dispatch(t.environmentType), Y(), F();
  });
  let ae = !1;
  a.sceneEnvironmentChanged.add(function(V, U) {
    switch (t.environmentType = V, c.environment = null, ae = !1, V) {
      case "Equirectangular":
        U && (c.environment = U, c.environment.mapping = h.EquirectangularReflectionMapping);
        break;
      case "Default":
        ae = !0, c.background !== null ? c.background.isColor ? c.environment = r.fromScene(new Oa(c.background), 0.04).texture : c.background.isTexture && (c.environment = c.background, c.environment.mapping = h.EquirectangularReflectionMapping, c.environmentRotation.y = c.backgroundRotation.y) : c.environment = r.fromScene(new Pa(), 0.04).texture;
        break;
    }
    I(), F();
  }), a.sceneFogChanged.add(function(V, U, z, Q, ie) {
    switch (V) {
      case "None":
        c.fog = null;
        break;
      case "Fog":
        c.fog = new h.Fog(U, z, Q);
        break;
      case "FogExp2":
        c.fog = new h.FogExp2(U, ie);
        break;
    }
    F();
  }), a.sceneFogSettingsChanged.add(function(V, U, z, Q, ie) {
    switch (V) {
      case "Fog":
        c.fog.color.setHex(U), c.fog.near = z, c.fog.far = Q;
        break;
      case "FogExp2":
        c.fog.color.setHex(U), c.fog.density = ie;
        break;
    }
    F();
  }), a.viewportCameraChanged.add(function() {
    const V = t.viewportCamera;
    (V.isPerspectiveCamera || V.isOrthographicCamera) && y(), Z.enabled = V === t.camera, $(), F();
  }), a.viewportShadingChanged.add(function() {
    switch (t.viewportShading) {
      case "realistic":
        l && l.init(c, t.viewportCamera);
        break;
      case "solid":
        c.overrideMaterial = null;
        break;
      case "normals":
        c.overrideMaterial = new h.MeshNormalMaterial();
        break;
      case "wireframe":
        c.overrideMaterial = new h.MeshBasicMaterial({ color: 0, wireframe: !0 });
        break;
    }
    F();
  }), a.windowResize.add(function() {
    y(), n !== null && (n.setSize(s.dom.offsetWidth, s.dom.offsetHeight), l && l.setSize(s.dom.offsetWidth, s.dom.offsetHeight), F());
  }), a.showHelpersChanged.add(function(V) {
    o.visible = V.gridHelper, d.traverse(function(U) {
      switch (U.type) {
        case "CameraHelper": {
          U.visible = V.cameraHelpers;
          break;
        }
        case "PointLightHelper":
        case "DirectionalLightHelper":
        case "SpotLightHelper":
        case "HemisphereLightHelper": {
          U.visible = V.lightHelpers;
          break;
        }
        case "SkeletonHelper": {
          U.visible = V.skeletonHelpers;
          break;
        }
      }
    }), F();
  }), a.cameraResetted.add(function() {
    i !== t.camera && (i = t.camera, Z.setCamera(i), M.camera = i, b.camera = i), y(), F();
  });
  let W = 0;
  const _ = new h.Timer();
  function B() {
    _.update();
    const V = t.mixer, U = _.getDelta();
    let z = !1;
    const Q = V.stats.actions;
    (Q.inUse > 0 || W > 0) && (W = Q.inUse, V.update(U), z = !0, t.selected !== null && (t.selected.updateWorldMatrix(!1, !0), f.box.setFromObject(t.selected, !0)), a.morphTargetsUpdated.dispatch()), b.animating === !0 && (b.update(U), z = !0), n.xr.isPresenting === !0 && (z = !0), z === !0 && F(), E();
  }
  function $() {
    l && t.viewportShading === "realistic" && l.init(c, t.viewportCamera);
  }
  function Y() {
    l && t.viewportShading === "realistic" && l.setBackground(c.background, c.backgroundBlurriness);
  }
  function I() {
    l && t.viewportShading === "realistic" && l.setEnvironment(c.environment);
  }
  function J() {
    l && t.viewportShading === "realistic" && l.updateMaterials();
  }
  function E() {
    l && t.viewportShading === "realistic" && (l.update(), t.signals.pathTracerUpdated.dispatch(l.getSamples()));
  }
  let K = 0, D = 0;
  function F() {
    n !== null && (K = performance.now(), n.setViewport(0, 0, s.dom.offsetWidth, s.dom.offsetHeight), n.render(c, t.viewportCamera), i === t.viewportCamera && (n.autoClear = !1, o.visible === !0 && n.render(o, i), d.visible === !0 && n.render(d, i), n.xr.isPresenting !== !0 && b.render(n), n.autoClear = !0), D = performance.now(), t.signals.sceneRendered.dispatch(D - K));
  }
  return s;
}
function Xt(t, e, a) {
  t.material.color.setHex(a[0]), e.material.color.setHex(a[1]);
}
export {
  ir as A,
  Wa as E,
  cr as M,
  mr as P,
  ur as R,
  Qt as S,
  hr as T,
  oe as U,
  br as V,
  S as a,
  G as b,
  k as c,
  Ke as d,
  Ne as e,
  te as f,
  dr as g,
  Ee as h,
  lr as i,
  pe as j,
  or as k,
  pr as l,
  gr as m
};
//# sourceMappingURL=index-B2mjurVx.js.map
