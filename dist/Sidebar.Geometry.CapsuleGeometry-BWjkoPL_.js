import * as V from "three";
import { U as b, a as g, b as f, c as r, d as C, S as U } from "./index-B2mjurVx.js";
function _(o, d) {
  const t = o.strings, I = o.signals, a = new b(), s = d.geometry.parameters, m = new g(), i = new f(s.radius).onChange(n);
  m.add(new r(t.getKey("sidebar/geometry/capsule_geometry/radius")).setClass("Label")), m.add(i), a.add(m);
  const l = new g(), c = new f(s.height).onChange(n);
  l.add(new r(t.getKey("sidebar/geometry/capsule_geometry/height")).setClass("Label")), l.add(c), a.add(l);
  const u = new g(), h = new C(s.capSegments).setRange(1, 1 / 0).onChange(n);
  u.add(new r(t.getKey("sidebar/geometry/capsule_geometry/capseg")).setClass("Label")), u.add(h), a.add(u);
  const y = new g(), w = new C(s.radialSegments).setRange(1, 1 / 0).onChange(n);
  y.add(new r(t.getKey("sidebar/geometry/capsule_geometry/radialseg")).setClass("Label")), y.add(w), a.add(y);
  const p = new g(), S = new C(s.heightSegments).setRange(1, 1 / 0).onChange(n);
  p.add(new r(t.getKey("sidebar/geometry/capsule_geometry/heightseg")).setClass("Label")), p.add(S), a.add(p);
  function R() {
    const e = d.geometry.parameters;
    i.setValue(e.radius), c.setValue(e.height), h.setValue(e.capSegments), w.setValue(e.radialSegments), S.setValue(e.heightSegments);
  }
  I.geometryChanged.add(function(e) {
    e === d && R();
  });
  function n() {
    o.execute(new U(o, d, new V.CapsuleGeometry(
      i.getValue(),
      c.getValue(),
      h.getValue(),
      w.getValue(),
      S.getValue()
    )));
  }
  return a;
}
export {
  _ as GeometryParametersPanel
};
//# sourceMappingURL=Sidebar.Geometry.CapsuleGeometry-BWjkoPL_.js.map
