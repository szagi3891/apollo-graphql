//@flow
import * as React from 'react';

//<!-- <link rel="stylesheet" href="./style.css"> -->

type PropsType = {|
    title: string,
    index_src: string,
    html_content: string,
    data_init: string,
|};

export const Html = (props: PropsType) => {
    const { title, index_src, html_content, data_init } = props;

    return (
        <html>
            <head>
                <meta charSet="utf-8" />
                <title>{ title }</title>
            </head>
            <body>
                <div
                    id="root"
                    dangerouslySetInnerHTML={{__html: html_content}}
                    data-init={data_init}
                />
                <script src={index_src}></script>
            </body>
        </html>
    );
};
