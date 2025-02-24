import { BadRequestError, MethodNotAllowedError, NotFoundError } from 'typesdk/errors';

import { handleRouteError } from '@/errors';
import type { ApiRequest, ApiResponse } from '@/@types';
import { findCategories } from '@/resources/static/categories';


export default async function handler(request: ApiRequest, response: ApiResponse): Promise<void> {
  try {
    if(request.method?.toLowerCase() !== 'get') {
      throw new MethodNotAllowedError('');
    }

    if(!request.query.categoryId) {
      throw new BadRequestError('');
    }

    const c = findCategories(request.query.categoryId as string);

    if(!c) {
      throw new NotFoundError('');
    }

    response.status(200).json(c);
    return void response.end();
  } catch (err: any) {
    await handleRouteError(err, request, response);
  }
}
