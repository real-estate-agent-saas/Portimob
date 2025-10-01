
export function getTemplateRoutes(slug: string, templateRoutes: Object) {
  return Object.fromEntries(
    Object.entries(templateRoutes).map(([key, value]) => [
      key,
      {
        ...value,
        path: `/${slug}${value.path === "/" ? "" : value.path}`,
      },
    ])
  ) as typeof templateRoutes;
}
