declare module "html-truncate" {
  interface TruncateOptions {
    ellipsis?: string;
    keepImageTag?: boolean;
    keepImageAlt?: boolean;
    keepUrlTag?: boolean;
  }

  function truncate(html: string, length: number, options?: TruncateOptions): string;

  export default truncate;
}