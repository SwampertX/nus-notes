function eval(expr, frame){
    if(is_self_evaluating(expr)){
        return expr;
    } else if(is_variable(expr)){
        return get(frame, expr);
    } else if (is_let_expr(expr)) {
        return eval_let(expr, frame);
    } else if (is_if_expr(expr)){
        return eval_if_expr(expr, frame);
    } else if (is_fn_defn(expr)){
        return eval_fn_defn(expr, frame);
    } else if (is_fn_expr(expr)){
        const literal_function_expr = eval_fn_parameters(expr, frame);
        return apply(literal_function_expr);
    } else { 
        return error("Unknown expression: " + stringify(expr));
    }
}

function is_self_evaluating(expr){
    return is_number(expr) || is_boolean(expr);
}


// Multiple statements are only possible if
    // They are define statements.
    // The last statement is the return value.
    // This is true both in program and function definitions.
function eval_stmts(stmts, frame){
    if(stmts.length === 0){
        return error("expected expression, got " + stringify(stmts));
    } else {
        //Evaluate statements in order
        for(let i = 0; i<stmts.length - 1; i = i + 1){
            let stmt = stmts[i];
            if(!is_fn_defn(stmt)){
                return error("expected function definition, got " + stringify(stmt));
            } else {
                frame = eval_fn_defn(stmt, frame);
            }
        }
        const expr = stmts[stmts.length - 1];
        return eval(expr, frame);
    }
    
}

// Pass in frame = false if you have no frame.
// That will force global frame to be loaded
function evaluate(expr, frame){
    frame = is_object(frame) ? frame : make_global_frame();
    return eval(expr,frame);
}

function evaluate_program(stmts){
    return eval_stmts(stmts, make_global_frame());
}

// ================ AST DEFINITIONS ================
function is_variable(expr){
    return is_string(expr);
}

//Format: [let*, [[var, expr]], expr]
function is_let_expr(expr){
    return is_array(expr) && expr[0] === "let*";
}

//Format: [if cond true-branch false-branch]
function is_if_expr(expr){
    return is_array(expr) && expr[0] === "if";
}

//Format: [define [fname a1 a2 ... an] ... fn-defn ... body]
function is_fn_defn(expr){
    return is_array(expr) && expr[0] === "define";
}

//Format: [fn a1 a2 ... an]
function is_fn_expr(expr){
    return is_array(expr);
}

// ================= LET EXPRESSION ================
// ==================== Example ====================
//Format: [let*, [[var, expr]], expr]

function eval_let(expr, frame){
    const defns = expr[1];
    const nexpr = expr[2];
    const newframe = accumulate_array(function(item, frame){
        const varname = item[0];
        const expr = item[1];
        return insert(frame, varname, eval(expr, frame));
    }, make_child_frame(frame), defns);
    return eval(nexpr, newframe);
}

// ==================== Task 2A ====================
// ============== ENVIRONMENT FRAMES ===============
function make_empty_frame(){
	return {
		parent: undefined;
		values: {}
		};
	}
}

function insert(frame, name, value){
   frame.values[name] = value;
	return frame;
}

// Return error(name + " is not defined") in case name cannot be found.
function get(frame, name){
   if(frame.values[name] !== undefined) {
		return frame.values[name];
   } else if (frame.parent !== undefined) {
	   return get(frame.parent, name);
   } else {
	   return error(name + " is not defined");
   }
}

function make_child_frame(parent){
    let frame = make_empty_frame;
	frame.parent = parent;
	return frame;
}


//Task 2a Tests
let base_frame = make_empty_frame();
insert(base_frame, "x", 5);
assert("2A_1", () => get(base_frame, "x"), 5, []);

let child_frame = make_child_frame(base_frame);
assert("2A_2", () => get(child_frame, "x"), 5, []);

insert(base_frame, "y", 10);
assert("2A_3", () => get(child_frame, "y"), 10, []);

insert(child_frame, "z", 15);
assert("2A_4", () => get(child_frame, "z"), 15, []);

//There's supposed to be an error here.
assert_error("2A_5", () => get(base_frame, "z"),  "z is not defined", []);

let child_child_frame = make_child_frame(child_frame);
insert(child_child_frame, "z", 11);
assert("2A_6", () => get(child_frame, "z"), 15, []);
assert("2A_7", () => get(child_child_frame, "z"), 11, []);



// =============== STANDARD LIBRARY ================

function make_global_frame(){
    let frame = make_empty_frame();
    add_not_function(frame);
    add_plus_function(frame);
    add_minus_function(frame);
    add_mul_function(frame);
    add_equals_function(frame);
    return frame;
}

// ==================== Example ====================
function add_not_function(frame){
    return insert(frame, "not", function(params){
        const val = params[0];
        return !val;
    });
}

// ==================== Task 2B ====================

function add_plus_function(frame){
    return insert(frame, "+", function(params){
        const a = params[0];
		const b = params[1];
        return a+b;
    });
}

function add_minus_function(frame){
    return insert(frame, "-", function(params){
        const a = params[0];
		const b = params[1];
        return a-b;
    });

}

function add_mul_function(frame){
    return insert(frame, "*", function(params){
        const a = params[0];
		const b = params[1];
        return a*b;
    });
}

function add_equals_function(frame){
    return insert(frame, "=", function(params){
        const a = params[0];
		const b = params[1];
        return a=b;
    });
}

