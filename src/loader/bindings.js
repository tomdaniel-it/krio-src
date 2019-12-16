"use strict";

// wasm-bindgen rust bindings

let wasm;

const heap = new Array(32);
heap.fill(undefined);
heap.push(undefined, null, true, false);
let heap_next = heap.length;

function addHeapObject(A) {
    heap_next === heap.length && heap.push(heap.length + 1);
    const g = heap_next;
    return heap_next = heap[g], heap[g] = A, g
}

function getObject(A) {
    return heap[A]
}

function dropObject(A) {
    A < 36 || (heap[A] = heap_next, heap_next = A)
}

function takeObject(A) {
    const g = getObject(A);
    return dropObject(A), g
}

function __wbg_elem_binding0(A, g) {
    wasm.__wbg_function_table.get(73)(A, g)
}

function __wbg_elem_binding1(A, g, Q, B, I) {
    return takeObject(wasm.__wbg_function_table.get(4)(A, g, addHeapObject(Q), addHeapObject(B), addHeapObject(I)))
}

function __wbg_elem_binding2(A, g, Q) {
    return takeObject(wasm.__wbg_function_table.get(20)(A, g, addHeapObject(Q)))
}

function __wbg_elem_binding3(A, g, Q, B, I) {
    return takeObject(wasm.__wbg_function_table.get(8)(A, g, addHeapObject(Q), addHeapObject(B), addHeapObject(I)))
}

function __wbg_elem_binding4(A, g, Q) {
    wasm.__wbg_function_table.get(77)(A, g, addHeapObject(Q))
}

function __wbg_elem_binding5(A, g, Q, B, I) {
    return wasm.__wbg_function_table.get(16)(A, g, addHeapObject(Q), B, I)
}
let WASM_VECTOR_LEN = 0,
    cachedTextEncoder = new TextEncoder("utf-8"),
    cachegetUint8Memory = null,
    passStringToWasm;

function getUint8Memory() {
    return null !== cachegetUint8Memory && cachegetUint8Memory.buffer === wasm.memory.buffer || (cachegetUint8Memory = new Uint8Array(wasm.memory.buffer)), cachegetUint8Memory
}

function __wbg_elem_binding6(A, g, Q) {
    wasm.__wbg_function_table.get(12)(A, g, passStringToWasm(Q), WASM_VECTOR_LEN)
}

function __wbg_elem_binding7(A, g, Q, B) {
    wasm.__wbg_function_table.get(51)(A, g, addHeapObject(Q), addHeapObject(B))
}

function initiate() {
    return takeObject(wasm.initiate())
}

function notDefined(A) {
    return () => {
        throw new Error(`${A} is not defined`)
    }
}

function handleError(A) {
    wasm.__wbindgen_exn_store(addHeapObject(A))
}

function isLikeNone(A) {
    return null == A
}
passStringToWasm = "function" == typeof cachedTextEncoder.encodeInto ? function(A) {
    let g = A.length,
        Q = wasm.__wbindgen_malloc(g),
        B = 0; {
        const g = getUint8Memory();
        for (; B < A.length; B++) {
            const I = A.charCodeAt(B);
            if (I > 127) break;
            g[Q + B] = I
        }
    }
    if (B !== A.length) {
        A = A.slice(B), Q = wasm.__wbindgen_realloc(Q, g, g = B + 3 * A.length);
        const I = getUint8Memory().subarray(Q + B, Q + g);
        B += cachedTextEncoder.encodeInto(A, I).written
    }
    return WASM_VECTOR_LEN = B, Q
} : function(A) {
    let g = A.length,
        Q = wasm.__wbindgen_malloc(g),
        B = 0; {
        const g = getUint8Memory();
        for (; B < A.length; B++) {
            const I = A.charCodeAt(B);
            if (I > 127) break;
            g[Q + B] = I
        }
    }
    if (B !== A.length) {
        const I = cachedTextEncoder.encode(A.slice(B));
        Q = wasm.__wbindgen_realloc(Q, g, g = B + I.length), getUint8Memory().set(I, Q + B), B += I.length
    }
    return WASM_VECTOR_LEN = B, Q
};
let cachedTextDecoder = new TextDecoder("utf-8");

