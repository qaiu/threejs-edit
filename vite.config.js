import { defineConfig } from 'vite';

const isAppBuild = process.env.BUILD_TARGET === 'app';

// All three/addons modules used (static + dynamic imports) — must be explicitly
// listed so Vite pre-bundles them on every fresh start without a scanner miss.
const threeAddonsDeps = [
  'three/addons/controls/TransformControls.js',
  'three/addons/environments/ColorEnvironment.js',
  'three/addons/environments/RoomEnvironment.js',
  'three/addons/exporters/DRACOExporter.js',
  'three/addons/exporters/GLTFExporter.js',
  'three/addons/exporters/OBJExporter.js',
  'three/addons/exporters/PLYExporter.js',
  'three/addons/exporters/STLExporter.js',
  'three/addons/exporters/USDZExporter.js',
  'three/addons/geometries/TextGeometry.js',
  'three/addons/helpers/AnimationPathHelper.js',
  'three/addons/helpers/VertexNormalsHelper.js',
  'three/addons/helpers/ViewHelper.js',
  'three/addons/interactive/HTMLMesh.js',
  'three/addons/interactive/InteractiveGroup.js',
  'three/addons/libs/fflate.module.js',
  'three/addons/libs/meshopt_decoder.module.js',
  'three/addons/libs/mikktspace.module.js',
  'three/addons/loaders/3DMLoader.js',
  'three/addons/loaders/3MFLoader.js',
  'three/addons/loaders/AMFLoader.js',
  'three/addons/loaders/ColladaLoader.js',
  'three/addons/loaders/DRACOLoader.js',
  'three/addons/loaders/EXRLoader.js',
  'three/addons/loaders/FBXLoader.js',
  'three/addons/loaders/FontLoader.js',
  'three/addons/loaders/GLTFLoader.js',
  'three/addons/loaders/HDRLoader.js',
  'three/addons/loaders/KMZLoader.js',
  'three/addons/loaders/KTX2Loader.js',
  'three/addons/loaders/LDrawLoader.js',
  'three/addons/loaders/MD2Loader.js',
  'three/addons/loaders/MTLLoader.js',
  'three/addons/loaders/OBJLoader.js',
  'three/addons/loaders/PCDLoader.js',
  'three/addons/loaders/PLYLoader.js',
  'three/addons/loaders/STLLoader.js',
  'three/addons/loaders/SVGLoader.js',
  'three/addons/loaders/TDSLoader.js',
  'three/addons/loaders/TGALoader.js',
  'three/addons/loaders/USDLoader.js',
  'three/addons/loaders/VOXLoader.js',
  'three/addons/loaders/VRMLLoader.js',
  'three/addons/loaders/XYZLoader.js',
  'three/addons/postprocessing/Pass.js',
  'three/addons/utils/BufferGeometryUtils.js',
  'three/addons/utils/SkeletonUtils.js',
  'three/addons/webxr/XRControllerModelFactory.js',
];

export default defineConfig(({ command }) => {
  if (command === 'serve' || isAppBuild) {
    return {
      root: 'src',
      base: process.env.NODE_ENV === 'production' ? '/threejs-edit/' : './',
      build: {
        outDir: '../dist-app',
        emptyOutDir: true,
      },
      server: {
        port: 8080,
        open: true,
      },
      optimizeDeps: {
        include: ['three', 'three-gpu-pathtracer', 'three-mesh-bvh', ...threeAddonsDeps],
      },
    };
  }

  return {
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      sourcemap: true,
      lib: {
        entry: 'src/js/index.js',
        name: 'ThreeJsEdit',
        formats: ['es', 'cjs'],
        fileName: (format) => format === 'es' ? 'threejs-edit.js' : 'threejs-edit.cjs',
      },
      rollupOptions: {
        external: (id) => {
          return id === 'three' || id.startsWith('three/') || id === 'three-gpu-pathtracer' || id === 'three-mesh-bvh';
        },
      },
    },
  };
});