//Task 2B Tests
const _2B_assumptions = ["make_empty_frame", "insert", "get", "make_child_frame"];

const global_frame = make_global_frame();
assert("2B_1", () => get(global_frame, "not")([false]), true, _2B_assumptions);
assert("2B_2", () => get(global_frame, "+")([3,4]), 7, _2B_assumptions);
assert("2B_3", () => get(global_frame, "-")([3,4]), -1, _2B_assumptions);
assert("2B_4", () => get(global_frame, "=")([3,4]), false, _2B_assumptions);
assert("2B_5", () => get(global_frame, "=")([1,1]), true, _2B_assumptions);

// ==================== Task 2C ====================
// ============= CONDITIONAL EXPRESSION ============
//Format: [if cond true-branch false-branch]

function eval_if_expr(expr, frame){
	let cond = evaluate(expr[0], frame);
	return cond? evaluate(expr[1], frame) : evaluate(expr[2], frame);
}

//Task 2C Tests
const _2C_assumptions = ["make_empty_frame", "insert", "get", "make_child_frame",
"add_plus_function", "add_minus_function", "add_mul_function", "add_equals_function"
,"eval_fn_parameters", "apply", "is_simple_function"];

assert("2C_1", () => evaluate(["if", true, 1, 2], false), 1, _2C_assumptions);
assert("2C_1", () => evaluate(["if", false, 1, 2], false), 2, _2C_assumptions);


function make_run_once(){
    let first_run = true;
    return function(params){
        if(!first_run){
            return fail; //Death by undefined variable.
        } else { 
            first_run = false;
            return true; 
        }
    };
}
const run_once = make_run_once();
const run_once_frame = make_global_frame();
insert(run_once_frame, "run_once", run_once);
assert("2C_3", () => evaluate(["if", true, ["run_once"], ["run_once"]], 
    run_once_frame), true, _2C_assumptions);
assert("2C_4", () => evaluate(["if", false, ["run_once"], ["run_once"]], 
    run_once_frame), true, _2C_assumptions);


// ==================== Task 2D ====================
// ============== FUNCTION APPLICATION =============
//Format: [fn a1 a2 ... an]

//Is a Source function, not defined by user.
function is_simple_function(x){
    return is_function(x);
}

//Hint: check the appendix
function eval_fn_parameters(expr, frame){
   return map_array(param => evaluate(param, frame), drop_array(1,expr));
}

//Do this in 2E. Not yet, young padawan.
let apply_user_function = (fn, params) => "Not implemented yet";

function apply(literal_function_expr){
    // --------- YOUR ANSWER HERE ---------
    const fn = literal_function_expr[0];
    const params = array_drop(1, literal_function_expr);


    // DO NOT MODIFY BELOW
    if(is_simple_function(fn)){
        return fn(params);
    } else {
        return apply_user_function(fn, params);
    }
}

//Task 2D Tests
const _2D_assumptions = ["make_empty_frame", "insert", "get", "make_child_frame",
"add_plus_function", "add_minus_function", "add_mul_function", "add_equals_function",
"eval_if_expr"];

assert("2D_1", () => evaluate(["not", true], false), false, _2D_assumptions);
assert("2D_2", () => evaluate(["not", ["not", true]], false), true, _2D_assumptions);

let custom_frame = make_global_frame();
custom_frame = insert(custom_frame, "f", x => y => x[0] + y[0]);

assert("2D_3", () => evaluate([["f", 3], 7], custom_frame), 10, _2D_assumptions);


// ==================== Task 2E ====================
// ============= USER DEFINED FUNCTIONS ============
//Format: [define [fname a1 a2 ... an] ... fn-defn ... body]

//Create a function object and insert it into frame.
function eval_fn_defn(expr, frame){
	let name_and_param = expr[1];
	let fn_body = expr[2];
	return {
		name: name_and_param[0],
		param: drop_array(1, name_and_param),
		body: body;
	}
}

//Hint: eval_stmts
apply_user_function = function apply_user_function(user_function, literal_call_params){
	let obj = eval_fn_defn(user_function);
	let frame = make_empty_frame();
};


//Task 2E Tests
const _2E_assumptions = ["make_empty_frame", "insert", "get", "make_child_frame",
"add_plus_function", "add_minus_function", "add_mul_function", "add_equals_function",
"eval_if_expr", "eval_fn_parameters", "apply"];

const f = 
["define", ["f", "x"], 
    ["+", "x", "x"]];

assert("2E_1", () => evaluate_program([f, ["f", 10] ]), 20, _2E_assumptions);

const neg = 
["define", ["neg", "x"], 
    ["-", 0, "x"]];

assert("2E_2", () => evaluate_program([neg, ["neg", 5] ]), -5, _2E_assumptions);

const fact_fn = 
["define", ["fact", "n"], 
    ["if", ["=", "n", 0],
        1, 
        ["*", "n", ["fact", ["-", "n", 1]]]]];

assert("2E_3", () => evaluate_program([fact_fn, ["fact", 10] ]), 3628800, _2E_assumptions);

const thrice = 
["define", ["thrice", "f"], 
    ["define", ["g", "x"],
        ["f", ["f", ["f", "x"]]]],
    "g"];

const add_one = 
["define", ["add_one", "x"],
    ["+", "x", 1]];

assert("2E_4", () => evaluate_program([thrice, add_one, [[["thrice", "thrice"],"add_one"], 6]]), 
    33, _2E_assumptions);