function getStringFromWasm(A, g) {
    return cachedTextDecoder.decode(getUint8Memory().subarray(A, A + g))
}
let cachegetInt32Memory = null;

function getInt32Memory() {
    return null !== cachegetInt32Memory && cachegetInt32Memory.buffer === wasm.memory.buffer || (cachegetInt32Memory = new Int32Array(wasm.memory.buffer)), cachegetInt32Memory
}

function passArray8ToWasm(A) {
    const g = wasm.__wbindgen_malloc(1 * A.length);
    return getUint8Memory().set(A, g / 1), WASM_VECTOR_LEN = A.length, g
}

function getArrayU8FromWasm(A, g) {
    return getUint8Memory().subarray(A / 1, A / 1 + g)
}
let cachegetUint32Memory = null;

function getUint32Memory() {
    return null !== cachegetUint32Memory && cachegetUint32Memory.buffer === wasm.memory.buffer || (cachegetUint32Memory = new Uint32Array(wasm.memory.buffer)), cachegetUint32Memory
}

function debugString(A) {
    const g = typeof A;
    if ("number" == g || "boolean" == g || null == A) return `${A}`;
    if ("string" == g) return `"${A}"`;
    if ("symbol" == g) {
        const g = A.description;
        return null == g ? "Symbol" : `Symbol(${g})`
    }
    if ("function" == g) {
        const g = A.name;
        return "string" == typeof g && g.length > 0 ? `Function(${g})` : "Function"
    }
    if (Array.isArray(A)) {
        const g = A.length;
        let Q = "[";
        g > 0 && (Q += debugString(A[0]));
        for (let B = 1; B < g; B++) Q += ", " + debugString(A[B]);
        return Q += "]"
    }
    const Q = /\[object ([^\]]+)\]/.exec(toString.call(A));
    let B;
    if (!(Q.length > 1)) return toString.call(A);
    if ("Object" == (B = Q[1])) try {
        return "Object(" + JSON.stringify(A) + ")"
    } catch (A) {
        return "Object"
    }
    return A instanceof Error ? `${A.name}: ${A.message}\n${A.stack}` : B
}

