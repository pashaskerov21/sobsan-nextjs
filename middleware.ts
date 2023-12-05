import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { i18n } from './i18n-config'

import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

function getLocale(request: NextRequest): string | undefined {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales

  // Use negotiator and intl-localematcher to get best locale
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales
  )

  const locale = matchLocale(languages, locales, i18n.defaultLocale)

  return locale
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // // `/_next/` and `/api/` are ignored by the watcher, but we need to ignore files in `public` manually.
  // // If you have one
  if (
    [
      '/banner/banner-1.webp',
      '/banner/banner-2.webp',
      '/banner/banner-3.webp',
      '/banner/banner-4.webp',
      '/banner/banner-5.webp',
      '/banner/banner-6.webp',
      '/banner/banner-7.webp',
      '/banner/product-banner-1.webp',
      '/banner/product-banner-2.webp',

      'catalog/sobmatik/img-1.webp',
      'catalog/sobmatik/img-1-1.webp',
      'catalog/sobmatik/img-1-2.webp',
      'catalog/sobmatik/img-1-3.webp',
      'catalog/sobmatik/img-1-4.webp',
      'catalog/sobmatik/img-2.webp',
      'catalog/sobmatik/img-2-1.webp',
      'catalog/sobmatik/img-2-2.webp',
      'catalog/sobmatik/img-2-3.webp',
      'catalog/sobmatik/img-2-4.webp',
      'catalog/sobmatik/img-3.webp',
      'catalog/sobmatik/img-3-1.webp',
      'catalog/sobmatik/img-3-2.webp',
      'catalog/sobmatik/img-3-3.webp',
      'catalog/sobmatik/img-3-4.webp',
      'catalog/sobmatik/img-4.webp',
      'catalog/sobmatik/img-4-1.webp',
      'catalog/sobmatik/img-4-2.webp',
      'catalog/sobmatik/img-4-3.webp',
      'catalog/sobmatik/img-4-4.webp',
      'catalog/sobmatik/img-5.webp',
      'catalog/sobmatik/img-5-1.webp',
      'catalog/sobmatik/img-5-2.webp',
      'catalog/sobmatik/img-5-3.webp',
      'catalog/sobmatik/img-5-4.webp',
      'catalog/sobmatik/img-6.webp',
      'catalog/sobmatik/img-6-1.webp',
      'catalog/sobmatik/img-6-2.webp',
      'catalog/sobmatik/img-6-3.webp',
      'catalog/sobmatik/img-6-4.webp',
      'catalog/sobmatik/img-7.webp',
      'catalog/sobmatik/img-7-1.webp',
      'catalog/sobmatik/img-7-2.webp',
      'catalog/sobmatik/img-7-3.webp',
      'catalog/sobmatik/img-7-4.webp',
      'catalog/sobmatik/img-8.webp',
      'catalog/sobmatik/img-8-1.webp',
      'catalog/sobmatik/img-8-2.webp',
      'catalog/sobmatik/img-8-3.webp',
      'catalog/sobmatik/img-8-4.webp',
      'catalog/sobmatik/img-9.webp',
      'catalog/sobmatik/img-9-1.webp',
      'catalog/sobmatik/img-9-2.webp',
      'catalog/sobmatik/img-9-3.webp',
      'catalog/sobmatik/img-9-4.webp',
      '/catalog/crystal/img-1.webp',
      '/catalog/crystal/img-2.webp',
      '/catalog/crystal/img-3.webp',
      '/catalog/crystal/img-4.webp',
      '/catalog/crystal/img-5.webp',
      '/catalog/crystal/img-6.webp',
      '/catalog/hammerton/img-1.webp',
      '/catalog/hammerton/img-2.webp',
      '/catalog/hammerton/img-3.webp',
      '/catalog/hammerton/img-4.webp',
      '/catalog/hammerton/img-5.webp',
      '/catalog/hammerton/img-6.webp',
      '/catalog/hammerton/img-7.webp',
      '/catalog/hammerton/img-8.webp',
      '/catalog/hammerton/img-9.webp',
      '/catalog/hammerton/img-10.webp',
      '/catalog/hammerton/img-11.webp',
      '/catalog/hammerton/img-12.webp',
      '/catalog/mineral-siva/img-1.webp',
      '/catalog/mineral-siva/img-2.webp',
      '/catalog/mineral-siva/img-3.webp',
      '/catalog/mineral-siva/img-4.webp',
      '/catalog/mineral-siva/img-5.webp',
      '/catalog/mineral-siva/img-6.webp',
      '/catalog/mineral-siva/img-7.webp',
      '/catalog/mineral-siva/img-8.webp',
      '/catalog/mineral-siva/img-9.webp',
      '/catalog/mineral-siva/img-10.webp',
      '/catalog/mineral-siva/img-11.webp',
      '/catalog/mineral-siva/img-12.webp',
      '/catalog/mobitex/img-1.webp',
      '/catalog/mobitex/img-2.webp',
      '/catalog/mobitex/img-3.webp',
      '/catalog/mobitex/img-4.webp',
      '/catalog/mobitex/img-5.webp',
      '/catalog/mobitex/img-6.webp',
      '/catalog/mobitex/img-7.webp',
      '/catalog/mobitex/img-8.webp',
      '/catalog/mobitex/img-9.webp',
      '/catalog/mobitex/img-10.webp',
      '/catalog/mobitex/img-11.webp',
      '/catalog/mobitex/img-12.webp',
      '/catalog/mobitex/img-13.webp',
      '/catalog/mobitex/img-14.webp',
      '/catalog/mobitex/img-15.webp',
      '/catalog/sedef/img-1.webp',
      '/catalog/sedef/img-2.webp',
      '/catalog/sedef/img-3.webp',
      '/catalog/sedef/img-4.webp',
      '/catalog/sedef/img-5.webp',
      '/catalog/sedef/img-6.webp',
      '/catalog/sedef/img-7.webp',
      '/catalog/sedef/img-8.webp',
      '/catalog/sedef/img-9.webp',
      '/catalog/sedef/img-10.webp',
      '/catalog/sedef/img-11.webp',
      '/catalog/sedef/img-12.webp',
      '/catalog/sellulozik/img-1.webp',
      '/catalog/sellulozik/img-2.webp',
      '/catalog/sellulozik/img-3.webp',
      '/catalog/sellulozik/img-4.webp',
      '/catalog/sellulozik/img-5.webp',
      '/catalog/sellulozik/img-6.webp',
      '/catalog/sellulozik/img-7.webp',
      '/catalog/sellulozik/img-8.webp',
      '/catalog/sellulozik/img-9.webp',
      '/catalog/sellulozik/img-10.webp',
      '/catalog/sellulozik/img-11.webp',
      '/catalog/sellulozik/img-12.webp',
      '/catalog/sintetik/img-1.webp',
      '/catalog/sintetik/img-2.webp',
      '/catalog/sintetik/img-3.webp',
      '/catalog/sintetik/img-4.webp',
      '/catalog/sintetik/img-5.webp',
      '/catalog/sintetik/img-6.webp',
      '/catalog/sintetik/img-7.webp',
      '/catalog/sintetik/img-8.webp',
      '/catalog/sintetik/img-9.webp',
      '/catalog/sintetik/img-10.webp',
      '/catalog/sintetik/img-11.webp',
      '/catalog/sintetik/img-12.webp',
      '/catalog/universal/img-1.webp',
      '/catalog/universal/img-2.webp',
      '/catalog/universal/img-3.webp',
      '/catalog/universal/img-4.webp',
      '/catalog/universal/img-5.webp',
      '/catalog/universal/img-6.webp',
      '/catalog/universal/img-7.webp',
      '/catalog/universal/img-8.webp',
      '/catalog/universal/img-9.webp',
      '/catalog/universal/img-10.webp',
      '/catalog/universal/img-11.webp',
      '/catalog/universal/img-12.webp',
      'catalog/rulotex/img-1.webp',
      'catalog/rulotex/img-2.webp',
      'catalog/rulotex/img-3.webp',
      'catalog/rulotex/img-4.webp',
      'catalog/rulotex/img-5.webp',
      'catalog/rulotex/img-6.webp',
      'catalog/rulotex/img-7.webp',
      'catalog/rulotex/img-8.webp',
      'catalog/rulotex/img-9.webp',
      'catalog/rulotex/img-10.webp',
      'catalog/rulotex/img-11.webp',
      'catalog/rulotex/img-12.webp',

      '/category/cover-1.webp',
      '/category/cover-2.webp',
      '/category/cover-3.webp',
      '/category/cover-4.webp',
      '/category/cover-5.webp',

      '/design/large-drop-bg.webp',
      '/design/loader.svg',
      '/design/slogan.svg',

      '/gallery/photo/img-1.webp',
      '/gallery/photo/img-2.webp',
      '/gallery/photo/img-3.webp',
      '/gallery/photo/img-4.webp',
      '/gallery/photo/img-5.webp',
      '/gallery/photo/img-6.webp',
      '/gallery/photo/img-7.webp',
      '/gallery/photo/img-8.webp',
      '/gallery/photo/img-9.webp',
      '/gallery/video/img-1.webp',
      '/gallery/video/img-2.webp',
      '/gallery/video/img-3.webp',
      '/gallery/video/img-4.webp',
      '/gallery/video/img-5.webp',

      '/logo/logo.svg',
      '/logo/master-logo.webp',

      '/masters/banner-1.webp',
      '/masters/banner-2.webp',

      '/products/product-1.webp',
      '/products/product-2.webp',
      '/products/product-3.webp',
      '/products/product-4.webp',
      '/products/product-5.webp',
      '/products/product-6.webp',
      '/products/product-7.webp',
      '/products/product-8.webp',
      '/products/product-9.webp',
      '/products/product-10.webp',
      '/products/product-11.webp',
      '/products/product-12.webp',
      '/products/product-13.webp',
      '/products/product-14.webp',
      '/products/product-15.webp',
      '/products/product-16.webp',
      '/products/product-17.webp',
      '/products/product-18.webp',
      '/products/product-19.webp',
      '/products/product-20.webp',
      '/products/product-21.webp',
      '/products/product-22.webp',
      '/products/product-23.webp',
      '/products/product-24.webp',
      '/products/product-25.webp',
      '/products/product-26.webp',
      '/products/product-27.webp',
      '/products/product-28.webp',
      '/products/product-29.webp',
      '/products/product-30.webp',
      '/products/product-31.webp',
      '/products/product-32.webp',
      '/products/product-33.webp',
      '/products/product-34.webp',
      '/products/product-35.webp',
      '/products/product-36.webp',
      '/products/product-37.webp',
      '/products/product-38.webp',
      '/products/product-39.webp',
      '/products/product-40.webp',
      '/products/product-41.webp',
      '/products/product-42.webp',
      '/products/product-43.webp',
      '/products/product-44.webp',
      '/products/product-45.webp',
      '/products/product-46.webp',
      '/products/product-47.webp',
      '/products/product-48.webp',
      '/products/product-49.webp',
      '/products/product-50.webp',
      '/products/product-51.webp',
      '/products/product-52.webp',
      '/products/product-53.webp',
      '/products/product-54.webp',
      '/products/product-55.webp',
      '/products/product-56.webp',
      '/products/product-57.webp',
      '/products/product-58.webp',
      '/products/product-59.webp',
      '/products/product-60.webp',
      '/products/product-61.webp',
      '/products/product-62.webp',
      '/products/product-63.webp',
      '/products/product-64.webp',
      '/products/product-65.webp',
      '/products/product-66.webp',
      '/products/product-67.webp',
      '/products/product-68.webp',
      '/products/product-69.webp',
      '/products/product-79.webp',
      '/products/product-71.webp',
      '/products/product-72.webp',
      '/products/product-73.webp',
      '/products/product-74.webp',
      '/products/product-75.webp',
      '/products/product-76.webp',
      '/products/product-77.webp',
      '/products/product-78.webp',
      '/products/product-79.webp',
      '/products/product-80.webp',
      '/products/product-81.webp',
      '/products/product-82.webp',
      '/products/product-83.webp',

      '/room/img-1.webp',
      '/room/img-2.webp',
      '/room/img-3.webp',
      '/room/img-4.webp',
      '/room/img-5.webp',

      '/text/about-1.webp',
      '/text/about-2.webp',
      '/text/color-system.webp',
      '/text/payment-delivery.webp',
      '/text/warranty-condition.webp',

      '/partners/image-1.webp',
      '/partners/image-2.webp',
      '/partners/image-3.webp',

      '/news/image-1.webp'

    ].includes(pathname)
  )
    return

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)

    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
        request.url
      )
    )
  }
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
