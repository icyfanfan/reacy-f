
export interface VDOM {
    type: string;
    props: {
        children?: Array<VDOM | string>;
        className?: string;
        style?: {
            [propName: string]: string | number;
        };
        [propName: string]: any;
    };
}