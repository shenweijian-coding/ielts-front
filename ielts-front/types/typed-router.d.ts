/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
// Generated by unplugin-vue-router. ‼️ DO NOT MODIFY THIS FILE ‼️
// It's recommended to commit this file.
// Make sure to add this file to your tsconfig.json file as an "includes" or "files" entry.

/// <reference types="unplugin-vue-router/client" />

import type {
  // type safe route locations
  RouteLocationTypedList,
  RouteLocationResolvedTypedList,
  RouteLocationNormalizedTypedList,
  RouteLocationNormalizedLoadedTypedList,
  RouteLocationAsString,
  RouteLocationAsRelativeTypedList,
  RouteLocationAsPathTypedList,

  // helper types
  // route definitions
  RouteRecordInfo,
  ParamValue,
  ParamValueOneOrMore,
  ParamValueZeroOrMore,
  ParamValueZeroOrOne,

  // vue-router extensions
  _RouterTyped,
  RouterLinkTyped,
  RouterLinkPropsTyped,
  NavigationGuard,
  UseLinkFnTyped,

  // data fetching
  _DataLoader,
  _DefineLoaderOptions,
} from 'unplugin-vue-router/types'

declare module 'vue-router/auto/routes' {
  export interface RouteNamedMap {
    '/': RouteRecordInfo<'/', '/', Record<never, never>, Record<never, never>>,
    '/contain/': RouteRecordInfo<'/contain/', '/contain', Record<never, never>, Record<never, never>>,
    '/contain/components/layout': RouteRecordInfo<'/contain/components/layout', '/contain/components/layout', Record<never, never>, Record<never, never>>,
    '/contain/components/main': RouteRecordInfo<'/contain/components/main', '/contain/components/main', Record<never, never>, Record<never, never>>,
    '/contain/components/subAside': RouteRecordInfo<'/contain/components/subAside', '/contain/components/subAside', Record<never, never>, Record<never, never>>,
    '/enterprise//class/': RouteRecordInfo<'/enterprise//class/', '/enterprise/class', Record<never, never>, Record<never, never>>,
    '/enterprise//class/components/booksDialog': RouteRecordInfo<'/enterprise//class/components/booksDialog', '/enterprise/class/components/booksDialog', Record<never, never>, Record<never, never>>,
    '/enterprise//class/detail': RouteRecordInfo<'/enterprise//class/detail', '/enterprise/class/detail', Record<never, never>, Record<never, never>>,
    '/enterprise//library/': RouteRecordInfo<'/enterprise//library/', '/enterprise/library', Record<never, never>, Record<never, never>>,
    '/enterprise//library/import-dialog': RouteRecordInfo<'/enterprise//library/import-dialog', '/enterprise/library/import-dialog', Record<never, never>, Record<never, never>>,
    '/enterprise//member/': RouteRecordInfo<'/enterprise//member/', '/enterprise/member', Record<never, never>, Record<never, never>>,
    '/enterprise//user/': RouteRecordInfo<'/enterprise//user/', '/enterprise/user', Record<never, never>, Record<never, never>>,
    '/enterprise/companyInfo': RouteRecordInfo<'/enterprise/companyInfo', '/enterprise/companyInfo', Record<never, never>, Record<never, never>>,
    '/enterprise/invite': RouteRecordInfo<'/enterprise/invite', '/enterprise/invite', Record<never, never>, Record<never, never>>,
    '/enterprise/join': RouteRecordInfo<'/enterprise/join', '/enterprise/join', Record<never, never>, Record<never, never>>,
    '/enterprise/join-class': RouteRecordInfo<'/enterprise/join-class', '/enterprise/join-class', Record<never, never>, Record<never, never>>,
    '/enterprise/layout': RouteRecordInfo<'/enterprise/layout', '/enterprise/layout', Record<never, never>, Record<never, never>>,
    '/errorBook/': RouteRecordInfo<'/errorBook/', '/errorBook', Record<never, never>, Record<never, never>>,
    '/errorBook/components/collect-dialog': RouteRecordInfo<'/errorBook/components/collect-dialog', '/errorBook/components/collect-dialog', Record<never, never>, Record<never, never>>,
    '/errorBook/components/import-dialog': RouteRecordInfo<'/errorBook/components/import-dialog', '/errorBook/components/import-dialog', Record<never, never>, Record<never, never>>,
    '/forgetPassword/': RouteRecordInfo<'/forgetPassword/', '/forgetPassword', Record<never, never>, Record<never, never>>,
    '/gallery/': RouteRecordInfo<'/gallery/', '/gallery', Record<never, never>, Record<never, never>>,
    '/gallery/chapter-dialog': RouteRecordInfo<'/gallery/chapter-dialog', '/gallery/chapter-dialog', Record<never, never>, Record<never, never>>,
    '/gallery/import-dialog': RouteRecordInfo<'/gallery/import-dialog', '/gallery/import-dialog', Record<never, never>, Record<never, never>>,
    '/home/': RouteRecordInfo<'/home/', '/home', Record<never, never>, Record<never, never>>,
    '/home/down-template': RouteRecordInfo<'/home/down-template', '/home/down-template', Record<never, never>, Record<never, never>>,
    '/home/mistakeDialog': RouteRecordInfo<'/home/mistakeDialog', '/home/mistakeDialog', Record<never, never>, Record<never, never>>,
    '/home/walkman': RouteRecordInfo<'/home/walkman', '/home/walkman', Record<never, never>, Record<never, never>>,
    '/home/wordsDrawer': RouteRecordInfo<'/home/wordsDrawer', '/home/wordsDrawer', Record<never, never>, Record<never, never>>,
    '/login/': RouteRecordInfo<'/login/', '/login', Record<never, never>, Record<never, never>>,
    '/login/components/banner': RouteRecordInfo<'/login/components/banner', '/login/components/banner', Record<never, never>, Record<never, never>>,
    '/login/components/login-form': RouteRecordInfo<'/login/components/login-form', '/login/components/login-form', Record<never, never>, Record<never, never>>,
    '/login/components/sign-in': RouteRecordInfo<'/login/components/sign-in', '/login/components/sign-in', Record<never, never>, Record<never, never>>,
    '/statistics/': RouteRecordInfo<'/statistics/', '/statistics', Record<never, never>, Record<never, never>>,
    '/stop/': RouteRecordInfo<'/stop/', '/stop', Record<never, never>, Record<never, never>>,
    '/user/': RouteRecordInfo<'/user/', '/user', Record<never, never>, Record<never, never>>,
    '/vocabularyBook/': RouteRecordInfo<'/vocabularyBook/', '/vocabularyBook', Record<never, never>, Record<never, never>>,
    '/vocabularyBook/chapter-dialog': RouteRecordInfo<'/vocabularyBook/chapter-dialog', '/vocabularyBook/chapter-dialog', Record<never, never>, Record<never, never>>,
    '/vocabularyBook/detail/': RouteRecordInfo<'/vocabularyBook/detail/', '/vocabularyBook/detail', Record<never, never>, Record<never, never>>,
  }
}

