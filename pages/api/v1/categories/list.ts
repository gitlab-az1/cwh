import { MethodNotAllowedError } from 'typesdk/errors';

import { handleRouteError } from '@/errors';
import categories from '@/resources/static/categories';
import type { ApiRequest, ApiResponse } from '@/@types';


export default async function handler(request: ApiRequest, response: ApiResponse): Promise<void> {
  try {
    if(request.method?.toLowerCase() !== 'get') {
      throw new MethodNotAllowedError('');
    }

    response.status(200).json(categories);
    return void response.end();
  } catch (err: any) {
    await handleRouteError(err, request, response);
  }
}
