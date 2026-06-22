import * as U from "three";
import { U as E, a as d, b as f, c as o, d as I, e as K, S as L } from "./index-B2mjurVx.js";
function x(r, g) {
  const a = r.strings, R = r.signals, t = new E(), n = g.geometry.parameters, i = new d(), m = new f(n.radiusTop).onChange(s);
  i.add(new o(a.getKey("sidebar/geometry/cylinder_geometry/radiustop")).setClass("Label")), i.add(m), t.add(i);
  const l = new d(), y = new f(n.radiusBottom).onChange(s);
  l.add(new o(a.getKey("sidebar/geometry/cylinder_geometry/radiusbottom")).setClass("Label")), l.add(y), t.add(l);
  const u = new d(), c = new f(n.height).onChange(s);
  u.add(new o(a.getKey("sidebar/geometry/cylinder_geometry/height")).setClass("Label")), u.add(c), t.add(u);
  const h = new d(), w = new I(n.radialSegments).setRange(1, 1 / 0).onChange(s);
  h.add(new o(a.getKey("sidebar/geometry/cylinder_geometry/radialsegments")).setClass("Label")), h.add(w), t.add(h);
  const p = new d(), C = new I(n.heightSegments).setRange(1, 1 / 0).onChange(s);
  p.add(new o(a.getKey("sidebar/geometry/cylinder_geometry/heightsegments")).setClass("Label")), p.add(C), t.add(p);
  const b = new d(), V = new K(n.openEnded).onChange(s);
  b.add(new o(a.getKey("sidebar/geometry/cylinder_geometry/openended")).setClass("Label")), b.add(V), t.add(b);
  function S() {
    const e = g.geometry.parameters;
    m.setValue(e.radiusTop), y.setValue(e.radiusBottom), c.setValue(e.height), w.setValue(e.radialSegments), C.setValue(e.heightSegments), V.setValue(e.openEnded);
  }
  R.geometryChanged.add(function(e) {
    e === g && S();
  });
  function s() {
    r.execute(new L(r, g, new U.CylinderGeometry(
      m.getValue(),
      y.getValue(),
      c.getValue(),
      w.getValue(),
      C.getValue(),
      V.getValue()
    )));
  }
  return t;
}
export {
  x as GeometryParametersPanel
};
//# sourceMappingURL=Sidebar.Geometry.CylinderGeometry-BILv3BwD.js.map
