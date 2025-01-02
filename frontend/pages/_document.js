// pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* You can add any custom meta tags or additional stylesheets here */}
        </Head>
        <body>
          <Main />
          <NextScript />
          <script
            src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"
            integrity="sha384-oBqDVmMz4fnFO9gybB2GJdUWaD4b9APmKP9T1kCd5p5f/4DMDmjfXlqPdy/n94k0f"
            crossOrigin="anonymous"
          ></script>
          <script
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js"
            integrity="sha384-pzjw8f+ua7Kw1TIq0v8Fq1aFeK8vjm1Pr8k/0zvTY4yt2xvq0b4TO8gyf43/06pD"
            crossOrigin="anonymous"
          ></script>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
