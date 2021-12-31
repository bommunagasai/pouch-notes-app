import React from 'react'
function lazyWithPreload(factory) {
  const Component = React.lazy(factory);
  Component.preload = factory;
  return Component;
}

const PlateEditor = lazyWithPreload(() => import('./PlateEditor'));


export default  PlateEditor
