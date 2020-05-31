export type ToolbarProps = {
    onClick(value: ToolType): void;
    value: ToolType;
};

export interface ToolbarContainerInterface {
    selected: number;
    transition?: number;
}

export enum ToolType {
    Default = 1,
    Add,
    Remove,
    Transition,
}
export enum TransitionType {
    Line = 1,
}
