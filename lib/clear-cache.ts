'use server';

import { revalidatePath, revalidateTag } from 'next/cache';

export async function clearCacheData({
  tagName,
  path,
  type,
}: {
  tagName?: string;
  path: string;
  type: 'page' | 'layout';
}) {
  if (type === 'layout') {
    revalidatePath(path, 'layout');
    return;
  }

  if (type === 'page') {
    revalidatePath(path, 'page');
    return;
  }

  if (tagName) {
    revalidateTag(tagName);
    return;
  }

  if (tagName && path) {
    revalidateTag(tagName);
    revalidatePath(path, 'page');
  }
}
