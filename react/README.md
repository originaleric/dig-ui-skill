# Dig3DLogoLoader React Component

Three.js 版 Dig 3D logo flip loader，可直接复制到 React / Next.js / Vite 项目使用。

## 依赖

```bash
npm install three
```

React 项目本身需要已有 `react`。

## 文件

复制这些文件到目标项目：

```text
react/Dig3DLogoLoader.jsx
assets/dig-logo-contours.js
assets/dig-mark-data.js
```

保持 `Dig3DLogoLoader.jsx` 里两个 asset import 路径可访问即可。

## 使用

```jsx
import Dig3DLogoLoader from "./Dig3DLogoLoader.jsx";

export function LoadingScreen() {
  return (
    <main className="loading-screen">
      <Dig3DLogoLoader width={240} height={220} />
    </main>
  );
}
```

## Props

| Prop | Default | Description |
|---|---:|---|
| `width` | `240` | Canvas CSS 宽度 |
| `height` | `220` | Canvas CSS 高度 |
| `rotationSpeed` | `0.945` | 旋转速度，数值越小越慢 |
| `colorMode` | `"rainbow"` | 渲染色方案：`"rainbow"`、`"green"`、`"mono"` |
| `colors` | `undefined` | 自定义颜色覆盖，见下方示例 |
| `neon` | `true` | 是否启用彩虹霓虹光 |
| `paused` | `false` | 是否暂停旋转 |
| `pixelRatio` | `2` | 最大 DPR，控制清晰度和性能 |
| `className` | `undefined` | Canvas class |
| `style` | `undefined` | Canvas inline style |
| `ariaLabel` | `"Dig is loading"` | 无障碍标签 |

## 示例调参

```jsx
<Dig3DLogoLoader
  width={180}
  height={165}
  rotationSpeed={0.6}
  neon
/>
```

## 自定义渲染色

```jsx
<Dig3DLogoLoader colorMode="green" />
<Dig3DLogoLoader colorMode="mono" neon={false} />

<Dig3DLogoLoader
  colorMode="rainbow"
  colors={{
    body: 0x101820,
    side: 0x05070a,
    glow: 0xff66cc,
    rim: 0x66e8ff,
    rainbowLights: [0xff66cc, 0x66e8ff, 0xffd166, 0x9fe870, 0xff5f45],
    animateHue: true,
  }}
/>
```

## 注意

- 组件会在 unmount 时 dispose Three.js geometry、material、texture 和 renderer。
- 如果在 Next.js App Router 中使用，请把组件放在 client component 里，或在 wrapper 文件顶部加 `"use client"`。
