import React from "react";

export default function withMouseContainer(ChildComponent) {
  class MouseContainer extends React.Component {
    constructor() {
      super();

      this.containerRef = React.createRef();
      this.childRef = React.createRef();
    }

    componentDidMount() {
      document.addEventListener("mousedown", this.handleMouseDown);
    }

    componentWillUnmount() {
      document.removeEventListener("mousedown", this.handleMouseDown);
    }

    handleMouseDown = evt => {
      let domNode = evt.target;
      while (domNode && domNode !== this.containerRef.current) {
        domNode = domNode.parentElement;
      }

      if (!domNode) {
        this.childRef.current.handleMouseOut();
      }
    };

    render() {
      return (
        <div ref={this.containerRef}>
          <ChildComponent {...this.props} ref={this.childRef} />
        </div>
      );
    }
  }

  return MouseContainer;
}
