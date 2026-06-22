import * as R from "three";
import { U as L, a as o, c as r, i as T, b as U, d as f, e as _, j as x, S as D } from "./index-B2mjurVx.js";
function E(d, u) {
  const a = d.strings, v = d.signals, t = new L(), s = u.geometry.parameters, c = new o();
  c.add(new r(a.getKey("sidebar/geometry/tube_geometry/path")).setClass("Label"));
  const i = new T().setValue(s.path.points).onChange(n);
  c.add(i), t.add(c);
  const y = new o(), w = new U(s.radius).onChange(n);
  y.add(new r(a.getKey("sidebar/geometry/tube_geometry/radius")).setClass("Label")), y.add(w), t.add(y);
  const p = new o(), b = new f(s.tubularSegments).onChange(n);
  p.add(new r(a.getKey("sidebar/geometry/tube_geometry/tubularsegments")).setClass("Label")), p.add(b), t.add(p);
  const V = new o(), h = new f(s.radialSegments).onChange(n);
  V.add(new r(a.getKey("sidebar/geometry/tube_geometry/radialsegments")).setClass("Label")), V.add(h), t.add(V);
  const C = new o(), g = new _(s.closed).onChange(n);
  C.add(new r(a.getKey("sidebar/geometry/tube_geometry/closed")).setClass("Label")), C.add(g), t.add(C);
  const I = new o(), l = new x().setOptions({ centripetal: "centripetal", chordal: "chordal", catmullrom: "catmullrom" }).setValue(s.path.curveType).onChange(n);
  I.add(new r(a.getKey("sidebar/geometry/tube_geometry/curvetype")).setClass("Label"), l), t.add(I);
  const m = new o().setDisplay(l.getValue() == "catmullrom" ? "" : "none"), S = new U(s.path.tension).setStep(0.01).onChange(n);
  m.add(new r(a.getKey("sidebar/geometry/tube_geometry/tension")).setClass("Label"), S), t.add(m);
  function K() {
    const e = u.geometry.parameters;
    b.setValue(e.tubularSegments), w.setValue(e.radius), h.setValue(e.radialSegments), g.setValue(e.closed), i.setValue(e.path.points, !1), l.setValue(e.path.curveType), S.setValue(e.path.tension), m.setDisplay(l.getValue() == "catmullrom" ? "" : "none");
  }
  v.geometryChanged.add(function(e) {
    e === u && K();
  });
  function n() {
    m.setDisplay(l.getValue() == "catmullrom" ? "" : "none"), d.execute(new D(d, u, new R.TubeGeometry(
      new R.CatmullRomCurve3(i.getValue(), g.getValue(), l.getValue(), S.getValue()),
      b.getValue(),
      w.getValue(),
      h.getValue(),
      g.getValue()
    )));
  }
  return t;
}
export {
  E as GeometryParametersPanel
};
//# sourceMappingURL=Sidebar.Geometry.TubeGeometry-DDGWKB6K.js.map
