/// <reference types="vite/client" />
/// <reference types="vue/macros-global" />

// Let TS understand importing .vue files
declare module '*.vue' {
    import { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}

// Add SharedWorker type definition to fix Vite client types
declare global {
    interface SharedWorker extends EventTarget {
        port: MessagePort;
        addEventListener(type: string, listener: EventListener): void;
        removeEventListener(type: string, listener: EventListener): void;
        dispatchEvent(event: Event): boolean;
    }

    var SharedWorker: {
        new (scriptURL: string, options?: { name?: string }): SharedWorker;
        prototype: SharedWorker;
    };
}
