import { NextMiddleware, NextResponse, userAgent } from 'next/server';

import { DOMAIN_URL } from 'constants/variables';

export const middleware: NextMiddleware = async req => {
  const url = req.nextUrl;

  if (['/api/auth'].some(u => url.pathname.startsWith(u))) {
    const callbackUrl = url.searchParams.get('callbackUrl');
    const { isBot } = userAgent(req);

    if (isBot || (callbackUrl && ![DOMAIN_URL].some(u => callbackUrl.startsWith(u)))) {
      req.nextUrl.pathname = '/api/nope';

      return NextResponse.redirect(req.nextUrl);
    }
  }

  return NextResponse.next();
};
