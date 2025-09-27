'use client';
import * as PDFJS from 'pdfjs-dist/types/src/pdf';
import { useEffect, useState } from 'react';

export function usePDFJS(
  onLoad: (pdfjs: typeof PDFJS) => Promise<void>,
  deps: (string | number | boolean | undefined | null)[] = []
) {
  const [pdfjs, setPDFJS] = useState<typeof PDFJS>();

  // load the library once on mount (the webpack import automatically sets-up the worker)
  useEffect(() => {
    import('pdfjs-dist/webpack.mjs').then(setPDFJS);
  }, []);

  // execute the callback function whenever PDFJS loads (or a custom dependency-array updates)
  useEffect(() => {
    if (!pdfjs) return;
    (async () => await onLoad(pdfjs))();
  }, [pdfjs, onLoad, deps]);
}

// usage example:
/*
"use client";
import {usePDFJS} from "...";


export default function Page() {
  usePDFJS(async (pdfjs) => {
    console.log(pdfjs)
  })
}
*/
