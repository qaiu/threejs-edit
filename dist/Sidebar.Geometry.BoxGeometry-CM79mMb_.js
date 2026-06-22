import * as I from "three";
import { U, a as g, b as S, c as o, d as f, S as K } from "./index-B2mjurVx.js";
function P(d, r) {
  const s = d.strings, R = d.signals, t = new U(), n = r.geometry.parameters, h = new g(), i = new S().setPrecision(3).setValue(n.width).onChange(a);
  h.add(new o(s.getKey("sidebar/geometry/box_geometry/width")).setClass("Label")), h.add(i), t.add(h);
  const m = new g(), w = new S().setPrecision(3).setValue(n.height).onChange(a);
  m.add(new o(s.getKey("sidebar/geometry/box_geometry/height")).setClass("Label")), m.add(w), t.add(m);
  const l = new g(), y = new S().setPrecision(3).setValue(n.depth).onChange(a);
  l.add(new o(s.getKey("sidebar/geometry/box_geometry/depth")).setClass("Label")), l.add(y), t.add(l);
  const c = new g(), u = new f(n.widthSegments).setRange(1, 1 / 0).onChange(a);
  c.add(new o(s.getKey("sidebar/geometry/box_geometry/widthseg")).setClass("Label")), c.add(u), t.add(c);
  const p = new g(), b = new f(n.heightSegments).setRange(1, 1 / 0).onChange(a);
  p.add(new o(s.getKey("sidebar/geometry/box_geometry/heightseg")).setClass("Label")), p.add(b), t.add(p);
  const V = new g(), C = new f(n.depthSegments).setRange(1, 1 / 0).onChange(a);
  V.add(new o(s.getKey("sidebar/geometry/box_geometry/depthseg")).setClass("Label")), V.add(C), t.add(V);
  function x() {
    const e = r.geometry.parameters;
    i.setValue(e.width), w.setValue(e.height), y.setValue(e.depth), u.setValue(e.widthSegments), b.setValue(e.heightSegments), C.setValue(e.depthSegments);
  }
  R.geometryChanged.add(function(e) {
    e === r && x();
  });
  function a() {
    d.execute(new K(d, r, new I.BoxGeometry(
      i.getValue(),
      w.getValue(),
      y.getValue(),
      u.getValue(),
      b.getValue(),
      C.getValue()
    )));
  }
  return t;
}
export {
  P as GeometryParametersPanel
};
//# sourceMappingURL=Sidebar.Geometry.BoxGeometry-CM79mMb_.js.map
