import http from '../utils/request';


export const apiLogin = query => http.post('/login', query)

export const apiRouter = query => http.post('/router', query)

export const apiTable = query => http.get('/table', query)

export const apiSidebarData= query => http.get('/sidebarData', query)


