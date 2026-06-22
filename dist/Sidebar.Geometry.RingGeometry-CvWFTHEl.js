import * as a from "three";
import { U as L, a as g, b as m, c as o, d as V, S as G } from "./index-B2mjurVx.js";
function A(d, i) {
  const n = d.strings, b = d.signals, t = new L(), s = i.geometry.parameters, h = new g(), u = new m(s.innerRadius).onChange(r);
  h.add(new o(n.getKey("sidebar/geometry/ring_geometry/innerRadius")).setClass("Label")), h.add(u), t.add(h);
  const l = new g(), w = new m(s.outerRadius).onChange(r);
  l.add(new o(n.getKey("sidebar/geometry/ring_geometry/outerRadius")).setClass("Label")), l.add(w), t.add(l);
  const y = new g(), R = new V(s.thetaSegments).setRange(3, 1 / 0).onChange(r);
  y.add(new o(n.getKey("sidebar/geometry/ring_geometry/thetaSegments")).setClass("Label")), y.add(R), t.add(y);
  const c = new g(), S = new V(s.phiSegments).setRange(3, 1 / 0).onChange(r);
  c.add(new o(n.getKey("sidebar/geometry/ring_geometry/phiSegments")).setClass("Label")), c.add(S), t.add(c);
  const p = new g(), U = new m(s.thetaStart * a.MathUtils.RAD2DEG).setUnit("°").setStep(10).onChange(r);
  p.add(new o(n.getKey("sidebar/geometry/ring_geometry/thetastart")).setClass("Label")), p.add(U), t.add(p);
  const C = new g(), D = new m(s.thetaLength * a.MathUtils.RAD2DEG).setUnit("°").setStep(10).onChange(r);
  C.add(new o(n.getKey("sidebar/geometry/ring_geometry/thetalength")).setClass("Label")), C.add(D), t.add(C);
  function f() {
    const e = i.geometry.parameters;
    u.setValue(e.innerRadius), w.setValue(e.outerRadius), R.setValue(e.thetaSegments), S.setValue(e.phiSegments), U.setValue(e.thetaStart * a.MathUtils.RAD2DEG), D.setValue(e.thetaLength * a.MathUtils.RAD2DEG);
  }
  b.geometryChanged.add(function(e) {
    e === i && f();
  });
  function r() {
    d.execute(new G(d, i, new a.RingGeometry(
      u.getValue(),
      w.getValue(),
      R.getValue(),
      S.getValue(),
      U.getValue() * a.MathUtils.DEG2RAD,
      D.getValue() * a.MathUtils.DEG2RAD
    )));
  }
  return t;
}
export {
  A as GeometryParametersPanel
};
//# sourceMappingURL=Sidebar.Geometry.RingGeometry-CvWFTHEl.js.map
