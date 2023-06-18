/* tslint:disable */
/* eslint-disable */
/**
* @param {number} x
* @param {number} y
*/
export function add(x: number, y: number): void;
/**
*/
export class Game {
  free(): void;
/**
* @param {number} screen_width
* @param {number} screen_height
* @param {Uint8Array} byte_array
*/
  constructor(screen_width: number, screen_height: number, byte_array: Uint8Array);
/**
* @param {CanvasRenderingContext2D} ctx
* @param {number} width
* @param {number} height
*/
  render(ctx: CanvasRenderingContext2D, width: number, height: number): void;
/**
* @param {number} deltatime
*/
  tick(deltatime: number): void;
/**
* @param {number} key
* @param {boolean} pressed
*/
  update_key_input(key: number, pressed: boolean): void;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly add: (a: number, b: number) => void;
  readonly __wbg_game_free: (a: number) => void;
  readonly game_new: (a: number, b: number, c: number) => number;
  readonly game_render: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly game_tick: (a: number, b: number) => void;
  readonly game_update_key_input: (a: number, b: number, c: number) => void;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_exn_store: (a: number) => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {SyncInitInput} module
*
* @returns {InitOutput}
*/
export function initSync(module: SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
