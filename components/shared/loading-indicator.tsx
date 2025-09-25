'use client';

import { cn } from '@/lib/utils';
// import { Dot } from 'lucide-react';
import { useLinkStatus } from 'next/link';
import type { SVGProps } from 'react';

export default function LoadingIndicator({
  color,
  weight,
}: {
  color?: string;
  weight?: string;
}) {
  const { pending } = useLinkStatus();

  // console.log('LoadingIndicator', pending);

  const composedWeight = weight === undefined ? '500' : weight;
  // eslint-disable-next-line
  const composedColor =
    color === undefined ? 'bg-green-500' : `bg-${color}-${composedWeight}`;
  // console.log('LoadingIndicator color:', composedColor);

  return pending ? (
    <span role='status' aria-label='Loading' className={'block'}>
      <span className='sr-only'>Loading...</span>
      <span className={cn('block size-4')}>
        <SvgSpinnersPulseMultiple className='size-4' />
      </span>
      {/* <Dot className='block size-2 bg-green-500 rounded-full animate-pulse' /> */}
    </span>
  ) : null;
}

function SvgSpinnersPulseMultiple(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='1em'
      height='1em'
      viewBox='0 0 24 24'
      fill='currentColor'
      stroke='currentColor'
      {...props}>
      <circle
        cx={12}
        cy={12}
        r={0}
        fill='currentColor'
        strokeWidth={0.5}
        stroke='currentColor'>
        <animate
          id='svgSpinnersPulseMultiple0'
          fill='freeze'
          attributeName='r'
          begin='0;svgSpinnersPulseMultiple2.end'
          calcMode='spline'
          dur='1.5s'
          keySplines='.52,.6,.25,.99'
          values='0;11'></animate>
        <animate
          fill='freeze'
          attributeName='opacity'
          begin='0;svgSpinnersPulseMultiple2.end'
          calcMode='spline'
          dur='1.5s'
          keySplines='.52,.6,.25,.99'
          values='1;0'></animate>
      </circle>
      <circle
        cx={12}
        cy={12}
        r={0}
        fill='currentColor'
        strokeWidth={0.5}
        stroke='currentColor'>
        <animate
          id='svgSpinnersPulseMultiple1'
          fill='freeze'
          attributeName='r'
          begin='svgSpinnersPulseMultiple0.begin+0.2s'
          calcMode='spline'
          dur='1.5s'
          keySplines='.52,.6,.25,.99'
          values='0;11'></animate>
        <animate
          fill='freeze'
          attributeName='opacity'
          begin='svgSpinnersPulseMultiple0.begin+0.2s'
          calcMode='spline'
          dur='1.5s'
          keySplines='.52,.6,.25,.99'
          values='1;0'></animate>
      </circle>
      <circle
        cx={12}
        cy={12}
        r={0}
        fill='currentColor'
        strokeWidth={0.5}
        stroke='currentColor'>
        <animate
          id='svgSpinnersPulseMultiple2'
          fill='freeze'
          attributeName='r'
          begin='svgSpinnersPulseMultiple0.begin+0.4s'
          calcMode='spline'
          dur='1.5s'
          keySplines='.52,.6,.25,.99'
          values='0;11'></animate>
        <animate
          fill='freeze'
          attributeName='opacity'
          begin='svgSpinnersPulseMultiple0.begin+0.4s'
          calcMode='spline'
          dur='1.5s'
          keySplines='.52,.6,.25,.99'
          values='1;0'></animate>
      </circle>
    </svg>
  );
}
