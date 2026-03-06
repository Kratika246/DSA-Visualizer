# DSA-Visualizer

DSA Visualizer is an interactive web platform for mastering Data Structures &amp; Algorithms. Built with Next.js App Router, React 19, and Framer Motion, it offers step-by-step animations for sorting, recursion, DP, and structures like BSTs &amp; Linked Lists. Features include playback controls, real-time Zustand state, etc!

An interactive web application to visualize **Data Structures and Algorithms (DSA)**. Built with modern web technologies, this visualizer helps understand the step-by-step execution of various algorithms and the inner workings of fundamental data structures.

## 🌟 Key Features

### 1. Algorithm Visualizers
Interactive step-by-step animations for:
- **Sorting Algorithms**: Bubble Sort, Merge Sort, Quick Sort, Insertion Sort, Selection Sort, etc.
- **Dynamic Programming (DP)**: Visualizing state changes, tabloids/memoization logic.
- **Recursion**: Recursive tree visualizations and call stack representation.
- **Backtracking**: Step-by-step path exploration (e.g., N-Queens, Sudoku Solver, Maze Generation).

### 2. Data Structure Visualizers
Conceptual modeling and dynamic interactions for:
- **Stack & Queue**: Push, pop, enqueue, and dequeue operations.
- **Linked List**: Node creation, traversal, insertion, and deletion.
- **Binary Search Tree (BST)**: Insertion, deletion, and tree traversals (Inorder, Preorder, Postorder).

### 3. Rich User Interface
- **Animation Controls**: Play, pause, step-forward, step-backward, and speed adjustments.
- **Interactive Code Highlighting**: Syntax highlighted code blocks that track the current state of the algorithm (powered by Shiki).
- **Responsive Layout**: Sidebar navigation and scalable visualizations for every screen size.

---

## 💻 Tech Stack

- **Framework:** [Next.js (App Router)](https://nextjs.org/) (v16+)
- **UI Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations:** [Framer Motion / Motion](https://motion.dev/)
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/)
- **Components:** [Radix UI](https://www.radix-ui.com/) & [Material UI (MUI)](https://mui.com/)
- **Syntax Highlighting:** [Shiki](https://shiki.style/)
- **Icons:** [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)
- **Language:** TypeScript

---

## 📁 Project Structure

```text
├── algorithms/       # Core logic and generator functions for algorithms
│   ├── backtracking/
│   ├── dp/
│   ├── recursion/
│   └── sorting/
├── app/              # Next.js App Router pages
│   ├── dp/
│   ├── ds/           # Data Structures (BST, Linked List, Queue, Stack)
│   ├── recursion/
│   └── sorting/
├── components/       # Reusable React UI Components
│   ├── controls/     # Playback controls (Play, Pause, Speed)
│   ├── layout/       # App layout wrappers
│   ├── sidebar/      # Sidebar navigation
│   ├── ui/           # Radix/Custom Base components
│   └── visualizers/  # Canvas/SVG visualization blocks
├── hooks/            # Custom React hooks
├── lib/              # Utility functions and shared helpers
├── store/            # Zustand global state configurations
└── scripts/          # Build scripts (e.g., generate-docs.mjs)
```
