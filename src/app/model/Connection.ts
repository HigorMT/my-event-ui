import { Node } from './Node'

export interface Connection {
    animated: boolean;
    progress: number;
    opacity: number;
    from: Node;
    to: Node;
}
