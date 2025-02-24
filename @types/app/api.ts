import { NextApiRequest, NextApiResponse } from 'next';


export interface ApiRequest extends NextApiRequest {
  readonly requestId: string;
}

export interface ApiResponse extends NextApiResponse { }
