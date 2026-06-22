import * as e from "three";
import { U as p, a as d, b as D, c as i, d as f, S as G } from "./index-B2mjurVx.js";
function L(s, n) {
  const r = s.strings, R = s.signals, a = new p(), o = n.geometry.parameters, m = new d(), l = new D(o.radius).onChange(g);
  m.add(new i(r.getKey("sidebar/geometry/circle_geometry/radius")).setClass("Label")), m.add(l), a.add(m);
  const c = new d(), h = new f(o.segments).setRange(3, 1 / 0).onChange(g);
  c.add(new i(r.getKey("sidebar/geometry/circle_geometry/segments")).setClass("Label")), c.add(h), a.add(c);
  const u = new d(), y = new D(o.thetaStart * e.MathUtils.RAD2DEG).setUnit("°").setStep(10).onChange(g);
  u.add(new i(r.getKey("sidebar/geometry/circle_geometry/thetastart")).setClass("Label")), u.add(y), a.add(u);
  const w = new d(), U = new D(o.thetaLength * e.MathUtils.RAD2DEG).setUnit("°").setStep(10).onChange(g);
  w.add(new i(r.getKey("sidebar/geometry/circle_geometry/thetalength")).setClass("Label")), w.add(U), a.add(w);
  function C() {
    const t = n.geometry.parameters;
    l.setValue(t.radius), h.setValue(t.segments), y.setValue(t.thetaStart * e.MathUtils.RAD2DEG), U.setValue(t.thetaLength * e.MathUtils.RAD2DEG);
  }
  R.geometryChanged.add(function(t) {
    t === n && C();
  });
  function g() {
    s.execute(new G(s, n, new e.CircleGeometry(
      l.getValue(),
      h.getValue(),
      y.getValue() * e.MathUtils.DEG2RAD,
      U.getValue() * e.MathUtils.DEG2RAD
    )));
  }
  return a;
}
export {
  L as GeometryParametersPanel
};
//# sourceMappingURL=Sidebar.Geometry.CircleGeometry-DXGHDyEi.js.map
