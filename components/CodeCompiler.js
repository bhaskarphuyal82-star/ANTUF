import React from "react";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";

const codeExample = `function Hello() {
  return <h2>Hello, world!</h2>;
}

<Hello />`;

export default function CodeCompiler() {
  return (
    <div style={{ margin: "2rem 0", padding: "2rem", background: "#f5f5f5", borderRadius: 8 }}>
      <h3 style={{ marginBottom: "1rem" }}>Try Code Online</h3>
      <LiveProvider code={codeExample} noInline>
        <LiveEditor style={{ fontSize: 16, borderRadius: 4, background: "#222", color: "#fff", marginBottom: 8 }} />
        <LiveError style={{ color: "red", marginBottom: 8 }} />
        <div style={{ padding: "1rem", background: "#fff", borderRadius: 4, minHeight: 40 }}>
          <LivePreview />
        </div>
      </LiveProvider>
    </div>
  );
}
