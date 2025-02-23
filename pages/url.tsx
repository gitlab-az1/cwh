// import { Box } from '@mui/material';
// import React, { useRef } from 'react';

// import { palette } from '@/styles/theme';
// import { api, transporter } from '@/lib/http';
// import { Icon, Link, Typography } from '@/components';
// import { useAckEffect, useDebug, useQueryState } from '@/hooks';


// type QueryStringState = {
//   href: string;
// }

// const UrlForward = () => {
//   const debugWarn = useDebug('warn');
//   const debugError = useDebug('error');
  
//   const loadedRef = useRef<boolean>(false);
//   const { query } = useQueryState<QueryStringState>();

//   useAckEffect(() => {
//     if(!query.href) return loadedRef.current = false;
//     if(loadedRef.current) return true;
    
//     (async function() {
//       try {
//         const body = await transporter.createToken({ props: query });
  
//         const res = await api.post('/api/v1/report?format=json&cid=uf', {
//           body: JSON.stringify(body),
//           headers: {
//             'Content-Type': 'application/json; charset=UTF-8',
//           },
//         });

//         if(res.status !== 202) {
//           const response = await (
//             res.headers['content-type']?.includes('application/json') ?
//               res.json() :
//               res.text()
//           );

//           debugWarn('UrlForward::InvokeAckEffect->UrlReport', { response, status: res.status, res });
//           throw {};
//         }
//       } catch (err: any) {
//         debugError('UrlForward::InvokeAckEffect->UrlReport', err);
//       } finally {
//         loadedRef.current = true;
  
//         setTimeout(() => {
//           window.location.href = decodeURIComponent(query.href!);
//         }, 375);
//       }
//     })();

//     return loadedRef.current;
//   }, [query.href]);

//   if(!query.href) return (
//     <Box
//       sx={{
//         padding: '1rem 1.1rem',
//         margin: '22svh auto 0',
//         maxWidth: '700px',
//         width: '100%',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         gap: '.86rem',
//         color: 'var(--text-secondary)',
    
//         '& > .icon': {
//           fontSize: '3rem',
//           fontWeight: 100,
//           color: 'unset',
//         },
    
//         '& > span': {
//           fontSize: '1rem',
//           letterSpacing: 'calc(var(--default-letter-spacing) / 2)',
    
//           '& > a': {
//             color: palette.theme.blue,
//             marginLeft: '5px',
//           },
//         },
//       }}
//     >
//       <Icon icon="report" />
//       <Typography.Text>
//         Ops, I don&apos;t known where you want to go...
//         <Link rel="noopener noreferrer" hyperReference="/" target="_self" forceNavigate>back to home</Link>
//       </Typography.Text>
//     </Box>
//   );
    
//   return (
//     <Box
//       sx={{
//         padding: '1rem 1.1rem',
//         overflow: 'hidden',
//         backgroundColor: 'var(--body-bg)',
//         color: 'var(--text-color)',
//         position: 'fixed',
//         top: 0,
//         left: 0,
//         width: '100%',
//         height: '100svh',
//         zIndex: 571958,
//       }}
//     >
//       <Typography.Text>Redirecting to {decodeURIComponent(query.href)}</Typography.Text>
//     </Box>
//   );
// };

// export default UrlForward;
