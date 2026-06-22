import * as w from "three";
import { U as f, a as c, b as p, c as u, d as I, S as h } from "./index-B2mjurVx.js";
function R(e, a) {
  const i = e.strings, l = e.signals, n = new f(), m = a.geometry.parameters, s = new c(), r = new p(m.radius).onChange(g);
  s.add(new u(i.getKey("sidebar/geometry/dodecahedron_geometry/radius")).setClass("Label")), s.add(r), n.add(s);
  const o = new c(), d = new I(m.detail).setRange(0, 1 / 0).onChange(g);
  o.add(new u(i.getKey("sidebar/geometry/dodecahedron_geometry/detail")).setClass("Label")), o.add(d), n.add(o);
  function y() {
    const t = a.geometry.parameters;
    r.setValue(t.radius), d.setValue(t.detail);
  }
  l.geometryChanged.add(function(t) {
    t === a && y();
  });
  function g() {
    e.execute(new h(e, a, new w.DodecahedronGeometry(
      r.getValue(),
      d.getValue()
    )));
  }
  return n;
}
export {
  R as GeometryParametersPanel
};
//# sourceMappingURL=Sidebar.Geometry.DodecahedronGeometry-Dy3iwIBL.js.map
