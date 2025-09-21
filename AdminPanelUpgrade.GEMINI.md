fix the below error:
AdminContext.jsx:126 Uncaught ReferenceError: React is not defined
    at AdminContextProvider (AdminContext.jsx:126:5)

AdminContext.jsx:126 Uncaught ReferenceError: React is not defined
    at AdminContextProvider (AdminContext.jsx:126:5)
hook.js:608 The above error occurred in the <AdminContextProvider> component:

    at AdminContextProvider (http://localhost:5174/src/context/AdminContext.jsx:7:31)
    at Router (http://localhost:5174/node_modules/.vite/deps/react-router-dom.js?v=8ede9451:4377:15)
    at BrowserRouter (http://localhost:5174/node_modules/.vite/deps/react-router-dom.js?v=8ede9451:5122:5)

Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.
overrideMethod	@	hook.js:608
logCapturedError	@	chunk-6BKLQ22S.js?v=d0869299:14032
update.callback	@	chunk-6BKLQ22S.js?v=d0869299:14052
callCallback	@	chunk-6BKLQ22S.js?v=d0869299:11248
commitUpdateQueue	@	chunk-6BKLQ22S.js?v=d0869299:11265
commitLayoutEffectOnFiber	@	chunk-6BKLQ22S.js?v=d0869299:17093
commitLayoutMountEffects_complete	@	chunk-6BKLQ22S.js?v=d0869299:17980
commitLayoutEffects_begin	@	chunk-6BKLQ22S.js?v=d0869299:17969
commitLayoutEffects	@	chunk-6BKLQ22S.js?v=d0869299:17920
commitRootImpl	@	chunk-6BKLQ22S.js?v=d0869299:19353
commitRoot	@	chunk-6BKLQ22S.js?v=d0869299:19277
finishConcurrentRender	@	chunk-6BKLQ22S.js?v=d0869299:18760
performConcurrentWorkOnRoot	@	chunk-6BKLQ22S.js?v=d0869299:18718
workLoop	@	chunk-6BKLQ22S.js?v=d0869299:197
flushWork	@	chunk-6BKLQ22S.js?v=d0869299:176
performWorkUntilDeadline	@	chunk-6BKLQ22S.js?v=d0869299:384
chunk-6BKLQ22S.js?v=d0869299:19413 Uncaught ReferenceError: React is not defined
    at AdminContextProvider (AdminContext.jsx:126:5)
