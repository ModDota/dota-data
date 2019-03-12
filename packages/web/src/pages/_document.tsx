import Document, { DefaultDocumentIProps, NextDocumentContext } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  public static async getInitialProps(ctx: NextDocumentContext): Promise<DefaultDocumentIProps> {
    const sheet = new ServerStyleSheet();

    const originalRenderPage = ctx.renderPage;
    ctx.renderPage = () =>
      // @ts-ignore
      originalRenderPage({ enhanceApp: App => props => sheet.collectStyles(<App {...props} />) });

    const initialProps = await Document.getInitialProps(ctx);
    // @ts-ignore
    return { ...initialProps, styles: [...initialProps.styles, ...sheet.getStyleElement()] };
  }
}