declare module 'vue-router/auto' {
  import type { RouteNamedMap } from 'vue-router/auto/routes'

  export type RouterTyped = _RouterTyped<RouteNamedMap>

  /**
   * Type safe version of `RouteLocationNormalized` (the type of `to` and `from` in navigation guards).
   * Allows passing the name of the route to be passed as a generic.
   */
  export type RouteLocationNormalized<Name extends keyof RouteNamedMap = keyof RouteNamedMap> = RouteLocationNormalizedTypedList<RouteNamedMap>[Name]

  /**
   * Type safe version of `RouteLocationNormalizedLoaded` (the return type of `useRoute()`).
   * Allows passing the name of the route to be passed as a generic.
   */
  export type RouteLocationNormalizedLoaded<Name extends keyof RouteNamedMap = keyof RouteNamedMap> = RouteLocationNormalizedLoadedTypedList<RouteNamedMap>[Name]

  /**
   * Type safe version of `RouteLocationResolved` (the returned route of `router.resolve()`).
   * Allows passing the name of the route to be passed as a generic.
   */
  export type RouteLocationResolved<Name extends keyof RouteNamedMap = keyof RouteNamedMap> = RouteLocationResolvedTypedList<RouteNamedMap>[Name]

  /**
   * Type safe version of `RouteLocation` . Allows passing the name of the route to be passed as a generic.
   */
  export type RouteLocation<Name extends keyof RouteNamedMap = keyof RouteNamedMap> = RouteLocationTypedList<RouteNamedMap>[Name]

