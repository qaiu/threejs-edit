import * as h from "three";
import { U, a as o, b as R, c as r, d as u, S as L } from "./index-B2mjurVx.js";
function x(d, g) {
  const a = d.strings, S = d.signals, t = new U(), s = g.geometry.parameters, m = new o(), l = new R(s.radius).onChange(n);
  m.add(new r(a.getKey("sidebar/geometry/torusKnot_geometry/radius")).setClass("Label")), m.add(l), t.add(m);
  const i = new o(), w = new R(s.tube).onChange(n);
  i.add(new r(a.getKey("sidebar/geometry/torusKnot_geometry/tube")).setClass("Label")), i.add(w), t.add(i);
  const y = new o(), c = new u(s.tubularSegments).setRange(1, 1 / 0).onChange(n);
  y.add(new r(a.getKey("sidebar/geometry/torusKnot_geometry/tubularsegments")).setClass("Label")), y.add(c), t.add(y);
  const b = new o(), C = new u(s.radialSegments).setRange(1, 1 / 0).onChange(n);
  b.add(new r(a.getKey("sidebar/geometry/torusKnot_geometry/radialsegments")).setClass("Label")), b.add(C), t.add(b);
  const p = new o(), K = new u(s.p).onChange(n);
  p.add(new r(a.getKey("sidebar/geometry/torusKnot_geometry/p")).setClass("Label")), p.add(K), t.add(p);
  const V = new o(), f = new u(s.q).onChange(n);
  V.add(new r(a.getKey("sidebar/geometry/torusKnot_geometry/q")).setClass("Label")), V.add(f), t.add(V);
  function I() {
    const e = g.geometry.parameters;
    l.setValue(e.radius), w.setValue(e.tube), c.setValue(e.tubularSegments), C.setValue(e.radialSegments), K.setValue(e.p), f.setValue(e.q);
  }
  S.geometryChanged.add(function(e) {
    e === g && I();
  });
  function n() {
    d.execute(new L(d, g, new h.TorusKnotGeometry(
      l.getValue(),
      w.getValue(),
      c.getValue(),
      C.getValue(),
      K.getValue(),
      f.getValue()
    )));
  }
  return t;
}
export {
  x as GeometryParametersPanel
};
//# sourceMappingURL=Sidebar.Geometry.TorusKnotGeometry-CaQjVx3-.js.map
