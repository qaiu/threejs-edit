import * as e from "three";
import { U as A, a as g, b as d, c as r, d as E, S as M } from "./index-B2mjurVx.js";
function K(i, o) {
  const s = i.strings, V = i.signals, a = new A(), n = o.geometry.parameters, l = new g(), m = new d(n.radius).onChange(h);
  l.add(new r(s.getKey("sidebar/geometry/sphere_geometry/radius")).setClass("Label")), l.add(m), a.add(l);
  const w = new g(), y = new E(n.widthSegments).setRange(1, 1 / 0).onChange(h);
  w.add(new r(s.getKey("sidebar/geometry/sphere_geometry/widthsegments")).setClass("Label")), w.add(y), a.add(w);
  const p = new g(), u = new E(n.heightSegments).setRange(1, 1 / 0).onChange(h);
  p.add(new r(s.getKey("sidebar/geometry/sphere_geometry/heightsegments")).setClass("Label")), p.add(u), a.add(p);
  const D = new g(), c = new d(n.phiStart * e.MathUtils.RAD2DEG).setUnit("°").setStep(10).onChange(h);
  D.add(new r(s.getKey("sidebar/geometry/sphere_geometry/phistart")).setClass("Label")), D.add(c), a.add(D);
  const R = new g(), S = new d(n.phiLength * e.MathUtils.RAD2DEG).setUnit("°").setStep(10).onChange(h);
  R.add(new r(s.getKey("sidebar/geometry/sphere_geometry/philength")).setClass("Label")), R.add(S), a.add(R);
  const U = new g(), C = new d(n.thetaStart * e.MathUtils.RAD2DEG).setUnit("°").setStep(10).onChange(h);
  U.add(new r(s.getKey("sidebar/geometry/sphere_geometry/thetastart")).setClass("Label")), U.add(C), a.add(U);
  const G = new g(), L = new d(n.thetaLength * e.MathUtils.RAD2DEG).setUnit("°").setStep(10).onChange(h);
  G.add(new r(s.getKey("sidebar/geometry/sphere_geometry/thetalength")).setClass("Label")), G.add(L), a.add(G);
  function b() {
    const t = o.geometry.parameters;
    m.setValue(t.radius), y.setValue(t.widthSegments), u.setValue(t.heightSegments), c.setValue(t.phiStart * e.MathUtils.RAD2DEG), S.setValue(t.phiLength * e.MathUtils.RAD2DEG), C.setValue(t.thetaStart * e.MathUtils.RAD2DEG), L.setValue(t.thetaLength * e.MathUtils.RAD2DEG);
  }
  V.geometryChanged.add(function(t) {
    t === o && b();
  });
  function h() {
    i.execute(new M(i, o, new e.SphereGeometry(
      m.getValue(),
      y.getValue(),
      u.getValue(),
      c.getValue() * e.MathUtils.DEG2RAD,
      S.getValue() * e.MathUtils.DEG2RAD,
      C.getValue() * e.MathUtils.DEG2RAD,
      L.getValue() * e.MathUtils.DEG2RAD
    )));
  }
  return a;
}
export {
  K as GeometryParametersPanel
};
//# sourceMappingURL=Sidebar.Geometry.SphereGeometry-skta3VP8.js.map
