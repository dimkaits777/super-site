import { Component } from 'react';

/**
 * Renders `fallback` if a child 3D model fails to load (missing/invalid .glb),
 * so a broken asset never blanks the scene — it falls back to the procedural model.
 */
export class ModelBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}
