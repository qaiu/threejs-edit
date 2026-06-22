import * as w from "three";
import { U as f, a as u, b as p, c as l, d as I, S as h } from "./index-B2mjurVx.js";
function R(e, a) {
  const i = e.strings, y = e.signals, n = new f(), m = a.geometry.parameters, s = new u(), r = new p(m.radius).onChange(g);
  s.add(new l(i.getKey("sidebar/geometry/tetrahedron_geometry/radius")).setClass("Label")), s.add(r), n.add(s);
  const o = new u(), d = new I(m.detail).setRange(0, 1 / 0).onChange(g);
  o.add(new l(i.getKey("sidebar/geometry/tetrahedron_geometry/detail")).setClass("Label")), o.add(d), n.add(o);
  function c() {
    const t = a.geometry.parameters;
    r.setValue(t.radius), d.setValue(t.detail);
  }
  y.geometryChanged.add(function(t) {
    t === a && c();
  });
  function g() {
    e.execute(new h(e, a, new w.TetrahedronGeometry(
      r.getValue(),
      d.getValue()
    )));
  }
  return n;
}
export {
  R as GeometryParametersPanel
};
//# sourceMappingURL=Sidebar.Geometry.TetrahedronGeometry-BX92CzJB.js.map
