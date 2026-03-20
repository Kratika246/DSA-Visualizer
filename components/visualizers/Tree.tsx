"use client";

import { useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useVisualizerStore from "@/store/useVisualizerStore";
import Callstack from "@/components/visualizers/Callstack";
import { RecursionAlgorithms, type RecursionStep, type RecursionTreeNode } from "@/types/Step";

// ─── Types ────────────────────────────────────────────────────────────────────

interface TreeNode {
  id: number;
  fn: string;
  args: number[];
  returned?: number | number[];
  parentId: number | null;
  depth: number;
  children: number[];
}

interface LayoutNode extends TreeNode {
  x: number;
  y: number;
}

interface Edge {
  key: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  isActiveEdge: boolean;
  isReturningEdge: boolean;
  isInActivePath: boolean;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const LEVEL_H = 108;
const MIN_SEP = 96;
const NODE_W = 72;
const NODE_H = 46;
const NODE_RX = 10;

// ─── Layout Engine ────────────────────────────────────────────────────────────

function computeLayout(nodes: TreeNode[]): Record<number, LayoutNode> {
  if (!nodes.length) return {};

  const byId: Record<number, LayoutNode> = {};
  nodes.forEach((n) => {
    byId[n.id] = { ...n, x: 0, y: n.depth * LEVEL_H };
  });

  function subtreeWidth(id: number): number {
    const node = byId[id];
    if (!node.children.length) return MIN_SEP;
    return node.children.reduce((s, c) => s + subtreeWidth(c), 0);
  }

  function place(id: number, left: number): number {
    const node = byId[id];
    if (!node.children.length) {
      node.x = left + MIN_SEP / 2;
      return left + MIN_SEP;
    }
    let cursor = left;
    node.children.forEach((c) => {
      cursor = place(c, cursor);
    });
    const first = byId[node.children[0]];
    const last = byId[node.children[node.children.length - 1]];
    node.x = (first.x + last.x) / 2;
    return cursor;
  }

  const roots = nodes.filter((n) => n.parentId === null);
  let cursor = 0;
  roots.forEach((r) => {
    cursor = place(r.id, cursor);
  });

  // Center
  const xs = Object.values(byId).map((n) => n.x);
  const mid = (Math.min(...xs) + Math.max(...xs)) / 2;
  Object.values(byId).forEach((n) => (n.x -= mid));

  return byId;
}

// ─── Helper: Build active path from root to active node ──────────────────────

function buildActivePath(
  nodes: TreeNode[],
  activeId: number | undefined
): Set<number> {
  if (activeId === undefined) return new Set();
  
  const path = new Set<number>();
  let curr: number | null = activeId;
  
  while (curr !== null) {
    path.add(curr);
    const node = nodes.find((n) => n.id === curr);
    curr = node?.parentId ?? null;
  }
  
  return path;
}

// ─── SVG Node ────────────────────────────────────────────────────────────────

interface NodeProps {
  node: LayoutNode;
  isActive: boolean;
  isInPath: boolean;
}

function TreeNodeShape({ node, isActive, isInPath }: NodeProps) {
  const hasReturned = node.returned !== undefined;

  const fill = isActive
    ? "rgba(59,130,246,0.15)"
    : hasReturned
    ? "rgba(52,211,153,0.08)"
    : isInPath
    ? "rgba(96,165,250,0.06)"
    : "rgba(255,255,255,0.03)";

  const stroke = isActive
    ? "rgba(96,165,250,0.9)"
    : hasReturned
    ? "rgba(52,211,153,0.6)"
    : isInPath
    ? "rgba(96,165,250,0.4)"
    : "rgba(255,255,255,0.1)";

  const strokeWidth = isActive ? 1.5 : isInPath ? 1.2 : 1;

  return (
    <motion.g
      key={node.id}
      initial={{ opacity: 0, scale: 0.6, y: -20 }}
      animate={{
        opacity: 1,
        scale: isActive ? 1.06 : 1,
        y: 0,
      }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ type: "spring", stiffness: 320, damping: 24 }}
      style={{ transformOrigin: `${node.x}px ${node.y}px` }}
    >
      {/* Pulse ring for active */}
      {isActive && (
        <motion.rect
          x={node.x - NODE_W / 2 - 5}
          y={node.y - NODE_H / 2 - 5}
          width={NODE_W + 10}
          height={NODE_H + 10}
          rx={NODE_RX + 4}
          fill="none"
          stroke="rgba(96,165,250,0.25)"
          strokeWidth={1}
          animate={{
            opacity: [0.5, 0.05, 0.5],
            scale: [1, 1.04, 1],
          }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          style={{ transformOrigin: `${node.x}px ${node.y}px` }}
        />
      )}

      {/* Main box */}
      <rect
        x={node.x - NODE_W / 2}
        y={node.y - NODE_H / 2}
        width={NODE_W}
        height={NODE_H}
        rx={NODE_RX}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />

      {/* fn name */}
      <text
        x={node.x}
        y={node.y - 7}
        textAnchor="middle"
        fontSize={9}
        fill="rgba(148,163,184,0.7)"
        fontFamily="'JetBrains Mono', monospace"
        letterSpacing="0.04em"
      >
        {node.fn}
      </text>

      {/* args */}
      <text
        x={node.x}
        y={node.y + 8}
        textAnchor="middle"
        fontSize={13}
        fontWeight={600}
        fill={isActive ? "rgb(147,197,253)" : "rgb(226,232,240)"}
        fontFamily="'JetBrains Mono', monospace"
      >
        ({node.args.join(", ")})
      </text>

      {/* Return badge */}
      {hasReturned && (
        <motion.g
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          <rect
            x={node.x - 20}
            y={node.y + NODE_H / 2 - 2}
            width={40}
            height={16}
            rx={5}
            fill="rgba(16,40,28,0.9)"
            stroke="rgba(52,211,153,0.5)"
            strokeWidth={0.8}
          />
          <text
            x={node.x}
            y={node.y + NODE_H / 2 + 9}
            textAnchor="middle"
            fontSize={10}
            fontWeight={600}
            fill="rgb(52,211,153)"
            fontFamily="'JetBrains Mono', monospace"
          >
            {typeof(node.returned)==="number"?node.returned:
            node.returned?.join(",")}
          </text>
        </motion.g>
      )}
    </motion.g>
  );
}

// ─── SVG Canvas ───────────────────────────────────────────────────────────────

interface CanvasProps {
  nodes: TreeNode[];
  layout: Record<number, LayoutNode>;
  activeId: number | undefined;
  activePath: Set<number>;
}

function TreeCanvas({ nodes, layout, activeId, activePath }: CanvasProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  // Compute bounding box
  const layoutVals = Object.values(layout);
  const minX = layoutVals.length ? Math.min(...layoutVals.map((n) => n.x)) - NODE_W : -300;
  const maxX = layoutVals.length ? Math.max(...layoutVals.map((n) => n.x)) + NODE_W : 300;
  const maxY = layoutVals.length ? Math.max(...layoutVals.map((n) => n.y)) + NODE_H + 32 : 400;
  const W = Math.max(maxX - minX, 600);
  const H = Math.max(maxY + 40, 300);

  // Build edges
  const edges: Edge[] = [];
  nodes.forEach((n) => {
    if (n.parentId !== null && layout[n.id] && layout[n.parentId]) {
      const from = layout[n.parentId];
      const to = layout[n.id];
      
      const isInActivePath = activePath.has(n.id) && activePath.has(n.parentId);
      const isActiveEdge = n.id === activeId || n.parentId === activeId;
      const isReturningEdge = to.returned !== undefined && from.returned === undefined;
      
      edges.push({
        key: `${n.parentId}-${n.id}`,
        x1: from.x,
        y1: from.y + NODE_H / 2,
        x2: to.x,
        y2: to.y - NODE_H / 2,
        isActiveEdge,
        isReturningEdge,
        isInActivePath,
      });
    }
  });

  return (
    <svg
      ref={svgRef}
      viewBox={`${minX} -32 ${W} ${H}`}
      width="100%"
      height="100%"
      style={{ overflow: "visible", minHeight: 280 }}
    >
      <defs>
        <filter id="rt-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="rt-glow-sm" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* subtle grid pattern */}
        <pattern id="rt-grid" width="36" height="36" patternUnits="userSpaceOnUse">
          <path
            d="M 36 0 L 0 0 0 36"
            fill="none"
            stroke="rgba(96,165,250,0.04)"
            strokeWidth="0.5"
          />
        </pattern>
      </defs>

      {/* background grid */}
      <rect
        x={minX}
        y={-32}
        width={W}
        height={H}
        fill="url(#rt-grid)"
      />

      {/* Edges */}
      <AnimatePresence>
        {edges.map((e) => {
          const strokeColor = e.isActiveEdge
            ? "rgba(96,165,250,0.8)"
            : e.isInActivePath
            ? "rgba(96,165,250,0.5)"
            : e.isReturningEdge
            ? "rgba(52,211,153,0.4)"
            : "rgba(255,255,255,0.08)";
          
          const strokeWidth = e.isActiveEdge ? 1.5 : e.isInActivePath ? 1.2 : 1;
          
          return (
            <motion.line
              key={e.key}
              x1={e.x1}
              y1={e.y1}
              x2={e.x2}
              y2={e.y2}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              strokeDasharray={e.isActiveEdge || e.isInActivePath ? undefined : "5 5"}
              initial={{ opacity: 0, pathLength: 0 }}
              animate={{ opacity: 1, pathLength: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              filter={e.isActiveEdge ? "url(#rt-glow-sm)" : undefined}
            />
          );
        })}
      </AnimatePresence>

      {/* Nodes */}
      <AnimatePresence>
        {nodes.map((n) =>
          layout[n.id] ? (
            <TreeNodeShape
              key={n.id}
              node={layout[n.id]}
              isActive={n.id === activeId}
              isInPath={activePath.has(n.id)}
            />
          ) : null
        )}
      </AnimatePresence>
    </svg>
  );
}

// ─── Explanation pill ─────────────────────────────────────────────────────────

function ExplanationPill({ step }: { step: RecursionStep | null }) {
  if (!step?.explanation) return null;

  const activeFrame = step.callStack[step.activeCallIndex ?? -1];
  const isCall = activeFrame?.returned === undefined;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step.explanation}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{ duration: 0.18 }}
        className="flex items-center gap-2 px-3 py-1.5 rounded-md border text-xs font-mono"
        style={{
          background: isCall
            ? "rgba(59,130,246,0.08)"
            : "rgba(52,211,153,0.08)",
          borderColor: isCall
            ? "rgba(96,165,250,0.3)"
            : "rgba(52,211,153,0.3)",
          color: isCall ? "rgb(147,197,253)" : "rgb(52,211,153)",
        }}
      >
        <span
          className="text-[10px] opacity-60 tracking-widest"
          style={{ color: "inherit" }}
        >
          {isCall ? "→ CALL" : "← RET"}
        </span>
        <span>{step.explanation}</span>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Stats row ────────────────────────────────────────────────────────────────

interface StatsProps {
  nodes: TreeNode[];
  totalSteps: number;
  currStep: number;
}

function StatsRow({ nodes, totalSteps, currStep }: StatsProps) {
  const depth = nodes.length
    ? Math.max(...nodes.map((n) => n.depth))
    : 0;
  const resolved = nodes.filter((n) => n.returned !== undefined).length;

  const items = [
    { label: "NODES", value: nodes.length, color: "rgb(226,232,240)" },
    { label: "DEPTH", value: depth, color: "rgb(251,191,36)" },
    { label: "RESOLVED", value: resolved, color: "rgb(52,211,153)" },
    {
      label: "STEP",
      value: `${currStep + 1} / ${totalSteps}`,
      color: "rgb(147,197,253)",
    },
  ];

  return (
    <div className="flex items-center flex-wrap gap-x-4 gap-y-1">
      {items.map(({ label, value, color }) => (
        <div key={label} className="flex items-center gap-1.5">
          <span className="text-[10px] font-mono tracking-widest hidden sm:inline"
            style={{ color: "rgba(148,163,184,0.6)" }}>
            {label}
          </span>
          <motion.span
            key={`${label}-${value}`}
            initial={{ opacity: 0.4, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-mono font-semibold tabular-nums"
            style={{ color }}
          >
            {value}
          </motion.span>
        </div>
      ))}
    </div>
  );
}

const RecursionTreeVisualizer: React.FC = () => {
  
  const { algorithm, steps, currStep } = useVisualizerStore();
  const currAlgo = algorithm? RecursionAlgorithms[algorithm] : null;


  const scrollRef = useRef<HTMLDivElement>(null);

  const step =
    steps.length > 0 && currStep < steps.length
      ? steps[currStep]
      : null;

  const recursionStep: RecursionStep | null =
    step?.type === "recursion" ? (step as RecursionStep) : null;

  // Convert RecursionTreeNode[] to TreeNode[] (just field name mapping)
  const treeNodes = useMemo<TreeNode[]>(() => {
    if (!recursionStep?.treeNodes) return [];
    
    return recursionStep.treeNodes.map((node: RecursionTreeNode) => ({
      id: node.id,
      fn: node.fn,
      args: node.args,
      returned: node.returned,
      parentId: node.parentId,
      depth: node.depth,
      children: node.childIds,  // Note: childIds → children
    }));
  }, [recursionStep]);

  const layout = useMemo<Record<number, LayoutNode>>(
    () => computeLayout(treeNodes),
    [treeNodes]
  );

  // Use activeNodeId from the step
  const activeId = recursionStep?.activeNodeId;

  // Build path from root to active node
  const activePath = useMemo(
    () => buildActivePath(treeNodes, activeId),
    [treeNodes, activeId]
  );

  // Auto-scroll tree to keep active node visible
  useEffect(() => {
    if (!scrollRef.current || activeId === undefined) return;
    const node = layout[activeId];
    if (!node) return;
    
    const container = scrollRef.current;
    const containerW = container.clientWidth;
    const svgW = container.scrollWidth;
    const relX = (node.x / svgW) * svgW + svgW / 2;
    
    container.scrollTo({
      left: relX - containerW / 2,
      behavior: "smooth",
    });
  }, [activeId, layout]);
 
  // ── Empty state ──
  if (!steps.length) {
    return (
      <div className="flex flex-col lg:flex-row flex-1 items-center justify-center gap-4 p-4">
        {/* Callstack empty */}
        <Callstack />
        {/* Tree empty */}
        <div
          className="w-full lg:flex-1 flex flex-col items-center justify-center rounded-xl border min-h-[200px] lg:min-h-[70vh]"
          style={{
            borderColor: "rgba(255,255,255,0.07)",
            background: "rgba(255,255,255,0.02)",
          }}
        >
          <div
            className="text-sm font-mono"
            style={{ color: "rgba(148,163,184,0.4)" }}
          >
            {currAlgo?.type==='linear'? 
            "Tree Visualization is not needed"
            : 
            "Run an algorithm to see the recursion tree"}
          </div>
        </div>
      </div>
    );
  }

  if (!recursionStep) return null;

  return (
    <div className="flex flex-col lg:flex-row flex-1 gap-4 p-4 min-h-0">
      {/* ── Call Stack (from shared component) ── */}
      <Callstack />

      {/* ── Tree Panel ── */}
      {currAlgo?.type === 'linear' ?
        <div className="flex items-center justify-center text-sm text-slate-400 py-4">
          Tree Visualization is not needed!
        </div>
        :
        <div
          className="flex flex-col flex-1 rounded-xl border overflow-hidden min-h-[400px] lg:min-h-0"
          style={{
            borderColor: "rgba(255,255,255,0.07)",
            background: "rgba(255,255,255,0.02)",
          }}
        >
          {/* Header bar */}
          <div
            className="flex items-center justify-between px-4 py-2.5 border-b shrink-0"
            style={{ borderColor: "rgba(255,255,255,0.06)" }}
          >
            <div className="flex items-center gap-3">
              {/* Traffic light dots */}
              <div className="flex gap-1.5">
                {["rgba(239,68,68,0.6)", "rgba(251,191,36,0.6)", "rgba(52,211,153,0.6)"].map(
                  (c, i) => (
                    <div
                      key={i}
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ background: c }}
                    />
                  )
                )}
              </div>
              <span
                className="text-xs font-mono tracking-widest hidden sm:block"
                style={{ color: "rgba(148,163,184,0.5)" }}
              >
                RECURSION TREE
              </span>
            </div>

            <StatsRow
              nodes={treeNodes}
              totalSteps={steps.length}
              currStep={currStep}
            />
          </div>

          {/* Tree canvas — scrollable */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-auto"
            style={{ scrollbarWidth: "thin" }}
          >
            <div
              style={{
                minWidth: "100%",
                minHeight: "100%",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
                padding: "16px 20px 24px",
              }}
            >
              <TreeCanvas
                nodes={treeNodes}
                layout={layout}
                activeId={activeId}
                activePath={activePath}
              />
            </div>
          </div>

          {/* Footer — explanation */}
          <div
            className="px-4 py-2.5 border-t flex items-center shrink-0"
            style={{ borderColor: "rgba(255,255,255,0.06)" }}
          >
            <ExplanationPill step={recursionStep} />
          </div>
        </div>
      }
    </div>
  );
};

export default RecursionTreeVisualizer;