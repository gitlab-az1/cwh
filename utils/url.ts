import { validateEmail } from 'typesdk/validators';


export function extractDomainAuthority(domain: string): string {
  const url = new URL(domain);
  let authority: string = '';

  if(!url.port) {
    if(url.protocol === 'https:' && domain.includes(':443')) {
      authority = `${url.hostname}:443`;
    } else if(url.protocol === 'http:' && domain.includes(':80')) {
      authority = `${url.hostname}:80`;
    } else {
      authority = url.host;
    }
  } else {
    authority = `${url.hostname}:${url.port}`;
  }

  return authority;
}

export function extractEmailDomain(email: string): string {
  if(!validateEmail(email)) return '';
  return extractDomainAuthority(email.split('@')[1]);
}
