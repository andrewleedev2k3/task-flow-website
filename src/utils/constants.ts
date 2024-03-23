let apiRoot = ''

if (process.env.BUILD_MODE === 'dev') {
  apiRoot = 'http://localhost:3000'
}
if (process.env.BUILD_MODE === 'production') {
  apiRoot = 'https://task-flow-api-541w.onrender.com'
}

export const API_ROOT = apiRoot
