'use client';
import React, { useEffect, useRef } from 'react';
import { mountEffect } from '../../assets/effects/runtime.mjs';

/** Children keep their DOM semantics. Theme changes propagate through CSS tokens. */
export function DigEffect({ recipe, theme = 'light', paused = false, staticPreview = false, context, className, style, children, onStatus }) {
  const host = useRef(null), controller = useRef(null), callback = useRef(onStatus);
  callback.current = onStatus;
  useEffect(() => {
    const instance = mountEffect(host.current, recipe, { mode:theme, context, paused, staticPreview, onStatus:s=>callback.current?.(s) });
    controller.current=instance;
    return () => {instance.destroy(); if(controller.current===instance)controller.current=null;};
  }, []);
  useEffect(()=>{controller.current?.update(recipe);},[recipe]);
  useEffect(()=>{controller.current?.refreshTheme(theme);},[theme]);
  useEffect(()=>{controller.current?.setContext(context || {});},[context]);
  useEffect(()=>{paused?controller.current?.pause():controller.current?.resume();},[paused]);
  useEffect(()=>{controller.current?.setStatic(staticPreview);},[staticPreview]);
  return <div ref={host} className={className} style={{...style,position:'relative',isolation:'isolate'}}>
    <div style={{position:'relative',zIndex:1}}>{children}</div>
  </div>;
}