function init(module) {
    let result;
    void 0 === module && (module = null);
    const imports = {
        wbg: {}
    };
    if (imports.wbg.__wbindgen_is_undefined = function(A) {
            return void 0 === getObject(A)
        }, imports.wbg.__wbg_now_4d770e8834dcad1c = "function" == typeof Date.now ? Date.now : notDefined("Date.now"), imports.wbg.__widl_f_location_Window = function(A) {
            return addHeapObject(getObject(A).location)
        }, imports.wbg.__widl_f_local_storage_Window = function(A) {
            try {
                const g = getObject(A).localStorage;
                return isLikeNone(g) ? 0 : addHeapObject(g)
            } catch (A) {
                handleError(A)
            }
        }, imports.wbg.__widl_f_get_item_Storage = function(A, g, Q, B) {
            try {
                const I = getObject(g).getItem(getStringFromWasm(Q, B)),
                    C = isLikeNone(I) ? 0 : passStringToWasm(I),
                    E = WASM_VECTOR_LEN;
                getInt32Memory()[A / 4 + 0] = C, getInt32Memory()[A / 4 + 1] = E
            } catch (A) {
                handleError(A)
            }
        }, imports.wbg.__wbindgen_object_clone_ref = function(A) {
            return addHeapObject(getObject(A))
        }, imports.wbg.__wbindgen_string_new = function(A, g) {
            return addHeapObject(getStringFromWasm(A, g))
        }, imports.wbg.__wbg_new_2d6a830207834e5d = function() {
            return addHeapObject(new Object)
        }, imports.wbg.__widl_f_new_with_str_and_init_Request = function(A, g, Q) {
            try {
                return addHeapObject(new Request(getStringFromWasm(A, g), getObject(Q)))
            } catch (A) {
                handleError(A)
            }
        }, imports.wbg.__widl_f_fetch_with_request_Window = function(A, g) {
            return addHeapObject(getObject(A).fetch(getObject(g)))
        }, imports.wbg.__widl_f_url_Response = function(A, g) {
            const Q = getObject(g).url,
                B = passStringToWasm(Q),
                I = WASM_VECTOR_LEN;
            getInt32Memory()[A / 4 + 0] = B, getInt32Memory()[A / 4 + 1] = I
        }, imports.wbg.__wbindgen_object_drop_ref = function(A) {
            takeObject(A)
        }, imports.wbg.__widl_f_text_Response = function(A) {
            try {
                return addHeapObject(getObject(A).text())
            } catch (A) {
                handleError(A)
            }
        }, imports.wbg.__wbg_instanceof_Error_3c415a41cc2164b9 = function(A) {
            return getObject(A) instanceof Error
        }, imports.wbg.__widl_f_create_element_Document = function(A, g, Q) {
            try {
                return addHeapObject(getObject(A).createElement(getStringFromWasm(g, Q)))
            } catch (A) {
                handleError(A)
            }
        }, imports.wbg.__widl_f_origin_Location = function(A, g) {
            try {
                const Q = getObject(g).origin,
                    B = passStringToWasm(Q),
                    I = WASM_VECTOR_LEN;
                getInt32Memory()[A / 4 + 0] = B, getInt32Memory()[A / 4 + 1] = I
            } catch (A) {
                handleError(A)
            }
        }, imports.wbg.__widl_f_body_Document = function(A) {
            const g = getObject(A).body;
            return isLikeNone(g) ? 0 : addHeapObject(g)
        }, imports.wbg.__widl_f_append_child_Node = function(A, g) {
            try {
                return addHeapObject(getObject(A).appendChild(getObject(g)))
            } catch (A) {
                handleError(A)
            }
        }, imports.wbg.__wbindgen_cb_forget = function(A) {
            takeObject(A)
        }, imports.wbg.__wbg_log_c66c2c6b2597d505 = function(A, g) {
            console.log(getStringFromWasm(A, g))
        }, imports.wbg.__wbg_random_09364f2d8647f133 = "function" == typeof Math.random ? Math.random : notDefined("Math.random"), imports.wbg.__widl_f_get_element_by_id_Document = function(A, g, Q) {
            const B = getObject(A).getElementById(getStringFromWasm(g, Q));
            return isLikeNone(B) ? 0 : addHeapObject(B)
        }, imports.wbg.__widl_instanceof_HTMLCanvasElement = function(A) {
            return getObject(A) instanceof HTMLCanvasElement
        }, imports.wbg.__widl_f_get_context_HTMLCanvasElement = function(A, g, Q) {
            try {
                const B = getObject(A).getContext(getStringFromWasm(g, Q));
                return isLikeNone(B) ? 0 : addHeapObject(B)
            } catch (A) {
                handleError(A)
            }
        }, imports.wbg.__widl_instanceof_CanvasRenderingContext2D = function(A) {
            return getObject(A) instanceof CanvasRenderingContext2D
        }, imports.wbg.__widl_f_save_CanvasRenderingContext2D = function(A) {
            getObject(A).save()
        }, imports.wbg.__widl_f_set_global_alpha_CanvasRenderingContext2D = function(A, g) {
            getObject(A).globalAlpha = g
        }, imports.wbg.__widl_f_fill_rect_CanvasRenderingContext2D = function(A, g, Q, B, I) {
            getObject(A).fillRect(g, Q, B, I)
        }, imports.wbg.__widl_f_ellipse_CanvasRenderingContext2D = function(A, g, Q, B, I, C, E, D) {
            try {
                getObject(A).ellipse(g, Q, B, I, C, E, D)
            } catch (A) {
                handleError(A)
            }
        }, imports.wbg.__widl_f_fill_text_CanvasRenderingContext2D = function(A, g, Q, B, I) {
            try {
                getObject(A).fillText(getStringFromWasm(g, Q), B, I)
            } catch (A) {
                handleError(A)
            }
        }, imports.wbg.__widl_f_move_to_CanvasRenderingContext2D = function(A, g, Q) {
            getObject(A).moveTo(g, Q)
        }, imports.wbg.__widl_f_line_to_CanvasRenderingContext2D = function(A, g, Q) {
            getObject(A).lineTo(g, Q)
        }, imports.wbg.__widl_f_fill_CanvasRenderingContext2D = function(A) {
            getObject(A).fill()
        }, imports.wbg.__widl_f_set_fill_style_CanvasRenderingContext2D = function(A, g) {
            getObject(A).fillStyle = getObject(g)
        }, imports.wbg.__widl_f_restore_CanvasRenderingContext2D = function(A) {
            getObject(A).restore()
        }, imports.wbg.__wbg_toString_60641a3eea23c1a9 = function(A) {
            return addHeapObject(getObject(A).toString())
        }, imports.wbg.__wbindgen_is_function = function(A) {
            return "function" == typeof getObject(A)
        }, imports.wbg.__widl_f_navigator_Window = function(A) {
            return addHeapObject(getObject(A).navigator)
        }, imports.wbg.__widl_f_get_elements_by_tag_name_Document = function(A, g, Q) {
            return addHeapObject(getObject(A).getElementsByTagName(getStringFromWasm(g, Q)))
        }, imports.wbg.__widl_f_length_HTMLCollection = function(A) {
            return getObject(A).length
        }, imports.wbg.__wbindgen_is_null = function(A) {
            return null === getObject(A)
        }, imports.wbg.__widl_f_item_HTMLCollection = function(A, g) {
            const Q = getObject(A).item(g >>> 0);
            return isLikeNone(Q) ? 0 : addHeapObject(Q)
        }, imports.wbg.__widl_f_inner_html_Element = function(A, g) {
            const Q = getObject(g).innerHTML,
                B = passStringToWasm(Q),
                I = WASM_VECTOR_LEN;
            getInt32Memory()[A / 4 + 0] = B, getInt32Memory()[A / 4 + 1] = I
        }, imports.wbg.__wbindgen_boolean_get = function(A) {
            const g = getObject(A);
            return "boolean" == typeof g ? g ? 1 : 0 : 2
        }, imports.wbg.__widl_f_document_element_Document = function(A) {
            const g = getObject(A).documentElement;
            return isLikeNone(g) ? 0 : addHeapObject(g)
        }, imports.wbg.__widl_f_has_attribute_Element = function(A, g, Q) {
            return getObject(A).hasAttribute(getStringFromWasm(g, Q))
        }, imports.wbg.__widl_f_array_buffer_Response = function(A) {
            try {
                return addHeapObject(getObject(A).arrayBuffer())
            } catch (A) {
                handleError(A)
            }
        }, imports.wbg.__wbg_new_ed7079cf157e44d5 = function(A) {
            return addHeapObject(new Uint8Array(getObject(A)))
        }, imports.wbg.__wbg_length_b6e0c5630f641946 = function(A) {
            return getObject(A).length
        }, imports.wbg.__wbindgen_memory = function() {
            return addHeapObject(wasm.memory)
        }, imports.wbg.__wbg_buffer_d31feadf69cb45fc = function(A) {
            return addHeapObject(getObject(A).buffer)
        }, imports.wbg.__wbg_set_2aae8dbe165bf1a3 = function(A, g, Q) {
            getObject(A).set(getObject(g), Q >>> 0)
        }, imports.wbg.__widl_f_new_TextEncoder = function() {
            try {
                return addHeapObject(new TextEncoder)
            } catch (A) {
                handleError(A)
            }
        }, imports.wbg.__widl_f_encode_with_input_TextEncoder = function(A, g, Q, B) {
            const I = passArray8ToWasm(getObject(g).encode(getStringFromWasm(Q, B))),
                C = WASM_VECTOR_LEN;
            getInt32Memory()[A / 4 + 0] = I, getInt32Memory()[A / 4 + 1] = C
        }, imports.wbg.__widl_f_new_TextDecoder = function() {
            try {
                return addHeapObject(new TextDecoder)
            } catch (A) {
                handleError(A)
            }
        }, imports.wbg.__widl_f_decode_with_u8_array_TextDecoder = function(A, g, Q, B) {
            try {
                const I = getObject(g).decode(getArrayU8FromWasm(Q, B)),
                    C = passStringToWasm(I),
                    E = WASM_VECTOR_LEN;
                getInt32Memory()[A / 4 + 0] = C, getInt32Memory()[A / 4 + 1] = E
            } catch (A) {
                handleError(A)
            }
        }, imports.wbg.__wbg_new_f802c5ff9d449d95 = function() {
            return addHeapObject(new Array)
        }, imports.wbg.__wbg_set_2c01beee50abda32 = function(A, g, Q) {
            getObject(A)[g >>> 0] = takeObject(Q)
        }, imports.wbg.__wbg_newwithargs_10def9c4239ab893 = function(A, g, Q, B) {
            return addHeapObject(new Function(getStringFromWasm(A, g), getStringFromWasm(Q, B)))
        }, imports.wbg.__wbg_eval_db021fde4456b657 = function(arg0, arg1) {
            try {
                const ret = eval(getStringFromWasm(arg0, arg1));
                return addHeapObject(ret)
            } catch (A) {
                handleError(A)
            }
        }, imports.wbg.__wbg_toString_c663742ecc5b25ea = function(A) {
            return addHeapObject(getObject(A).toString())
        }, imports.wbg.__widl_f_error_2_ = function(A, g) {
            console.error(getObject(A), getObject(g))
        }, imports.wbg.__wbindgen_cb_drop = function(A) {
            const g = takeObject(A).original;
            if (1 == g.cnt--) return g.a = 0, !0;
            return !1
        }, imports.wbg.__wbg_get_003e1b80a63de7c5 = function(A, g) {
            try {
                return addHeapObject(Reflect.get(getObject(A), getObject(g)))
            } catch (A) {
                handleError(A)
            }
        }, imports.wbg.__wbg_call_4499dca0c553c196 = function(A, g) {
            try {
                return addHeapObject(getObject(A).call(getObject(g)))
            } catch (A) {
                handleError(A)
            }
        }, imports.wbg.__wbg_globalThis_36c1f2e85948e420 = function() {
            try {
                return addHeapObject(globalThis.globalThis)
            } catch (A) {
                handleError(A)
            }
        }, imports.wbg.__wbg_self_73c7a601ff857345 = function() {
            try {
                return addHeapObject(self.self)
            } catch (A) {
                handleError(A)
            }
        }, imports.wbg.__wbg_window_ca735e04cb2b0566 = function() {
            try {
                return addHeapObject(window.window)
            } catch (A) {
                handleError(A)
            }
        }, imports.wbg.__wbg_global_99312a595fd2e761 = function() {
            try {
                return addHeapObject(global.global)
            } catch (A) {
                handleError(A)
            }
        }, imports.wbg.__wbg_newnoargs_6ad69a50998c5acb = function(A, g) {
            return addHeapObject(new Function(getStringFromWasm(A, g)))
        }, imports.wbg.__wbg_call_fdde574e8abf6327 = function(A, g, Q) {
            try {
                return addHeapObject(getObject(A).call(getObject(g), getObject(Q)))
            } catch (A) {
                handleError(A)
            }
        }, imports.wbg.__wbg_call_d86117a976521458 = function(A, g, Q, B) {
            try {
                return addHeapObject(getObject(A).call(getObject(g), getObject(Q), getObject(B)))
            } catch (A) {
                handleError(A)
            }
        }, imports.wbg.__wbg_call_04d7c0ad06df27c9 = function(A, g, Q, B, I) {
            try {
                return addHeapObject(getObject(A).call(getObject(g), getObject(Q), getObject(B), getObject(I)))
            } catch (A) {
                handleError(A)
            }
        }, imports.wbg.__wbg_construct_006890aeffd3c5ca = function(A, g) {
            try {
                return addHeapObject(Reflect.construct(getObject(A), getObject(g)))
            } catch (A) {
                handleError(A)
            }
        }, imports.wbg.__wbg_has_4c6784338d6c97e4 = function(A, g) {
            try {
                return Reflect.has(getObject(A), getObject(g))
            } catch (A) {
                handleError(A)
            }
        }, imports.wbg.__wbg_set_0718caf2a62a5c4f = function(A, g, Q) {
            try {
                return Reflect.set(getObject(A), getObject(g), getObject(Q))
            } catch (A) {
                handleError(A)
            }
        }, imports.wbg.__wbg_includes_ac97179ab4ffffc7 = function(A, g, Q, B) {
            return getObject(A).includes(getStringFromWasm(g, Q), B)
        }, imports.wbg.__wbindgen_string_get = function(A, g) {
            const Q = getObject(A);
            if ("string" != typeof Q) return 0;
            const B = passStringToWasm(Q);
            return getUint32Memory()[g / 4] = WASM_VECTOR_LEN, B
        }, imports.wbg.__wbindgen_debug_string = function(A, g) {
            const Q = debugString(getObject(g)),
                B = passStringToWasm(Q),
                I = WASM_VECTOR_LEN;
            getInt32Memory()[A / 4 + 0] = B, getInt32Memory()[A / 4 + 1] = I
        }, imports.wbg.__wbindgen_throw = function(A, g) {
            throw new Error(getStringFromWasm(A, g))
        }, imports.wbg.__wbg_resolve_bacd3bf49c19a0f8 = function(A) {
            return addHeapObject(Promise.resolve(getObject(A)))
        }, imports.wbg.__wbg_then_3466ad801fe403b0 = function(A, g) {
            getObject(A).then(getObject(g))
        }, imports.wbg.__wbg_then_0fe88013efbd2711 = function(A, g, Q) {
            return addHeapObject(getObject(A).then(getObject(g), getObject(Q)))
        }, imports.wbg.__wbg_new_1719c88e1a2035ea = function(A, g) {
            const Q = {
                    a: A,
                    b: g
                },
                B = (A, g) => {
                    const B = Q.a;
                    Q.a = 0;
                    try {
                        return __wbg_elem_binding7(B, Q.b, A, g)
                    } finally {
                        Q.a = B
                    }
                };
            try {
                return addHeapObject(new Promise(B))
            } finally {
                Q.a = Q.b = 0
            }
        }, imports.wbg.__widl_instanceof_Window = function(A) {
            return getObject(A) instanceof Window
        }, imports.wbg.__widl_f_get_random_values_with_u8_array_Crypto = function(A, g, Q) {
            try {
                return addHeapObject(getObject(A).getRandomValues(getArrayU8FromWasm(g, Q)))
            } catch (A) {
                handleError(A)
            }
        }, imports.wbg.__widl_f_hostname_Location = function(A, g) {
            try {
                const Q = getObject(g).hostname,
                    B = passStringToWasm(Q),
                    I = WASM_VECTOR_LEN;
                getInt32Memory()[A / 4 + 0] = B, getInt32Memory()[A / 4 + 1] = I
            } catch (A) {
                handleError(A)
            }
        }, imports.wbg.__widl_instanceof_Response = function(A) {
            return getObject(A) instanceof Response
        }, imports.wbg.__widl_f_document_Window = function(A) {
            const g = getObject(A).document;
            return isLikeNone(g) ? 0 : addHeapObject(g)
        }, imports.wbg.__widl_f_crypto_Window = function(A) {
            try {
                return addHeapObject(getObject(A).crypto)
            } catch (A) {
                handleError(A)
            }
        }, imports.wbg.__wbindgen_closure_wrapper1319 = function(A, g, Q) {
            const B = {
                    a: A,
                    b: g,
                    cnt: 1
                },
                I = A => {
                    B.cnt++;
                    const g = B.a;
                    B.a = 0;
                    try {
                        return __wbg_elem_binding4(g, B.b, A)
                    } finally {
                        0 == --B.cnt ? wasm.__wbg_function_table.get(78)(g, B.b) : B.a = g
                    }
                };
            return I.original = B, addHeapObject(I)
        }, imports.wbg.__wbindgen_closure_wrapper423 = function(A, g, Q) {
            const B = {
                    a: A,
                    b: g,
                    cnt: 1
                },
                I = () => {
                    B.cnt++;
                    const A = B.a;
                    B.a = 0;
                    try {
                        return __wbg_elem_binding0(A, B.b)
                    } finally {
                        0 == --B.cnt ? wasm.__wbg_function_table.get(74)(A, B.b) : B.a = A
                    }
                };
            return I.original = B, addHeapObject(I)
        }, imports.wbg.__wbindgen_closure_wrapper117 = function(A, g, Q) {
            const B = {
                    a: A,
                    b: g,
                    cnt: 1
                },
                I = A => {
                    B.cnt++;
                    try {
                        return __wbg_elem_binding6(B.a, B.b, A)
                    } finally {
                        0 == --B.cnt && (wasm.__wbg_function_table.get(13)(B.a, B.b), B.a = 0)
                    }
                };
            return I.original = B, addHeapObject(I)
        }, imports.wbg.__wbindgen_closure_wrapper115 = function(A, g, Q) {
            const B = {
                    a: A,
                    b: g,
                    cnt: 1
                },
                I = (A, g, Q) => {
                    B.cnt++;
                    const I = B.a;
                    B.a = 0;
                    try {
                        return __wbg_elem_binding3(I, B.b, A, g, Q)
                    } finally {
                        0 == --B.cnt ? wasm.__wbg_function_table.get(9)(I, B.b) : B.a = I
                    }
                };
            return I.original = B, addHeapObject(I)
        }, imports.wbg.__wbindgen_closure_wrapper119 = function(A, g, Q) {
            const B = {
                    a: A,
                    b: g,
                    cnt: 1
                },
                I = (A, g, Q) => {
                    B.cnt++;
                    const I = B.a;
                    B.a = 0;
                    try {
                        return __wbg_elem_binding5(I, B.b, A, g, Q)
                    } finally {
                        0 == --B.cnt ? wasm.__wbg_function_table.get(17)(I, B.b) : B.a = I
                    }
                };
            return I.original = B, addHeapObject(I)
        }, imports.wbg.__wbindgen_closure_wrapper113 = function(A, g, Q) {
            const B = {
                    a: A,
                    b: g,
                    cnt: 1
                },
                I = (A, g, Q) => {
                    B.cnt++;
                    const I = B.a;
                    B.a = 0;
                    try {
                        return __wbg_elem_binding1(I, B.b, A, g, Q)
                    } finally {
                        0 == --B.cnt ? wasm.__wbg_function_table.get(5)(I, B.b) : B.a = I
                    }
                };
            return I.original = B, addHeapObject(I)
        }, imports.wbg.__wbindgen_closure_wrapper121 = function(A, g, Q) {
            const B = {
                    a: A,
                    b: g,
                    cnt: 1
                },
                I = A => {
                    B.cnt++;
                    const g = B.a;
                    B.a = 0;
                    try {
                        return __wbg_elem_binding2(g, B.b, A)
                    } finally {
                        0 == --B.cnt ? wasm.__wbg_function_table.get(21)(g, B.b) : B.a = g
                    }
                };
            return I.original = B, addHeapObject(I)
        }, "function" == typeof URL && module instanceof URL || "string" == typeof module || "function" == typeof Request && module instanceof Request) {
        const A = fetch(module);
        result = "function" == typeof WebAssembly.instantiateStreaming ? WebAssembly.instantiateStreaming(A, imports).catch(g => A.then(A => {
            if ("application/wasm" != A.headers.get("Content-Type")) return console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", g), A.arrayBuffer();
            throw g
        }).then(A => WebAssembly.instantiate(A, imports))) : A.then(A => A.arrayBuffer()).then(A => WebAssembly.instantiate(A, imports))
    } else result = WebAssembly.instantiate(module, imports).then(A => A instanceof WebAssembly.Instance ? {
        instance: A,
        module: module
    } : A);
    return result.then(({
        instance: A,
        module: g
    }) => (wasm = A.exports, init.__wbindgen_wasm_module = g, wasm))
}

exports.default = init
exports.initiate = initiate
