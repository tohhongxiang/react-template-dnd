export type Widget = {
    id?: string,
    name: string,
    type: string,
    style: {[key: string]: any},
    props: {[key: string]: any},
    fields: Widget[]
    innerText?: string,
}

const widgetData : {[key: string]: Widget} = {
    'TEXT_MODULE': {
        id: "TEXT_MODULE",
        name: "Text Module",
        type: "div",
        style: {},
        props: {},
        fields: [
            {
                name: "Title",
                type: "h1",
                style: {},
                props: {},
                fields: [],
                innerText: "This is the header",
            },
            {
                name: "Description",
                type: "p",
                style: {},
                props: {},
                fields: [],
                innerText: "This is the <strong>description</strong>",
            },
        ]
    },
    'IMAGE_MODULE': {
        id: "IMAGE_MODULE",
        name: "Image Module",
        type: "div",
        style: {
            margin: '20px'
        },
        props: {},
        fields: [
            {
                name: "IMAGE",
                type: "img",
                style: {},
                props: {
                    src: 'https://http.cat/206',
                    alt: 'Nice cat'
                },
                fields: []
            }
        ]
    },
    'TEXT_2_3_COLUMNS': {
        id: "TEXT_2_3_COLUMNS",
        name: 'Text 2/3 Columns',
        type: "div",
        style: {
            display: 'flex'
        },
        props: {},
        fields: [
            {
                id: "1",
                name: "TEXT_MODULE",
                type: "div",
                style: {},
                props: {},
                fields: [
                    {
                        name: "Title",
                        type: "h1",
                        style: {},
                        props: {},
                        fields: [],
                        innerText: "Column 1 header",
                    },
                    {
                        name: "Description",
                        type: "p",
                        style: {},
                        props: {},
                        fields: [],
                        innerText: "Column 1 description",
                    },
                ]
            },
            {
                id: "1",
                name: "TEXT_MODULE",
                type: "div",
                style: {},
                props: {},
                fields: [
                    {
                        name: "Title",
                        type: "h1",
                        style: {
                            color: 'red'
                        },
                        props: {},
                        fields: [],
                        innerText: "Column two header",
                    },
                    {
                        name: "Description",
                        type: "p",
                        style: {},
                        props: {},
                        fields: [],
                        innerText: "Col 2 desc",
                    },
                ]
            },
            {
                id: "1",
                name: "TEXT_MODULE",
                type: "div",
                style: {},
                props: {},
                fields: [
                    {
                        name: "Title",
                        type: "h1",
                        style: {},
                        props: {},
                        fields: [],
                        innerText: "Column 3 header",
                    },
                    {
                        name: "Description",
                        type: "p",
                        style: {},
                        props: {},
                        fields: [],
                        innerText: "Col three desc",
                    },
                ]
            }
        ]
    },
    'LINK_BUTTON': {
        id: "LINK_BUTTON",
        name: "Link Button",
        type: "a",
        style: {},
        props: {
            href: 'https://www.google.com',
            target: '_blank',
            rel: 'noopener noreferrer'
        },
        fields: [
            {
                name: 'BUTTON',
                type: 'button',
                style: {},
                props: {},
                fields: [],
                innerText: 'This is the button label'
            }
        ],
    },
    'HORIZONTAL_BOX_MODULE': {
        id: "HORIZONTAL_BOX_MODULE",
        name: "Horizontal Box Module",
        type: "div",
        style: {
            display: 'grid',
            gridTemplateColumns: 'auto 1fr auto',
            gridGap: '20px'
        },
        props: {},
        fields: [
            {
                name: "IMAGE",
                type: "img",
                style: {},
                props: {
                    src: "http://htmltest.ieplsg.com/resources/image/ExpressVPN-svg.png",
                    alt: "ExpressVPN"
                },
                fields: []
            },
            {
                id: "1",
                name: "TEXT_MODULE",
                type: "div",
                style: {},
                props: {},
                fields: [
                    {
                        name: "Title",
                        type: "h1",
                        style: {},
                        props: {},
                        fields: [],
                        innerText: "ExpressoVPN",
                    },
                    {
                        name: "Description",
                        type: "p",
                        style: {},
                        props: {},
                        fields: [],
                        innerText: "Test ExpressoVPN’s full arsenal for a whopping 30 days without spending anything. See for yourself what this service is about. Most popular VPN of 2019.",
                    },
                ]
            },
            {
                name: "BUTTON_GROUP",
                type: "div",
                style: {
                    display: 'flex',
                    flexDirection: 'column',
                    textAlign: 'center'
                },
                props: {},
                fields: [
                    {
                        name: "LINK_BUTTON",
                        type: "a",
                        style: {},
                        props: {
                            href: 'https://www.google.com',
                            target: '_blank',
                            rel: 'noopener noreferrer'
                        },
                        fields: [
                            {
                                name: 'BUTTON',
                                type: 'button',
                                style: {},
                                props: {},
                                fields: [],
                                innerText: 'Download expressVPN for $69.99'
                            }
                        ],
                    },
                    {
                        id: "4",
                        name: "LINK_BUTTON",
                        type: "a",
                        style: {},
                        props: {
                            href: 'https://www.google.com',
                            target: '_blank',
                            rel: 'noopener noreferrer'
                        },
                        fields: [
                            {
                                name: 'BUTTON',
                                type: 'button',
                                style: {},
                                props: {},
                                fields: [],
                                innerText: 'Show me how to surpass the great firewall'
                            }
                        ],
                    }
                ]
            }
        ]
    },
    'TEXT_WITH_GRAPHIC': {
        id: 'TEXT_WITH_GRAPHIC',
        name: 'Text with Graphic',
        type: 'div',
        style: {
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center'
        },
        props: {},
        fields: [
            {
                id: "2",
                name: "IMAGE_MODULE",
                type: "div",
                style: {
                    margin: '20px',
                    maxWidth: '300px',
                    maxHeight: '300px'
                },
                props: {},
                fields: [
                    {
                        name: "IMAGE",
                        type: "img",
                        style: {},
                        props: {
                            src: 'http://htmltest.ieplsg.com/resources/image/Robots_logo.svg',
                            alt: 'Redux is the best :)'
                        },
                        fields: []
                    }
                ]
            },
            {
                name: "Title",
                type: "h1",
                style: {},
                props: {},
                fields: [],
                innerText: "WHAT IS HARDWARE",
            },
        ]
    },
    '1_6_BOX_MODULE': {
        id: '1_6_BOX_MODULE',
        name: '1/6 Box Module',
        type: 'div',
        style: {
            display: 'flex'
        },
        props: {},
        fields: [
            {
                name: 'BOX_MODULE',
                type: 'a',
                style: {
                    border: '1px solid #ccc'
                },
                props: {
                    href:"https://www.reddit.com",
                    target: '_blank',
                    rel: 'noopener noreferrer'
                },
                fields: [
                    {
                        name: "IMAGE",
                        type: "img",
                        style: {
                            width: '100px',
                            height: '100px',
                            margin: '0 auto'
                        },
                        props: {
                            src: 'http://htmltest.ieplsg.com/resources/image/communication-1.png',
                            alt: 'Redux is the best :)'
                        },
                        fields: []
                    },
                    {
                        name: "Description",
                        type: "p",
                        style: {},
                        props: {},
                        fields: [],
                        innerText: "Cannot communicate"
                    }
                ]
            },
            {
                name: 'BOX_MODULE',
                type: 'div',
                style: {
                    border: '1px solid #ccc'
                },
                props: {},
                fields: [
                    {
                        name: "IMAGE",
                        type: "img",
                        style: {
                            width: '100px',
                            height: '100px',
                            margin: '0 auto'
                        },
                        props: {
                            src: 'http://htmltest.ieplsg.com/resources/image/communication-1.png',
                            alt: 'Redux is the best :)'
                        },
                        fields: []
                    },
                    {
                        name: "Description",
                        type: "p",
                        style: {},
                        props: {},
                        fields: [],
                        innerText: "Cannot communicate"
                    }
                ]
            },
            {
                name: 'BOX_MODULE',
                type: 'div',
                style: {
                    border: '1px solid #ccc'
                },
                props: {},
                fields: [
                    {
                        name: "IMAGE",
                        type: "img",
                        style: {
                            width: '100px',
                            height: '100px',
                            margin: '0 auto'
                        },
                        props: {
                            src: 'http://htmltest.ieplsg.com/resources/image/communication-1.png',
                            alt: 'Redux is the best :)'
                        },
                        fields: []
                    },
                    {
                        name: "Description",
                        type: "p",
                        style: {},
                        props: {},
                        fields: [],
                        innerText: "Cannot communicate"
                    }
                ]
            }
        ]
    }
} 

export default widgetData