export type PaletteDeclarationT = {
    primary : string;
    secondary : string;

    [key : string] : string;
}


export type ThemeDeclarationT = {
    name : string;
    
    palette : PaletteDeclarationT & {
        tint : number,
        warning? : string;
        error? : string;
        success? : string;
        info? : string;
    }
};