import * as w from "three";
import { U as f, a as c, b as I, c as u, d as p, S as h } from "./index-B2mjurVx.js";
function R(e, a) {
  const i = e.strings, l = e.signals, s = new f(), m = a.geometry.parameters, n = new c(), r = new I(m.radius).onChange(g);
  n.add(new u(i.getKey("sidebar/geometry/icosahedron_geometry/radius")).setClass("Label")), n.add(r), s.add(n);
  const o = new c(), d = new p(m.detail).setRange(0, 1 / 0).onChange(g);
  o.add(new u(i.getKey("sidebar/geometry/icosahedron_geometry/detail")).setClass("Label")), o.add(d), s.add(o);
  function y() {
    const t = a.geometry.parameters;
    r.setValue(t.radius), d.setValue(t.detail);
  }
  l.geometryChanged.add(function(t) {
    t === a && y();
  });
  function g() {
    e.execute(new h(e, a, new w.IcosahedronGeometry(
      r.getValue(),
      d.getValue()
    )));
  }
  return s;
}
export {
  R as GeometryParametersPanel
};
//# sourceMappingURL=Sidebar.Geometry.IcosahedronGeometry-eTHFYUPT.js.map
