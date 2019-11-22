import Document, { DefaultDocumentIProps, NextDocumentContext } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  public static async getInitialProps(
    context: NextDocumentContext,
  ): Promise<DefaultDocumentIProps> {
    const sheet = new ServerStyleSheet();

    const originalRenderPage = context.renderPage;
    context.renderPage = () =>
      // @ts-ignore
      originalRenderPage({ enhanceApp: App => props => sheet.collectStyles(<App {...props} />) });

    const initialProps = await Document.getInitialProps(context);
    // @ts-ignore
    return { ...initialProps, styles: [...initialProps.styles, ...sheet.getStyleElement()] };
  }
}
