import { TextGeometry as _ } from "three/addons/geometries/TextGeometry.js";
import { U, a, h as k, c as o, b as d, d as K, e as T, S as O } from "./index-B2mjurVx.js";
function D(g, u) {
  const n = g.strings, e = new U(), t = u.geometry.parameters.options, l = new a(), f = new k().setValue(t.text).onChange(s);
  l.add(new o(n.getKey("sidebar/geometry/text_geometry/text")).setClass("Label")), l.add(f), e.add(l);
  const r = new a(), h = new d().setPrecision(3).setValue(t.size).onChange(s);
  r.add(new o(n.getKey("sidebar/geometry/text_geometry/size")).setClass("Label")), r.add(h), e.add(r);
  const b = new a(), x = new d().setPrecision(3).setValue(t.depth).onChange(s);
  b.add(new o(n.getKey("sidebar/geometry/text_geometry/depth")).setClass("Label")), b.add(x), e.add(b);
  const i = new a(), C = new K(t.curveSegments).setRange(1, 1 / 0).onChange(s);
  i.add(new o(n.getKey("sidebar/geometry/text_geometry/curveseg")).setClass("Label")), i.add(C), e.add(i);
  const m = new a(), R = new T(t.bevelEnabled).onChange(s);
  m.add(new o(n.getKey("sidebar/geometry/text_geometry/bevelenabled")).setClass("Label")), m.add(R), e.add(m);
  const c = new a(), p = new d(t.bevelThickness).setPrecision(3).setRange(0, 1 / 0).onChange(s);
  c.add(new o(n.getKey("sidebar/geometry/text_geometry/bevelthickness")).setClass("Label")), c.add(p), e.add(c);
  const w = new a(), I = new d(t.bevelSize).setRange(0, 1 / 0).onChange(s);
  w.add(new o(n.getKey("sidebar/geometry/text_geometry/bevelsize")).setClass("Label")), w.add(I), e.add(w);
  const y = new a(), S = new d(t.bevelOffset).setRange(0, 1 / 0).onChange(s);
  y.add(new o(n.getKey("sidebar/geometry/text_geometry/bevelOffset")).setClass("Label")), y.add(S), e.add(y);
  const v = new a(), V = new K(t.bevelSegments).setRange(0, 1 / 0).onChange(s);
  v.add(new o(n.getKey("sidebar/geometry/text_geometry/bevelseg")).setClass("Label")), v.add(V), e.add(v);
  function s() {
    const z = {
      text: f.getValue(),
      font: t.font,
      size: h.getValue(),
      depth: x.getValue(),
      curveSegments: C.getValue(),
      bevelEnabled: R.getValue(),
      bevelThickness: p.getValue(),
      bevelSize: I.getValue(),
      bevelOffset: S.getValue(),
      bevelSegments: V.getValue()
    }, L = new _(z.text, z);
    g.execute(new O(g, u, L));
  }
  return e;
}
export {
  D as GeometryParametersPanel
};
//# sourceMappingURL=Sidebar.Geometry.TextGeometry-BY0d0FIx.js.map
