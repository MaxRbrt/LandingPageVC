import { useEffect, useRef } from "react";
import * as THREE from "three";
import { prefersReducedMotion } from "@/lib/gsap";

/**
 * Backdrop 3D do hero: campo de partículas com profundidade (fog),
 * ondulação contínua, parallax de mouse e um anel estrutural lento que
 * dá "corpo" à cena. Clima energia/performance sem pesar.
 * - Pausa o loop quando a aba não está visível.
 * - Não inicializa em prefers-reduced-motion (mostra só o fundo escuro).
 */
export default function FundoParticulas() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || prefersReducedMotion()) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    // Fog na cor do fundo: partículas distantes desaparecem -> profundidade
    scene.fog = new THREE.FogExp2(0x0b0b0d, 0.022);

    const camera = new THREE.PerspectiveCamera(70, width / height, 0.1, 100);
    camera.position.z = 18;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);

    // ---- Nuvem de partículas ----
    const COUNT = 1600;
    const positions = new Float32Array(COUNT * 3);
    const basePos = new Float32Array(COUNT * 3); // guarda posição original (p/ onda)
    const colors = new Float32Array(COUNT * 3);
    const cRed = new THREE.Color("#E30613");
    const cCream = new THREE.Color("#F4EEDC");

    for (let i = 0; i < COUNT; i++) {
      const x = (Math.random() - 0.5) * 64;
      const y = (Math.random() - 0.5) * 42;
      const z = (Math.random() - 0.5) * 44;
      positions[i * 3] = basePos[i * 3] = x;
      positions[i * 3 + 1] = basePos[i * 3 + 1] = y;
      positions[i * 3 + 2] = basePos[i * 3 + 2] = z;
      const c = Math.random() > 0.8 ? cRed : cCream;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const geom = new THREE.BufferGeometry();
    const posAttr = new THREE.BufferAttribute(positions, 3);
    posAttr.setUsage(THREE.DynamicDrawUsage);
    geom.setAttribute("position", posAttr);
    geom.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      depthWrite: false,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geom, mat);
    scene.add(points);

    // ---- Anel estrutural lento (dá "corpo" à cena) ----
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(15, 0.04, 16, 120),
      new THREE.MeshBasicMaterial({
        color: cRed,
        transparent: true,
        opacity: 0.16,
        blending: THREE.AdditiveBlending,
      }),
    );
    ring.rotation.x = Math.PI / 2.4;
    scene.add(ring);

    // ---- Parallax do mouse ----
    const mouse = { x: 0, y: 0 };
    const onMouse = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouse);

    let raf = 0;
    const clock = new THREE.Clock();
    const animate = () => {
      const t = clock.getElapsedTime();

      // Onda: desloca Y de cada partícula a partir da posição base
      const arr = posAttr.array as Float32Array;
      for (let i = 0; i < COUNT; i++) {
        const bx = basePos[i * 3];
        const bz = basePos[i * 3 + 2];
        arr[i * 3 + 1] = basePos[i * 3 + 1] + Math.sin(t * 0.5 + bx * 0.25 + bz * 0.15) * 0.9;
      }
      posAttr.needsUpdate = true;

      points.rotation.y = t * 0.035;
      points.rotation.x = Math.sin(t * 0.1) * 0.05;
      ring.rotation.z = t * 0.06;

      camera.position.x += (mouse.x * 2.2 - camera.position.x) * 0.04;
      camera.position.y += (-mouse.y * 1.6 - camera.position.y) * 0.04;
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else if (!raf) {
        animate();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      geom.dispose();
      mat.dispose();
      ring.geometry.dispose();
      (ring.material as THREE.Material).dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden />;
}
