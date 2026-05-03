"use client";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

const FRAG = `
precision highp float;
varying vec2 vUv;
uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uRes;

vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec2 mod289(vec2 x){return x-floor(x*(1.0/289.0))*289.0;}
vec3 permute(vec3 x){return mod289(((x*34.0)+1.0)*x);}
float snoise(vec2 v){
  const vec4 C=vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);
  vec2 i=floor(v+dot(v,C.yy));
  vec2 x0=v-i+dot(i,C.xx);
  vec2 i1=(x0.x>x0.y)?vec2(1.0,0.0):vec2(0.0,1.0);
  vec4 x12=x0.xyxy+C.xxzz;
  x12.xy-=i1;
  i=mod289(i);
  vec3 p=permute(permute(i.y+vec3(0.0,i1.y,1.0))+i.x+vec3(0.0,i1.x,1.0));
  vec3 m=max(0.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.0);
  m=m*m;m=m*m;
  vec3 x=2.0*fract(p*C.www)-1.0;
  vec3 h=abs(x)-0.5;
  vec3 ox=floor(x+0.5);
  vec3 a0=x-ox;
  m*=1.79284291400159-0.85373472095314*(a0*a0+h*h);
  vec3 g;
  g.x=a0.x*x0.x+h.x*x0.y;
  g.yz=a0.yz*x12.xz+h.yz*x12.yw;
  return 130.0*dot(m,g);
}

void main(){
  vec2 uv=vUv;
  float aspect=uRes.x/uRes.y;
  vec2 p=(uv-0.5)*vec2(aspect,1.0);
  vec2 m=(uMouse/uRes-0.5);
  m.x*=aspect;

  float t=uTime*0.18;
  float d=length(p-m);
  float warp=exp(-d*5.0)*0.5;
  vec2 q=p+warp*normalize(p-m+0.0001);

  float n1=snoise(q*2.2+vec2(t,0.0));
  float n2=snoise(q*4.4-vec2(0.0,t*1.3));
  float n3=snoise(q*8.8+vec2(t*0.7,t));
  float v=n1*0.6+n2*0.3+n3*0.1;

  vec3 c1=vec3(0.30,0.20,0.95);
  vec3 c2=vec3(0.95,0.25,0.65);
  vec3 c3=vec3(0.25,0.90,0.75);
  vec3 col=mix(c1,c2,smoothstep(-0.3,0.4,v));
  col=mix(col,c3,smoothstep(0.4,0.85,v));

  col*=1.0-smoothstep(0.55,1.45,length(p));
  col+=vec3(0.5,0.6,1.0)*exp(-d*9.0)*0.7;

  gl_FragColor=vec4(col,1.0);
}`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(sh));
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

export function PlasmaShader({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) return;
    const ctx = gl as WebGLRenderingContext;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const W = canvas.clientWidth;
      const H = canvas.clientHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const vs = compile(ctx, ctx.VERTEX_SHADER, VERT);
    const fs = compile(ctx, ctx.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const program = ctx.createProgram();
    if (!program) return;
    ctx.attachShader(program, vs);
    ctx.attachShader(program, fs);
    ctx.linkProgram(program);
    if (!ctx.getProgramParameter(program, ctx.LINK_STATUS)) {
      console.error(ctx.getProgramInfoLog(program));
      return;
    }
    ctx.useProgram(program);

    const buf = ctx.createBuffer();
    ctx.bindBuffer(ctx.ARRAY_BUFFER, buf);
    ctx.bufferData(
      ctx.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      ctx.STATIC_DRAW,
    );
    const aPos = ctx.getAttribLocation(program, "aPos");
    ctx.enableVertexAttribArray(aPos);
    ctx.vertexAttribPointer(aPos, 2, ctx.FLOAT, false, 0, 0);

    const uTime = ctx.getUniformLocation(program, "uTime");
    const uMouse = ctx.getUniformLocation(program, "uMouse");
    const uRes = ctx.getUniformLocation(program, "uRes");

    let raf = 0;
    const start = performance.now();
    const tick = () => {
      const t = (performance.now() - start) / 1000;
      ctx.uniform1f(uTime, t);
      ctx.uniform2f(uRes, canvas.width, canvas.height);
      const H = canvas.clientHeight;
      ctx.uniform2f(uMouse, mouseRef.current.x * dpr, (H - mouseRef.current.y) * dpr);
      ctx.drawArrays(ctx.TRIANGLES, 0, 6);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const handleMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseMove={handleMove}
      className={cn("h-full w-full rounded-xl", className)}
    />
  );
}
