import * as I from "three";
import { U as R, a as d, b as p, c as r, d as f, S as V } from "./index-B2mjurVx.js";
function K(n, a) {
  const s = n.strings, C = n.signals, t = new R(), g = a.geometry.parameters, i = new d(), m = new p(g.width).onChange(o);
  i.add(new r(s.getKey("sidebar/geometry/plane_geometry/width")).setClass("Label")), i.add(m), t.add(i);
  const h = new d(), w = new p(g.height).onChange(o);
  h.add(new r(s.getKey("sidebar/geometry/plane_geometry/height")).setClass("Label")), h.add(w), t.add(h);
  const l = new d(), y = new f(g.widthSegments).setRange(1, 1 / 0).onChange(o);
  l.add(new r(s.getKey("sidebar/geometry/plane_geometry/widthsegments")).setClass("Label")), l.add(y), t.add(l);
  const c = new d(), u = new f(g.heightSegments).setRange(1, 1 / 0).onChange(o);
  c.add(new r(s.getKey("sidebar/geometry/plane_geometry/heightsegments")).setClass("Label")), c.add(u), t.add(c);
  function S() {
    const e = a.geometry.parameters;
    m.setValue(e.width), w.setValue(e.height), y.setValue(e.widthSegments), u.setValue(e.heightSegments);
  }
  C.geometryChanged.add(function(e) {
    e === a && S();
  });
  function o() {
    n.execute(new V(n, a, new I.PlaneGeometry(
      m.getValue(),
      w.getValue(),
      y.getValue(),
      u.getValue()
    )));
  }
  return t;
}
export {
  K as GeometryParametersPanel
};
//# sourceMappingURL=Sidebar.Geometry.PlaneGeometry-BpRhPrFP.js.map
