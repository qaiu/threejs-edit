import * as u from "three";
import { U as p, a as r, b as U, c as o, d as f, S as I } from "./index-B2mjurVx.js";
function E(d, g) {
  const a = d.strings, h = d.signals, t = new p(), s = g.geometry.parameters, m = new r(), l = new U(s.radius).onChange(n);
  m.add(new o(a.getKey("sidebar/geometry/torus_geometry/radius")).setClass("Label")), m.add(l), t.add(m);
  const i = new r(), c = new U(s.tube).onChange(n);
  i.add(new o(a.getKey("sidebar/geometry/torus_geometry/tube")).setClass("Label")), i.add(c), t.add(i);
  const y = new r(), w = new f(s.radialSegments).setRange(1, 1 / 0).onChange(n);
  y.add(new o(a.getKey("sidebar/geometry/torus_geometry/radialsegments")).setClass("Label")), y.add(w), t.add(y);
  const b = new r(), C = new f(s.tubularSegments).setRange(1, 1 / 0).onChange(n);
  b.add(new o(a.getKey("sidebar/geometry/torus_geometry/tubularsegments")).setClass("Label")), b.add(C), t.add(b);
  const R = new r(), S = new U(s.arc * u.MathUtils.RAD2DEG).setUnit("°").setStep(10).onChange(n);
  R.add(new o(a.getKey("sidebar/geometry/torus_geometry/arc")).setClass("Label")), R.add(S), t.add(R);
  function V() {
    const e = g.geometry.parameters;
    l.setValue(e.radius), c.setValue(e.tube), w.setValue(e.radialSegments), C.setValue(e.tubularSegments), S.setValue(e.arc * u.MathUtils.RAD2DEG);
  }
  h.geometryChanged.add(function(e) {
    e === g && V();
  });
  function n() {
    d.execute(new I(d, g, new u.TorusGeometry(
      l.getValue(),
      c.getValue(),
      w.getValue(),
      C.getValue(),
      S.getValue() * u.MathUtils.DEG2RAD
    )));
  }
  return t;
}
export {
  E as GeometryParametersPanel
};
//# sourceMappingURL=Sidebar.Geometry.TorusGeometry-CYRNfaAF.js.map
