import * as e from "three";
import { U as C, a as i, d as f, c as m, b as U, g as G, S as L } from "./index-B2mjurVx.js";
function I(s, n) {
  const o = s.strings, D = s.signals, a = new C(), r = n.geometry.parameters, h = new i(), l = new f(r.segments).onChange(g);
  h.add(new m(o.getKey("sidebar/geometry/lathe_geometry/segments")).setClass("Label")), h.add(l), a.add(h);
  const d = new i(), p = new U(r.phiStart * e.MathUtils.RAD2DEG).onChange(g);
  d.add(new m(o.getKey("sidebar/geometry/lathe_geometry/phistart")).setClass("Label")), d.add(p), a.add(d);
  const w = new i(), y = new U(r.phiLength * e.MathUtils.RAD2DEG).onChange(g);
  w.add(new m(o.getKey("sidebar/geometry/lathe_geometry/philength")).setClass("Label")), w.add(y), a.add(w);
  const c = new i();
  c.add(new m(o.getKey("sidebar/geometry/lathe_geometry/points")).setClass("Label"));
  const u = new G().setValue(r.points).onChange(g);
  c.add(u), a.add(c);
  function R() {
    const t = n.geometry.parameters;
    u.setValue(t.points, !1), l.setValue(t.segments), p.setValue(t.phiStart * e.MathUtils.RAD2DEG), y.setValue(t.phiLength * e.MathUtils.RAD2DEG);
  }
  D.geometryChanged.add(function(t) {
    t === n && R();
  });
  function g() {
    s.execute(new L(s, n, new e.LatheGeometry(
      u.getValue(),
      l.getValue(),
      p.getValue() * e.MathUtils.DEG2RAD,
      y.getValue() * e.MathUtils.DEG2RAD
    )));
  }
  return a;
}
export {
  I as GeometryParametersPanel
};
//# sourceMappingURL=Sidebar.Geometry.LatheGeometry-BeA63_Lz.js.map
