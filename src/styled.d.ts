// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
    export interface DefaultTheme {
        borderRadius: string;
        transitions: {
            default: string;
        };
        colors: {
            primary: string;
            white: string;
            gray: string;
            lightGray: string;
            background: string;
        };
    }
}