  /**
   * Type safe version of `RouteLocationRaw` . Allows passing the name of the route to be passed as a generic.
   */
  export type RouteLocationRaw<Name extends keyof RouteNamedMap = keyof RouteNamedMap> =
    | RouteLocationAsString<RouteNamedMap>
    | RouteLocationAsRelativeTypedList<RouteNamedMap>[Name]
    | RouteLocationAsPathTypedList<RouteNamedMap>[Name]

  /**
   * Generate a type safe params for a route location. Requires the name of the route to be passed as a generic.
   */
  export type RouteParams<Name extends keyof RouteNamedMap> = RouteNamedMap[Name]['params']
  /**
   * Generate a type safe raw params for a route location. Requires the name of the route to be passed as a generic.
   */
  export type RouteParamsRaw<Name extends keyof RouteNamedMap> = RouteNamedMap[Name]['paramsRaw']

  export function useRouter(): RouterTyped
  export function useRoute<Name extends keyof RouteNamedMap = keyof RouteNamedMap>(name?: Name): RouteLocationNormalizedLoadedTypedList<RouteNamedMap>[Name]

  export const useLink: UseLinkFnTyped<RouteNamedMap>

  export function onBeforeRouteLeave(guard: NavigationGuard<RouteNamedMap>): void
  export function onBeforeRouteUpdate(guard: NavigationGuard<RouteNamedMap>): void

  export const RouterLink: RouterLinkTyped<RouteNamedMap>
  export const RouterLinkProps: RouterLinkPropsTyped<RouteNamedMap>

  // Experimental Data Fetching

  export function defineLoader<
    P extends Promise<any>,
    Name extends keyof RouteNamedMap = keyof RouteNamedMap,
    isLazy extends boolean = false,
  >(
    name: Name,
    loader: (route: RouteLocationNormalizedLoaded<Name>) => P,
    options?: _DefineLoaderOptions<isLazy>,
  ): _DataLoader<Awaited<P>, isLazy>
  export function defineLoader<
    P extends Promise<any>,
    isLazy extends boolean = false,
  >(
    loader: (route: RouteLocationNormalizedLoaded) => P,
    options?: _DefineLoaderOptions<isLazy>,
  ): _DataLoader<Awaited<P>, isLazy>

  export {
    _definePage as definePage,
    _HasDataLoaderMeta as HasDataLoaderMeta,
    _setupDataFetchingGuard as setupDataFetchingGuard,
    _stopDataFetchingScope as stopDataFetchingScope,
  } from 'unplugin-vue-router/runtime'
}

declare module 'vue-router' {
  import type { RouteNamedMap } from 'vue-router/auto/routes'

  export interface TypesConfig {
    beforeRouteUpdate: NavigationGuard<RouteNamedMap>
    beforeRouteLeave: NavigationGuard<RouteNamedMap>

    $route: RouteLocationNormalizedLoadedTypedList<RouteNamedMap>[keyof RouteNamedMap]
    $router: _RouterTyped<RouteNamedMap>

    RouterLink: RouterLinkTyped<RouteNamedMap>
  }
}
