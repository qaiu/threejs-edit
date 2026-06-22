import * as g from "three";
import { U as f, a as l, d as w, c as h, f as S, S as c } from "./index-B2mjurVx.js";
function v(e, t) {
  const m = e.strings, u = e.signals, s = new f(), a = t.geometry.parameters, r = new l(), n = new w(a.curveSegments || 12).onChange(p).setRange(1, 1 / 0);
  r.add(new h(m.getKey("sidebar/geometry/shape_geometry/curveSegments")).setClass("Label")), r.add(n), s.add(r);
  const y = new S(m.getKey("sidebar/geometry/shape_geometry/extrude")).onClick(d).setClass("Label").setMarginLeft("120px");
  s.add(y);
  function i() {
    const o = t.geometry.parameters;
    n.setValue(o.curveSegments);
  }
  u.geometryChanged.add(function(o) {
    o === t && i();
  });
  function p() {
    e.execute(new c(e, t, new g.ShapeGeometry(
      a.shapes,
      n.getValue()
    )));
  }
  function d() {
    e.execute(new c(e, t, new g.ExtrudeGeometry(
      a.shapes,
      {
        curveSegments: n.getValue()
      }
    )));
  }
  return s;
}
export {
  v as GeometryParametersPanel
};
//# sourceMappingURL=Sidebar.Geometry.ShapeGeometry-35f9VTPC.js.map
